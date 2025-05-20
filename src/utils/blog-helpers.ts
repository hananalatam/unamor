import type { CollectionEntry } from 'astro:content';

// Definir un tipo para los registros de autor
type AuthorRecord = Record<string, string>;

// Mapeos de valores predeterminados de autor para el contenido del blog
const defaultAuthorImages: AuthorRecord = {
  "Maria Magdalena Peña Romero": "/images/founder-magdalena.jpg",
  "Paula Prieto Peña": "/images/founder-paula.webp",
  "Manuel Alejandro Bedoya": "/images/manuel-p1.webp",
  "Ana María Prieto": "/images/ana-p2.webp",
  "Juan Bernardo Peña": "/images/juan-p3.webp"
};

const defaultAuthorProfiles: AuthorRecord = {
  "Maria Magdalena Peña Romero": "Cofundadora y guía de mindfulness",
  "Paula Prieto Peña": "Cofundadora y facilitadora",
  "Manuel Alejandro Bedoya": "Emprendedor, amante de la tecnología y cinéfilo",
  "Ana María Prieto": "Emprendedora, VC y autora",
  "Juan Bernardo Peña": "Escritor y abogado"
};

const defaultAuthorBios: AuthorRecord = {
  "Maria Magdalena Peña Romero": "Guía de mindfulness con amplia formación en psicología transpersonal. Acompaña procesos de sanación emocional y conexión interior desde la presencia amorosa y la sabiduría vivencial.",
  "Paula Prieto Peña": "Facilitadora de experiencias transformadoras a través del mindfulness y la creatividad. Especializada en traducir la sabiduría ancestral a experiencias accesibles para el mundo contemporáneo.",
  "Manuel Alejandro Bedoya": "Emprendedor y amante de la tecnología que explora la intersección entre el cine y el mindfulness. Comparte reflexiones sobre consciencia digital y narrativas transformadoras.",
  "Ana María Prieto": "Emprendedora e inversionista que integra prácticas de atención plena en el mundo empresarial. Especialista en liderazgo consciente y modelos de negocio con propósito.",
  "Juan Bernardo Peña": "Escritor y abogado que combina el rigor analítico con la profundidad contemplativa. Sus reflexiones conectan la ética, el derecho y la búsqueda existencial desde una mirada integradora."
};

// Definir la interfaz para los datos de un artículo
interface BlogArticleData {
  author: string;
  authorImage?: string;
  authorProfile?: string;
  authorBio?: string;
  [key: string]: any; // Para otros campos que pueda tener
}

/**
 * Obtiene los datos completos del autor para un artículo
 * @param article - Entrada de la colección que contiene datos del autor
 * @returns Objeto con datos completos del autor
 */
export function getAuthorData(article: CollectionEntry<'blog'>) {
  const data = article.data as BlogArticleData;
  const authorName = data.author;
  
  // Verificar explícitamente si las propiedades existen y no están vacías
  const authorImage = 
    data.authorImage && data.authorImage.trim() !== "" 
      ? data.authorImage 
      : (authorName in defaultAuthorImages 
          ? defaultAuthorImages[authorName] 
          : "/images/placeholder-author.jpg");
      
  const authorProfile = 
    data.authorProfile && data.authorProfile.trim() !== "" 
      ? data.authorProfile 
      : (authorName in defaultAuthorProfiles 
          ? defaultAuthorProfiles[authorName] 
          : "");
      
  const authorBio = 
    data.authorBio && data.authorBio.trim() !== "" 
      ? data.authorBio 
      : (authorName in defaultAuthorBios 
          ? defaultAuthorBios[authorName] 
          : "");
  
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