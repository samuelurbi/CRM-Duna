# CRM Duna — Admin Prototype

## ¿Qué es este proyecto?

Prototipo navegable del **panel de administrador del CRM Duna**, construido en HTML/CSS/JS vanilla (sin frameworks, sin build step). Funciona como wireframe de alta fidelidad para iterar todas las vistas del admin antes de pasar a la implementación final en React/Next.js.

Ábrelo directo en el navegador con VS Code Live Server o haciendo doble click en `index.html`.

## Stack técnico

- **HTML/CSS/JS vanilla** — sin npm, sin bundler, sin dependencias
- **Routing**: hash-based (`#dashboard`, `#expedientes`, `#unidades`, etc.)
- **Fuentes**: Google Fonts — Cormorant Garamond (headings) + Inter (UI)
- **Datos**: mock data en `js/data.js` — arrays y objetos estáticos
- **Sin servidor**: todo corre localmente desde el sistema de archivos

## Estructura de archivos

```
admin-prototype/
├── CLAUDE.md               ← Este archivo
├── index.html              ← Shell: sidebar + header + área de vistas
├── css/
│   ├── tokens.css          ← Variables CSS: colores, tipografía, spacing
│   ├── layout.css          ← Sidebar, header, content area
│   └── components.css      ← Cards, tables, badges, buttons, forms, modals
├── js/
│   ├── data.js             ← Mock data (clientes, proyectos, unidades, tareas)
│   ├── router.js           ← Hash router: escucha cambios de URL y renderiza vistas
│   ├── app.js              ← Init: sidebar active state, eventos globales
│   └── views/
│       ├── dashboard.js    ← Vista principal con KPIs, proyectos, aprobaciones
│       ├── expedientes.js  ← Lista de clientes con tabla y filtros
│       ├── proyectos.js    ← Gestión de proyectos
│       ├── unidades.js     ← Grid/lista de unidades con filtros
│       ├── aprobaciones.js ← Cola de aprobaciones urgentes
│       ├── tareas.js       ← Lista de tareas del día
│       ├── documentos.js   ← Gestión documental
│       ├── transacciones.js← Transacciones y pagos
│       ├── avance-obra.js  ← Reportes de avance de obra
│       ├── plantillas.js   ← Plantillas de comunicación y automatizaciones
│       ├── usuarios.js     ← Registro de usuarios por rol
│       ├── brokers.js      ← Brokers y externos
│       └── configuracion.js← Configuración del sistema
```

## Cómo agregar una vista nueva

1. Crear `js/views/mi-vista.js` con este patrón:

```javascript
export function render(data) {
  return `
    <div class="view-container">
      <div class="view-header">
        <h1 class="view-title">Nombre de la Vista</h1>
      </div>
      <div class="view-body">
        <!-- contenido aquí -->
      </div>
    </div>
  `;
}
```

2. Importar en `js/router.js` y agregar al mapa de rutas
3. Agregar el nav item en `index.html` con `data-route="mi-vista"`

## Design System

### Paleta de colores

```css
/* Fondos (dark mode — área admin) */
--bg:          #0c0c0b   /* fondo global */
--bg-side:     #090909   /* sidebar y header */
--bg-surface:  #101010   /* content area */
--bg-card:     #161614   /* cards y paneles */
--bg-card2:    #1a1a18   /* header de card */

/* Verde principal */
--green:       #4A5E3F   /* verde olive oscuro */
--green-txt:   #82b870   /* verde texto/iconos activos */
--green-lite:  rgba(74,94,63,.16)  /* verde tenue */

/* Crema (texto sobre oscuro) */
--cream:       #F1EDE3   /* texto principal claro */
--cream-dim:   #b8b0a4   /* texto secundario claro */

/* Texto */
--text:        #e2ddd5   /* texto principal */
--sub:         #7a7670   /* texto secundario */
--muted:       #3e3c38   /* texto apagado */

/* Acentos */
--orange:      #c97c40   /* advertencia / pendiente */
--red:         #b84040   /* urgente / error */
--blue:        #3a7abd   /* informativo / en proceso */

/* Bordes */
--border:      rgba(255,255,255,.06)
```

> **Nota**: El portal del COMPRADOR usa fondos claros (crema #F1EDE3).
> El ADMIN usa dark mode. El BROKER usa dark mode también.

### Tipografía

| Uso | Fuente | Peso |
|---|---|---|
| Headings / títulos de proyecto | Cormorant Garamond | 400–600 |
| UI, labels, body, botones | Inter | 400–600 |
| Números grandes (KPIs, precios) | Inter | 600 |

### Clases de componentes (ver `css/components.css`)

- `.panel` — contenedor con fondo de card, border, border-radius
- `.panel-header` — barra superior del panel con título + acción
- `.kpi-card` — card de métrica con top-bar de color
- `.badge` `.badge-green` `.badge-orange` `.badge-red` `.badge-blue` — etiquetas de estado
- `.btn` `.btn-primary` `.btn-ghost` — botones
- `.data-table` — tabla de datos con header + rows
- `.filter-bar` — barra de filtros pill-style
- `.empty-state` — estado vacío con ícono + mensaje

---

## El CRM Duna en contexto

### Quién lo usa

**Duna Development Group** — desarrolladora inmobiliaria en Cap Cana / Punta Cana, Rep. Dominicana. Vende propiedades de lujo ($285K–$500K USD) a compradores internacionales.

### Proyectos activos

| Proyecto | Estado | Unidades |
|---|---|---|
| Makai Residences | Activo | 102 (22 vendidas) |
| Naviva Residences | En preparación | TBD |
| LIV at Cap Cana | En preparación | TBD |

### Los 5 roles del sistema

| Rol | Portal | Acceso |
|---|---|---|
| Admin | `#dashboard` y todos los módulos | Control total |
| Agente | Panel de agente | Sus clientes + pipeline |
| Agente Senior | Panel de agente + reportes | Su equipo completo |
| Comprador | Portal del comprador | Su expediente |
| Broker | Portal profesionales | Clientes + comisiones |

**Este prototipo cubre el rol Admin únicamente.**

---

## Fases del backlog (referencia)

| Fase | Módulo | Estado |
|---|---|---|
| 1 | Frontend Público (tipologías, cards, modal) | Diseñado en HTML |
| 2 | Autenticación (login, register, roles) | Pendiente |
| 3 | Portal del Comprador | Pendiente |
| 4 | Presupuesto / Pack Bienvenida | Pendiente |
| 5 | Panel de Agente | Pendiente |
| 6 | Portal de Brokers | Pendiente |
| **7** | **Panel de Administrador** | **← Aquí** |
| 8 | Integraciones (Stripe, DocuSign, WhatsApp) | Pendiente |
| 9 | Avance de Obra Admin | Pendiente |
| 10 | Comunicación y Plantillas | Pendiente |
| 11 | Portal Admin Duna — Agente | Pendiente |

---

## Convenciones de código

- Cada vista exporta una función `render(data)` que retorna HTML como string
- Las interacciones inline se registran con `window.addEventListener` o `onclick` dentro de la vista
- No usar `document.getElementById` en las vistas — preferir event delegation desde el `#content`
- Mock data siempre viene del objeto global `window.DUNA_DATA` (definido en `data.js`)
- No crear estilos inline en las vistas — usar clases de `components.css` o agregar al archivo CSS correspondiente

## Flujo de trabajo recomendado

1. Abrir en VS Code con Live Server
2. Navegar por las vistas desde el sidebar
3. Identificar qué vista mejorar
4. Editar el archivo `js/views/[vista].js` correspondiente
5. Recargar el navegador (o Live Server lo hace automático)
6. Cuando la vista esté aprobada → pasar a Figma para diseño limpio
