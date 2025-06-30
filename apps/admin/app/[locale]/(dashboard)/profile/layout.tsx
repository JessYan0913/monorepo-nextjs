export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">个人中心</h1>
      
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}