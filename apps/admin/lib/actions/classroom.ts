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
    // 注释掉原有的接口调用
    // const response = await http.post<{ data: PaginatedResponse<Classroom> }>(
    //   `${process.env.BASE_URL}/classroom/manage/list`,
    //   {
    //     classroomName,
    //     schoolId,
    //     page,
    //     size,
    //   },
    //   { headers: defaultHeaders, debug: false }
    // );
    // 
    // return response.data;

    // 使用模拟数据
    const mockClassrooms: Classroom[] = Array.from({ length: 20 }, (_, index) => ({
      classroomId: index + 1,
      classroomName: `教室${index + 1}`,
      classroomAddr: `${index % 3 === 0 ? '一楼' : (index % 3 === 1 ? '二楼' : '三楼')}${(index % 10) + 1}号教室`,
      classroomArea: `${Math.floor(Math.random() * 50) + 50}平方米`,
      classroomCapacity: Math.floor(Math.random() * 30) + 20,
      classroomPictures: [
        `https://example.com/classroom${index + 1}_1.jpg`,
        `https://example.com/classroom${index + 1}_2.jpg`
      ],
      classroomRemark: index % 5 === 0 ? '需要维修' : '正常使用中',
      schoolId: (index % 3) + 1,
      schoolName: [`北京校区`, `上海校区`, `广州校区`][index % 3],
      createId: 1,
      createName: '管理员',
      createTime: `2025-0${(index % 7) + 1}-0${(index % 28) + 1} 10:00:00`,
      updateId: 1,
      updateName: '管理员',
      updateTime: `2025-0${(index % 7) + 1}-0${(index % 28) + 1} 10:00:00`
    }));

    // 根据查询参数过滤数据
    let filteredData = [...mockClassrooms];
    
    if (classroomName) {
      filteredData = filteredData.filter(item => item.classroomName.includes(classroomName));
    }
    
    if (schoolId) {
      filteredData = filteredData.filter(item => item.schoolId === schoolId);
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
    console.error('Failed to fetch classroom list:', error);
    throw error;
  }
}

/**
 * 获取教室详情
 */
export async function getClassroom(id: number | string): Promise<Classroom> {
  try {
    // 注释掉原有的接口调用
    // const { data } = await http.post<{ data: Classroom }>(
    //   `${process.env.BASE_URL}/classroom/manage/get`,
    //   { classroomId: id },
    //   { headers: defaultHeaders }
    // );
    // 
    // return data;

    // 使用模拟数据
    const classroomId = Number(id);
    const schoolId = (classroomId % 3) + 1;
    
    return {
      classroomId: classroomId,
      classroomName: `教室${classroomId}`,
      classroomAddr: `${classroomId % 3 === 0 ? '一楼' : (classroomId % 3 === 1 ? '二楼' : '三楼')}${(classroomId % 10) + 1}号教室`,
      classroomArea: `${Math.floor(Math.random() * 50) + 50}平方米`,
      classroomCapacity: Math.floor(Math.random() * 30) + 20,
      classroomPictures: [
        `https://example.com/classroom${classroomId}_1.jpg`,
        `https://example.com/classroom${classroomId}_2.jpg`,
        `https://example.com/classroom${classroomId}_3.jpg`
      ],
      classroomRemark: classroomId % 5 === 0 ? '需要维修' : '正常使用中',
      schoolId: schoolId,
      schoolName: [`北京校区`, `上海校区`, `广州校区`][schoolId - 1],
      createId: 1,
      createName: '管理员',
      createTime: '2025-07-01 10:00:00',
      updateId: 1,
      updateName: '管理员',
      updateTime: '2025-07-01 10:00:00'
    };
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
    // 注释掉原有的接口调用
    // const { data } = await http.post<{ data: Classroom }>(
    //   `${process.env.BASE_URL}/classroom/manage/add`,
    //   classroomData,
    //   { headers: defaultHeaders, debug: true }
    // );
    // 
    // return data;

    // 使用模拟数据
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newClassroomId = Math.floor(Math.random() * 10000) + 1000;
    
    // 创建一个新的教室对象，模拟服务器返回的数据
    const newClassroom: Classroom = {
      ...classroomData,
      classroomId: newClassroomId,
      createId: 1,
      createName: '管理员',
      createTime: currentDate,
      updateId: 1,
      updateName: '管理员',
      updateTime: currentDate
    };
    
    console.log('模拟创建教室成功:', newClassroom);
    return newClassroom;
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
    // 注释掉原有的接口调用
    // const { data } = await http.put<{ data: Classroom }>(
    //   `${process.env.BASE_URL}/classroom/manage/update`,
    //   classroomData,
    //   { headers: defaultHeaders, debug: true }
    // );
    // 
    // return data;

    // 使用模拟数据
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    // 更新教室对象，模拟服务器返回的数据
    const updatedClassroom: Classroom = {
      ...classroomData,
      updateId: 1,
      updateName: '管理员',
      updateTime: currentDate,
      // 保留原有的创建信息（在实际场景中这些信息应该从数据库获取）
      createId: 1,
      createName: '管理员',
      createTime: '2025-07-01 10:00:00'
    };
    
    console.log('模拟更新教室成功:', updatedClassroom);
    return updatedClassroom;
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
    // 注释掉原有的接口调用
    // return await http.post(
    //   `${process.env.BASE_URL}/classroom/manage/delete`,
    //   { classroomId: id },
    //   { headers: defaultHeaders, debug: true }
    // );

    // 使用模拟数据
    console.log(`模拟删除教室 ID: ${id}`);
    
    // 模拟成功响应
    return {
      success: true,
      message: `教室(ID: ${id})删除成功`
    };
  } catch (error) {
    console.error(`Failed to delete classroom ${id}:`, error);
    throw error;
  }
}
