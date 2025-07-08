"use server"

import { http, defaultHeaders, type PaginatedResponse } from "@/lib/utils"

// Define the Role type based on the provided API response structure
export interface Role {
  roleId: number;
  roleName: string;
  roleRemark: string;
  createId: number;
  createName: string;
  createTime: string;
  updateId: number;
  updateName: string;
  updateTime: string;
}

/**
 * Fetch role list with pagination and optional filters
 */
export async function roleList({ 
  roleName,
  page,
  size 
}: {
  roleName?: string;
  page: number;
  size: number;
}): Promise<PaginatedResponse<Role>> {
  try {
    const response = await http.post<{ data: PaginatedResponse<Role> }>(
      `${process.env.BASE_URL}/permission/manage/list/role`,
      { roleName, page, size },
      { headers: defaultHeaders, debug: false }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch role list:', error);
    throw error;
  }
}

/**
 * Get role details by ID
 */
export async function getRole(roleId: string | number): Promise<Role> {
  try {
    const { data } = await http.post<{ data: Role }>(
      `${process.env.BASE_URL}/permission/manage/get/role`,
      { roleId },
      { headers: defaultHeaders }
    );
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch role ${roleId}:`, error);
    throw new Error('Failed to fetch role details');
  }
}

/**
 * Create a new role
 */
export async function createRole(roleData: Omit<Role, 'roleId' | 'createId' | 'createName' | 'createTime' | 'updateId' | 'updateName' | 'updateTime'>): Promise<Role> {
  try {
    const { data } = await http.post<{ data: Role }>(
      `${process.env.BASE_URL}/permission/manage/add/role`,
      roleData,
      { headers: defaultHeaders, debug: true }
    );
    
    return data;
  } catch (error) {
    console.error('Failed to create role:', error);
    throw error;
  }
}

/**
 * Update an existing role
 */
export async function updateRole(roleData: Omit<Role, 'createId' | 'createName' | 'createTime' | 'updateId' | 'updateName' | 'updateTime'>): Promise<Role> {
  try {
    const { data } = await http.put<{ data: Role }>(
      `${process.env.BASE_URL}/permission/manage/update/role`,
      roleData,
      { headers: defaultHeaders, debug: true }
    );
    
    return data;
  } catch (error) {
    console.error(`Failed to update role ${roleData.roleId}:`, error);
    throw error;
  }
}

/**
 * Delete a role by ID
 */
export async function deleteRole(roleId: string | number): Promise<{ success: boolean; message: string }> {
  try {
    return await http.post(
      `${process.env.BASE_URL}/del/role`,
      { roleId },
      { headers: defaultHeaders }
    );
  } catch (error) {
    console.error(`Failed to delete role ${roleId}:`, error);
    throw error;
  }
}
