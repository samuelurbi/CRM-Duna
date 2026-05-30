# Instrucciones para configurar Cowork — CRM Duna

## Qué pegar como contexto inicial en Cowork

Al crear el proyecto en Cowork, pega este texto como instrucciones del proyecto:

---

Soy Samuel, diseñador UI/UX y desarrollador WordPress a cargo del diseño y desarrollo del CRM de Duna Development Group. 

Este es un proyecto grande y de largo plazo. Antes de responder cualquier pregunta, lee siempre los archivos de la carpeta `_contexto/` en este orden:
1. `00-leeme-primero.md`
2. `01-proyecto-overview.md`
3. `02-arquitectura-tecnica.md`
4. `03-roles-y-flujos.md`
5. `04-proyectos-y-branding.md`
6. `05-backlog.md`
7. `06-pantallas-referencia.md`
8. `07-decisiones-y-patrones.md`
9. `08-contenidos-y-textos.md`

El diseño se hace en Figma. El proyecto de referencia visual principal es Makai Residences (ver branding en `04-proyectos-y-branding.md`). El PDF de referencia visual está en `_referencias/miro-export.pdf`.

Cuando te pida trabajar en una pantalla específica, primero consulta `06-pantallas-referencia.md` para ver si ya existe una versión de esa pantalla. Si existe, úsala como base. Si no existe, sigue los patrones de `07-decisiones-y-patrones.md`.

Nunca inventes datos, colores o textos. Todo está documentado en los archivos de contexto.

---

## Cómo trabajar en cada sesión

1. Abre Cowork y selecciona el proyecto CRM Duna
2. Describe qué módulo o pantalla quieres trabajar hoy
3. Claude leerá el contexto y te ayudará directamente sin que tengas que re-explicar nada
4. Los archivos que genere (componentes, notas, specs) se guardan en la carpeta del proyecto

## Comandos útiles para decirle a Cowork

- `"Quiero trabajar en la pantalla de [nombre]. ¿Qué información existe ya en el contexto sobre esto?"`
- `"Actualiza el backlog: marca como en progreso la tarea [nombre]"`
- `"Añade una nota de decisión al archivo de patrones: [decisión tomada]"`
- `"¿Qué tareas de diseño siguen según el backlog?"`
- `"Revisa el Miro para ver si hay novedades: [URL]"`
