"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Card, CardContent } from "@repo/ui/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { BookOpen, Clock, ShoppingCart, Star, ArrowLeft, Tag } from "lucide-react"
import { toast } from "@repo/ui/components/ui/sonner"

// 导入商品类型和购物车组件
import Cart, { Product, CartItem as CartItemType } from "@/components/mall/cart"

// 从mall页面导入的商品数据 - 实际项目中应该从API获取
import { products } from "../page"

export default function ProductDetail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  
  const [product, setProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [loading, setLoading] = useState(true)
  
  // 获取商品数据
  useEffect(() => {
    // 模拟API请求
    setLoading(true)
    
    // 查找商品
    const foundProduct = products.find((p: Product) => p.id === productId)
    
    if (foundProduct) {
      setProduct(foundProduct)
    }
    
    setLoading(false)
  }, [productId])
  
  // 从localStorage获取购物车数据
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        // 转换购物车数据格式
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart)
        } else {
          // 如果是旧格式（对象格式），转换为数组格式
          const cartArray = Object.values(parsedCart).map((item: any) => ({
            ...item.product,
            quantity: item.quantity
          }))
          setCartItems(cartArray)
        }
      } catch (e) {
        console.error("Failed to parse cart data", e)
      }
    }
  }, [])
  
  // 添加商品到购物车
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      // 检查商品是否已在购物车中
      const existingItemIndex = prev.findIndex(item => item.id === product.id)
      let newCart: CartItemType[]
      
      if (existingItemIndex >= 0) {
        // 如果商品已存在，增加数量
        newCart = [...prev]
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        }
      } else {
        // 如果商品不存在，添加到购物车
        newCart = [
          ...prev,
          {
            ...product,
            quantity: 1
          }
        ]
      }
      
      // 保存到localStorage
      localStorage.setItem("cart", JSON.stringify(newCart))
      
      toast.success("已添加到购物车")
      
      return newCart
    })
  }
  
  // 返回商城页面
  const goBack = () => {
    router.push("/mall")
  }
  
  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">加载中...</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="container py-8">
        <Button variant="outline" onClick={goBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回商城
        </Button>
        
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">商品不存在</h2>
            <p className="text-muted-foreground mb-6">无法找到该商品，请返回商城浏览其他商品</p>
            <Button onClick={goBack}>返回商城</Button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-8">
      {/* 返回按钮 */}
      <Button variant="outline" onClick={goBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回商城
      </Button>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* 商品图片 */}
        <div className="relative h-[400px] overflow-hidden rounded-lg bg-muted">
          {/* 图片可能不存在，使用占位图 */}
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <BookOpen className="h-24 w-24 opacity-20" />
          </div>
          {product.popular && (
            <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">
              热门
            </Badge>
          )}
        </div>
        
        {/* 商品信息 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <Star className="h-5 w-5 fill-primary text-primary mr-1" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground ml-1">评分</span>
            </div>
            
            {product.duration && (
              <div className="flex items-center mr-4">
                <Clock className="h-5 w-5 mr-1" />
                <span>{product.duration}</span>
              </div>
            )}
            
            {product.lessons && (
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-1" />
                <span>{product.lessons} 课时</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{product.category}</Badge>
            {product.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="text-lg mb-6">
            {product.description}
          </div>
          
          <div className="flex items-end gap-4 mb-6">
            <div>
              <div className="text-3xl font-bold text-primary">
                {product.price === 0 ? "免费" : `¥${product.price.toFixed(2)}`}
              </div>
              {product.originalPrice && (
                <div className="text-muted-foreground line-through">
                  ¥{product.originalPrice.toFixed(2)}
                </div>
              )}
            </div>
            
            <Button size="lg" onClick={() => addToCart(product)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              加入购物车
            </Button>
          </div>
        </div>
      </div>
      
      {/* 商品详细信息标签页 */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">课程详情</TabsTrigger>
            <TabsTrigger value="curriculum">课程大纲</TabsTrigger>
            <TabsTrigger value="reviews">学员评价</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="p-6 border rounded-md">
            <h3 className="text-xl font-semibold mb-4">课程详情</h3>
            <p className="mb-4">{product.description}</p>
            <p>本课程适合{product.tags.join('、')}等方向的学习者，通过专业的教学内容和实践练习，帮助学员掌握核心技能。</p>
          </TabsContent>
          
          <TabsContent value="curriculum" className="p-6 border rounded-md">
            <h3 className="text-xl font-semibold mb-4">课程大纲</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(section => (
                <Card key={section}>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">第{section}章：{["基础入门", "核心概念", "实战应用", "高级技巧"][section-1]}</h4>
                    <p className="text-sm text-muted-foreground">
                      {section * 3} 课时 | 约 {section * 30} 分钟
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-6 border rounded-md">
            <h3 className="text-xl font-semibold mb-4">学员评价</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(review => (
                <div key={review} className="pb-4 border-b last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">学员{review}</div>
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    课程内容很充实，老师讲解清晰，学到了很多实用知识。
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* 购物车组件 */}
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  )
}
