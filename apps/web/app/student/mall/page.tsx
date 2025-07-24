'use client';

import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Course {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  tag?: string;
}

interface CartItem {
  courseId: number;
  title: string;
  price: number;
  quantity: number;
}

const MallPage = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('课程单价');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: '课程单价', name: '课程单价', color: 'bg-orange-100 text-orange-600' },
    { id: '基础课包', name: '基础课包', color: 'bg-blue-100 text-blue-600' },
    { id: '专业测评', name: '专业测评', color: 'bg-green-100 text-green-600' },
    { id: '甄享专享', name: '甄享专享', color: 'bg-purple-100 text-purple-600' },
    { id: '体验专用', name: '体验专用', color: 'bg-pink-100 text-pink-600' }
  ];

  const courses: Course[] = [
    {
      id: 1,
      title: '体适能团体课包',
      price: 4800,
      originalPrice: 5200,
      image: '/api/placeholder/200/150',
      description: '专业体适能训练，提升身体素质',
      tag: '热门'
    },
    {
      id: 2,
      title: '儿童运动启蒙课程',
      price: 3600,
      image: '/api/placeholder/200/150',
      description: '培养孩子运动兴趣，建立运动基础',
      tag: '推荐'
    },
    {
      id: 3,
      title: '青少年体能训练',
      price: 4200,
      originalPrice: 4800,
      image: '/api/placeholder/200/150',
      description: '针对青少年身体发育特点的专业训练'
    },
    {
      id: 4,
      title: '亲子运动课程',
      price: 3800,
      image: '/api/placeholder/200/150',
      description: '增进亲子关系，共同享受运动乐趣'
    },
    {
      id: 5,
      title: '专业体测评估',
      price: 800,
      image: '/api/placeholder/200/150',
      description: '全面评估身体素质，制定个性化方案'
    },
    {
      id: 6,
      title: '运动康复课程',
      price: 5200,
      image: '/api/placeholder/200/150',
      description: '专业康复指导，安全有效恢复'
    }
  ];

  const addToCart = (course: Course) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.courseId === course.id);
      if (existingItem) {
        return prev.map(item => 
          item.courseId === course.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          courseId: course.id,
          title: course.title,
          price: course.price,
          quantity: 1
        }];
      }
    });
  };

  const updateQuantity = (courseId: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.courseId === courseId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部分类导航 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? category.color + ' shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 课程网格 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {/* 课程图片 */}
              <div className="relative h-40 bg-gradient-to-br from-blue-400 via-purple-400 to-green-400">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="w-12 h-10 bg-white/40 rounded flex items-center justify-center">
                      <span className="text-white text-2xl">📚</span>
                    </div>
                  </div>
                </div>
                {course.tag && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {course.tag}
                  </div>
                )}
              </div>

              {/* 课程信息 */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                {/* 价格信息 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-500">
                      ¥{course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ¥{course.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between">
                  {cartItems.find(item => item.courseId === course.id) ? (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(course.id, -1)}
                        className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-medium text-gray-900">
                        {cartItems.find(item => item.courseId === course.id)?.quantity || 0}
                      </span>
                      <button
                        onClick={() => updateQuantity(course.id, 1)}
                        className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(course)}
                      className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-md active:scale-95"
                    >
                      加入购物车
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 购物车浮动按钮 */}
      {getCartItemCount() > 0 && (
        <div className="fixed bottom-6 right-6 z-20">
          <button 
            onClick={() => setShowCart(!showCart)}
            className="relative bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-lg">
              {getCartItemCount()}
            </span>
          </button>
        </div>
      )}

      {/* 购物车侧边栏 */}
      {showCart && (
        <div className="fixed inset-0 z-30">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">购物车</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.courseId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-orange-500 font-bold">¥{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.courseId, -1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.courseId, 1)}
                        className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">总计:</span>
                  <span className="text-2xl font-bold text-orange-500">¥{getTotalPrice()}</span>
                </div>
                <button 
                  onClick={() => {
                    setShowCart(false);
                    router.push('/student/mall/order');
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors"
                >
                  立即结算
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MallPage;