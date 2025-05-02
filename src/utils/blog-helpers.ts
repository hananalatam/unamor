import type { CollectionEntry } from 'astro:content';

// Función para formatear fechas
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Función para calcular el tiempo de lectura
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Función para generar URL amigables para categorías y etiquetas
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Función para obtener posts destacados
export function getFeaturedPosts(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
  return posts
    .filter(post => post.data.featured && !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Función para obtener posts recientes
export function getRecentPosts(posts: CollectionEntry<'blog'>[], limit: number = 6): CollectionEntry<'blog'>[] {
  return posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, limit);
}

// Función para obtener todas las categorías únicas
export function getAllCategories(posts: CollectionEntry<'blog'>[]): string[] {
  const categories = new Set<string>();
  
  posts.forEach(post => {
    if (post.data.category) {
      categories.add(post.data.category);
    }
  });
  
  return Array.from(categories).sort();
}

// Función para obtener todas las etiquetas únicas
export function getAllTags(posts: CollectionEntry<'blog'>[]): string[] {
  const tags = new Set<string>();
  
  posts.forEach(post => {
    if (post.data.tags && Array.isArray(post.data.tags)) {
      post.data.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags).sort();
}

// Función para obtener posts relacionados (misma categoría, excluyendo el actual)
export function getRelatedPosts(
  posts: CollectionEntry<'blog'>[], 
  currentPost: CollectionEntry<'blog'>, 
  limit: number = 3
): CollectionEntry<'blog'>[] {
  return posts
    .filter(post => !post.data.draft && 
                   post.slug !== currentPost.slug && 
                   post.data.category === currentPost.data.category)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, limit);
}

// Función para buscar posts por texto
export function searchPosts(posts: CollectionEntry<'blog'>[], query: string): CollectionEntry<'blog'>[] {
  const searchTerm = query.toLowerCase();
  
  return posts
    .filter(post => !post.data.draft && (
      post.data.title.toLowerCase().includes(searchTerm) ||
      post.data.description.toLowerCase().includes(searchTerm) ||
      post.data.category.toLowerCase().includes(searchTerm) ||
      (post.data.tags && post.data.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    ))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}