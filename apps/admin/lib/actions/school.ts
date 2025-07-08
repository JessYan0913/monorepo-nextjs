"use server"

import { http, defaultHeaders, type PaginatedResponse } from "@/lib/utils"

export interface Director {
  staffId: string // 负责人ID
  staffName: string // 负责人
}

export interface School { 
  schoolId: string // 校区ID
  schoolIntro: string // 校区介绍
  schoolName: string // 校区名称
  schoolMvs: string[] // 校区MV
  schoolStatus: 'normal' | 'closed' // 校区状态
  schoolPictures: string[] // 校区图片
  schoolAddr: string // 校区地址
  director: Director[] // 校区负责人
  createId: string // 创建人ID
  createName: string // 创建人
  createTime: string // 创建时间
  updateId?: string // 修改人ID
  updateName?: string // 修改人
  updateTime?: string // 修改时间
}

type SchoolListParams = {
  addEndTime?: string;
  addStartTime?: string;
  schoolDirectorIds?: string[];
  schoolName?: string;
  page: number;
  size: number;
};

/**
 * 获取校区列表
 */
export async function schoolList({
  addEndTime,
  addStartTime,
  schoolDirectorIds,
  schoolName,
  page,
  size
}: SchoolListParams): Promise<PaginatedResponse<School>> {
  try {
    const response = await http.post<{ data: PaginatedResponse<School> }>(
      `${process.env.BASE_URL}/school/manage/list`,
      {
        addEndTime,
        addStartTime,
        schoolDirectorIds,
        schoolName,
        page,
        size,
      },
      { headers: defaultHeaders, debug: false }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch school list:', error);
    throw error;
  }
}

/**
 * 获取校区详情
 */
export async function getSchool(id: string): Promise<School> {
  try {
    const { data } = await http.post<{ data: School }>(
      `${process.env.BASE_URL}/school/manage/get`,
      { schoolId: id },
      { headers: defaultHeaders }
    );
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch school ${id}:`, error);
    throw new Error('Failed to fetch school details');
  }
}

/**
 * 创建校区
 */
export async function addSchool(
  schoolData: Omit<School, 'schoolId' | 'createId' | 'createName' | 'createTime' | 'updateId' | 'updateName' | 'updateTime'>
): Promise<School> {
  try {
    const { data } = await http.post<{ data: School }>(
      `${process.env.BASE_URL}/school/manage/add`,
      schoolData,
      { headers: defaultHeaders, debug: true }
    );
    
    return data;
  } catch (error) {
    console.error('Failed to create school:', error);
    throw error;
  }
}

/**
 * 更新校区信息
 */
export async function updateSchool(
  schoolData: Omit<School, 'createId' | 'createName' | 'createTime' | 'updateId' | 'updateName' | 'updateTime'>
): Promise<School> {
  try {
    const { data } = await http.put<{ data: School }>(
      `${process.env.BASE_URL}/school/manage/update`,
      schoolData,
      { headers: defaultHeaders, debug: true }
    );
    
    return data;
  } catch (error) {
    console.error(`Failed to update school ${schoolData.schoolId}:`, error);
    throw error;
  }
}

/**
 * 删除校区
 */
export async function deleteSchool(id: string): Promise<{ success: boolean; message: string }> {
  try {
    return await http.post(
      `${process.env.BASE_URL}/school/manage/delete`,
      { schoolId: id },
      { headers: defaultHeaders, debug: true }
    );
  } catch (error) {
    console.error(`Failed to delete school ${id}:`, error);
    throw error;
  }
}
