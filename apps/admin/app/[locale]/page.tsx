import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">欢迎使用管理系统</h1>
      <div className="space-y-4 w-full max-w-md">
        <Link 
          href="/login" 
          className="block w-full px-6 py-3 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-colors duration-200 font-medium"
        >
          登录系统
        </Link>
        <Link 
          href="/offline-system" 
          className="block w-full px-6 py-3 text-center text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-colors duration-200 font-medium"
        >
          线下系统
        </Link>
        <Link 
          href="/online-system" 
          className="block w-full px-6 py-3 text-center text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-colors duration-200 font-medium"
        >
          线上系统
        </Link>
      </div>
    </div>
  );
}
