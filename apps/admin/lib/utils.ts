interface FetchOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string>;
  debug?: boolean;
}

type ErrorResponse = {
  status: number;
  statusText: string;
  message: string;
  url?: string;
};

export class FetchError extends Error {
  status: number;
  statusText: string;
  url?: string;

  constructor({ status, statusText, message, url }: ErrorResponse) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}

/**
 * Debug-friendly fetch wrapper with timeout and TypeScript support
 * @param url - The URL to fetch
 * @param options - Fetch options including timeout and debug mode
 * @returns Promise with typed response data
 */
export async function fetchWithDebug<T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    timeout = 10000, // 10 seconds default timeout
    debug = process.env.NODE_ENV === 'development',
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // Add query parameters if provided
  const queryString = options.params
    ? `?${new URLSearchParams(options.params).toString()}`
    : '';
  const fullUrl = `${url}${queryString}`;

  if (debug) {
    console.group(`🔍 Fetch: ${fetchOptions.method || 'GET'} ${fullUrl}`);
    console.log('Request:', {
      url: fullUrl,
      method: fetchOptions.method || 'GET',
      headers: fetchOptions.headers,
      body: fetchOptions.body,
      timeout: `${timeout}ms`,
    });
  }

  try {
    const startTime = Date.now();
    const response = await fetch(fullUrl, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    const responseTime = Date.now() - startTime;
    const responseData = await parseResponse(response);

    if (debug) {
      console.log(`✅ Response (${responseTime}ms):`, {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      });
      console.groupEnd();
    }

    if (!response.ok) {
      throw new FetchError({
        status: response.status,
        statusText: response.statusText,
        message: responseData?.message || 'Request failed',
        url: fullUrl,
      });
    }

    return responseData as T;
  } catch (error) {
    if (debug) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.error(`⏱️ Request timed out after ${timeout}ms`);
      } else {
        console.error('❌ Error:', error);
      }
      console.groupEnd();
    }

    if (error instanceof FetchError) {
      throw error;
    }

    throw new FetchError({
      status: 0,
      statusText: 'Network Error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      url: fullUrl,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

// Helper methods for common HTTP methods
export const http = {
  get: <T = any>(url: string, options: Omit<FetchOptions, 'method'> = {}) =>
    fetchWithDebug<T>(url, { ...options, method: 'GET' }),

  post: <T = any>(
    url: string,
    body?: any,
    options: Omit<FetchOptions, 'method' | 'body'> = {}
  ) =>
    fetchWithDebug<T>(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(
    url: string,
    body?: any,
    options: Omit<FetchOptions, 'method' | 'body'> = {}
  ) =>
    fetchWithDebug<T>(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(url: string, options: Omit<FetchOptions, 'method'> = {}) =>
    fetchWithDebug<T>(url, { ...options, method: 'DELETE' }),
};