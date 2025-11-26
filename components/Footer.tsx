import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Locale } from '@/types'

interface FooterProps {
  lang: Locale
  dict: any
}

export default function Footer({ lang, dict }: FooterProps) {
  const navigation = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.products, href: `/${lang}/produits` },
    { name: dict.nav.services, href: `/${lang}/services` },
    { name: dict.nav.about, href: `/${lang}/a-propos` },
    { name: dict.nav.blog, href: `/${lang}/blog` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-claritas-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">Claritas</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {dict.footer.description}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-gray-800 hover:bg-claritas-orange rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dict.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-claritas-orange transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dict.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-claritas-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 Rue Médicale<br />75001 Paris, France
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-claritas-orange flex-shrink-0" />
                <a href="tel:+33123456789" className="text-gray-400 hover:text-claritas-orange transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-claritas-orange flex-shrink-0" />
                <a href="mailto:contact@claritas.com" className="text-gray-400 hover:text-claritas-orange transition-colors">
                  contact@claritas.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dict.footer.followUs}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {lang === 'fr' 
                ? 'Suivez-nous sur les réseaux sociaux pour rester informé de nos dernières actualités.' 
                : 'Follow us on social media to stay informed of our latest news.'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
