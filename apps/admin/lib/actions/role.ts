"use server"

import { type PaginatedResponse } from "@/lib/utils"

// Mock data for roles
let mockRoles: Role[] = [
  {
    roleId: 1,
    roleName: '系统管理员',
    roleRemark: '拥有系统所有权限',
    createId: 1,
    createName: '系统',
    createTime: '2024-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2024-01-01T00:00:00Z'
  },
  {
    roleId: 2,
    roleName: '教师',
    roleRemark: '教师角色，拥有教学相关权限',
    createId: 1,
    createName: '系统',
    createTime: '2024-01-15T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2024-01-15T00:00:00Z'
  },
  {
    roleId: 3,
    roleName: '学生',
    roleRemark: '学生角色，拥有学习相关权限',
    createId: 1,
    createName: '系统',
    createTime: '2024-02-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2024-02-01T00:00:00Z'
  }
];

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
  page = 1,
  size = 10
}: {
  roleName?: string;
  page?: number;
  size?: number;
} = {}): Promise<PaginatedResponse<Role>> {
  try {
    // Filter roles based on roleName if provided
    let filteredRoles = [...mockRoles];
    
    if (roleName) {
      filteredRoles = filteredRoles.filter(role => 
        role.roleName.includes(roleName)
      );
    }
    
    // Pagination
    const start = (page - 1) * size;
    const paginatedItems = filteredRoles.slice(start, start + size);
    
    return {
      data: paginatedItems,
      total: filteredRoles.length,
      size,
      page
    };
  } catch (error) {
    console.error('Error fetching role list:', error);
    return {
      data: [],
      total: 0,
      size: size || 10,
      page: page || 1
    };
  }
}

/**
 * Get role details by ID
 */
export async function getRole(roleId: string | number): Promise<Role> {
  try {
    const role = mockRoles.find(r => r.roleId === Number(roleId));
    
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }
    
    return { ...role };
  } catch (error) {
    console.error(`Failed to fetch role ${roleId}:`, error);
    throw new Error('获取角色详情失败');
  }
}

/**
 * Create a new role
 */
export async function createRole(roleData: Omit<Role, 'roleId' | 'createId' | 'createName' | 'createTime' | 'updateId' | 'updateName' | 'updateTime'>): Promise<Role> {
  try {
    const newRole: Role = {
      ...roleData,
      roleId: Math.max(0, ...mockRoles.map(r => r.roleId)) + 1,
      createId: 1, // In a real app, this would be the current user's ID
      createName: '当前用户',
      createTime: new Date().toISOString(),
      updateId: 1, // In a real app, this would be the current user's ID
      updateName: '当前用户',
      updateTime: new Date().toISOString()
    };
    
    mockRoles.push(newRole);
    return { ...newRole };
  } catch (error) {
    console.error('Failed to create role:', error);
    throw new Error('创建角色失败');
  }
}

/**
 * Update an existing role
 */
export async function updateRole(roleData: Omit<Role, 'createId' | 'createName' | 'createTime' | 'updateId' | 'updateName' | 'updateTime'>): Promise<Role> {
  try {
    const index = mockRoles.findIndex(r => r.roleId === roleData.roleId);
    
    if (index === -1) {
      throw new Error(`Role with ID ${roleData.roleId} not found`);
    }
    
    const updatedRole = {
      ...mockRoles[index],
      ...roleData,
      updateId: 1, // In a real app, this would be the current user's ID
      updateName: '当前用户',
      updateTime: new Date().toISOString()
    };
    
    mockRoles[index] = updatedRole;
    return { ...updatedRole };
  } catch (error) {
    console.error(`Failed to update role ${roleData.roleId}:`, error);
    throw new Error('更新角色失败');
  }
}

/**
 * Delete a role by ID
 */
export async function deleteRole(roleId: string | number): Promise<{ success: boolean; message: string }> {
  try {
    const initialLength = mockRoles.length;
    mockRoles = mockRoles.filter(role => role.roleId !== Number(roleId));
    
    if (mockRoles.length === initialLength) {
      return { success: false, message: '角色不存在' };
    }
    
    return { success: true, message: '删除成功' };
  } catch (error) {
    console.error(`Failed to delete role ${roleId}:`, error);
    return { success: false, message: '删除角色失败' };
  }
}
