"use server"

import { type PaginatedResponse } from "@/lib/utils"

// Mock data for schools
const mockSchools: School[] = [
  {
    schoolId: '1',
    schoolName: '上海中心校区',
    schoolIntro: '位于上海市中心的旗舰校区',
    schoolAddr: '上海市黄浦区南京东路123号',
    schoolStatus: 'normal',
    schoolMvs: [],
    schoolPictures: [],
    director: [
      { staffId: '1', staffName: '张老师' }
    ],
    createId: 'system',
    createName: '系统',
    createTime: '2024-01-01T00:00:00Z'
  },
  {
    schoolId: '2',
    schoolName: '北京朝阳校区',
    schoolIntro: '北京朝阳区重点校区',
    schoolAddr: '北京市朝阳区建国路88号',
    schoolStatus: 'normal',
    schoolMvs: [],
    schoolPictures: [],
    director: [
      { staffId: '2', staffName: '李老师' }
    ],
    createId: 'system',
    createName: '系统',
    createTime: '2024-02-01T00:00:00Z'
  }
];

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
  page = 1,
  size = 10
}: SchoolListParams): Promise<PaginatedResponse<School>> {
  try {
    // Filter schools based on query parameters
    let filteredSchools = [...mockSchools];
    
    if (schoolName) {
      filteredSchools = filteredSchools.filter(school => 
        school.schoolName.includes(schoolName)
      );
    }
    
    if (schoolDirectorIds?.length) {
      filteredSchools = filteredSchools.filter(school => 
        school.director.some(d => schoolDirectorIds.includes(d.staffId))
      );
    }
    
    // Date range filtering
    if (addStartTime || addEndTime) {
      const startDate = addStartTime ? new Date(addStartTime) : null;
      const endDate = addEndTime ? new Date(addEndTime) : null;
      
      filteredSchools = filteredSchools.filter(school => {
        const createDate = new Date(school.createTime);
        return (!startDate || createDate >= startDate) && 
               (!endDate || createDate <= endDate);
      });
    }
    
    // Pagination
    const start = (page - 1) * size;
    const paginatedItems = filteredSchools.slice(start, start + size);
    
    return {
      data: paginatedItems,
      total: filteredSchools.length,
      size,
      page
    };
  } catch (error) {
    console.error('Error fetching school list:', error);
    return {
      data: [],
      total: 0,
      size,
      page
    };
  }
}

/**
 * 获取校区详情
 */
export async function getSchool(id: string): Promise<School> {
  try {
    const school = mockSchools.find(s => s.schoolId === id);
    
    if (!school) {
      throw new Error(`School with ID ${id} not found`);
    }
    
    return { ...school };
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
    const newSchool: School = {
      ...schoolData,
      schoolId: (mockSchools.length + 1).toString(),
      createId: 'current-user',
      createName: '当前用户',
      createTime: new Date().toISOString(),
      schoolMvs: schoolData.schoolMvs || [],
      schoolPictures: schoolData.schoolPictures || [],
      director: schoolData.director || []
    };
    
    mockSchools.push(newSchool);
    return { ...newSchool };
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
    const index = mockSchools.findIndex(s => s.schoolId === schoolData.schoolId);
    
    if (index === -1) {
      throw new Error(`School with ID ${schoolData.schoolId} not found`);
    }
    
    const updatedSchool = {
      ...mockSchools[index],
      ...schoolData,
      updateId: 'current-user',
      updateName: '当前用户',
      updateTime: new Date().toISOString()
    };
    
    mockSchools[index] = updatedSchool;
    return { ...updatedSchool };
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
    const index = mockSchools.findIndex(s => s.schoolId === id);
    
    if (index === -1) {
      return { success: false, message: '校区不存在' };
    }
    
    // In a real app, we would just mark it as deleted
    mockSchools.splice(index, 1);
    
    return { success: true, message: '删除成功' };
  } catch (error) {
    console.error(`Failed to delete school ${id}:`, error);
    return { success: false, message: '删除失败' };
  }
}
