/**
 * Genera metadatos SEO para las páginas del sitio web
 * @param {Object} options - Opciones de configuración
 * @param {string} options.title - Título de la página
 * @param {string} options.description - Descripción de la página
 * @param {string} options.image - URL de la imagen principal (para Open Graph)
 * @param {string} options.canonicalURL - URL canónica de la página
 * @param {string} options.type - Tipo de página (website, article, etc.)
 * @param {Array} options.keywords - Palabras clave para la página
 * @returns {Object} Objeto con las propiedades SEO
 */
export function generateSEO(options) {
    const {
      title = "Un Amor Consciente | Mindfulness momento a momento",
      description = "Acompañamos procesos personales desde el mindfulness transpersonal, la autoindagación y el amor profundo por la vida.",
      image = "/images/og-image.jpg",
      canonicalURL,
      type = "website",
      keywords = ["mindfulness", "bienestar emocional", "sanación", "meditación"],
    } = options;
  
    // Crear URL completa para la imagen si no lo es ya
    const imageUrl = image.startsWith('http') 
      ? image 
      : new URL(image, import.meta.env.SITE).toString();
  
    return {
      title,
      description,
      canonical: canonicalURL,
      openGraph: {
        basic: {
          title,
          type,
          image: imageUrl,
          url: canonicalURL,
        },
        optional: {
          description,
          siteName: "Un Amor Consciente",
          locale: "es_ES",
        },
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        image: imageUrl,
      },
      additionalMetaTags: [
        {
          name: "keywords",
          content: keywords.join(", "),
        },
        {
          name: "author",
          content: "Un Amor Consciente",
        },
      ],
    };
  }
  
  /**
   * Genera una URL amigable para SEO
   * @param {string} text - Texto a convertir en URL
   * @returns {string} URL amigable
   */
  export function createSEOUrl(text) {
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
   * Genera datos estructurados JSON-LD para artículos de blog
   * @param {Object} article - Datos del artículo
   * @returns {Object} Objeto con datos estructurados para JSON-LD
   */
  export function generateArticleSchema(article) {
    const {
      title,
      description,
      pubDate,
      updatedDate,
      heroImage,
      author,
      url
    } = article;
  
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": description,
      "image": heroImage ? new URL(heroImage, import.meta.env.SITE).toString() : "",
      "datePublished": pubDate,
      "dateModified": updatedDate || pubDate,
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Un Amor Consciente",
        "logo": {
          "@type": "ImageObject",
          "url": new URL("/images/unamorconsciente.svg", import.meta.env.SITE).toString()
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    };
  }