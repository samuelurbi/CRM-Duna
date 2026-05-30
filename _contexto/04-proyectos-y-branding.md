# CRM Duna — Proyectos y Branding

## Duna Development Group

- Desarrolladora inmobiliaria con sede en Cap Cana / Punta Cana, República Dominicana
- Segmento: propiedades de lujo para compradores nacionales e internacionales
- Precio de unidades: ~$285,000 — $500,000+ USD
- Mercado objetivo: compradores internacionales sofisticados (usan precio/sqft como métrica)

---

## Proyecto 1: Makai Residences ← Referencia principal de diseño

**Estado**: Activo. Es el proyecto más avanzado y la referencia visual principal para todo el CRM.

**Ubicación**: Cap Cana, Punta Cana, República Dominicana

**URLs**
- Landing: https://makai.kellysproperties.com
- Logo: https://makai.kellysproperties.com/wp-content/uploads/2026/04/logo-new-makai-1.png
- Banner: https://makai.kellysproperties.com/wp-content/uploads/2026/04/banner-makai-1.png
- Brochure PDF: https://makai.kellysproperties.com/wp-content/uploads/2026/04/Makai-Brochure.pdf

**Paleta de colores**
- Fondo oscuro (header/nav): `#1a1a1a` / `#111` aprox — verde muy oscuro casi negro
- Verde principal: `#4A5E3F` (olive green)
- Crema/fondo claro: `#F1EDE3` / `#F7F3E9`
- Texto sobre fondo oscuro: blanco
- Botón CTA principal: verde oscuro con texto blanco
- Acento/badge descuento: naranja/coral

**Tipografía**
- Headings: Cormorant Garamond (serif elegante)
- Body/UI: Inter (sans-serif)

**Datos de unidades (referencia)**
- Total: 102 unidades
- Vendidas a la fecha: 22 (22%)
- Disponibles: 80 (78%)
- Precio ejemplo: Unidad 111 — $431,000 USD / 1 Bed & Family Room / 1st Floor / Lake Facing / 959 sqft + 207 sqft terraza + 1166 sqft total
- Precio/sqft: ~$450/sqft (referencia: Miami Beach $900/sqft)
- Comparativa mercado: "12% por debajo del mercado en Cap Cana"
- Valor proyectado entrega 2027: ~$490,000+
- Entrada: desde $5,000

**Recursos de venta disponibles (para brokers)**
- Presentación del proyecto (PDF)
- Planos de unidades (PDF oficial)
- Video tour 3D
- Ficha de inversión
- Brochure oficial
- Kit de redes sociales (imágenes aprobadas)
- Calculadora de comisión
- Fotos avance de obra

---

## Proyecto 2: Naviva

**Estado**: En preparación — branding por definir
**Notas**: Mismo sistema CRM, branding diferente

---

## Proyecto 3: Lift

**Estado**: En preparación — branding por definir
**Notas**: Mismo sistema CRM, branding diferente

---

## Cómo funciona el multi-branding

El CRM es una sola plataforma. Al cargar, detecta el proyecto activo (por subdominio, parámetro URL o selección del usuario) y aplica dinámicamente:

- Logo del proyecto (header + login)
- Banner/imagen principal del hero
- Paleta de colores (variables CSS cargadas por proyecto)
- Favicon
- Nombre del proyecto en todos los textos

El selector de proyecto en el header permite cambiar entre proyectos sin salir de la plataforma. Al cambiar de proyecto se recargan las unidades, precios y branding.

### Variables de branding configurables por proyecto (desde Admin → Configuración → Imágenes y marca)
- Logo del desarrollo (header y navegación)
- Imagen de fondo del login
- Banner/imagen de hero
- Favicon
- Color primario
- Color secundario / acento
- Fuente principal

---

## Emails y comunicaciones

Los emails del sistema usan:
- Merge tags: `{{Nombre}}` / `{{Name}}`, `{{Asesor}}` / `{{Advisor}}`
- Idiomas: español e inglés (bilingual)
- El sistema de emails transaccionales corre por Resend o SendGrid
- Plantillas configurables desde Admin → Configuración → Correo y enlace
