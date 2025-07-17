"use server"

import { type School } from "./school"
import { http, defaultHeaders, type PaginatedResponse } from "@/lib/utils"

export interface Cashier {
  id: number
  name: string
  phone: string
  email: string
  avatar?: string
  school: Pick<School, "schoolId" | "schoolName" | "schoolAddr">
  status: "active" | "inactive"
  createTime: string
  updateTime: string
  createId?: string
  createName?: string
  updateId?: string
  updateName?: string
}

type CashierListParams = {
  name?: string;
  phone?: string;
  email?: string;
  schoolId?: string;
  status?: "active" | "inactive";
  startTime?: string;
  endTime?: string;
  page: number;
  size: number;
};

/**
 * 获取收银员列表
 */
export async function cashierList({
  name,
  phone,
  email,
  schoolId,
  status,
  startTime,
  endTime,
  page,
  size
}: CashierListParams): Promise<PaginatedResponse<Cashier>> {
  try {
    // 注释掉原有的接口调用
    // const response = await http.post<{ data: PaginatedResponse<Cashier> }>(
    //   `${process.env.BASE_URL}/cashier/manage/list`,
    //   {
    //     name,
    //     phone,
    //     email,
    //     schoolId,
    //     status,
    //     startTime,
    //     endTime,
    //     page,
    //     size,
    //   },
    //   { headers: defaultHeaders, debug: false }
    // );
    // 
    // return response.data;

    // 使用模拟数据
    const mockCashiers: Cashier[] = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `收银员${index + 1}`,
      phone: `1380013800${index < 9 ? '0' : ''}${index + 1}`,
      email: `cashier${index + 1}@example.com`,
      avatar: "",
      school: {
        schoolId: String((index % 3) + 1),
        schoolName: [`北京校区`, `上海校区`, `广州校区`][index % 3],
        schoolAddr: [`北京市海淀区中关村大街1号`, `上海市浦东新区张江高科技园区`, `广州市天河区天河路385号`][index % 3]
      },
      status: index % 5 === 0 ? "inactive" : "active",
      createTime: `2025-0${(index % 7) + 1}-0${(index % 28) + 1} 10:00:00`,
      updateTime: `2025-0${(index % 7) + 1}-0${(index % 28) + 1} 10:00:00`
    }));

    // 根据查询参数过滤数据
    let filteredData = [...mockCashiers];
    
    if (name) {
      filteredData = filteredData.filter(item => item.name.includes(name));
    }
    
    if (phone) {
      filteredData = filteredData.filter(item => item.phone.includes(phone));
    }
    
    if (email) {
      filteredData = filteredData.filter(item => item.email.includes(email));
    }
    
    if (schoolId) {
      filteredData = filteredData.filter(item => item.school.schoolId === schoolId);
    }
    
    if (status) {
      filteredData = filteredData.filter(item => item.status === status);
    }

    // 分页处理
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      size
    };
  } catch (error) {
    console.error('Failed to fetch cashier list:', error);
    throw error;
  }
}

/**
 * 获取收银员详情
 */
export async function getCashier(id: number | string): Promise<Cashier> {
  try {
    // const { data } = await http.post<{ data: Cashier }>(
    //   `${process.env.BASE_URL}/cashier/manage/get`,
    //   { id },
    //   { headers: defaultHeaders }
    // );
    
    // return data;
    return {
      id: Number(id),
      name: "张三",
      phone: "13800138001",
      email: "zhangsan@example.com",
      avatar: "",
      school: {
        schoolId: "1",
        schoolName: "北京校区",
        schoolAddr: "北京市海淀区中关村大街1号"
      },
      status: "active",
      createTime: "2025-07-01 10:00:00",
      updateTime: "2025-07-01 10:00:00"
    }
  } catch (error) {
    console.error(`Failed to fetch cashier ${id}:`, error);
    throw new Error('Failed to fetch cashier details');
  }
}

/**
 * 创建收银员
 */
export async function addCashier(
  cashierData: Omit<Cashier, 'id' | 'createTime' | 'updateTime' | 'createId' | 'createName' | 'updateId' | 'updateName'>
): Promise<Cashier> {
  try {
    // 注释掉原有的接口调用
    // const { data } = await http.post<{ data: Cashier }>(
    //   `${process.env.BASE_URL}/cashier/manage/add`,
    //   cashierData,
    //   { headers: defaultHeaders, debug: true }
    // );
    // 
    // return data;

    // 使用模拟数据
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    // 创建一个新的收银员对象，模拟服务器返回的数据
    const newCashier: Cashier = {
      ...cashierData,
      id: Math.floor(Math.random() * 10000) + 1000, // 生成随机ID
      createTime: currentDate,
      updateTime: currentDate,
      createId: "admin",
      createName: "管理员",
      updateId: "admin",
      updateName: "管理员"
    };
    
    console.log('模拟创建收银员成功:', newCashier);
    return newCashier;
  } catch (error) {
    console.error('Failed to create cashier:', error);
    throw error;
  }
}

/**
 * 更新收银员信息
 */
export async function updateCashier(
  cashierData: Omit<Cashier, 'createTime' | 'updateTime' | 'createId' | 'createName' | 'updateId' | 'updateName'>
): Promise<Cashier> {
  try {
    // 注释掉原有的接口调用
    // const { data } = await http.put<{ data: Cashier }>(
    //   `${process.env.BASE_URL}/cashier/manage/update`,
    //   cashierData,
    //   { headers: defaultHeaders, debug: true }
    // );
    // 
    // return data;

    // 使用模拟数据
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    // 更新收银员对象，模拟服务器返回的数据
    const updatedCashier: Cashier = {
      ...cashierData,
      updateTime: currentDate,
      updateId: "admin",
      updateName: "管理员",
      // 保留原有的创建信息（在实际场景中这些信息应该从数据库获取）
      createTime: "2025-07-01 10:00:00",
      createId: "admin",
      createName: "管理员"
    };
    
    console.log('模拟更新收银员成功:', updatedCashier);
    return updatedCashier;
  } catch (error) {
    console.error(`Failed to update cashier ${cashierData.id}:`, error);
    throw error;
  }
}

/**
 * 删除收银员
 */
export async function deleteCashier(id: number): Promise<{ success: boolean; message: string }> {
  try {
    // 注释掉原有的接口调用
    // return await http.post(
    //   `${process.env.BASE_URL}/cashier/manage/delete`,
    //   { id },
    //   { headers: defaultHeaders, debug: true }
    // );

    // 使用模拟数据
    console.log(`模拟删除收银员 ID: ${id}`);
    
    // 模拟成功响应
    return {
      success: true,
      message: `收银员(ID: ${id})删除成功`
    };
  } catch (error) {
    console.error(`Failed to delete cashier ${id}:`, error);
    throw error;
  }
}
