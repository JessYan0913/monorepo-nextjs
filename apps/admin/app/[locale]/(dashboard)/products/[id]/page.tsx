import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getProduct } from "@/lib/actions/product"
import { ProductInfo } from "@/components/products/product-info"

export default async function ProductEditPage({ params, searchParams }: {
  params: { id: string };
  searchParams: {
    tab?: string
  }
}) {
  const { id } = params

  const tab = searchParams.tab ?? "info"

  const product = await getProduct(id)  
  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6 transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <Link 
          href="/products" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>

      <ProductInfo product={product || undefined} />
    </div>
  )
}