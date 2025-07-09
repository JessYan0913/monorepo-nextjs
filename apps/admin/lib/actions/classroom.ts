"use server"

import { http, defaultHeaders, type PaginatedResponse } from "@/lib/utils"

export interface Classroom { 
  classroomId: number // 教室ID
  classroomName: string // 教室名称
  classroomAddr: string // 教室地址
  classroomArea: string // 教室区域
  classroomCapacity: number // 教室容量
  classroomPictures: string[] // 教室图片
  classroomRemark: string // 教室备注
  schoolId: number // 校区ID
  schoolName: string // 校区名称
  createId: number // 创建人ID
  createName: string // 创建人
  createTime: string // 创建时间
  updateId: number // 修改人ID
  updateName: string // 修改人
  updateTime: string // 修改时间
}

type ClassroomListParams = {
  classroomName?: string;
  schoolId?: number;
  page: number;
  size: number;
};

/**
 * 获取教室列表
 */
export async function classroomList({
  classroomName,
  schoolId,
  page,
  size
}: ClassroomListParams): Promise<PaginatedResponse<Classroom>> {
  try {
    const response = await http.post<{ data: PaginatedResponse<Classroom> }>(
      `${process.env.BASE_URL}/classroom/manage/list`,
      {
        classroomName,
        schoolId,
        page,
        size,
      },
      { headers: defaultHeaders, debug: false }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch classroom list:', error);
    throw error;
  }
}

/**
 * 获取教室详情
 */
export async function getClassroom(id: number | string): Promise<Classroom> {
  try {
    const { data } = await http.post<{ data: Classroom }>(
      `${process.env.BASE_URL}/classroom/manage/get`,
      { classroomId: id },
      { headers: defaultHeaders }
    );
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch classroom ${id}:`, error);
    throw new Error('Failed to fetch classroom details');
  }
}

/**
 * 创建教室
 */
export async function addClassroom(
  classroomData: Omit<Classroom, 'classroomId' | 'createId' | 'createName' | 'createTime' | 'updateId' | 'updateName' | 'updateTime'>
): Promise<Classroom> {
  try {
    const { data } = await http.post<{ data: Classroom }>(
      `${process.env.BASE_URL}/classroom/manage/add`,
      classroomData,
      { headers: defaultHeaders, debug: true }
    );
    
    return data;
  } catch (error) {
    console.error('Failed to create classroom:', error);
    throw error;
  }
}

/**
 * 更新教室信息
 */
export async function updateClassroom(
  classroomData: Omit<Classroom, 'createId' | 'createName' | 'createTime' | 'updateId' | 'updateName' | 'updateTime'>
): Promise<Classroom> {
  try {
    const { data } = await http.put<{ data: Classroom }>(
      `${process.env.BASE_URL}/classroom/manage/update`,
      classroomData,
      { headers: defaultHeaders, debug: true }
    );
    
    return data;
  } catch (error) {
    console.error(`Failed to update classroom ${classroomData.classroomId}:`, error);
    throw error;
  }
}

/**
 * 删除教室
 */
export async function deleteClassroom(id: number | string): Promise<{ success: boolean; message: string }> {
  try {
    return await http.post(
      `${process.env.BASE_URL}/classroom/manage/delete`,
      { classroomId: id },
      { headers: defaultHeaders, debug: true }
    );
  } catch (error) {
    console.error(`Failed to delete classroom ${id}:`, error);
    throw error;
  }
}
