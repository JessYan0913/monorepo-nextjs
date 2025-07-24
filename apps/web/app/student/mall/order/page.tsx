'use client';

import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  duration: string;
}

const OrderPage = () => {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('wechat');
  const [isProcessing, setIsProcessing] = useState(false);

  // 模拟订单数据（实际应该从路由参数或状态管理获取）
  const orderItems: OrderItem[] = [
    {
      id: 1,
      title: '体适能团体课包',
      price: 4800,
      quantity: 1,
      duration: '20课时'
    }
  ];

  const userInfo = {
    name: '陈小乐',
    phone: '13808298531',
    campus: '顺义校区'
  };

  const getTotalPrice = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalQuantity = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false);
      // 这里可以跳转到支付成功页面或返回商城
      alert('支付成功！');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">确认订单</h1>
        </div>
      </div>

      {/* 可滚动内容区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-24">
          {/* 用户信息卡片 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl font-semibold">
                    {userInfo.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{userInfo.name}</h3>
                <p className="text-gray-600">{userInfo.phone}</p>
                <p className="text-gray-500 text-sm">{userInfo.campus}</p>
              </div>
            </div>
          </div>

          {/* 商品信息卡片 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                {/* 商品图片 */}
                <div className="w-24 h-16 bg-gradient-to-br from-blue-400 via-purple-400 to-green-400 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  <div className="w-16 h-12 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
                    <div className="w-10 h-8 bg-white/40 rounded flex items-center justify-center">
                      <span className="text-white text-lg">📚</span>
                    </div>
                  </div>
                </div>

                {/* 商品信息 */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-500">
                      ¥{item.price}
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">购买：{item.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 订单汇总 */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-gray-900">
                  共{getTotalQuantity()}件，合计：
                </span>
                <span className="text-2xl font-bold text-orange-500">
                  ¥{getTotalPrice()}
                </span>
              </div>
            </div>
          </div>

          {/* 邀请码输入 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">请输入邀请码</h3>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="请输入邀请码"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* 支付方式选择 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">支付方式</h3>
            <div className="space-y-3">
              {/* 微信支付 */}
              <div 
                onClick={() => setSelectedPayment('wechat')}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">微</span>
                  </div>
                  <span className="font-medium text-gray-900">微信</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === 'wechat' 
                    ? 'border-orange-500 bg-orange-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedPayment === 'wechat' && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* 支付宝 */}
              <div 
                onClick={() => setSelectedPayment('alipay')}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">支</span>
                  </div>
                  <span className="font-medium text-gray-900">支付宝</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === 'alipay' 
                    ? 'border-orange-500 bg-orange-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedPayment === 'alipay' && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部支付按钮 - 不使用fixed，而是作为flex布局的一部分 */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 ${
              isProcessing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            {isProcessing ? '处理中...' : '立即支付'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;