import { Product, Post, Category } from '@/types'

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2'

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${WORDPRESS_API_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      console.warn(`WordPress API error: ${response.statusText} for ${url}`)
      return []
    }

    return response.json()
  } catch (error) {
    console.warn(`WordPress API fetch error for ${url}:`, error)
    return []
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  // Utiliser l'endpoint WooCommerce 'products' ou le custom post type 'produits'
  let endpoint = '/products?_embed&per_page=100'
  if (category) {
    endpoint += `&category=${category}`
  }
  
  // Fallback vers 'produits' si WooCommerce n'est pas disponible
  const products = await fetchAPI(endpoint)
  if (products.length === 0) {
    endpoint = '/produits?_embed&per_page=100'
    if (category) {
      endpoint += `&produit_categorie=${category}`
    }
    return fetchAPI(endpoint)
  }
  
  return products
}

export async function getProduct(slug: string): Promise<Product | null> {
  // Essayer d'abord avec WooCommerce products
  let products = await fetchAPI(`/products?slug=${slug}&_embed`)
  if (products.length === 0) {
    // Fallback vers custom post type produits
    products = await fetchAPI(`/produits?slug=${slug}&_embed`)
  }
  return products[0] || null
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const products = await getProducts()
  return products.slice(0, limit)
}

export async function getPosts(page = 1, perPage = 9): Promise<{ posts: Post[], total: number, totalPages: number }> {
  const endpoint = `/posts?_embed&page=${page}&per_page=${perPage}`
  
  try {
    const response = await fetch(`${WORDPRESS_API_URL}${endpoint}`, {
      next: { revalidate: 60 },
    })
    
    if (!response.ok) {
      return { posts: [], total: 0, totalPages: 0 }
    }
    
    const posts = await response.json()
    const total = parseInt(response.headers.get('X-WP-Total') || '0')
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0')
    
    return { posts, total, totalPages }
  } catch (error) {
    console.warn('Error fetching posts:', error)
    return { posts: [], total: 0, totalPages: 0 }
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await fetchAPI(`/posts?slug=${slug}&_embed`)
  return posts[0] || null
}

export async function getRelatedPosts(postId: number, categoryIds: number[], limit = 3): Promise<Post[]> {
  const posts = await fetchAPI(`/posts?_embed&per_page=${limit}&exclude=${postId}&categories=${categoryIds.join(',')}`)
  return posts
}

export async function getCategories(): Promise<Category[]> {
  return fetchAPI('/categories?per_page=100')
}

export async function getProductCategories(): Promise<string[]> {
  return [
    'ORL & Maxillo-Faciale',
    'Chirurgie Plastique',
    'Neurochirurgie',
  ]
}

export async function searchContent(query: string): Promise<{ products: Product[], posts: Post[] }> {
  // Rechercher dans WooCommerce products et posts
  let products = await fetchAPI(`/products?search=${encodeURIComponent(query)}&_embed`)
  
  // Fallback vers custom post type si aucun résultat
  if (products.length === 0) {
    products = await fetchAPI(`/produits?search=${encodeURIComponent(query)}&_embed`)
  }
  
  const posts = await fetchAPI(`/posts?search=${encodeURIComponent(query)}&_embed`)
  
  return { products, posts }
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const text = content.replace(/<[^>]*>/g, '')
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}
