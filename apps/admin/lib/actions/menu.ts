"use server"

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

// Mock data for menus
let mockMenus: Menu[] = [
  {
    menuId: 1,
    menuName: '系统管理',
    menuPath: '/system',
    menuType: 'DIRECTORY',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 2,
    menuName: '用户管理',
    menuPath: '/system/users',
    menuType: 'MENU',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 3,
    menuName: '角色管理',
    menuPath: '/system/roles',
    menuType: 'MENU',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 4,
    menuName: '菜单管理',
    menuPath: '/system/menus',
    menuType: 'MENU',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 5,
    menuName: '权限管理',
    menuPath: '/system/permissions',
    menuType: 'MENU',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 6,
    menuName: '日志管理',
    menuPath: '/system/logs',
    menuType: 'MENU',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 7,
    menuName: '系统监控',
    menuPath: '/monitor',
    menuType: 'DIRECTORY',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 8,
    menuName: '操作日志',
    menuPath: '/monitor/operations',
    menuType: 'MENU',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 9,
    menuName: '登录日志',
    menuPath: '/monitor/login-logs',
    menuType: 'MENU',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  },
  {
    menuId: 10,
    menuName: '系统设置',
    menuPath: '/settings',
    menuType: 'DIRECTORY',
    createId: 1,
    createName: '系统',
    createTime: '2023-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2023-01-01T00:00:00Z'
  }
];

// Generate a new ID for creating menus
function generateNewMenuId(): number {
  return Math.max(0, ...mockMenus.map(menu => menu.menuId)) + 1;
}

/**
 * Fetch menu list with pagination and optional filters
 */
export async function menuList({ 
  menuName,
  page = 1,
  size = 10
}: {
  menuName?: string;
  page?: number;
  size?: number;
} = {}): Promise<{ data: Menu[]; page: number; size: number; total: number }> {
  try {
    // Filter menus by name if provided
    let filteredMenus = [...mockMenus];
    
    if (menuName) {
      filteredMenus = filteredMenus.filter(menu => 
        menu.menuName.includes(menuName)
      );
    }
    
    // Apply pagination
    const start = (page - 1) * size;
    const paginatedMenus = filteredMenus.slice(start, start + size);
    
    return {
      data: paginatedMenus,
      page,
      size,
      total: filteredMenus.length
    };
  } catch (error) {
    console.error('获取菜单列表失败:', error);
    return {
      data: [],
      page,
      size,
      total: 0
    };
  }
}

/**
 * Delete a menu by ID
 */
export async function deleteMenu(menuId: string): Promise<{ success: boolean; message: string }> {
  try {
    const initialLength = mockMenus.length;
    mockMenus = mockMenus.filter(menu => menu.menuId !== Number(menuId));
    
    if (mockMenus.length === initialLength) {
      return { 
        success: false, 
        message: `删除失败: 未找到ID为 ${menuId} 的菜单` 
      };
    }
    
    return { 
      success: true, 
      message: '删除成功' 
    };
  } catch (error) {
    console.error('删除菜单失败:', error);
    return { 
      success: false, 
      message: '删除菜单时发生错误' 
    };
  }
}

/**
 * Get menu details by ID
 */
export async function getMenu(menuId: string): Promise<Menu | null> {
  try {
    const menu = mockMenus.find(menu => menu.menuId === Number(menuId));
    
    if (!menu) {
      console.error(`未找到ID为 ${menuId} 的菜单`);
      return null;
    }
    
    return { ...menu };
  } catch (error) {
    console.error(`获取菜单 ${menuId} 详情失败:`, error);
    return null;
  }
}

export async function createMenu(data: Omit<Menu, "menuId" | "createId" | "createName" | "createTime" | "updateId" | "updateName" | "updateTime">): Promise<Menu> {
  try {
    // Check if menu with same name already exists
    const existingMenu = mockMenus.find(menu => menu.menuName === data.menuName);
    if (existingMenu) {
      throw new Error(`菜单名称 "${data.menuName}" 已存在`);
    }
    
    const now = new Date().toISOString();
    const newMenu: Menu = {
      ...data,
      menuId: generateNewMenuId(),
      createId: 1, // In a real app, this would be the current user's ID
      createName: '当前用户',
      createTime: now,
      updateId: 1, // In a real app, this would be the current user's ID
      updateName: '当前用户',
      updateTime: now
    };
    
    mockMenus.push(newMenu);
    return newMenu;
  } catch (error) {
    console.error('创建菜单失败:', error);
    throw error instanceof Error ? error : new Error('创建菜单时发生未知错误');
  }
}

/**
 * Update an existing menu
 * @param menu Menu data to update
 * @returns Updated menu data
 */
export async function updateMenu(menu: Omit<Menu, "createId" | "createName" | "createTime" | "updateId" | "updateName" | "updateTime">): Promise<Menu> {
  try {
    const index = mockMenus.findIndex(m => m.menuId === menu.menuId);
    
    if (index === -1) {
      throw new Error(`未找到ID为 ${menu.menuId} 的菜单`);
    }
    
    // Check if menu with same name already exists (excluding current menu)
    const existingMenu = mockMenus.find(m => 
      m.menuName === menu.menuName && m.menuId !== menu.menuId
    );
    
    if (existingMenu) {
      throw new Error(`菜单名称 "${menu.menuName}" 已存在`);
    }
    
    const now = new Date().toISOString();
    const updatedMenu: Menu = {
      ...mockMenus[index],
      ...menu,
      updateId: 1, // In a real app, this would be the current user's ID
      updateName: '当前用户',
      updateTime: now
    };
    
    mockMenus[index] = updatedMenu;
    return updatedMenu;
  } catch (error) {
    console.error('更新菜单失败:', error);
    throw error instanceof Error ? error : new Error('更新菜单时发生未知错误');
  }
}
