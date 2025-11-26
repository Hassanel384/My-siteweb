import Link from 'next/link'
import Image from 'next/image'
import { Post, Locale } from '@/types'
import { calculateReadingTime } from '@/lib/wordpress'
import { Calendar, Clock } from 'lucide-react'

interface BlogCardProps {
  post: Post
  lang: Locale
  dict: any
}

export default function BlogCard({ post, lang, dict }: BlogCardProps) {
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-blog.jpg'
  const imageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered
  const readingTime = calculateReadingTime(post.content.rendered)
  const date = new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Link href={`/${lang}/blog/${post.slug}`} className="card group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{readingTime} {dict.blog.readingTime}</span>
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-claritas-orange transition-colors">
          {post.title.rendered}
        </h3>
        <div 
          className="text-gray-600 text-sm line-clamp-3 mb-4"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <span className="text-claritas-orange font-medium hover:underline">
          {dict.common.readMore} →
        </span>
      </div>
    </Link>
  )
}
