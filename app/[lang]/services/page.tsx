import { Stethoscope, Users, Truck, HeadphonesIcon, Award, Shield } from 'lucide-react'
import { Locale } from '@/types'
import { getDictionary } from '@/lib/dictionaries'

export const metadata = {
  title: 'Services - Claritas',
  description: 'Nos services pour les professionnels de santé',
}

export default async function ServicesPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  const services = [
    {
      icon: Stethoscope,
      title: params.lang === 'fr' ? 'Équipements médicaux' : 'Medical Equipment',
      description: params.lang === 'fr'
        ? 'Large gamme d\'équipements ORL, chirurgie plastique et neurochirurgie certifiés CE'
        : 'Wide range of ENT, plastic surgery and neurosurgery equipment certified CE'
    },
    {
      icon: Users,
      title: params.lang === 'fr' ? 'Formation et accompagnement' : 'Training and Support',
      description: params.lang === 'fr'
        ? 'Formation technique sur site et accompagnement personnalisé pour vos équipes'
        : 'On-site technical training and personalized support for your teams'
    },
    {
      icon: Truck,
      title: params.lang === 'fr' ? 'Livraison rapide' : 'Fast Delivery',
      description: params.lang === 'fr'
        ? 'Livraison express sous 48h partout en France et en Europe'
        : 'Express delivery within 48 hours throughout France and Europe'
    },
    {
      icon: HeadphonesIcon,
      title: params.lang === 'fr' ? 'Support technique 24/7' : '24/7 Technical Support',
      description: params.lang === 'fr'
        ? 'Assistance technique disponible 7j/7 pour répondre à vos urgences'
        : 'Technical assistance available 7 days a week to respond to your emergencies'
    },
    {
      icon: Award,
      title: params.lang === 'fr' ? 'Garantie étendue' : 'Extended Warranty',
      description: params.lang === 'fr'
        ? 'Garantie constructeur étendue et service après-vente réactif'
        : 'Extended manufacturer warranty and responsive after-sales service'
    },
    {
      icon: Shield,
      title: params.lang === 'fr' ? 'Maintenance préventive' : 'Preventive Maintenance',
      description: params.lang === 'fr'
        ? 'Contrats de maintenance préventive pour assurer la longévité de vos équipements'
        : 'Preventive maintenance contracts to ensure the longevity of your equipment'
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="section-title">{dict.services.title}</h1>
          <p className="section-subtitle">{dict.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="card p-8">
              <div className="w-16 h-16 bg-claritas-orange bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-claritas-orange" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {params.lang === 'fr' ? 'Besoin d\'un service personnalisé ?' : 'Need a personalized service?'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {params.lang === 'fr'
              ? 'Contactez notre équipe pour discuter de vos besoins spécifiques et obtenir une solution sur mesure.'
              : 'Contact our team to discuss your specific needs and get a tailor-made solution.'}
          </p>
          <a href={`/${params.lang}/contact`} className="btn-primary">
            {dict.common.contactUs}
          </a>
        </div>
      </div>
    </div>
  )
}
