import { Target, Eye, Heart, Users } from 'lucide-react'
import { Locale } from '@/types'
import { getDictionary } from '@/lib/dictionaries'

export const metadata = {
  title: 'À propos - Claritas',
  description: 'Découvrez l\'histoire et les valeurs de Claritas',
}

export default async function AboutPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  const values = [
    {
      icon: Target,
      title: params.lang === 'fr' ? 'Excellence' : 'Excellence',
      description: params.lang === 'fr'
        ? 'Nous sélectionnons uniquement les meilleurs équipements médicaux pour nos clients'
        : 'We select only the best medical equipment for our clients'
    },
    {
      icon: Eye,
      title: params.lang === 'fr' ? 'Innovation' : 'Innovation',
      description: params.lang === 'fr'
        ? 'Nous suivons les dernières avancées technologiques du secteur médical'
        : 'We follow the latest technological advances in the medical sector'
    },
    {
      icon: Heart,
      title: params.lang === 'fr' ? 'Engagement' : 'Commitment',
      description: params.lang === 'fr'
        ? 'Nous nous engageons à fournir un service client irréprochable'
        : 'We are committed to providing impeccable customer service'
    },
    {
      icon: Users,
      title: params.lang === 'fr' ? 'Partenariat' : 'Partnership',
      description: params.lang === 'fr'
        ? 'Nous construisons des relations durables avec nos clients'
        : 'We build lasting relationships with our clients'
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="section-title">{dict.about.title}</h1>
          <p className="section-subtitle">{dict.about.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {params.lang === 'fr'
                ? 'Depuis plus de 20 ans, Claritas est le partenaire de confiance des professionnels de santé en France et en Europe. Spécialisée dans la fourniture d\'équipements médicaux ORL, de chirurgie plastique et de neurochirurgie, notre entreprise s\'est bâtie une réputation d\'excellence et de fiabilité.'
                : 'For over 20 years, Claritas has been the trusted partner of healthcare professionals in France and Europe. Specializing in the supply of ENT, plastic surgery and neurosurgery medical equipment, our company has built a reputation for excellence and reliability.'}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {params.lang === 'fr'
                ? 'Notre mission est simple : fournir aux professionnels de santé les meilleurs équipements médicaux, accompagnés d\'un service client exceptionnel. Nous travaillons en étroite collaboration avec les plus grands fabricants mondiaux pour vous garantir des produits de la plus haute qualité, certifiés CE et conformes aux normes européennes les plus strictes.'
                : 'Our mission is simple: to provide healthcare professionals with the best medical equipment, accompanied by exceptional customer service. We work closely with the world\'s leading manufacturers to guarantee you the highest quality products, CE certified and compliant with the strictest European standards.'}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {params.lang === 'fr'
                ? 'Chez Claritas, nous ne vendons pas seulement des équipements, nous construisons des partenariats durables. Notre équipe d\'experts est à votre disposition pour vous conseiller, vous former et vous accompagner tout au long de la vie de vos équipements.'
                : 'At Claritas, we don\'t just sell equipment, we build lasting partnerships. Our team of experts is at your disposal to advise you, train you and support you throughout the life of your equipment.'}
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {params.lang === 'fr' ? 'Nos Valeurs' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-claritas-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-claritas-orange" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-claritas-orange rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {params.lang === 'fr' ? 'Rejoignez nos clients satisfaits' : 'Join our satisfied customers'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {params.lang === 'fr'
              ? 'Plus de 500 établissements de santé nous font confiance'
              : 'Over 500 healthcare facilities trust us'}
          </p>
          <a href={`/${params.lang}/contact`} className="inline-block bg-white text-claritas-orange font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            {dict.common.contactUs}
          </a>
        </div>
      </div>
    </div>
  )
}
