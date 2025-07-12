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
    const response = await http.post<{ data: PaginatedResponse<Cashier> }>(
      `${process.env.BASE_URL}/cashier/manage/list`,
      {
        name,
        phone,
        email,
        schoolId,
        status,
        startTime,
        endTime,
        page,
        size,
      },
      { headers: defaultHeaders, debug: false }
    );
    
    return response.data;
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
    const { data } = await http.post<{ data: Cashier }>(
      `${process.env.BASE_URL}/cashier/manage/add`,
      cashierData,
      { headers: defaultHeaders, debug: true }
    );
    
    return data;
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
    const { data } = await http.put<{ data: Cashier }>(
      `${process.env.BASE_URL}/cashier/manage/update`,
      cashierData,
      { headers: defaultHeaders, debug: true }
    );
    
    return data;
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
    return await http.post(
      `${process.env.BASE_URL}/cashier/manage/delete`,
      { id },
      { headers: defaultHeaders, debug: true }
    );
  } catch (error) {
    console.error(`Failed to delete cashier ${id}:`, error);
    throw error;
  }
}
