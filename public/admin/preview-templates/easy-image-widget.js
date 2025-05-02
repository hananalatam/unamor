// Archivo: admin/preview-templates/easy-image-widget.js

// Widget personalizado para facilitar la inserción de imágenes en el blog
CMS.registerEditorComponent({
    // Datos internos
    id: "easy-image",
    label: "Imagen en artículo",
    fields: [
      {
        name: "image",
        label: "Seleccionar Imagen",
        widget: "image",
        media_library: {
          config: {
            multiple: false
          }
        }
      },
      {
        name: "alt",
        label: "Descripción de la imagen",
        widget: "string"
      },
      {
        name: "caption",
        label: "Leyenda (opcional)",
        widget: "string",
        required: false
      },
      {
        name: "position",
        label: "Posición de la imagen",
        widget: "select",
        options: [
          { label: "Izquierda del texto", value: "left" },
          { label: "Derecha del texto", value: "right" },
          { label: "Ancho completo", value: "full" }
        ],
        default: "full"
      }
    ],
    
    // Patrones para reconocer la sintaxis en markdown
    pattern: /^<div class="article-image (left|right|full)">\s*!\[(.*)\]\((.*)\)\s*<figcaption>(.*)<\/figcaption>\s*<\/div>$/,
    
    // Función que genera el código markdown
    fromBlock: function(match) {
      return match && {
        position: match[1],
        alt: match[2],
        image: match[3],
        caption: match[4]
      };
    },
    
    // Función que genera la vista previa
    toBlock: function(data) {
      return `<div class="article-image ${data.position}">
    ![${data.alt || ''}](${data.image || ''})
    <figcaption>${data.caption || ''}</figcaption>
  </div>`;
    },
    
    // Este es el aspecto que tendrá en la vista previa
    toPreview: function(data) {
      return `
        <div class="preview-image ${data.position}">
          <img src="${data.image}" alt="${data.alt || ''}" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
          ${data.caption ? `<p style="font-style: italic; text-align: center; font-size: 0.9rem; margin-top: 0.5rem;">${data.caption}</p>` : ''}
        </div>
      `;
    }
  });
  
  // Widget para texto con título y párrafo
  CMS.registerEditorComponent({
    id: "feature-text",
    label: "Texto destacado",
    fields: [
      {
        name: "title",
        label: "Título (opcional)",
        widget: "string",
        required: false
      },
      {
        name: "content",
        label: "Contenido",
        widget: "text"
      }
    ],
    pattern: /^<div class="featured-text">\s*(?:<h4>(.*)<\/h4>)?\s*<p>(.*)<\/p>\s*<\/div>$/,
    fromBlock: function(match) {
      return match && {
        title: match[1] || '',
        content: match[2] || ''
      };
    },
    toBlock: function(data) {
      return `<div class="featured-text">
    ${data.title ? `<h4>${data.title}</h4>` : ''}
    <p>${data.content}</p>
  </div>`;
    },
    toPreview: function(data) {
      return `
        <div style="background-color: #f8f9fa; padding: 1.5rem; border-left: 4px solid #4f46e5; border-radius: 0.5rem; margin: 1.5rem 0;">
          ${data.title ? `<h4 style="margin-top: 0; color: #4f46e5;">${data.title}</h4>` : ''}
          <p style="margin-bottom: 0;">${data.content}</p>
        </div>
      `;
    }
  });
  
  // Widget para cita destacada
  CMS.registerEditorComponent({
    id: "quote",
    label: "Cita destacada",
    fields: [
      {
        name: "quote",
        label: "Texto de la cita",
        widget: "text"
      },
      {
        name: "author",
        label: "Autor (opcional)",
        widget: "string",
        required: false
      }
    ],
    pattern: /^<blockquote>\s*<p>(.*)<\/p>\s*(?:<cite>(.*)<\/cite>)?\s*<\/blockquote>$/,
    fromBlock: function(match) {
      return match && {
        quote: match[1],
        author: match[2] || ''
      };
    },
    toBlock: function(data) {
      return `<blockquote>
    <p>${data.quote}</p>
    ${data.author ? `<cite>${data.author}</cite>` : ''}
  </blockquote>`;
    },
    toPreview: function(data) {
      return `
        <blockquote style="font-style: italic; color: #4b5563; padding: 1rem 2rem; position: relative; border-left: 4px solid #e5e7eb; background-color: #f9fafb; margin: 1.5rem 0;">
          <p style="position: relative; z-index: 1;">${data.quote}</p>
          ${data.author ? `<cite style="display: block; text-align: right; font-weight: 600;">— ${data.author}</cite>` : ''}
        </blockquote>
      `;
    }
  });