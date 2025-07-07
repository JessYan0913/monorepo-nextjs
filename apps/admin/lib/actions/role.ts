// Role management API functions

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
}): Promise<{ data: Role[]; page: number; size: number; total: number}> {
  const res = await fetch(`${process.env.BASE_URL}/permission/manage/list/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "req-device": "pc"
    },
    body: JSON.stringify({
      roleName: roleName,
      page: page,
      size: size,
    }),
  })
  const { data } = await res.json()
  return data
}

/**
 * Delete a role by ID
 */
export async function deleteRole(roleId: number): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${process.env.BASE_URL}/role/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "req-device": "pc"
    },
    body: JSON.stringify({
      roleId: roleId
    }),
  })
  return res.json()
}
