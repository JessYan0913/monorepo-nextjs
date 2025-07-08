// Menu management API functions

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
}): Promise<{ data: Menu[]; page: number; size: number; total: number}> {
  const res = await fetch(`${process.env.BASE_URL}/permission/manage/list/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "req-device": "pc"
    },
    body: JSON.stringify({
      menuName: menuName,
      page: page,
      size: size,
    }),
  })
  const { data } = await res.json()
  console.log("menuList", data)
  
  return data
}

/**
 * Delete a menu by ID
 */
export async function deleteMenu(menuId: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${process.env.BASE_URL}/menu/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "req-device": "pc"
    },
    body: JSON.stringify({
      menuId: menuId
    }),
  })
  return res.json()
}

/**
 * Get menu details by ID
 */
export async function getMenu(menuId: string): Promise<Menu> {
  const res = await fetch(`${process.env.BASE_URL}/permission/manage/get/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "req-device": "pc"
    },
    body: JSON.stringify({
      menuId: menuId
    }),
  })
  
  if (!res.ok) {
    throw new Error("Failed to fetch menu")
  }
  
  const { data } = await res.json()
  return data
}
