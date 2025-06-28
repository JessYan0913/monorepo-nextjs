"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

// 商品类型定义
export interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  tags: string[]
  rating: number
  duration?: string
  lessons?: number
  image: string
  popular?: boolean
}

// 购物车商品类型
export interface CartItem extends Product {
  quantity: number
}

interface CartProps {
  cartItems: CartItem[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export default function Cart({ cartItems, setCartItems }: CartProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 计算购物车总数量
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // 计算购物车总价
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // 从购物车中移除商品
  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };
  
  // 更新购物车商品数量
  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta); // 确保数量不小于1
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };
  
  // 支付状态
  const [isPaying, setIsPaying] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [paymentTimer, setPaymentTimer] = useState<NodeJS.Timeout | null>(null);

  // 开始支付流程
  const startPayment = () => {
    setShowPaymentDialog(true);
    setPaymentStatus('processing');
    setPaymentProgress(0);
    
    // 模拟支付进度
    const timer = setInterval(() => {
      setPaymentProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(timer);
          setPaymentStatus('success');
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    setPaymentTimer(timer);
  };
  
  // 关闭支付弹窗
  const closePaymentDialog = () => {
    if (paymentTimer) {
      clearInterval(paymentTimer);
      setPaymentTimer(null);
    }
    setShowPaymentDialog(false);
    setPaymentStatus('idle');
    setPaymentProgress(0);
  };
  
  // 结算购物车
  const checkout = () => {
    startPayment();
  };
  
  // 支付成功后的处理
  useEffect(() => {
    if (paymentStatus === 'success') {
      // 3秒后自动关闭弹窗并清空购物车
      const timer = setTimeout(() => {
        setCartItems([]);
        setIsCartOpen(false);
        closePaymentDialog();
        toast({
          title: "支付成功",
          description: `订单支付成功，总计 ¥${totalPrice.toFixed(2)}`,
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, totalPrice]);

  // 生成模拟的支付二维码URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `mchId=123456&orderId=${Date.now()}&amount=${totalPrice}&time=${Date.now()}`
  )}`;

  return (
    <>
      {/* 支付弹窗 */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              {paymentStatus === 'processing' ? '请使用微信扫码支付' : '支付成功'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            {paymentStatus === 'processing' ? (
              <>
                <div className="relative p-4 border rounded-lg mb-4">
                  <img 
                    src={qrCodeUrl} 
                    alt="支付二维码" 
                    className="w-48 h-48"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    {paymentProgress < 100 && (
                      <div className="text-lg font-medium">{Math.round(paymentProgress)}%</div>
                    )}
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>支付进度</span>
                    <span>{Math.round(paymentProgress)}%</span>
                  </div>
                  <Progress value={paymentProgress} className="h-2" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  请使用微信扫描二维码完成支付
                </p>
              </>
            ) : (
              <div className="py-8 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">支付成功！</h3>
                <p className="text-muted-foreground text-sm">订单处理中，即将返回商城...</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* 购物车抽屉 */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button size="lg" className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center fixed bottom-6 right-6 z-50">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.5rem] h-6 flex items-center justify-center rounded-full">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>购物车</SheetTitle>
          <SheetDescription>
            {cartItems.length > 0 
              ? `您的购物车中有 ${totalItems} 件商品`
              : "您的购物车是空的"}
          </SheetDescription>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
            <p className="text-muted-foreground">您的购物车是空的</p>
            <SheetClose asChild>
              <Button variant="outline" className="mt-4">
                继续购物
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1 mr-4">
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="text-sm text-muted-foreground mb-1">
                      {item.price === 0 ? "免费" : `¥${item.price.toFixed(2)}`}
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 min-w-[2rem] text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {item.price === 0 ? "免费" : `¥${(item.price * item.quantity).toFixed(2)}`}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between font-medium">
                <span>总计</span>
                <span>¥{totalPrice.toFixed(2)}</span>
              </div>
              
              <SheetFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                <SheetClose asChild>
                  <Button variant="outline">继续购物</Button>
                </SheetClose>
                <Button onClick={checkout}>结算</Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
    </>
  )
}
