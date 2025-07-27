import Link from "next/link";
import { Play, Clock, User, ChevronRight } from "lucide-react";

interface CourseItem {
  id: string;
  title: string;
  image: string;
  duration?: string;
  teacher?: string;
  category?: string;
  description?: string;
  date?: string;
}

interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  teacher: string;
  date: string;
  image: string;
}

const experienceCourses: CourseItem[] = [
  {
    id: "1",
    title: "XXXXX协调性体验课",
    image: "/api/placeholder/240/160",
    duration: "30分钟"
  },
  {
    id: "2",
    title: "XXXXX协调性体验课",
    image: "/api/placeholder/240/160",
    duration: "25分钟"
  },
  {
    id: "3",
    title: "XXXXX协调性体验课",
    image: "/api/placeholder/240/160",
    duration: "35分钟"
  }
];

const myCourses: CourseItem[] = [
  {
    id: "1",
    title: "乐动智趣课包",
    image: "/api/placeholder/240/160",
    category: "乐动智趣"
  },
  {
    id: "2",
    title: "0-3岁如何建立孩子的专注力",
    image: "/api/placeholder/240/160",
    category: "体能活动"
  },
  {
    id: "3",
    title: "乐动智趣课包",
    image: "/api/placeholder/240/160",
    category: "乐动智趣"
  }
];

const homeworkList: HomeworkItem[] = [
  {
    id: "1",
    title: "根据训练动作完成一套体能测试",
    description: "要求：学员必须双手抓住红色圆圈，转动......",
    teacher: "李小明老师",
    date: "2025.05.07",
    image: "/api/placeholder/120/80"
  },
  {
    id: "2",
    title: "根据训练动作完成一套体能测试",
    description: "要求：学员必须双手抓住红色圆圈，转动......",
    teacher: "李小明老师",
    date: "2025.05.07",
    image: "/api/placeholder/120/80"
  }
];

const recommendedCourses: CourseItem[] = [
  {
    id: "1",
    title: "XXXXX协调性体验课",
    image: "/api/placeholder/240/160",
    duration: "30分钟"
  },
  {
    id: "2",
    title: "XXXXX协调性体验课",
    image: "/api/placeholder/240/160",
    duration: "25分钟"
  },
  {
    id: "3",
    title: "XXXXX协调性体验课",
    image: "/api/placeholder/240/160",
    duration: "35分钟"
  }
];



function CourseCard({ course, showCategory = false }: { course: CourseItem; showCategory?: boolean }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
        <button className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-orange-500 ml-1" fill="currentColor" />
          </div>
        </button>
        {course.duration && (
          <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-black/60 text-white text-xs md:text-sm px-2 py-1 rounded-md">
            <Clock className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
            {course.duration}
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mb-2">
          {course.title}
        </h3>
        {showCategory && course.category && (
          <div className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
            {course.category}
          </div>
        )}
      </div>
    </div>
  );
}

function HomeworkCard({ homework }: { homework: HomeworkItem }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-6">
      <div className="flex gap-3 md:gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-12 md:w-20 md:h-16 rounded-lg bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
            {homework.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {homework.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <User className="w-3 h-3 md:w-4 md:h-4" />
              <span>{homework.teacher}</span>
            </div>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {homework.date}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button className="px-3 py-1.5 md:px-4 md:py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm rounded-lg transition-colors">
            立即学习
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-auto">
      {/* 添加滚动容器 */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* 体验课程 */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <span className="text-orange-500 text-sm md:text-base font-bold">📚</span>
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                体验课程
              </h2>
            </div>
            <Link href="/student/learning/trial-course" className="flex items-center gap-1 text-sm md:text-base text-orange-500 hover:text-orange-600 transition-colors">
              更多
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {experienceCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* 我的课程 */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-blue-500 text-sm md:text-base font-bold">📖</span>
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                我的课程
              </h2>
            </div>
            <Link href="/student/learning/my-course" className="flex items-center gap-1 text-sm md:text-base text-orange-500 hover:text-orange-600 transition-colors">
              更多
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {myCourses.map((course) => (
              <CourseCard key={course.id} course={course} showCategory />
            ))}
          </div>
        </section>

        {/* 课后作业 */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-green-500 text-sm md:text-base font-bold">📝</span>
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                课后作业
              </h2>
            </div>
            <Link href="/student/learning/home-work" className="flex items-center gap-1 text-sm md:text-base text-orange-500 hover:text-orange-600 transition-colors">
              更多
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {homeworkList.map((homework) => (
              <HomeworkCard key={homework.id} homework={homework} />
            ))}
          </div>
        </section>

        {/* 推荐课程 */}
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-purple-500 text-sm md:text-base font-bold">⭐</span>
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                推荐课程
              </h2>
            </div>
            <Link href="/student/learning/recommended-videos" className="flex items-center gap-1 text-sm md:text-base text-orange-500 hover:text-orange-600 transition-colors">
              更多
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}