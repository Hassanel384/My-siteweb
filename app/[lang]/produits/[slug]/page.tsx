import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import { Locale } from '@/types'
import { getDictionary } from '@/lib/dictionaries'
import { getProduct } from '@/lib/wordpress'
import DevisForm from '@/components/DevisForm'

export default async function ProductDetailPage({ 
  params 
}: { 
  params: { lang: Locale; slug: string }
}) {
  const dict = await getDictionary(params.lang)
  const product = await getProduct(params.slug)

  if (!product) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{dict.products.noProducts}</h1>
      </div>
    )
  }

  const imageUrl = product._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-product.jpg'
  const imageAlt = product._embedded?.['wp:featuredmedia']?.[0]?.alt_text || product.title.rendered

  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <Link 
          href={`/${params.lang}/produits`}
          className="inline-flex items-center space-x-2 text-claritas-orange hover:text-claritas-orange-dark mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{params.lang === 'fr' ? 'Retour aux produits' : 'Back to products'}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="relative h-96 lg:h-[600px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title.rendered}
            </h1>

            <div 
              className="prose max-w-none mb-8 text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.content.rendered }}
            />

            {product.acf?.technical_specs && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {dict.products.technicalSpecs}
                </h2>
                <div 
                  className="prose max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.acf.technical_specs }}
                />
              </div>
            )}

            {product.acf?.pdf_file && (
              <a
                href={product.acf.pdf_file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors mb-8"
              >
                <Download className="w-5 h-5" />
                <span>{dict.products.downloadPDF}</span>
              </a>
            )}

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {dict.products.requestQuote}
              </h3>
              <DevisForm 
                lang={params.lang} 
                dict={dict} 
                productName={product.title.rendered}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
