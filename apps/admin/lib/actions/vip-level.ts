"use server"

// Define the VipLevel type for the API
export interface VipLevel {
  id: number;
  level: number;  // Level number (ordered from low to high)
  consumptionAmount: number;  // Cumulative consumption amount required for this level
  discountPercentage: number;  // Discount percentage for this level (e.g., 95 means 95% of original price, or 5% discount)
  benefitsDescription?: string;  // Description of benefits for this VIP level
  createTime?: string;
  updateTime?: string;
}

// Mock data for VIP levels
let mockVipLevels: VipLevel[] = [
  {
    id: 1,
    level: 1,
    consumptionAmount: 0,
    discountPercentage: 100,
    benefitsDescription: "普通会员，享受基础服务",
    createTime: "2023-01-01T00:00:00Z",
    updateTime: "2023-01-01T00:00:00Z"
  },
  {
    id: 2,
    level: 2,
    consumptionAmount: 1000,
    discountPercentage: 98,
    benefitsDescription: "白银会员，享受98折优惠",
    createTime: "2023-01-01T00:00:00Z",
    updateTime: "2023-01-01T00:00:00Z"
  },
  {
    id: 3,
    level: 3,
    consumptionAmount: 5000,
    discountPercentage: 95,
    benefitsDescription: "黄金会员，享受95折优惠",
    createTime: "2023-01-01T00:00:00Z",
    updateTime: "2023-01-01T00:00:00Z"
  },
  {
    id: 4,
    level: 4,
    consumptionAmount: 10000,
    discountPercentage: 90,
    benefitsDescription: "铂金会员，享受9折优惠，专属客服",
    createTime: "2023-01-01T00:00:00Z",
    updateTime: "2023-01-01T00:00:00Z"
  },
  {
    id: 5,
    level: 5,
    consumptionAmount: 50000,
    discountPercentage: 85,
    benefitsDescription: "钻石会员，享受85折优惠，专属客服，优先服务",
    createTime: "2023-01-01T00:00:00Z",
    updateTime: "2023-01-01T00:00:00Z"
  }
];

// Generate a new ID for creating VIP levels
function generateNewId(): number {
  return Math.max(0, ...mockVipLevels.map(level => level.id)) + 1;
}

/**
 * Fetch VIP level list
 */
export async function vipLevelList(): Promise<VipLevel[]> {
  try {
    // Return a copy of the mock data sorted by level
    return [...mockVipLevels].sort((a, b) => a.level - b.level);
  } catch (error) {
    console.error('获取VIP等级列表失败:', error);
    return [];
  }
}

/**
 * Create a new VIP level
 * This will only allow adding a level higher than existing ones
 */
export async function createVipLevel(vipLevelData: Omit<VipLevel, 'id' | 'createTime' | 'updateTime'>): Promise<VipLevel> {
  try {
    // Check if level already exists
    const levelExists = mockVipLevels.some(level => level.level === vipLevelData.level);
    if (levelExists) {
      throw new Error(`VIP等级 ${vipLevelData.level} 已存在`);
    }
    
    // Check if consumption amount is higher than previous levels
    const highestLevel = Math.max(...mockVipLevels.map(level => level.consumptionAmount));
    if (vipLevelData.consumptionAmount <= highestLevel) {
      throw new Error('新增VIP等级的消费金额必须高于现有最高等级');
    }
    
    const now = new Date().toISOString();
    const newVipLevel: VipLevel = {
      ...vipLevelData,
      id: generateNewId(),
      createTime: now,
      updateTime: now
    };
    
    mockVipLevels.push(newVipLevel);
    return newVipLevel;
  } catch (error) {
    console.error('创建VIP等级失败:', error);
    throw error;
  }
}

/**
 * Update an existing VIP level
 */
export async function updateVipLevel(vipLevelData: Omit<VipLevel, 'createTime' | 'updateTime'>): Promise<VipLevel> {
  try {
    const index = mockVipLevels.findIndex(level => level.id === vipLevelData.id);
    
    if (index === -1) {
      throw new Error(`未找到ID为 ${vipLevelData.id} 的VIP等级`);
    }
    
    // Check if level is being changed to an existing level
    if (vipLevelData.level !== mockVipLevels[index].level) {
      const levelExists = mockVipLevels.some(level => 
        level.level === vipLevelData.level && level.id !== vipLevelData.id
      );
      
      if (levelExists) {
        throw new Error(`VIP等级 ${vipLevelData.level} 已存在`);
      }
    }
    
    // Check if consumption amount is valid
    const lowerLevels = mockVipLevels.filter(level => 
      level.level < mockVipLevels[index].level
    );
    const higherLevels = mockVipLevels.filter(level => 
      level.level > mockVipLevels[index].level
    );
    
    const minAmount = lowerLevels.length > 0 
      ? Math.max(...lowerLevels.map(level => level.consumptionAmount))
      : 0;
      
    const maxAmount = higherLevels.length > 0
      ? Math.min(...higherLevels.map(level => level.consumptionAmount))
      : Infinity;
    
    if (vipLevelData.consumptionAmount <= minAmount || vipLevelData.consumptionAmount >= maxAmount) {
      throw new Error(`消费金额必须在 ${minAmount} 和 ${maxAmount} 之间`);
    }
    
    const now = new Date().toISOString();
    const updatedVipLevel: VipLevel = {
      ...mockVipLevels[index],
      ...vipLevelData,
      updateTime: now
    };
    
    mockVipLevels[index] = updatedVipLevel;
    return updatedVipLevel;
  } catch (error) {
    console.error(`更新VIP等级 ${vipLevelData.id} 失败:`, error);
    throw error;
  }
}

/**
 * Delete a VIP level by ID
 * This will only allow deleting the highest level
 */
export async function deleteVipLevel(id: number): Promise<{ success: boolean; message: string }> {
  try {
    const index = mockVipLevels.findIndex(level => level.id === id);
    
    if (index === -1) {
      return { success: false, message: `未找到ID为 ${id} 的VIP等级` };
    }
    
    // Check if it's the highest level
    const highestLevel = Math.max(...mockVipLevels.map(level => level.level));
    if (mockVipLevels[index].level !== highestLevel) {
      return { 
        success: false, 
        message: '只能删除最高级别的VIP等级' 
      };
    }
    
    // Remove the level
    mockVipLevels = mockVipLevels.filter(level => level.id !== id);
    
    return { 
      success: true, 
      message: '删除成功' 
    };
  } catch (error) {
    console.error(`删除VIP等级 ${id} 失败:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '删除VIP等级时发生未知错误' 
    };
  }
}
