import { Sidebar } from "@/components/sidebar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          {children}
        </div>
      </main>
    </div>
  )
}
