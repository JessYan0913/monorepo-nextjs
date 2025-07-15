"use server"

export interface ProductListParams {
  name?: string
  type?: string
  page?: number
  size?: number
}

export interface Product {
  id: number
  name: string
  source: string
  type: string
  price: number
  validPeriod: number
  usageLimit: string
  salesChannel: string
  status: string
  count?: number
}

export interface ProductListResponse {
  data: Product[]
  page: number
  size: number
  total: number
}

// 模拟数据
const mockProducts: Product[] = [
  {
    id: 1,
    name: "无限时健享套餐",
    source: "博思优体全能成长空间",
    type: "课季专享",
    price: 42000.00,
    validPeriod: 0,
    usageLimit: "不限制",
    salesChannel: "实体店",
    status: "可用",
    count: 140
  },
  {
    id: 2,
    name: "篮球综合课程",
    source: "博思优体全能成长空间",
    type: "体验专用",
    price: 480.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "实体店",
    status: "可用",
    count: 1
  },
  {
    id: 3,
    name: "速攀课",
    source: "博思优体全能成长空间",
    type: "体验专用",
    price: 480.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "实体店",
    status: "可用",
    count: 1
  },
  {
    id: 4,
    name: "木工综合包",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 4800.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 10
  },
  {
    id: 5,
    name: "沙盘综合包",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 4800.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 10
  },
  {
    id: 6,
    name: "篮球综合课包",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 4800.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 10
  },
  {
    id: 7,
    name: "篮球品质（2.5-3岁）课包",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 4800.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 20
  },
  {
    id: 8,
    name: "体适能",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 5200.00,
    validPeriod: 356,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 20
  },
  {
    id: 9,
    name: "奥林匹克",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 5200.00,
    validPeriod: 356,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 20
  },
  {
    id: 10,
    name: "观剧绘本",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 5200.00,
    validPeriod: 356,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 20
  },
  {
    id: 11,
    name: "情商及领导力课程",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 5200.00,
    validPeriod: 356,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 10
  },
  {
    id: 12,
    name: "大型实训课包",
    source: "博思优体全能成长空间",
    type: "课季专享",
    price: 23325.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "实体店",
    status: "可用",
    count: 100
  },
  {
    id: 13,
    name: "体验试听",
    source: "博思优体全能成长空间",
    type: "体验专用",
    price: 0.00,
    validPeriod: 0,
    usageLimit: "不限制",
    salesChannel: "实体店",
    status: "可用",
    count: 10000
  },
  {
    id: 14,
    name: "体适能",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 2900.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "网店、实体店",
    status: "可用",
    count: 10
  },
  {
    id: 15,
    name: "运动智慧课包",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 1680.00,
    validPeriod: 180,
    usageLimit: "不限制",
    salesChannel: "实体店",
    status: "可用",
    count: 10
  },
  {
    id: 16,
    name: "体适能团体套餐",
    source: "博思优体全能成长空间",
    type: "基础课包",
    price: 1800.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "实体店",
    status: "可用",
    count: 10
  },
  {
    id: 17,
    name: "两两实训课包",
    source: "博思优体全能成长空间",
    type: "课季专享",
    price: 48000.00,
    validPeriod: 365,
    usageLimit: "不限制",
    salesChannel: "实体店",
    status: "可用",
    count: 520
  }
];

export async function productList(params: ProductListParams): Promise<ProductListResponse> {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 过滤数据
  let filteredData = [...mockProducts];
  
  if (params.name) {
    filteredData = filteredData.filter(product => 
      product.name.toLowerCase().includes(params.name!.toLowerCase())
    );
  }
  
  if (params.type) {
    filteredData = filteredData.filter(product => 
      product.type === params.type
    );
  }
  
  // 计算分页
  const page = params.page || 1;
  const size = params.size || 10;
  const total = filteredData.length;
  
  // 切片获取当前页数据
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    page,
    size,
    total
  };
}

export async function deleteProduct(id: number): Promise<boolean> {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 模拟删除操作
  console.log(`模拟删除商品，ID: ${id}`);
  
  // 返回成功
  return true;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 查找商品
  const product = mockProducts.find(p => p.id === Number(id));
  
  if (!product) {
    console.error(`未找到ID为 ${id} 的商品`);
    return undefined;
  }
  
  return product;
}

export async function updateProduct(data: Product): Promise<boolean> {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 模拟更新操作
  console.log(`模拟更新商品，ID: ${data.id}`, data);
  
  // 返回成功
  return true;
}

// 添加创建商品的函数
export async function createProduct(data: Omit<Product, "id">): Promise<boolean> {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 模拟创建操作
  const newId = mockProducts.length > 0 ? Math.max(...mockProducts.map(p => p.id)) + 1 : 1;
  console.log(`模拟创建商品，新ID: ${newId}`, data);
  
  // 返回成功
  return true;
}
