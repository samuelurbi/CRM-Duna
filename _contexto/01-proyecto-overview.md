# CRM Duna — Overview del Proyecto

## ¿Qué es?

Un CRM web multi-proyecto para **Duna Development Group**, una desarrolladora inmobiliaria con sede en Punta Cana / Cap Cana, República Dominicana. El CRM centraliza la experiencia de compra de propiedades de lujo (~$285,000–$500,000 USD) para compradores nacionales e internacionales.

El sistema vive en un **subdominio** (ej. `app.dunacapecana.com`) y es accesible desde los landing pages de cada proyecto. Dependiendo de desde qué proyecto se entre, el CRM carga con el branding y las unidades de ese desarrollo.

## Estado actual

El CRM **ya existe parcialmente construido**. Hay una versión funcional con:
- Frontend público de tipologías (grid de cards + filtros)
- Portal del comprador básico (sidebar con secciones)
- Panel de administrador básico
- Login / Register con branding de Makai

El trabajo en curso es **rediseñar, mejorar y ampliar** el sistema existente, no construirlo desde cero.

## Los 3 proyectos inmobiliarios

| Proyecto | Ubicación | Estado |
|---|---|---|
| **Makai Residences** | Cap Cana, Punta Cana | Activo — referencia principal de diseño |
| **Naviva** | Por confirmar | En preparación |
| **Lift** | Por confirmar | En preparación |

## Qué problema resuelve

Actualmente el proceso de compra de una propiedad ($285K–$500K) se gestiona por WhatsApp, Drive y Excel. El CRM centraliza todo:

- El comprador sabe en todo momento el estado de su inversión
- Los documentos se firman digitalmente dentro de la plataforma
- Los agentes tienen su pipeline y clientes centralizados
- Los brokers externos tienen su propio portal con comisiones y material de ventas
- El admin controla todo desde un panel único

## Tecnología base (decisión tomada)

- **Frontend**: Next.js + React
- **Auth**: NextAuth / JWT con 5 roles
- **DB**: PostgreSQL (posiblemente vía Supabase)
- **Diseño**: Figma — fuentes Cormorant Garamond + Inter para Makai

## Referencias externas

- Miro board: https://miro.com/app/board/uXjVGg4jEUs=/
- Dev actual de Makai: https://makai.kellysproperties.com
- PDF de referencia visual: `_referencias/miro-export.pdf`
