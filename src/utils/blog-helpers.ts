import type { CollectionEntry } from 'astro:content';

// Mapeos de valores predeterminados de autor para el contenido del blog
const defaultAuthorImages: Record<string, string> = {
  "Maria Magdalena Peña Romero": "/images/founder-magdalena.jpg",
  "Paula Prieto Peña": "/images/founder-paula.webp",
  "Manuel Alejandro Bedoya": "/images/manuel-p1.webp",
  "Ana María Prieto": "/images/ana-p2.webp",
  "Juan Bernardo Peña": "/images/juan-p3.webp"
};

const defaultAuthorProfiles: Record<string, string> = {
  "Maria Magdalena Peña Romero": "Cofundadora y guía de mindfulness",
  "Paula Prieto Peña": "Cofundadora y facilitadora",
  "Manuel Alejandro Bedoya": "Emprendedor, amante de la tecnología y cinéfilo",
  "Ana María Prieto": "Emprendedora, VC y autora",
  "Juan Bernardo Peña": "Escritor y abogado"
};

const defaultAuthorBios: Record<string, string> = {
  "Maria Magdalena Peña Romero": "Acompañante y guía en el camino del mindfulness y el desarrollo personal.",
  "Paula Prieto Peña": "Facilitadora de experiencias transformadoras a través del mindfulness y la creatividad.",
  "Manuel Alejandro Bedoya": "Emprendedor y amante de la tecnología que explora la intersección entre el cine y el mindfulness.",
  "Ana María Prieto": "Emprendedora y VC que integra el mindfulness en el mundo empresarial y las inversiones.",
  "Juan Bernardo Peña": "Escritor y abogado que combina la precisión jurídica con la profundidad del mindfulness."
};

/**
 * Obtiene los datos completos del autor para un artículo
 * @param article - Entrada de la colección que contiene datos del autor
 * @returns Objeto con datos completos del autor
 */
export function getAuthorData(article: CollectionEntry<'blog'>) {
  const authorName = article.data.author;
  
  // Extraer propiedades relacionadas con el autor de article.data si existen
  // O usar valors predeterminados del mapeo basado en el nombre del autor
  const authorImage = 
    (article.data as any).authorImage || 
    defaultAuthorImages[authorName] || 
    "/images/placeholder-author.jpg";
    
  const authorProfile = 
    (article.data as any).authorProfile || 
    defaultAuthorProfiles[authorName] || 
    "";
    
  const authorBio = 
    (article.data as any).authorBio || 
    defaultAuthorBios[authorName] || 
    "";
  
  return {
    name: authorName,
    image: authorImage,
    profile: authorProfile,
    bio: authorBio
  };
}

/**
 * Formatea una fecha para mostrarla en formato español
 * @param date - Fecha a formatear
 * @returns String con la fecha formateada
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Crea una URL amigable para SEO a partir de un texto
 * @param text - Texto a convertir en URL
 * @returns URL amigable
 */
export function createSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Calcula el tiempo estimado de lectura para un texto
 * @param content - Contenido del artículo
 * @returns Número estimado de minutos de lectura
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 225; // Velocidad de lectura promedio
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime < 1 ? 1 : readingTime;
}