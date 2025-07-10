"use server"

import { http, defaultHeaders, type PaginatedResponse } from "@/lib/utils"

// Define the VipLevel type for the API
export interface VipLevel {
  id: number;
  level: number;  // Level number (ordered from low to high)
  consumptionAmount: number;  // Cumulative consumption amount required for this level
  discountPercentage: number;  // Discount percentage for this level (e.g., 95 means 95% of original price, or 5% discount)
  benefitsDescription?: string;  // Description of benefits for this VIP level
  createTime?: string;
  updateTime?: string;
}

/**
 * Fetch VIP level list
 */
export async function vipLevelList(): Promise<VipLevel[]> {
  try {
    const response = await http.get<{ data: VipLevel[] }>(
      `${process.env.BASE_URL}/vip/level/list`,
      { headers: defaultHeaders }
    );
    
    // Sort levels from low to high
    return response.data.sort((a, b) => a.level - b.level);
  } catch (error) {
    console.error('Failed to fetch VIP levels:', error);
    // Return empty array for initial development if API is not ready
    return [];
  }
}

/**
 * Create a new VIP level
 * This will only allow adding a level higher than existing ones
 */
export async function createVipLevel(vipLevelData: Omit<VipLevel, 'id' | 'createTime' | 'updateTime'>): Promise<VipLevel> {
  try {
    const { data } = await http.post<{ data: VipLevel }>(
      `${process.env.BASE_URL}/vip/level/add`,
      vipLevelData,
      { headers: defaultHeaders }
    );
    
    return data;
  } catch (error) {
    console.error('Failed to create VIP level:', error);
    throw error;
  }
}

/**
 * Update an existing VIP level
 */
export async function updateVipLevel(vipLevelData: Omit<VipLevel, 'createTime' | 'updateTime'>): Promise<VipLevel> {
  try {
    const { data } = await http.put<{ data: VipLevel }>(
      `${process.env.BASE_URL}/vip/level/update`,
      vipLevelData,
      { headers: defaultHeaders }
    );
    
    return data;
  } catch (error) {
    console.error(`Failed to update VIP level ${vipLevelData.id}:`, error);
    throw error;
  }
}

/**
 * Delete a VIP level by ID
 * This will only allow deleting the highest level
 */
export async function deleteVipLevel(id: number): Promise<{ success: boolean; message: string }> {
  try {
    return await http.post(
      `${process.env.BASE_URL}/vip/level/delete`,
      { id },
      { headers: defaultHeaders }
    );
  } catch (error) {
    console.error(`Failed to delete VIP level ${id}:`, error);
    throw error;
  }
}
