'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Search, Loader2 } from 'lucide-react'
import { Locale, Product, Post } from '@/types'

interface SearchModalProps {
  lang: Locale
  dict: any
  onClose: () => void
}

export default function SearchModal({ lang, dict, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ products: Product[], posts: Post[] }>({ products: [], posts: [] })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleSearch = async () => {
      if (query.length < 2) {
        setResults({ products: [], posts: [] })
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex items-center space-x-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.common.search}
            className="flex-1 outline-none text-lg"
            autoFocus
          />
          {isLoading && <Loader2 className="w-5 h-5 text-claritas-orange animate-spin" />}
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-4">
          {query.length < 2 ? (
            <p className="text-gray-500 text-center py-8">
              {lang === 'fr' ? 'Tapez au moins 2 caractères pour rechercher' : 'Type at least 2 characters to search'}
            </p>
          ) : (
            <>
              {results.products.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{dict.nav.products}</h3>
                  <div className="space-y-2">
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/${lang}/produits/${product.slug}`}
                        onClick={onClose}
                        className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <h4 className="font-medium text-gray-900">{product.title.rendered}</h4>
                        <p className="text-sm text-gray-600 line-clamp-1" dangerouslySetInnerHTML={{ __html: product.excerpt.rendered }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.posts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">{dict.nav.blog}</h3>
                  <div className="space-y-2">
                    {results.posts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/${lang}/blog/${post.slug}`}
                        onClick={onClose}
                        className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <h4 className="font-medium text-gray-900">{post.title.rendered}</h4>
                        <p className="text-sm text-gray-600 line-clamp-1" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.products.length === 0 && results.posts.length === 0 && !isLoading && (
                <p className="text-gray-500 text-center py-8">
                  {lang === 'fr' ? 'Aucun résultat trouvé' : 'No results found'}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
