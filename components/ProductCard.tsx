import Link from 'next/link'
import Image from 'next/image'
import { Product, Locale } from '@/types'

interface ProductCardProps {
  product: Product
  lang: Locale
  dict: any
}

export default function ProductCard({ product, lang, dict }: ProductCardProps) {
  const imageUrl = product._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-product.jpg'
  const imageAlt = product._embedded?.['wp:featuredmedia']?.[0]?.alt_text || product.title.rendered

  return (
    <Link href={`/${lang}/produits/${product.slug}`} className="card group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-claritas-orange transition-colors">
          {product.title.rendered}
        </h3>
        <div 
          className="text-gray-600 text-sm line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{ __html: product.excerpt.rendered }}
        />
        <span className="text-claritas-orange font-medium hover:underline">
          {dict.common.learnMore} →
        </span>
      </div>
    </Link>
  )
}
