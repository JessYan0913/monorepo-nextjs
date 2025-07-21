import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100/40 via-pink-100/40 to-yellow-100/40 relative overflow-hidden">
      {/* 背景装饰圆形 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-200/30 rounded-full"></div>
        <div className="absolute top-20 right-10 w-60 h-60 bg-orange-200/20 rounded-full"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200/25 rounded-full"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-8">
          {/* 统一背景边框容器 */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60">
            <div className="grid lg:grid-cols-2 items-center">
              
              {/* 左侧插画区域 */}
              <div className="relative">
                <Image src="/home-1.png" alt="插画" width={511} height={632} />
              </div>

              {/* 右侧内容区域 */}
              <div className="h-full p-2">
                {/* Logo区域 */}
                <div className="w-full flex justify-end">
                  <Image src="/home-2.png" alt="logo" width={100} height={86} />
                </div>

                {/* 欢迎文案 */}
                <div className="pt-[27px] text-[32px] p-4 text-orange-500">
                  <p className="font-bold leading-tight">
                    Hello，你好
                  </p>
                  <p className="text-[32px]">
                    欢迎使用博思优教学系统
                  </p>
                </div>

                {/* 身份选择按钮 */}
                <div className="space-y-6 p-4 grid grid-cols-2 gap-6 max-w-lg">
                  {/* 学生按钮 */}
                  <div className="group cursor-pointer">
                    <Link href="/student">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        <div className="flex flex-col items-center space-y-4">
                          <span className="font-bold text-lg text-gray-800">我是学生</span>
                          <Image src="/home-3.png" alt="学生" className="w-25 h-30" width={100} height={100} />
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* 老师按钮 */}
                  <div className="group cursor-pointer">
                    <Link href="/teacher">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        <div className="flex flex-col items-center space-y-4">
                          <span className="font-bold text-lg text-gray-800">我是老师</span>
                          <Image src="/home-4.png" alt="老师" className="w-30 h-30" width={100} height={100} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
