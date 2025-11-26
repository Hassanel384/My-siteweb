import { Locale } from '@/types'
import { getDictionary } from '@/lib/dictionaries'
import { getPosts } from '@/lib/wordpress'
import BlogCard from '@/components/BlogCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Blog - Claritas',
  description: 'Actualités et conseils sur le matériel médical ORL',
}

export default async function BlogPage({ 
  params,
  searchParams 
}: { 
  params: { lang: Locale }
  searchParams: { page?: string }
}) {
  const dict = await getDictionary(params.lang)
  const currentPage = parseInt(searchParams.page || '1')
  const { posts, totalPages } = await getPosts(currentPage, 9)

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">{dict.blog.title}</h1>
          <p className="section-subtitle">
            {params.lang === 'fr' 
              ? 'Actualités, conseils et tendances du secteur médical'
              : 'News, tips and trends in the medical sector'}
          </p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} lang={params.lang} dict={dict} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4">
                {currentPage > 1 && (
                  <a
                    href={`/${params.lang}/blog?page=${currentPage - 1}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>{dict.blog.pagination.previous}</span>
                  </a>
                )}

                <span className="text-gray-600">
                  {dict.blog.pagination.page} {currentPage} / {totalPages}
                </span>

                {currentPage < totalPages && (
                  <a
                    href={`/${params.lang}/blog?page=${currentPage + 1}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>{dict.blog.pagination.next}</span>
                    <ChevronRight className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{dict.blog.noArticles}</p>
          </div>
        )}
      </div>
    </div>
  )
}
