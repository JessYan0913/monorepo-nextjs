"use server"

import { http, defaultHeaders, type PaginatedResponse } from "@/lib/utils";

// Define the Menu type based on the provided API response structure
export interface Menu {
  menuId: number;
  menuName: string;
  menuPath: string;
  menuType: string;
  createId: number;
  createName: string;
  createTime: string;
  updateId: number;
  updateName: string;
  updateTime: string;
}

/**
 * Fetch menu list with pagination and optional filters
 */
export async function menuList({ 
  menuName,
  page,
  size 
}: {
  menuName?: string;
  page: number;
  size: number;
}): Promise<PaginatedResponse<Menu>> {
  try {
    const data = await http.post<{ data: PaginatedResponse<Menu> }>(
      `${process.env.BASE_URL}/permission/manage/list/menu`,
      {
        menuName,
        page,
        size,
      },
      { headers: defaultHeaders, debug: false }
    );
    return data.data;
  } catch (error) {
    console.error('Failed to fetch menu list:', error);
    throw error;
  }
}

/**
 * Delete a menu by ID
 */
export async function deleteMenu(menuId: string): Promise<{ success: boolean; message: string }> {
  return http.post(
    `${process.env.BASE_URL}/menu/delete`,
    { menuId },
    { headers: defaultHeaders, debug: true }
  );
}

/**
 * Get menu details by ID
 */
export async function getMenu(menuId: string): Promise<Menu> {
  try {
    const { data } = await http.post<{ data: Menu }>(
      `${process.env.BASE_URL}/permission/manage/get/menu`,
      { menuId },
      { headers: defaultHeaders, debug: true }
    )
    return data
  } catch (error) {
    console.error(`Failed to fetch menu ${menuId}:`, error);
    throw new Error("Failed to fetch menu details");
  }
}

export async function createMenu(data: Omit<Menu, "menuId" | "createId" | "createName" | "createTime" | "updateId" | "updateName" | "updateTime">): Promise<Menu> {
  try {
    const response = await http.post<{ data: Menu }>(
      `${process.env.BASE_URL}/permission/manage/add/menu`,
      data,
      { headers: defaultHeaders, debug: true }
    )
    return response.data
  } catch (error) {
    console.error('Failed to create menu:', error)
    throw new Error("Failed to create menu")
  }
}

/**
 * Update an existing menu
 * @param menu Menu data to update
 * @returns Updated menu data
 */
export async function updateMenu(menu: Omit<Menu, "createId" | "createName" | "createTime" | "updateId" | "updateName" | "updateTime">): Promise<Menu> {
  try {
    const response = await http.put<{ data: Menu }>(
      `${process.env.BASE_URL}/permission/manage/update/menu`,
      menu,
      { headers: defaultHeaders, debug: true }
    )
    
    return response.data
  } catch (error) {
    console.error('Error updating menu:', error)
    throw error
  }
}
