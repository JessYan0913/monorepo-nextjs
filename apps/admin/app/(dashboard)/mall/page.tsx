"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Tag } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// 导入自定义组件
import Cart, { Product, CartItem as CartItemType } from "@/components/mall/cart"
import ProductCard from "@/components/mall/product-card"

// 模拟商品数据
export const products: Product[] = [
  // 基础包
  {
    id: "basic-1",
    title: "英语口语基础课程包",
    description: "适合零基础学员，包含40节基础口语训练课程",
    price: 1999,
    originalPrice: 2599,
    category: "基础包",
    tags: ["零基础", "口语", "实用对话"],
    rating: 4.7,
    duration: "3个月",
    lessons: 40,
    image: "/images/courses/english-basic.jpg",
    popular: true
  },
  {
    id: "basic-2",
    title: "数学思维启蒙课程",
    description: "培养孩子的数学思维和解题能力，适合小学1-3年级",
    price: 1599,
    originalPrice: 1899,
    category: "基础包",
    tags: ["数学", "思维训练", "小学"],
    rating: 4.5,
    duration: "2个月",
    lessons: 24,
    image: "/images/courses/math-basic.jpg"
  },
  {
    id: "basic-3",
    title: "少儿编程入门课程",
    description: "通过图形化编程培养逻辑思维，适合8-12岁儿童",
    price: 2199,
    originalPrice: 2499,
    category: "基础包",
    tags: ["编程", "Scratch", "逻辑思维"],
    rating: 4.8,
    duration: "3个月",
    lessons: 36,
    image: "/images/courses/coding-kids.jpg",
    popular: true
  },
  
  // 专业测评
  {
    id: "assessment-1",
    title: "英语能力全面测评",
    description: "专业评估听说读写能力，提供详细报告和学习建议",
    price: 399,
    category: "专业测评",
    tags: ["测评", "英语", "能力分析"],
    rating: 4.6,
    duration: "2小时",
    image: "/images/courses/english-assessment.jpg"
  },
  {
    id: "assessment-2",
    title: "学习能力诊断测评",
    description: "全面评估学习方法、习惯和能力，提供个性化学习方案",
    price: 499,
    originalPrice: 699,
    category: "专业测评",
    tags: ["学习能力", "诊断", "个性化"],
    rating: 4.9,
    duration: "3小时",
    image: "/images/courses/learning-assessment.jpg",
    popular: true
  },
  {
    id: "assessment-3",
    title: "学科能力综合测评",
    description: "评估数学、语文、英语等学科能力，找出薄弱环节",
    price: 599,
    category: "专业测评",
    tags: ["学科测评", "综合能力", "薄弱环节"],
    rating: 4.7,
    duration: "4小时",
    image: "/images/courses/subject-assessment.jpg"
  },
  
  // 甄享专享
  {
    id: "premium-1",
    title: "一对一定制课程",
    description: "根据学员需求量身定制课程内容和学习计划",
    price: 5999,
    category: "甄享专享",
    tags: ["一对一", "定制", "高端"],
    rating: 4.9,
    duration: "6个月",
    lessons: 48,
    image: "/images/courses/custom-course.jpg",
    popular: true
  },
  {
    id: "premium-2",
    title: "精英口才训练营",
    description: "提升演讲、辩论和沟通能力，塑造领导气质",
    price: 4599,
    originalPrice: 5299,
    category: "甄享专享",
    tags: ["口才", "演讲", "沟通"],
    rating: 4.8,
    duration: "3个月",
    lessons: 24,
    image: "/images/courses/speech-training.jpg"
  },
  {
    id: "premium-3",
    title: "高考冲刺特训班",
    description: "针对高考学科难点进行专项突破，提升考试成绩",
    price: 6999,
    category: "甄享专享",
    tags: ["高考", "冲刺", "提分"],
    rating: 4.7,
    duration: "4个月",
    lessons: 60,
    image: "/images/courses/exam-prep.jpg"
  },
  
  // 体验专用
  {
    id: "trial-1",
    title: "英语口语体验课",
    description: "免费体验外教一对一口语教学，了解课程特色",
    price: 0,
    category: "体验专用",
    tags: ["免费", "体验", "外教"],
    rating: 4.5,
    duration: "30分钟",
    lessons: 1,
    image: "/images/courses/english-trial.jpg"
  },
  {
    id: "trial-2",
    title: "数学思维体验课",
    description: "体验趣味数学教学，激发学习兴趣",
    price: 19.9,
    originalPrice: 99,
    category: "体验专用",
    tags: ["特惠", "体验", "数学"],
    rating: 4.6,
    duration: "45分钟",
    lessons: 1,
    image: "/images/courses/math-trial.jpg",
    popular: true
  },
  {
    id: "trial-3",
    title: "编程启蒙体验课",
    description: "通过简单有趣的项目，体验编程的乐趣",
    price: 29.9,
    originalPrice: 129,
    category: "体验专用",
    tags: ["特惠", "体验", "编程"],
    rating: 4.7,
    duration: "60分钟",
    lessons: 1,
    image: "/images/courses/coding-trial.jpg"
  }
];

// 获取所有分类
const categories = [...new Set(products.map(product => product.category))];

// 获取主要标签（每个分类取前2个常用标签）
const mainTags = [
  "测评", "学习能力", 
  "一对一", "高端", 
  "免费", "体验"
];

// 购物车商品类型
interface CartItem extends Product {
  quantity: number;
}

export default function MallPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  
  // 购物车状态
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  
  // 从 localStorage 加载购物车数据
  useEffect(() => {
    const savedCart = localStorage.getItem('mall-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data:', e);
      }
    }
  }, []);
  
  // 保存购物车数据到 localStorage
  useEffect(() => {
    localStorage.setItem('mall-cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // 根据搜索、分类和标签筛选商品
  const filteredProducts = products.filter(product => {
    // 搜索条件
    const matchesSearch = searchTerm === "" || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 分类条件
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    // 标签条件
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => product.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });
  
  // 排序商品
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
      default:
        // 流行商品排在前面，然后按评分排序
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return b.rating - a.rating;
    }
  });
  
  // 切换标签选择
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // 添加商品到购物车
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      // 检查商品是否已在购物车中
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // 如果已存在，增加数量
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // 如果不存在，添加新商品
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    
    // 显示提示，但不自动打开购物车
    toast({
      title: "已添加到购物车",
      description: `${product.title} 已添加到购物车`,
    });
  };
  
  // 使用单独的组件渲染商品卡片

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">课程商城</h1>
          <p className="text-muted-foreground">
            浏览我们精选的优质课程，提升您的学习体验
          </p>
        </div>
      </div>
      
      {/* 搜索和筛选 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索课程..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">按热门程度</SelectItem>
              <SelectItem value="rating">按评分</SelectItem>
              <SelectItem value="price-low">价格从低到高</SelectItem>
              <SelectItem value="price-high">价格从高到低</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* 标签筛选（精简版） */}
      <div className="flex flex-wrap gap-2">
        {mainTags.map(tag => (
          <Badge 
            key={tag} 
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
        {selectedTags.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedTags([])}
            className="text-xs"
          >
            清除筛选
          </Button>
        )}
      </div>
      
      {/* 分类标签页 */}
      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="rounded-full">
            全部课程
          </TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="rounded-full">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
          {sortedProducts.length === 0 && (
            <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center text-center">
                <Tag className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">未找到课程</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  没有找到符合条件的课程，请尝试调整筛选条件
                </p>
              </div>
            </div>
          )}
        </TabsContent>
        
        {/* 为每个分类创建内容区域 */}
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
            {sortedProducts.length === 0 && (
              <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center text-center">
                  <Tag className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">未找到课程</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    没有找到符合条件的课程，请尝试调整筛选条件
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* 移除了课程分类介绍模块 */}
      
      {/* 购物车组件 */}
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  )
}
