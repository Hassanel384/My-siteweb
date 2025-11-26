import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Locale } from '@/types'
import { getDictionary } from '@/lib/dictionaries'
import { getPost, getRelatedPosts, calculateReadingTime } from '@/lib/wordpress'
import BlogCard from '@/components/BlogCard'

export default async function BlogPostPage({ 
  params 
}: { 
  params: { lang: Locale; slug: string }
}) {
  const dict = await getDictionary(params.lang)
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{dict.blog.noArticles}</h1>
      </div>
    )
  }

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-blog.jpg'
  const imageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered
  const readingTime = calculateReadingTime(post.content.rendered)
  const date = new Date(post.date).toLocaleDateString(params.lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const relatedPosts = await getRelatedPosts(post.id, post.categories, 3)

  return (
    <div className="py-16 bg-white">
      <div className="container-custom max-w-4xl">
        <Link 
          href={`/${params.lang}/blog`}
          className="inline-flex items-center space-x-2 text-claritas-orange hover:text-claritas-orange-dark mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{params.lang === 'fr' ? 'Retour au blog' : 'Back to blog'}</span>
        </Link>

        <article>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg mb-8">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <span className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{date}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{readingTime} {dict.blog.readingTime}</span>
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {post.title.rendered}
          </h1>

          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {dict.blog.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} lang={params.lang} dict={dict} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
