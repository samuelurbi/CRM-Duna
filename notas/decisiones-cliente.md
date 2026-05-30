# Decisiones de Diseño — CRM Duna

## Vista de Unidades — Toggle de modos (2026-05-03)

**Decisión:** Separar los modos de vista en dos controles distintos en la barra de filtros:

1. **Toggle Grid / Lista** — pill/toggle agrupado, igual que antes
2. **Botón "Planta"** — botón independiente al lado del toggle (separado visualmente)

**Razón:** El modo "Planta" es conceptualmente diferente a Grid/Lista — es una vista espacial por piso, no un formato de listado. Ponerlo junto generaba confusión sobre qué es ese modo.

**Renombrado:** "Plan" / "Mapa" → **"Planta"** (término arquitectónico correcto, corto, descriptivo)

**Afecta:** `UNIDADES_DUNA.jsx` — sección View mode (línea ~323)
