# CRM Duna — Decisiones de Diseño y Patrones UI

## Estilo visual general

El CRM sigue la línea de diseño de **Makai Residences**: elegante, oscuro, inmobiliario de lujo. No es un SaaS genérico.

- **Fondo base**: oscuro (`#111` / `#1a1a1a`) en headers, sidebar y paneles de admin
- **Fondo contenido**: crema claro (`#F1EDE3` / `#F7F3E9`) en el área de contenido del portal del comprador
- **Color primario**: verde oscuro olive (`#4A5E3F`)
- **Texto sobre oscuro**: blanco
- **Texto sobre claro**: `#1a1a1a`
- **Acento/CTA**: verde más brillante para botones primarios
- **Alertas urgentes**: rojo/coral para banners de acción requerida
- **Alertas informativas**: azul para estados en proceso
- **Badges de estado**: verde (disponible/completado), naranja (pendiente/en proceso), rojo (urgente/sold), gris (bloqueado/no disponible)

## Tipografía

| Uso | Fuente | Peso |
|---|---|---|
| Headings del proyecto (Makai) | Cormorant Garamond | 400–600 |
| UI, labels, body | Inter | 400–500 |
| Números grandes (precios) | Inter o Cormorant Garamond | 500–600 |

## Componentes recurrentes

### Banners de alerta en el portal del comprador
- **Rojo (urgente)**: "N documentos pendientes de tu firma · Vencen el [fecha]" + botón "Firmar ahora" + subnota
- **Azul (informativo)**: "Tu promesa de compraventa está en revisión" + botón "Ver estado" + subnota "En proceso por Duna"
- Siempre con icono de punto de color a la izquierda

### Cards de métricas (KPIs)
- Fondo secundario (`var(--color-background-secondary)`)
- Label pequeño arriba (13px, muted)
- Número grande abajo (24px, 500)
- Badge de sub-dato debajo (texto pequeño en color)
- Grid de 2–4 columnas

### Timeline de proceso
- Pasos circulares numerados
- Estados: completado (relleno verde + check), activo (naranja/resaltado), pendiente (outline gris), bloqueado (gris)
- Línea conectora entre pasos
- Texto debajo de cada paso con nombre corto

### Tabla de datos (Admin)
- Header de tabla con fondo ligeramente más oscuro
- Columnas con checkbox de selección masiva
- Badges de estado inline en celda
- Toggle on/off para disponibilidad (columna de acción)
- Acciones al final de fila (iconos: editar, ver, eliminar)
- Paginación al pie
- Exportar + Nueva [entidad] en el header de la tabla

### Sidebar de navegación
- Ancho ~220px
- Logo/nombre del proyecto arriba
- Items con icono + label
- Badge de notificación (círculo naranja/rojo con número) en items con pendientes
- Usuario y rol al pie
- Hover: fondo ligeramente más claro

### Chat interno
- Estilo conversacional (burbuja izquierda = Duna/agente, burbuja derecha = cliente)
- Fondo claro con burbujas de color
- Campo de texto + botón Enviar al pie
- Historial completo scrolleable

### Dropdown del usuario (header)
- Se activa al clicar el avatar
- Links contextuales según rol
- Para visitante: Contact Agent, Tech Support, Main Website, Brochure, Floor Plans, ROIs, FAQs, Specifications
- Para usuario logueado: My Shortlist, My Profile, Admin Dashboard (si tiene rol), Sign Out

## Patrones de interacción

### Selector de proyecto (header)
- Botón visible siempre en el header del CRM público
- Al clicar → dropdown con todos los proyectos disponibles
- Al seleccionar → se recarga TODO el dashboard con el branding del nuevo proyecto (colores, logo, banner, unidades)

### Popup de detalle de unidad
- Se abre sobre el grid sin navegar a otra página (modal/drawer)
- Dos paneles: izquierda info + derecha galería
- Cerrar con X en la esquina
- Al hacer "Reservar" → si no logueado: abre modal de login/registro; si logueado: va directo al flujo de pago

### Tabs "Para Vivir / Para Invertir"
- Toggle de dos estados
- Para Vivir: muestra amenidades, lifestyle, fotos del complejo
- Para Invertir: muestra ROI, HOA, net return, capital growth, valor proyectado
- Cambia el contenido del panel izquierdo del popup

### Estado del asesor
- Verde pulsante + texto en color llamativo: "Tu asesor está disponible ahora mismo"
- Si no disponible: texto naranja + "Tu asesor estará disponible en 2h" → abre popup para captar datos de contacto (nombre, email, teléfono, hora preferible)

### Botón WhatsApp
- Siempre presente como botón flotante (esquina inferior derecha) en el frontend público
- El botón de WhatsApp dentro del popup pre-carga el mensaje: "Hola, tengo interés en la Unidad [X] de [Proyecto] ([Precio] USD). ¿Podemos hablar?"

### Badges de disponibilidad en cards
- AVAILABLE: sin overlay, precio en verde
- PENDING: overlay semitransparente + badge PENDING + "Esta unidad fue liberada hace 3 días" si aplica + temporizador si aplica
- SOLD: overlay oscuro completo + badge SOLD grande

### Descarga de planos (popup)
- Dos botones separados:
  - "Plano con medidas exactas" (PDF)
  - "Plano sin medidas" (PDF)
- Cliente puede seleccionar y descargar

## Convenciones de datos

### Precios
- Siempre en USD como moneda base
- Toggle para ver en EUR / CAD / BRL / COP / MXN (actualizado en tiempo real via API)
- Formato: "$431,000" (con coma de miles, sin decimales para precios de unidades)
- Precio por sqft: "$450/sqft"

### Unidades
- Se miden en sqft (pies cuadrados) — mercado internacional
- Siempre mostrar: sqft interior + sqft terraza + sqft total

### Porcentajes
- ROI, tasas y porcentajes con 2 decimales: "10.33%"
- Progreso de ventas como fracción + porcentaje: "22 (22%)"

### Fechas
- Formato largo en el portal: "Martes, 22 de Abril de 2026"
- Formato corto en tablas: "22 may 2026" o "22/05/26"
- Fechas relativas para urgencias: "Vencen el 17 may (29 días)"

## Gestión de contratos de brokers

El CRM centraliza toda la información de brokers, clientes y contratos dentro del panel de administración de Duna.

### Lógica de acceso
- **Admin / equipo interno Duna**: puede ver, subir, gestionar y consultar todos los contratos de todos los brokers
- **Broker**: solo puede ver su propio contrato y su estado — no tiene visibilidad sobre los contratos de otros brokers

### Flujo del contrato
1. Admin sube el contrato de colaboración (PDF) o lo genera desde una plantilla predefinida del sistema
2. El sistema auto-rellena el contrato con los datos del broker registrado (nombre, empresa, email, país, etc.)
3. Se envía al broker para firma digital (DocuSign o proveedor configurado)
4. Una vez firmado, queda almacenado en la ficha del broker con su estado y fecha de vigencia

### Datos clave a registrar por contrato
- Archivo del contrato (PDF firmado)
- Fecha de firma
- Fecha de caducidad / vencimiento
- Estado: activo / pendiente de firma / caducado / sin contrato

### Alertas automáticas
- Notificación previa al vencimiento del contrato (configurable: X días antes)
- Badge de estado visible en la lista de brokers del panel Admin → Externos

---

## Notas de implementación

- El panel de área privada del comprador debe seguir la misma línea de diseño que las pantallas ya construidas en el Miro
- Los textos de microcopy de la UI (contadores de demanda, estado del asesor, etc.) pueden ser generados/sugeridos por IA en tiempo real
- El sistema debe funcionar en inglés y español (bilingual) — los idiomas se configuran por proyecto y por preferencia del usuario
- La retención DGII aplica solo para comisiones de brokers externos en República Dominicana
