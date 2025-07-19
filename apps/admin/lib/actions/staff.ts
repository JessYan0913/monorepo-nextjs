"use server"

// Mock data for staff
let mockStaffs: Staff[] = [
  {
    staffId: 1,
    staffName: '张三',
    staffNick: '张老师',
    staffAccount: 'zhangsan',
    staffPhone: '13800138001',
    staffIdcard: '110101199001011234',
    staffAddr: '北京市朝阳区',
    staffBirthday: '1990-01-01',
    staffHiredate: '2020-01-01',
    staffSex: 1,
    staffStatus: '1',
    staffSerial: 1,
    staffIntro: '资深教师',
    staffProfilePicture: '',
    staffIntroPicture: '',
    createId: 1,
    createName: '系统',
    createTime: '2020-01-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2020-01-01T00:00:00Z'
  },
  {
    staffId: 2,
    staffName: '李四',
    staffNick: '李老师',
    staffAccount: 'lisi',
    staffPhone: '13800138002',
    staffIdcard: '110101199102022345',
    staffAddr: '上海市浦东新区',
    staffBirthday: '1991-02-02',
    staffHiredate: '2020-02-01',
    staffSex: 1,
    staffStatus: '1',
    staffSerial: 2,
    staffIntro: '高级教师',
    staffProfilePicture: '',
    staffIntroPicture: '',
    createId: 1,
    createName: '系统',
    createTime: '2020-02-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2020-02-01T00:00:00Z'
  },
  {
    staffId: 3,
    staffName: '王五',
    staffNick: '王老师',
    staffAccount: 'wangwu',
    staffPhone: '13800138003',
    staffIdcard: '110101199203033456',
    staffAddr: '广州市天河区',
    staffBirthday: '1992-03-03',
    staffHiredate: '2020-03-01',
    staffSex: 2,
    staffStatus: '1',
    staffSerial: 3,
    staffIntro: '特级教师',
    staffProfilePicture: '',
    staffIntroPicture: '',
    createId: 1,
    createName: '系统',
    createTime: '2020-03-01T00:00:00Z',
    updateId: 1,
    updateName: '系统',
    updateTime: '2020-03-01T00:00:00Z'
  }
];

export interface StaffListParams {
  staffName?: string
  staffPhone?: string
  staffIdcard?: string
  staffStatus?: string
  page?: number
  size?: number
}

export interface Staff {
  staffId: number
  staffName: string
  staffNick: string
  staffAccount: string
  staffPhone: string
  staffIdcard: string
  staffAddr: string
  staffBirthday: string
  staffHiredate: string
  staffSex: number
  staffStatus: string
  staffSerial: number
  staffIntro: string
  staffProfilePicture: string
  staffIntroPicture: string
  createId: number
  createName: string
  createTime: string
  updateId: number
  updateName: string
  updateTime: string
}

export interface StaffListResponse {
  data: Staff[]
  page: number
  size: number
  total: number
}

export async function staffList(params: StaffListParams = {}): Promise<StaffListResponse> {
  try {
    // Filter staff based on query parameters
    let filteredStaffs = [...mockStaffs];
    
    if (params.staffName) {
      filteredStaffs = filteredStaffs.filter(staff => 
        staff.staffName.includes(params.staffName!)
      );
    }
    
    if (params.staffPhone) {
      filteredStaffs = filteredStaffs.filter(staff => 
        staff.staffPhone.includes(params.staffPhone!)
      );
    }
    
    if (params.staffIdcard) {
      filteredStaffs = filteredStaffs.filter(staff => 
        staff.staffIdcard.includes(params.staffIdcard!)
      );
    }
    
    if (params.staffStatus) {
      filteredStaffs = filteredStaffs.filter(staff => 
        staff.staffStatus === params.staffStatus
      );
    }
    
    // Pagination
    const page = params.page || 1;
    const size = params.size || 10;
    const start = (page - 1) * size;
    const paginatedItems = filteredStaffs.slice(start, start + size);
    
    return {
      data: paginatedItems,
      page,
      size,
      total: filteredStaffs.length,
    };
  } catch (error) {
    console.error("获取员工列表失败:", error);
    return {
      data: [],
      page: params.page || 1,
      size: params.size || 10,
      total: 0,
    };
  }
}

export async function deleteStaff(id: number): Promise<boolean> {
  try {
    const initialLength = mockStaffs.length;
    mockStaffs = mockStaffs.filter(staff => staff.staffId !== id);
    
    if (mockStaffs.length === initialLength) {
      console.error(`删除失败: 未找到ID为 ${id} 的员工`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("删除员工失败:", error);
    return false;
  }
}

export async function getStaff(id: string): Promise<Staff | undefined> {
  try {
    const staff = mockStaffs.find(staff => staff.staffId === Number(id));
    
    if (!staff) {
      console.error(`未找到ID为 ${id} 的员工`);
      return undefined;
    }
    
    return { ...staff };
  } catch (error) {
    console.error("获取员工详情失败:", error);
    return undefined;
  }
}

export async function updateStaff(data: Staff): Promise<boolean> {
  try {
    const index = mockStaffs.findIndex(staff => staff.staffId === data.staffId);
    
    if (index === -1) {
      console.error(`更新失败: 未找到ID为 ${data.staffId} 的员工`);
      return false;
    }
    
    const updatedStaff = {
      ...mockStaffs[index],
      ...data,
      updateTime: new Date().toISOString(),
      updateId: 1, // In a real app, this would be the current user's ID
      updateName: '当前用户'
    };
    
    mockStaffs[index] = updatedStaff;
    return true;
  } catch (error) {
    console.error("更新员工信息失败:", error);
    return false;
  }
}
