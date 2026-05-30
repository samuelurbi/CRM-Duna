# CRM Duna — Estructura de Datos (JSX Components)

Los 8 archivos `.jsx` entregados por el cliente son **componentes React funcionales completos** que representan módulos reales del CRM ya construido. Contienen datos mock reales (nombres, emails, precios, comisiones) que reflejan el estado actual del sistema en producción.

Úsalos como referencia exacta de: estructura de datos, lógica de estados, nomenclatura de campos, y paleta de colores/tipografía ya decidida.

---

## Tokens de diseño — Sistema de colores CONFIRMADO

Todos los archivos comparten el mismo sistema de tokens. Esta es la paleta definitiva del CRM:

```js
const C = {
  // Fondos
  bg:         "#F4F0E8",   // fondo base (crema)
  bgWarm:     "#EDE8DE",   // fondo cálido secundario
  bgCard:     "#FFFFFF",   // fondo de cards
  bgInput:    "#F8F5EF",   // fondo de inputs

  // Sidebar / Nav
  sidebar:    "#2E3D28",   // verde oscuro — sidebar principal
  sidebarMid: "#364830",   // verde medio — hover sidebar

  // Colores semánticos
  gold:       "#B8942A",   // dorado — acento premium
  goldLight:  "#D4AE50",
  goldBg:     "#FBF5E6",

  green:      "#3A6B35",   // verde — éxito / vendido / completado
  greenLight: "#4D8A45",
  greenBg:    "#EBF3E9",

  amber:      "#9A6B1E",   // ámbar — pendiente / en proceso
  amberBg:    "#FDF4E3",

  red:        "#B03A2E",   // rojo — urgente / error / sold
  redBg:      "#FCECEA",

  blue:       "#2C5F8A",   // azul — disponible / informativo
  blueBg:     "#EBF2FA",

  teal:       "#2A7A6A",   // teal — completado alternativo
  tealBg:     "#E8F5F2",

  // Bordes y texto
  border:     "#E0DAD0",
  borderMid:  "#CEC8BC",
  text:       "#26231C",   // texto principal
  textSub:    "#6B6355",   // texto secundario
  textMuted:  "#A09080",   // texto deshabilitado/muted

  // Sombras
  shadow:     "0 1px 4px rgba(0,0,0,0.07)",
  shadowMd:   "0 4px 20px rgba(0,0,0,0.10)",
};
```

### Tipografía confirmada
```js
const FH = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";  // Headings
const FB = "Georgia,'Times New Roman',serif";                             // Body
const FM = "'Courier New',Courier,monospace";                             // Monospace (IDs, badges, códigos)
```

---

## 1. DASHBOARD_DUNA.jsx — Panel de control global

### Datos del proyecto (DATA)
```js
{
  totalUnidades: 102,
  vendidas: 22,
  disponibles: 80,
  reservadas: 0,
  pendientes: 0,
  valorVentas: 8991000,         // $8.99M vendido
  valorDisponible: 36997000,
  valorTotal: 45988000,         // $45.99M total del inventario
  reservasCompletadas: 5671745,
  avanceObra: 38,               // 38% de avance
  roiAnual: 15.33,
  alquilerMensual: 8126,
  precioDesde: 350000,
  descuento: 20000,
  entrega: "Q3 2027",
  proyecto: "Makai Residences",
  ubicacion: "Cap Cana, República Dominicana",
}
```

### Analytics (ANALYTICS)
```js
{
  enLinea: 2,
  usuarios14d: 740,
  nuevos14d: 574,
  sesionMedia: "00:32",
  vistasTotal: 1494,
  tasaRegistro: 10.0,    // %
  tasaConsulta: 11.0,    // %
  tasaReserva: 0,
}
```

### Actividad reciente (ACTIVIDAD) — tipos y estructura
```js
[
  { tipo:"lead",   msg:"Nuevo registro: Sophie Laurent",          sub:"Vía web · Interés en PH",           tiempo:"hace 2h", color:"#2C5F8A" },
  { tipo:"deal",   msg:"Unidad vendida confirmada: #203",         sub:"Contrato recibido · $431,000",      tiempo:"hace 4h", color:"#3A6B35" },
  { tipo:"alerta", msg:"Lead sin contactar: Kenji Tanaka",        sub:"Registrado hace 28h sin respuesta", tiempo:"hace 1d", color:"#B03A2E" },
  { tipo:"aprob",  msg:"Aprobación pendiente: Descuento #APR-088",sub:"Carlos M. · 5% descuento",         tiempo:"hace 1d", color:"#9A6B1E" },
  { tipo:"pago",   msg:"Pago confirmado: Harrington EXP-0041",    sub:"$66,250 · Complemento 25%",         tiempo:"hace 2d", color:"#3A6B35" },
]
```

### Alertas del dashboard
```js
[
  { icon:"⏰", msg:"Reserva próxima a vencer: Unidad 203 — Moreau",  urgente:true },
  { icon:"📋", msg:"2 aprobaciones pendientes sin respuesta > 24h",  urgente:true },
]
```

---

## 2. UNIDADES_DUNA.jsx — Gestión de unidades

### Estados de unidad (EST)
```js
{
  disponible: { label:"Disponible",  color:"#2C5F8A", bg:"#EBF2FA", dot:"#4A8FD4" },
  pendiente:  { label:"Pendiente",   color:"#9A6B1E", bg:"#FDF4E3", dot:"#9A6B1E" },
  reservado:  { label:"Reservado",   color:"#B8942A", bg:"#FBF5E6", dot:"#B8942A" },
  completado: { label:"Completado",  color:"#2A7A6A", bg:"#E8F5F2", dot:"#2A7A6A" },
  vendido:    { label:"Vendido",     color:"#3A6B35", bg:"#EBF3E9", dot:"#3A6B35" },
}
```

### Tipos de unidad disponibles
```
"1 Cama" | "1 Cama y Hab. Familiar" | "2 Camas" | "1 Cama + Studio Lock-off" | "Penthouse 1 Cama" | "Penthouse 2 Camas"
```

### Estructura de una unidad
```js
{
  id: Number,
  nombre: String,           // ej. "111" (número de unidad)
  piso: Number,             // 1–8
  tipo: String,             // tipo de unidad (ver lista arriba)
  estado: String,           // "disponible" | "pendiente" | "reservado" | "completado" | "vendido"
  precio: Number,           // en USD
  orient: String,           // "N" | "NE" | "SE" | "S" | "SW" | "NW"
  vista: String,            // "Mar" | "Jardín" | "Laguna" | "Golf" | "Ciudad"
  m2: Number,
  vistas_count: Number,     // visitas recibidas (usado para heatbar de popularidad)
  publico: Boolean,         // visible en el frontend público
  destacado: Boolean,
  imagenes: Number,         // cantidad de imágenes
  ultima_act: String,       // "Hoy 09:14" | "Ayer" | "22 abr"
  agente: String,           // agente asignado
}
```

### Precios base por tipo
```js
{
  "1 Cama":                  320000,
  "1 Cama y Hab. Familiar":  431000,
  "2 Camas":                 489000,
  "1 Cama + Studio Lock-off":437000,
  "Penthouse 1 Cama":        580000,
  "Penthouse 2 Camas":       680000,
}
```

### Filtros disponibles en la tabla
- Estado (todos / disponible / pendiente / reservado / vendido / completado)
- Precio mínimo / máximo
- Tipo de unidad
- Piso
- Búsqueda por nombre/número
- Ordenar por columna (vistas_count, precio, etc.)

### Vistas disponibles
- `tabla` (default) — tabla con todas las columnas
- Vista alternativa (modo grid/card)

---

## 3. CLIENTES_AGENTES_DUNA.jsx — Registro de usuarios

### Roles del sistema
```
"cliente" | "agente" | "agente_senior" | "broker" | "agencia" | "admin"
```

### Estructura de usuario
```js
{
  id: Number,
  nombre: String,
  apellido: String,
  email: String,
  tel: String,
  pais: String,             // con emoji de bandera
  rol: String,              // ver roles arriba
  pantalla: Boolean,        // si tiene acceso al panel de pantalla (admin/agente)
  activo: Boolean,
  registro: String,         // fecha "YYYY-MM-DD"
  ultimaSesion: String,     // "Hoy 15:30" | "Ayer 18:20"
  empresa: String | null,   // para brokers/agencias
  notas: String,            // notas internas
}
```

### Usuarios reales del sistema (equipos internos Duna)
**Agentes internos:**
- Carlos Méndez — `cmenendez@dunadevelopment.com` — Broker Senior (12 ventas)
- Ernesto Rivas — `erivas@dunadevelopment.com` — Agente Comercial (8 ventas)
- María Virginia — `mparra@dunadevelopment.com` — Agente Comercial (6 ventas)
- Vanesa García — `vgarcia@dunadevelopment.com` — Agente Comercial
- Ángel Ramírez — `aramirez@dunadevelopment.com` — Gestor Administrativo (admin)

**Brokers externos:**
- Júnior Bourassa — `juniorbourassa@sunsetrealestate.ca` — Sunset Real Estate (🇨🇦 Canadá)
- Jean F. Soucy — `jfsoucy@sunsetrealestate.ca` — Sunset Real Estate (🇨🇦 Canadá)
- María R. Márquez — `sales.makai@passfwd.com` — Guise Realty
- David Peinado — `damainversiones2025@gmail.com` — Dama Inversiones (🇪🇸 España)

**Clientes (leads/compradores):**
- Dave Manser — 🇨🇦 Canadá — 🔥 16 unidades guardadas · Alta intención
- Anyss Fakhfakh — 🇨🇦 Canadá
- Samuel Urbina — 🇻🇪 Venezuela
- Adit Chaudhry — 76 sesiones, usuario muy recurrente
- Ridhi Johal — 🇨🇦 Canadá
- Jack S. Rey — 🇿🇦 Sudáfrica — Nuevo hoy
- Benjamín Luong — 🇺🇸 EEUU

---

## 4. TRANSACCIONES_DUNA.jsx — Transacciones e informes

### Estructura de una transacción
```js
{
  unidad:  String,    // ej. "523"
  cliente: String,    // nombre completo
  estado:  String,    // "Vendido" | "Reservado" | "Pendiente"
  precio:  String,    // "$470,000"
  agente:  String,    // nombre del agente
  fecha:   String,    // "30 abr 2026"
  origen:  String,    // "Directa" | "Broker" | "Agencia" | "Referido" | "Pre-sale"
}
```

### Transacciones reales del sistema
```
#523 — Fedele Pacífico     — Vendido   — $470,000 — Ernesto R.  — 30 abr — Directa
#416 — Eduardo Calderón    — Vendido   — $503,000 — Carlos M.   — 29 abr — Broker
#317 — Ernesto Rivas       — Vendido   — $512,000 — Ernesto R.  — 27 abr — Directa
#526 — Esther Méndez       — Vendido   — $294,000 — María V.    — 21 abr — Pre-sale
#319 — Achraf Benzakour    — Vendido   — $413,000 — Vanessa G.  — 17 abr — Referido
#412 — Sophie Laurent      — Reservado — $520,000 — Carlos M.   — 14 abr — Agencia
#301 — Robert Harrington   — Pendiente — $285,000 — Ana R.      — 12 abr — Directa
```

### Tipos de informe disponibles
```
"todas"        — Todas las transacciones (23 registros)
"ventas"       — Solo ventas cerradas (22 registros)
"pipeline"     — Pipeline activo (1 registro)
"utm"          — Por mes y fuente UTM
"agentes"      — Rendimiento por agente
"cancelaciones"— Cancelaciones
```

### Historial de exportaciones (estructura)
```js
{ user: String, tipo: String, fmt: "CSV"|"Excel"|"PDF", fecha: String, ip: String }
```

---

## 5. DUNA_CLIENTES_PERFILES.jsx — Perfiles de clientes y agentes

### Permisos por tipo de usuario
```js
// Visitante (no registrado)
{ ver_avance_obra: false, exportar_datos: false, ver_otros_clientes: false }

// Cliente estándar
{ ver_avance_obra: true, exportar_datos: false, ver_otros_clientes: false }

// Agente
{ ver_avance_obra: true, exportar_datos: false, ver_otros_clientes: true }

// Admin
{ ver_avance_obra: true, exportar_datos: true, ver_otros_clientes: true }
```

### Estructura de perfil de cliente (analytics)
```js
{
  id: Number,
  nombre: String,
  email: String,
  tel: String,
  pais: String,
  rol: String,
  sesionesHoy: Number,
  sesionesTotal: Number,
  guardados: Number,          // unidades guardadas en lista
  unidadesVistas: [String],   // array de IDs de unidades vistas
  origen: String,             // "Google" | "Email" | "Instagram" | "Web"
  registro: String,
  ultimaSesion: String,
  caliente: Boolean,          // lead caliente (alta intención)
  tiempoMedio: String,        // "8m 32s"
  dispositivo: String,        // "Desktop" | "Mobile"
  hora: String,               // franja horaria de actividad "10–14h"
}
```

### Estructura de perfil de agente interno
```js
{
  id: Number,
  nombre: String,
  email: String,
  tel: String,
  pais: String,
  rol: "agente",
  cargo: String,              // "Broker Senior" | "Agente Comercial" | "Gestor Administrativo"
  sesionesHoy: Number,
  sesionesTotal: Number,
  ventasCerradas: Number,
  enPipeline: Number,
  comisionTotal: String,      // "$48,400"
  ultimaSesion: String,
  registro: String,
  activo: Boolean,
}
```

### Estructura de perfil de broker externo
```js
{
  id: Number,
  nombre: String,
  email: String,
  tel: String,
  pais: String,
  rol: "broker",
  empresa: String,
  sesionesHoy: Number,
  sesionesTotal: Number,
  clientesVinculados: Number,
  ventasCerradas: Number,
  comisionPendiente: String,  // "$9,200"
  ultimaSesion: String,
  registro: String,
}
```

### Analytics de sesiones (resumen global)
```js
{
  hoy:      { total:24,   clientes:18,  agentes:4,  brokers:2  },
  semana:   { total:187,  clientes:142, agentes:28, brokers:17 },
  mes:      { total:740,  clientes:574, agentes:98, brokers:68 },
  historico:{ total:4820, clientes:3890,agentes:512,brokers:418},
}
```

---

## 6. SECCION_PROFESIONALES_DUNA.jsx — Portal de Brokers

### Perfil del broker logueado (ejemplo real)
```js
{
  nombre:    "Júnior Bourassa",
  empresa:   "Sunset Real Estate",
  tipo:      "agencia",        // "broker" | "agencia"
  estado:    "activo",         // "activo" | "pausado" | "suspendido" | "pendiente"
}
```

### Estructura de cliente vinculado al broker
```js
{
  id: Number,
  nombre: String,
  unidad: String,              // "#319"
  precio: Number,
  estado: String,              // "vendido" | "reservado" | "pendiente" | "prospecto"
  etapa: String,               // "Contrato firmado" | "Promesa firmada" | "KYC en revisión" | etc.
  fecha: String,
  comision: Number | null,
  comisionEstado: String,      // "pagada" | "pendiente" | "bloqueado" | "n/a"
  activo: Boolean,
}
```

### Estructura de factura de comisión
```js
{
  id: String,                  // "FAC-2026-003"
  cliente: String,
  unidad: String,
  precio: Number,
  comision: Number,
  retencion: Number,           // retención DGII
  neto: Number,                // comision - retencion
  estado: String,              // "pagada" | "pendiente"
  fechaEmision: String,
  fechaPago: String | null,
}
```

### Acuerdo de colaboración (versiones)
```js
[
  { version:"v2 · 2026", firmado:"17 feb 2026", vence:"17 feb 2027", estado:"vigente" },
  { version:"v1 · 2025", firmado:"14 feb 2025", vence:"14 feb 2026", estado:"vencido" },
]
```

### Material de ventas disponible (para brokers)
```js
[
  { icon:"🖼️", nombre:"Renders del proyecto",   sub:"18 imágenes · Aprobadas por Duna",          tipo:"ZIP"  },
  { icon:"📐", nombre:"Planos de unidades",      sub:"Por tipología · PDF oficial",                tipo:"PDF"  },
  { icon:"🎬", nombre:"Video tour 360°",          sub:"MP4 · 2 min 34s · Alta resolución",         tipo:"MP4"  },
  { icon:"📊", nombre:"Ficha de inversión",       sub:"ROI, plan de pagos, comparativas",           tipo:"PDF"  },
  { icon:"📋", nombre:"Brochure oficial",         sub:"24 páginas · Versión en ES/EN/FR",           tipo:"PDF"  },
  { icon:"📱", nombre:"Kit redes sociales",       sub:"Stories + posts · Medidas aprobadas",        tipo:"ZIP"  },
  { icon:"🏗️", nombre:"Fotos avance obra",        sub:"Abril 2026 · 12 fotos verificadas",         tipo:"ZIP"  },
  { icon:"💰", nombre:"Calculadora de comisión",  sub:"Excel interactivo con tus tasas aplicadas",  tipo:"XLSX" },
]
```

### Pasos del acuerdo de colaboración (checklist)
```js
[
  { id:1, title:"Tipo de profesional",      sub:"Broker independiente o Agencia",        done:true  },
  { id:2, title:"Datos personales",          sub:"Nombre, identificación, domicilio",      done:true  },
  { id:3, title:"Datos fiscales y bancarios",sub:"RNC, banco, IBAN/SWIFT",                done:true  },
  { id:4, title:"Licencia inmobiliaria",     sub:"Número de licencia profesional",         done:true  },
  { id:5, title:"Documentos KYC propios",    sub:"ID, referencias bancaria y profesional", done:false },
]
```

### Chat con Duna (mensajes reales del sistema)
```js
[
  { de:"duna",   nombre:"Carlos Méndez", txt:"Hola Júnior, la comisión de Achraf ha sido procesada. Recibirás el pago el 2 de mayo.", hora:"Hoy 10:30" },
  { de:"broker", nombre:"Tú",            txt:"Perfecto Carlos, muchas gracias. ¿Ya tienen confirmado el estado del KYC de Sophie?",  hora:"Hoy 10:42" },
  { de:"duna",   nombre:"Ana Rodríguez", txt:"El KYC de Sophie Laurent está en revisión por nuestro equipo legal. Te confirmo en 48h.", hora:"Hoy 11:05" },
]
```

---

## 7. MI_PERFIL_DUNA.jsx — Portal del comprador (perfil)

### Estado del formulario de perfil
```js
{
  nombre:   "Miguel",
  apellido: "Perez",
  pais:     "",
  telefono: "8495854171",
  email:    "miguelpva85@gmail.com",
  lang:     "es",
  tz:       "America/Santo_Domingo",
  notifEmail:    true,
  notifWhatsapp: true,
  show2FA:       false,
}
```

### Tabs del perfil
```
"personal"  — Datos personales
"seguridad" — Acceso y seguridad (contraseña + 2FA + historial de accesos)
"prefs"     — Preferencias (idioma, zona horaria, notificaciones)
"peligro"   — Zona de peligro (exportar datos, eliminar cuenta)
```

### Notificaciones configurables (toggles)
```js
[
  { key:"email",     icon:"📧", label:"Email",     val: notifEmail,    set: setNotifEmail    },
  { key:"whatsapp",  icon:"💬", label:"WhatsApp",  val: notifWhatsapp, set: setNotifWhatsapp },
  // + otros tipos de notificación
]
```

### Lógica de completitud del perfil
- Calcula un porcentaje (%) basado en campos rellenados
- Si < 100%: muestra banner de advertencia
- Afecta la generación de documentos legales

---

## 8. AJUSTES_DUNA.jsx — Configuración del sistema (Admin)

### Secciones de configuración
```js
const SECTIONS = [
  { k:"alertas",     icon:"🔴", label:"Alertas críticas",         badge:"5 problemas" },
  { k:"lanzamiento", icon:"🚀", label:"Lanzamiento y ventas"     },
  { k:"diseno",      icon:"🎨", label:"Diseño e idioma"          },
  { k:"descuentos",  icon:"💸", label:"Descuentos"               },
  { k:"pagos",       icon:"💳", label:"Pasarelas de pago"        },
  { k:"filtros",     icon:"⊞",  label:"Barra de filtros"         },
  { k:"tarjetas",    icon:"◫",  label:"Vista de tarjeta y lista" },
  { k:"precios",     icon:"📊", label:"Costos y precios"         },
  { k:"enlaces",     icon:"🔗", label:"Textos y enlaces"         },
  { k:"imagenes",    icon:"🖼️", label:"Imágenes y marca"         },
]
```

**Nota:** La sección "alertas" tiene badge "5 problemas" indicando alertas críticas activas en el sistema.

---

## Notas de implementación importantes

1. **Los datos mock son reales**: los nombres, emails y precios en los JSX son datos reales del sistema en producción, no inventados. Usarlos como referencia de seed data para la base de datos.

2. **Tipografía del sistema (CONFIRMADA)**: el sistema usa `Palatino Linotype` para headings (no Cormorant Garamond como se usaba en Makai email templates). `Georgia` para body, `Courier New` para códigos/badges.

3. **Los colores de los tokens C son la fuente de verdad**: cualquier color en los archivos JSX sobreescribe referencias previas.

4. **Estado de unidades tiene 5 valores** (no 3 como en el sistema anterior): disponible, pendiente, reservado, completado, vendido.

5. **Roles confirmados**: cliente, agente, broker, agencia, admin. "Agente Senior" no aparece como rol separado en el código — puede ser un permiso dentro de "agente".

6. **Las comisiones de brokers tienen retención DGII** calculada: se guarda como campo `retencion` en la factura. El neto = comisión - retención.

7. **Los archivos JSX son componentes independientes** (no hay imports entre ellos). En el sistema final deben integrarse en un único Next.js con estado compartido y API real.
