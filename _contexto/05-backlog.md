# CRM Duna — Backlog de Diseño

Leyenda de tipos: [P] Pantalla | [C] Componente | [F] Flujo | [L] Lógica/interacción | [I] Integración

---

## FASE 1 — Frontend Público (Tipologías y Precios)

### Dashboard principal
- [P] Layout general del dashboard: grid de cards, header, filtros, modos de vista (Grid / Plan / List)
- [C] Selector de proyecto en header: botón con dropdown que carga todo el branding y unidades del proyecto seleccionado
- [C] Banner/hero del proyecto: imagen + logo + nombre + contador "X OF 102 UNITS SOLD" + icono led verde gif + "N Usuarios en línea ahora mismo"
- [C] Barra de filtros: Unit Type, Price, Direction, Outlook, Floor, Sort, Showing All — con botón Reset
- [C] Progress bar global de ventas: "22 DE 102 UNIDADES VENDIDAS" + "Solo quedan 3 unidades con esta tipología"

### Card de tipología
- [C] Card en modo Grid: foto/plano de la unidad, badge de estado (SOLD/PENDING/AVAILABLE), precio con badge de descuento tachado, número de unidad, planta, habitaciones, baños, sqft interior, sqft terraza, sqft total, amenidades (icono AC, etc.), botones "MORE INFO" y "RESERVE"
- [C] Badge "ADD TO LIST" con contador de personas que la tienen guardada
- [C] Badge "Esta unidad fue liberada hace 3 días" (segunda oportunidad)
- [C] Temporizador de reserva en card: "Tu unidad está reservada por 48 horas" con countdown
- [C] Card en modo List (vista alternativa)
- [C] Card en modo Plan (vista de plano del edificio)

### Popup / Drawer de detalle de unidad
- [P] Popup completo de detalle: header con nombre del proyecto + número de unidad + logo proyecto
- [C] Jerarquía de precio: precio total grande → precio/sqft → "Comienza con $5,000"
- [C] Badge de descuento con tooltip "Válido hasta el 30 de abril" al hacer hover
- [C] Comparativa de mercado: "$450/sqft — Precio 12% por debajo del mercado en Cap Cana"
- [C] Valor proyectado en entrega: "Precio hoy: $431,000 · Valor estimado en entrega (2027): $490,000+"
- [C] Conversor de moneda en tiempo real: toggle USD → EUR / CAD / BRL / COP / MXN + "Reserva desde $5,000"
- [C] Tabs "Para Vivir / Para Invertir": dos banners con fotos del proyecto que reorganizan la info según perfil (inversor: ROI arriba; residente: amenidades y lifestyle arriba)
- [C] Galería de fotos/renders + plano 3D de la unidad (slider con flechas)
- [C] Botones de descarga de planos: "Plano con medidas" + "Plano sin medidas" (dos botones separados)
- [C] Contador de demanda en vivo: "👁 12 personas están viendo este proyecto ahora mismo" / "👁 23 personas vieron esta unidad hoy y 188 esta semana" / "Última consulta hace 2 horas"
- [C] Estado del asesor: "Tu asesor está disponible ahora mismo" (color llamativo + efecto de movimiento ligero)
- [F] Si asesor no disponible: "Tu asesor estará disponible en 2h" → popup para captar nombre, email, teléfono, hora preferible de llamada
- [C] Botón "Agendar Videollamada" → popup con calendario

### Botones de acción principales (dentro del popup)
- [C] RESERVAR ONLINE (botón primario) + subtexto "Reserva 100% reembolsable"
- [C] AGENDAR VIDEOLLAMADA (botón secundario)
- [C] CONTACTAR POR WHATSAPP CON EL BROKER → abre WhatsApp con texto pre-cargado: "Hola, tengo interés en la Unidad [X] de [Proyecto] ([Precio] USD). ¿Podemos hablar?"
- [C] COMPARTIR / "Enviar a un socio / pareja" → adjunta ficha completa en PDF en un clic
- [C] GUARDAR / "Agregar a la lista" → oferta de activar alertas: "Te avisamos si baja de precio o quedan menos de 3 unidades"
- [C] DESCARGA DE RESPONSABILIDAD (enlace discreto)

---

## FASE 2 — Autenticación

- [P] Pantalla de Login: imagen del proyecto (branding dinámico), campos email + contraseña, botón "Sign In with Google", enlace "¿Olvidaste tu contraseña?" y enlace a Register
- [P] Pantalla de Register: First Name, Last Name, Email, Country, Phone, Create Password + campo "¿Eres profesional o cliente final?" → si broker: queda pendiente de aprobación
- [F] Redirección post-login según rol: Comprador → portal | Agente → panel agente | Admin → panel admin | Broker → portal profesionales (si aprobado) o pantalla de espera
- [P] Pantalla de recuperación de contraseña
- [P] Pantalla de espera para broker pendiente de aprobación

---

## FASE 3 — Portal del Comprador

- [P] Home/Inicio: bienvenida personalizada, alerta de acción urgente (banner rojo), próximo pago, asesor asignado, accesos rápidos
- [P] Mi Compra — Timeline: 6 pasos con estados visuales (completado / en proceso / pendiente / bloqueado)
- [P] Mis Documentos: lista con 4 docs obligatorios + adicionales, estados (firmar / en revisión / firmado / descargar)
- [F] Flujo de firma digital: integración DocuSign dentro del portal
- [P] Plan de Pagos: tabla con tramos, fechas, montos, estado de cada cuota + botón pago online Stripe
- [I] Integración Stripe para pago de cuotas
- [P] Avance de Obra: barra de progreso total + galería por etapas (Q1/Q2/Q3/Q4) + hitos
- [P] Mensajes / Chat interno: thread de mensajes con equipo Duna, historial guardado, indicador de lectura
- [P] Mi Unidad: ficha completa de la unidad comprada con operaciones financieras + documentos asociados
- [P] Mi Perfil — Datos personales: nombre, apellido, email, teléfono, país, expediente
- [P] Mi Perfil — Acceso y seguridad: cambio de contraseña, activación 2FA, historial de accesos
- [P] Mi Perfil — Preferencias: idioma, zona horaria, moneda preferida, notificaciones por tipo (toggle on/off + frecuencia)
- [P] Mi Perfil — Zona de peligro: exportar mis datos (ZIP), eliminar cuenta (bloqueado si hay compra activa)

---

## FASE 4 — Módulo Presupuesto / Planes de Pago + Pack Bienvenida

- [P] Configuración básica del presupuesto: precio total, etapas de pago, porcentajes, fechas
- [P] Tramos de pago detallados: tabla por tramos (Reserva, Entrada, Cuotas, Cierre/Contrescrip) con fechas, montos, estado, observaciones
- [P] Pack de bienvenida: vista con los 4 documentos a firmar en orden, cada uno con estado y botón "Firmar ahora"
- [P] Resumen financiero global: estructura del plan, estado de cobro, comisiones registradas, totales

---

## FASE 5 — Panel de Agente

- [P] Dashboard del agente: KPIs (leads activos, cierres del mes, pagos pendientes), alertas del día, actividad reciente
- [P] Lista de clientes asignados: tabla con estado de cada proceso, filtros, búsqueda
- [P] Ficha de cliente: datos personales, historial de interacciones, documentos, pagos, chat
- [P] Pipeline de ventas: vista kanban o lista con estados del lead (contacto → interesado → reserva → compra → postventa)
- [P] Gestión documental del agente
- [P] Reservas y contratos
- [P] Postventa
- [P] Aprobaciones

### Agente Senior (permisos adicionales)
- [P] Vista del equipo: lista de agentes con sus KPIs
- [P] Reportes de ventas por agente
- [L] Reasignación de clientes entre agentes

---

## FASE 6 — Portal de Profesionales (Brokers y Agencias)

- [P] Dashboard del broker: KPIs (tipologías disponibles, clientes referidos, comisiones totales/pendientes/esta semana)
- [P] Mis Clientes: lista con estado de cada proceso + calculadora de comisión integrada por cliente
- [P] Mi Acuerdo: acuerdo de colaboración con Duna con firma digital
  - Vista del broker: solo puede ver su propio contrato y su estado actual
  - Auto-rellenado con los datos del broker registrado en el sistema
  - Firma digital integrada (DocuSign o similar)
  - Muestra fecha de vigencia / caducidad del contrato
- [P] Comisiones y Facturas: historial detallado por transacción con estados (pendiente / aprobada / pagada)
- [P] Analítica de comisiones: por proyecto, por tipología, por estado
- [P] Material de Ventas: grid de recursos aprobados por Duna (brochures, planos, videos, kit redes, calculadora) — no modificables, con nota legal
- [P] Mensajes: chat directo con el equipo comercial de Duna Development

### Gestión de contratos de brokers (desde Admin — FASE 7)
- [C] Sección "Contratos" dentro de la ficha de cada broker en Admin → Externos
- [L] Subir y almacenar el contrato de colaboración de cada broker (upload de PDF o generación desde plantilla)
- [L] Guardar y mostrar fecha de caducidad del contrato — alertas automáticas antes del vencimiento
- [F] Flujo de firma digital: auto-rellenar contrato con datos del broker + enviar para firma digital
- [L] Control de acceso diferenciado:
  - Admin / equipo Duna: puede ver, subir, gestionar y consultar todos los contratos de todos los brokers
  - Broker: solo puede ver su propio contrato y su estado (firmado / pendiente de firma / caducado)
- [P] Vista consolidada en Admin → Externos: lista de brokers con columna de estado del contrato (activo/pendiente/vencido/sin contrato)

---

## FASE 7 — Panel de Administrador

- [P] Dashboard global: métricas consolidadas multi-proyecto, aprobaciones urgentes, expedientes recientes, tareas del día
- [P] Gestión de Expedientes: lista de clientes con filtros y búsqueda
- [P] Gestión de Unidades: tabla con todas las unidades, toggle disponibilidad, filtros, + Nueva Unidad
- [P] Transacciones: métricas, tabla detallada con estados, exportación
- [P] Informe de Transacciones: filtros por tipo (todas, ventas cerradas, pipeline, por mes/UTM, rendimiento por agente, cancelaciones), exportación CSV/Excel/PDF con rango de fechas
- [P] Registro de Usuarios: lista con roles, métricas por rol, búsqueda, acciones (activar/desactivar/editar/eliminar)
- [P] Gestión de Proyectos: CRUD de proyectos
- [P] Gestión de Externos — Brokers y Agencias: lista, comisiones pendientes de acción, analítica, retenciones DGII
- [P] Aprobaciones: cola de aprobaciones urgentes (descuentos, cancelaciones, devoluciones)

### Configuración del Sistema (Admin)
- [P] Alertas críticas: configuración de alertas automáticas del sistema
- [P] Lanzamiento y ventas: textos de UI, configuración de botones, idiomas disponibles, pasarela de pago activa
- [P] Flujos de registro: KYC obligatorio, documentos requeridos, activación de 2FA, verificación de dos pasos
- [P] Plantillas de notificaciones: editor de emails automáticos con temporización
- [P] Base de firma: configuración de proveedor de firma digital (DocuSign u otro)
- [P] Ficha de proyecto: campos configurables por proyecto
- [P] Tipos de transacción: configuración de etiquetas y categorías
- [P] Costos y precios: estructura de comisiones, descuentos, etiquetas personalizadas de precios
- [P] Correo y enlace: configuración SMTP, página de confirmación post-pago, URLs legales (términos, privacidad)
- [P] Imágenes y marca: logo, banner, favicon, imagen de login — configurables por proyecto

---

## FASE 8 — Integraciones y lógica transversal

- [I] Integración Stripe (pagos de cuotas)
- [I] API de firma digital (DocuSign o similar) para los 4 contratos
- [I] WhatsApp API para mensajes pre-cargados y notificaciones
- [I] Exchangerate API para conversor de moneda en tiempo real
- [I] Google Calendar para agendado de videollamadas
- [L] Filtros avanzados de tipologías (precio, m², habitaciones, disponibilidad, proyecto)
- [L] Motor de automatización de los 7 pasos post-reserva
- [L] Retenciones DGII para comisiones de brokers externos (exportación)

---

## FASE 9 — Avance de Obra Admin *(nuevo — mayo 2026)*

- [P] Pantalla de creación de reporte: KPIs del periodo, barra de progreso, texto resumen interno, texto resumen para compradores
- [C] Galería de fotos por sección/etapa con bulk upload ("Subir todas las fotos")
- [C] Panel de notificaciones: toggle "Notificar a compradores" + canal Email + WhatsApp + preview del mensaje
- [F] Flujo publicación: borrador → revisar/modificar → publicar (dispara notificaciones automáticas)
- [P] Mis reportes: historial de reportes publicados por periodo
- [P] Material: gestión de archivos y recursos de obra

---

## FASE 10 — Comunicación y Plantillas *(nuevo — mayo 2026)*

- [P] Plantillas de comunicación: lista con toggle on/off, canal (Email/WhatsApp), botón editar
- [F] Editor de plantilla: cuerpo del mensaje con merge tags, canal de envío, nombre, activar/desactivar
- [P] Automatizaciones: lista de flujos por evento, cada uno con N pasos configurables
- [F] Builder de automatización: configurar pasos dentro de cada flujo (trigger → acción → condición)
- [P] Historial de envíos: tabla con fecha, destinatario, canal, estado, acción de reenvío
- [P] Configuración de canales — Email: campo remitente + SMTP
- [P] Configuración de canales — WhatsApp Business API: Token + Phone ID + Cuenta + URL webhook + botón conectar
- [I] Integración WhatsApp Business API (Meta) para automatizaciones
- [I] Envío de Email transaccional desde remitente configurable

**Automatizaciones a configurar (triggers identificados):**
- Por reserva
- Recordatorio de KYC
- Recordatorio de pago (días antes del vencimiento)
- Pago realizado
- Segunda vencimiento (cuota vencida sin pago)
- Control de equipado
- (slots libres para automatizaciones personalizadas)

**Plantillas identificadas:**
- Bienvenida por nuevo comprador
- Recordatorio KYC pendiente
- Recordatorio pago próximo
- Cuotas próximas a vencer
- Carta cuota vencida
- Tramo nuevo vencido

---

## FASE 11 — Portal Admin Duna (vista de Agente/Asesor) *(nuevo — mayo 2026)*

Portal independiente para agentes de Duna con acceso limitado vs. admin global.

- [P] Mi Dashboard: KPIs del agente + actividad reciente + "Trader Monitor"
- [P] Mis Clientes: lista de clientes asignados con estado, monto, acciones
- [P] Mi Pipeline: vista kanban/etapas del pipeline personal de ventas
- [P] Mis Tareas: lista de tareas del agente con cliente relacionado, fecha, estado
- [P] Transacciones: pantalla con acceso limitado por plan (empty state controlado)
- [P] Anuncios: sección de comunicados internos de Duna hacia los agentes
- [P] Mensajes: bandeja de mensajes del agente
- [L] Control de acceso por plan/nivel: ciertas secciones muestran empty state bloqueado si el agente no tiene acceso
