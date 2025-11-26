import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Locale } from '@/types'
import { getDictionary } from '@/lib/dictionaries'
import ContactForm from '@/components/ContactForm'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata = {
  title: 'Contact - Claritas',
  description: 'Contactez-nous pour toute demande d\'information',
}

export default async function ContactPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">{dict.contact.title}</h1>
          <p className="section-subtitle">{dict.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {params.lang === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
            </h2>
            <ContactForm lang={params.lang} dict={dict} />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {dict.contact.info.address}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-claritas-orange flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium">Claritas Medical</p>
                    <p className="text-gray-600">123 Rue Médicale</p>
                    <p className="text-gray-600">75001 Paris, France</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-claritas-orange flex-shrink-0" />
                  <a href="tel:+33123456789" className="text-gray-900 hover:text-claritas-orange">
                    +33 1 23 45 67 89
                  </a>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-claritas-orange flex-shrink-0" />
                  <a href="mailto:contact@claritas.com" className="text-gray-900 hover:text-claritas-orange">
                    contact@claritas.com
                  </a>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-claritas-orange flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium">{dict.contact.info.hours}</p>
                    <p className="text-gray-600">
                      {params.lang === 'fr' ? 'Lun - Ven: 9h - 18h' : 'Mon - Fri: 9am - 6pm'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-claritas-orange rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                {dict.home.newsletter.title}
              </h2>
              <p className="mb-6 opacity-90">
                {dict.home.newsletter.subtitle}
              </p>
              <NewsletterForm lang={params.lang} dict={dict} />
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 h-96 bg-gray-300 rounded-xl overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <p>{params.lang === 'fr' ? 'Carte Google Maps' : 'Google Maps'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
