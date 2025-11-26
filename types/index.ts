export type Locale = 'fr' | 'en'

export interface Product {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  acf?: {
    price?: string
    category?: string
    gallery?: number[]
    pdf_file?: string
    technical_specs?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface Post {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  featured_media: number
  categories: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
  }
}

export interface Category {
  id: number
  name: string
  slug: string
  count: number
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  lang: Locale
}

export interface DevisFormData {
  name: string
  email: string
  phone: string
  company?: string
  productName: string
  quantity: string
  message?: string
  lang: Locale
}

export interface NewsletterFormData {
  email: string
  lang: Locale
}
