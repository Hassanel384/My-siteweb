import { Locale } from '@/types'
import { getDictionary } from '@/lib/dictionaries'
import { getProducts, getProductCategories } from '@/lib/wordpress'
import ProductCard from '@/components/ProductCard'
import { Filter } from 'lucide-react'

export const metadata = {
  title: 'Produits - Claritas',
  description: 'Découvrez notre gamme complète de matériel médical ORL',
}

export default async function ProduitsPage({ 
  params, 
  searchParams 
}: { 
  params: { lang: Locale }
  searchParams: { category?: string }
}) {
  const dict = await getDictionary(params.lang)
  const categories = await getProductCategories()
  const products = await getProducts(searchParams.category)

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">{dict.products.title}</h1>
          <p className="section-subtitle">
            {params.lang === 'fr' 
              ? 'Équipements médicaux de haute qualité pour les professionnels de santé'
              : 'High-quality medical equipment for healthcare professionals'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span className="font-medium">{dict.products.filterByCategory}:</span>
          </div>
          <a
            href={`/${params.lang}/produits`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !searchParams.category
                ? 'bg-claritas-orange text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {dict.products.allCategories}
          </a>
          {categories.map((category) => (
            <a
              key={category}
              href={`/${params.lang}/produits?category=${encodeURIComponent(category)}`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                searchParams.category === category
                  ? 'bg-claritas-orange text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </a>
          ))}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} lang={params.lang} dict={dict} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{dict.products.noProducts}</p>
          </div>
        )}
      </div>
    </div>
  )
}
