'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Globe } from 'lucide-react'
import { Locale } from '@/types'
import SearchModal from './SearchModal'

interface HeaderProps {
  lang: Locale
  dict: any
}

export default function Header({ lang, dict }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigation = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.products, href: `/${lang}/produits` },
    { name: dict.nav.services, href: `/${lang}/services` },
    { name: dict.nav.about, href: `/${lang}/a-propos` },
    { name: dict.nav.blog, href: `/${lang}/blog` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ]

  const toggleLanguage = () => {
    const newLang = lang === 'fr' ? 'en' : 'fr'
    window.location.href = window.location.pathname.replace(`/${lang}`, `/${newLang}`)
  }

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link href={`/${lang}`} className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-claritas-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Claritas</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-claritas-orange font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700 uppercase">
                  {lang === 'fr' ? 'EN' : 'FR'}
                </span>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-gray-700 hover:text-claritas-orange font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {isSearchOpen && (
        <SearchModal
          lang={lang}
          dict={dict}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  )
}
