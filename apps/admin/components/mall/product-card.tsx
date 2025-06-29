"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { Button } from "@repo/ui/components/ui/button"
import { BookOpen, Clock, ShoppingCart, Star } from "lucide-react"
import { Product } from "./cart"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter()
  
  // 跳转到商品详情页
  const goToDetail = () => {
    router.push(`/mall/detail?id=${product.id}`)
  }
  
  // 阻止事件冒泡，防止点击按钮时触发卡片点击事件
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <Card 
      key={product.id} 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer" 
      onClick={goToDetail}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {/* 图片可能不存在，使用占位图 */}
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <BookOpen className="h-12 w-12 opacity-20" />
        </div>
        {product.popular && (
          <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">
            热门
          </Badge>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg">{product.title}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2 h-10">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {product.duration && (
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {product.duration}
            </div>
          )}
          {product.lessons && (
            <div className="flex items-center">
              <BookOpen className="mr-1 h-4 w-4" />
              {product.lessons}课时
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div>
          <div className="text-lg font-bold">
            {product.price === 0 ? "免费" : `¥${product.price.toFixed(2)}`}
          </div>
          {product.originalPrice && (
            <div className="text-sm line-through text-muted-foreground">
              ¥{product.originalPrice.toFixed(2)}
            </div>
          )}
        </div>
        <Button 
          size="sm" 
          onClick={(e) => {
            handleButtonClick(e)
            onAddToCart(product)
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          加入购物车
        </Button>
      </CardFooter>
    </Card>
  )
}
