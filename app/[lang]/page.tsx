import Link from 'next/link'
import { ArrowRight, CheckCircle, Package, Truck, HeadphonesIcon } from 'lucide-react'
import { Locale } from '@/types'
import { getDictionary } from '@/lib/dictionaries'
import { getFeaturedProducts } from '@/lib/wordpress'
import ProductCard from '@/components/ProductCard'
import NewsletterForm from '@/components/NewsletterForm'

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)
  const featuredProducts = await getFeaturedProducts(6)

  const features = [
    {
      icon: Package,
      title: params.lang === 'fr' ? 'Produits de qualité' : 'Quality Products',
      description: params.lang === 'fr' 
        ? 'Équipements médicaux certifiés et conformes aux normes européennes'
        : 'Certified medical equipment compliant with European standards'
    },
    {
      icon: Truck,
      title: params.lang === 'fr' ? 'Livraison rapide' : 'Fast Delivery',
      description: params.lang === 'fr'
        ? 'Expédition sous 48h partout en France et en Europe'
        : '48h shipping throughout France and Europe'
    },
    {
      icon: HeadphonesIcon,
      title: params.lang === 'fr' ? 'Support expert' : 'Expert Support',
      description: params.lang === 'fr'
        ? 'Équipe technique disponible pour vous accompagner'
        : 'Technical team available to assist you'
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              {dict.home.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance">
              {dict.home.hero.subtitle}
            </p>
            <Link href={`/${params.lang}/produits`} className="btn-primary inline-flex items-center space-x-2">
              <span>{dict.home.hero.cta}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-claritas-orange opacity-5 rounded-l-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-claritas-orange bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-claritas-orange" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">{dict.home.featuredProducts}</h2>
            <p className="section-subtitle">
              {params.lang === 'fr' 
                ? 'Découvrez notre sélection de produits phares'
                : 'Discover our selection of flagship products'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} lang={params.lang} dict={dict} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${params.lang}/produits`} className="btn-secondary inline-flex items-center space-x-2">
              <span>{params.lang === 'fr' ? 'Voir tous les produits' : 'View all products'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">
              {params.lang === 'fr' ? 'Nos Catégories' : 'Our Categories'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['ORL & Maxillo-Faciale', 'Chirurgie Plastique', 'Neurochirurgie'].map((category, index) => (
              <Link
                key={index}
                href={`/${params.lang}/produits?category=${encodeURIComponent(category)}`}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-claritas-orange to-claritas-orange-dark opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="relative h-full flex items-center justify-center p-6">
                  <h3 className="text-2xl font-bold text-white text-center">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {params.lang === 'fr' ? 'Pourquoi choisir Claritas ?' : 'Why choose Claritas?'}
              </h2>
              <p className="text-gray-300 mb-8">
                {params.lang === 'fr'
                  ? 'Depuis plus de 20 ans, Claritas accompagne les professionnels de santé avec des équipements médicaux de haute qualité.'
                  : 'For over 20 years, Claritas has been supporting healthcare professionals with high-quality medical equipment.'}
              </p>
              <ul className="space-y-4">
                {[
                  params.lang === 'fr' ? 'Certification CE et ISO' : 'CE and ISO Certification',
                  params.lang === 'fr' ? 'Garantie constructeur étendue' : 'Extended manufacturer warranty',
                  params.lang === 'fr' ? 'Formation et support technique' : 'Training and technical support',
                  params.lang === 'fr' ? 'Stock permanent disponible' : 'Permanent stock available',
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-claritas-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-4 text-center">
                {dict.home.newsletter.title}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {dict.home.newsletter.subtitle}
              </p>
              <NewsletterForm lang={params.lang} dict={dict} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-claritas-orange">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {params.lang === 'fr' 
              ? 'Besoin d\'un devis personnalisé ?' 
              : 'Need a personalized quote?'}
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            {params.lang === 'fr'
              ? 'Notre équipe commerciale est à votre disposition pour étudier vos besoins et vous proposer une solution adaptée.'
              : 'Our sales team is at your disposal to study your needs and offer you a suitable solution.'}
          </p>
          <Link 
            href={`/${params.lang}/contact`} 
            className="inline-flex items-center space-x-2 bg-white text-claritas-orange font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span>{dict.common.contactUs}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
