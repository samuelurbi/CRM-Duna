# Backlog de Diseño — CRM Duna
> Actualizado: 2026-05-02 · Diseñador: Samuel

**Leyenda:**
`[P]` Pantalla · `[C]` Componente · `[F]` Flujo · `[L]` Lógica/interacción
`🔴` Alta prioridad · `🟡` Media · `⚪` Baja o futura

---

## 📋 EN PROGRESO
<!-- Mueve aquí lo que estés trabajando ahora mismo -->

_(nada en progreso todavía)_

---

## 🗂️ PENDIENTE

---

### FASE 1 — Frontend Público (Tipologías y Precios)
> 🧭 **Puerta de entrada al CRM.** Es lo primero que ve cualquier visitante. Prioridad máxima.

#### 1.1 Dashboard principal (layout y estructura base)
- [x] `[P]` 🔴 Layout general del dashboard: grid de cards, header, filtros, selector de vista
- [x] `[C]` 🔴 Header del proyecto: logo + nombre + selector de proyecto (dropdown multi-branding)
- [x] `[C]` 🔴 Banner/hero: imagen + logo + contador "X OF 102 UNITS SOLD" + led verde gif + usuarios en línea
- [ ] `[C]` 🟡 Barra de filtros: Unit Type, Price, Direction, Outlook, Floor, Sort + botón Reset + "Showing All"
- [ ] `[L]` 🟡 Comportamiento de filtros: estados activos, conteo de resultados, reset individual o total

#### 1.2 Cards de tipología
> Dentro del grid, el bloque visual más importante. Diseñar los 3 modos.

- [ ] `[C]` 🔴 Card modo **Grid**: foto/plano, badge estado (SOLD/PENDING/AVAILABLE), precio + badge descuento tachado, número unidad, planta, habitaciones, baños, sqft interior, sqft terraza, sqft total, amenidades (iconos), botones "MORE INFO" y "RESERVE"
- [ ] `[C]` 🔴 Badge "ADD TO LIST" + contador de personas que la tienen guardada
- [ ] `[C]` 🟡 Badge "Esta unidad fue liberada hace 3 días" (segunda oportunidad)
- [ ] `[C]` 🟡 Temporizador de reserva en card: "Tu unidad está reservada por 48 horas" con countdown
- [ ] `[C]` 🟡 Card modo **List**: vista alternativa compacta
- [ ] `[C]` ⚪ Card modo **Plan**: vista sobre plano del edificio

#### 1.3 Popup / Drawer de detalle de unidad
> Se abre al hacer clic en una card. Es donde ocurre la conversión real.

- [ ] `[P]` 🔴 Estructura y layout general del popup/drawer: header con nombre proyecto + nº unidad + logo
- [ ] `[C]` 🔴 Jerarquía de precios: precio total (grande) → precio/sqft → "Comienza con $5,000"
- [ ] `[C]` 🔴 Galería de fotos/renders + plano 3D con slider de flechas
- [ ] `[C]` 🔴 Tabs "Para Vivir / Para Invertir": dos modos que reorganizan la info según perfil
- [ ] `[C]` 🟡 Badge de descuento + tooltip "Válido hasta el 30 de abril" al hacer hover
- [ ] `[C]` 🟡 Comparativa de mercado: "$450/sqft — Precio 12% por debajo del mercado en Cap Cana"
- [ ] `[C]` 🟡 Valor proyectado en entrega: "Precio hoy: $431,000 · Valor estimado en entrega (2027): $490,000+"
- [ ] `[C]` 🟡 Conversor de moneda en tiempo real: toggle USD → EUR / CAD / BRL / COP / MXN
- [ ] `[C]` 🟡 Botones de descarga de planos: "Plano con medidas" + "Plano sin medidas" (botones separados)
- [ ] `[C]` 🟡 Contador de demanda en vivo: "👁 12 personas están viendo este proyecto" / "23 vieron esta unidad hoy"
- [ ] `[C]` 🟡 Estado del asesor: "Tu asesor está disponible ahora mismo" (color llamativo + efecto de movimiento)
- [ ] `[F]` 🟡 Si asesor no disponible: "Tu asesor estará disponible en 2h" → popup de captura (nombre, email, teléfono, hora preferible)
- [ ] `[C]` ⚪ Botón "Agendar Videollamada" → popup con calendario integrado
- [ ] `[C]` 🔴 Progress bar global de ventas: "22 DE 102 UNIDADES VENDIDAS" + aviso de escasez por tipología

#### 1.4 Botones de acción (dentro del popup)
> El cierre del funnel. Cada botón tiene un flujo distinto.

- [ ] `[C]` 🔴 Botón **AGENDAR VIDEOLLAMADA** (primario)
- [ ] `[C]` 🔴 Botón **CONTACTAR POR WHATSAPP** → abre WhatsApp con texto pre-cargado con datos de la unidad
- [ ] `[C]` 🟡 Botón **RESERVAR ONLINE** (secundario) + subtexto "Reserva 100% reembolsable"
- [ ] `[C]` 🟡 Botón **COMPARTIR** / "Enviar a un socio / pareja" → adjunta ficha PDF en un clic
- [ ] `[C]` 🟡 Botón **GUARDAR** / "Agregar a la lista" → oferta de activar alertas de precio/disponibilidad
- [ ] `[C]` ⚪ Enlace discreto de descarga de responsabilidad

#### 1.5 Flujos post-acción del popup
> Qué pasa después de que el usuario hace clic en cada botón.

- [ ] `[F]` 🔴 Flujo "Reservar Online": popup de login/register → confirmación de unidad → pago $5,000 Stripe → redirección al Portal del Comprador
- [ ] `[F]` 🟡 Flujo "Agendar Videollamada": popup con selector de fecha/hora (Google Calendar) → confirmación
- [ ] `[F]` 🟡 Flujo "Guardar unidad": modal de confirmación → activación de alertas de precio o escasez

---

### FASE 2 — Autenticación
> Aparece en medio del flujo de reserva o al intentar acceder a portales privados.

- [ ] `[P]` 🔴 Pantalla de **Login**: imagen del proyecto (branding dinámico), email + contraseña, "Sign In with Google", "¿Olvidaste tu contraseña?", enlace a Register
- [ ] `[P]` 🔴 Pantalla de **Register**: nombre, apellido, email, país, teléfono, contraseña + campo "¿Eres profesional o cliente final?"
- [ ] `[F]` 🔴 Redirección post-login según rol: Comprador → portal | Agente → panel | Admin → panel admin | Broker → portal o pantalla de espera
- [ ] `[P]` 🟡 Pantalla de **recuperación de contraseña**
- [ ] `[P]` 🟡 Pantalla de **espera para broker** pendiente de aprobación

---

### FASE 3 — Portal del Comprador
> Lo que ve el cliente después de reservar. Su espacio privado durante todo el proceso de compra.

- [ ] `[P]` 🔴 **Inicio / Home**: bienvenida personalizada, alerta de acción urgente (banner rojo), estado general, próximo pago, asesor asignado, accesos rápidos
- [ ] `[P]` 🔴 **Mi Compra — Timeline**: 6 pasos con estados visuales (completado / en proceso / pendiente / bloqueado)
- [ ] `[P]` 🔴 **Mis Documentos**: 4 docs obligatorios + adicionales con estados (Firmar / En revisión / Firmado / Descargar)
- [ ] `[F]` 🟡 Flujo de **firma digital**: integración DocuSign dentro del portal
- [ ] `[P]` 🟡 **Plan de Pagos**: tabla con tramos, fechas, montos, estado de cada cuota + botón Stripe
- [ ] `[P]` 🟡 **Avance de Obra**: barra de progreso + galería por etapas (Q1/Q2/Q3/Q4) + hitos
- [ ] `[P]` 🟡 **Mensajes / Chat interno**: thread de mensajes con equipo Duna, historial, indicador de lectura
- [ ] `[P]` ⚪ **Mi Unidad**: ficha completa con operaciones financieras + documentos asociados
- [ ] `[P]` ⚪ **Mi Perfil — Datos personales**
- [ ] `[P]` ⚪ **Mi Perfil — Acceso y seguridad**: contraseña, 2FA, historial de accesos
- [ ] `[P]` ⚪ **Mi Perfil — Preferencias**: idioma, zona horaria, moneda, notificaciones (toggle + frecuencia)
- [ ] `[P]` ⚪ **Mi Perfil — Zona de peligro**: exportar datos (ZIP), eliminar cuenta

---

### FASE 4 — Módulo Presupuesto / Pack Bienvenida
> Usado internamente por agentes y admin para configurar el plan de pago de cada cliente.

- [ ] `[P]` 🟡 Configuración básica del presupuesto: precio total, etapas, porcentajes, fechas
- [ ] `[P]` 🟡 Tramos de pago detallados: tabla (Reserva, Entrada, Cuotas, Cierre) con fechas, montos, estado
- [ ] `[P]` 🟡 Pack de bienvenida: 4 documentos a firmar en orden con estado y botón "Firmar ahora"
- [ ] `[P]` ⚪ Resumen financiero global: estructura del plan, cobros, comisiones, totales

---

### FASE 5 — Panel de Agente
> Herramienta interna de ventas. Primero el dashboard, luego cada sección.

- [ ] `[P]` 🟡 **Dashboard del agente**: KPIs (leads activos, cierres del mes, pagos pendientes), alertas del día, actividad reciente
- [ ] `[P]` 🟡 **Mis Clientes**: tabla con estado de cada proceso, filtros, búsqueda
- [ ] `[P]` 🟡 **Ficha de cliente**: datos personales, historial de interacciones, documentos, pagos, chat
- [ ] `[P]` ⚪ **Pipeline de ventas**: vista kanban/lista con estados del lead (contacto → reserva → compra → postventa)
- [ ] `[P]` ⚪ Gestión documental del agente
- [ ] `[P]` ⚪ Reservas y contratos
- [ ] `[P]` ⚪ Postventa
- [ ] `[P]` ⚪ Aprobaciones

#### Agente Senior (permisos adicionales)
- [ ] `[P]` ⚪ Vista del equipo: lista de agentes con sus KPIs
- [ ] `[P]` ⚪ Reportes de ventas por agente
- [ ] `[L]` ⚪ Reasignación de clientes entre agentes

---

### FASE 6 — Portal de Profesionales (Brokers y Agencias)
> Portal externo para captadores con su propia lógica de comisiones.

- [ ] `[P]` 🟡 **Dashboard del broker**: KPIs (tipologías disponibles, clientes referidos, comisiones totales/pendientes)
- [ ] `[P]` 🟡 **Mis Clientes**: lista con estado + calculadora de comisión integrada por cliente
- [ ] `[P]` 🟡 **Mi Acuerdo**: acuerdo de colaboración con Duna + firma digital
- [ ] `[P]` ⚪ **Comisiones y Facturas**: historial por transacción con estados (pendiente / aprobada / pagada)
- [ ] `[P]` ⚪ Analítica de comisiones: por proyecto, tipología, estado
- [ ] `[P]` ⚪ **Material de Ventas**: grid de recursos aprobados por Duna (no modificables, con nota legal)
- [ ] `[P]` ⚪ **Mensajes**: chat directo con equipo comercial de Duna

---

### FASE 7 — Panel de Administrador
> Dashboard interno más complejo. Primero el dashboard global, luego módulos por orden de uso frecuente.

- [ ] `[P]` 🟡 **Dashboard global**: métricas consolidadas multi-proyecto, aprobaciones urgentes, expedientes recientes, tareas del día
- [ ] `[P]` 🟡 **Gestión de Expedientes**: lista de clientes con filtros y búsqueda
- [ ] `[P]` 🟡 **Gestión de Unidades**: tabla completa, toggle disponibilidad, filtros, + Nueva Unidad
- [ ] `[P]` 🟡 **Aprobaciones**: cola de aprobaciones urgentes (descuentos, cancelaciones, devoluciones)
- [ ] `[P]` ⚪ **Transacciones**: métricas, tabla detallada con estados, exportación
- [ ] `[P]` ⚪ **Informe de Transacciones**: filtros por tipo, exportación CSV/Excel/PDF
- [ ] `[P]` ⚪ **Registro de Usuarios**: lista con roles, métricas por rol, acciones CRUD
- [ ] `[P]` ⚪ **Gestión de Proyectos**: CRUD de proyectos
- [ ] `[P]` ⚪ **Gestión de Externos (Brokers)**: lista, comisiones pendientes, analítica, retenciones DGII

#### Configuración del Sistema (Admin)
- [ ] `[P]` ⚪ Alertas críticas configurables
- [ ] `[P]` ⚪ Lanzamiento y ventas (textos UI, botones, idiomas, pasarela activa)
- [ ] `[P]` ⚪ Flujos de registro (KYC, documentos requeridos, 2FA)
- [ ] `[P]` ⚪ Plantillas de notificaciones (editor de emails automáticos + temporización)
- [ ] `[P]` ⚪ Base de firma (DocuSign u otro proveedor)
- [ ] `[P]` ⚪ Ficha de proyecto (campos configurables)
- [ ] `[P]` ⚪ Tipos de transacción
- [ ] `[P]` ⚪ Costos y precios (comisiones, descuentos, etiquetas)
- [ ] `[P]` ⚪ Correo y enlace (SMTP, URLs legales)
- [ ] `[P]` ⚪ Imágenes y marca por proyecto (logo, banner, favicon, login)

---

### FASE 8 — Integraciones y lógica transversal
> Se diseñan los estados de carga, error y éxito de cada integración.

- [ ] `[I]` ⚪ Integración Stripe: estados de pago (cargando, exitoso, fallido)
- [ ] `[I]` ⚪ API firma digital (DocuSign): estados del documento dentro del flujo
- [ ] `[I]` ⚪ WhatsApp API: mensajes pre-cargados y notificaciones
- [ ] `[I]` ⚪ Exchangerate API: conversor de moneda en tiempo real (loading + error states)
- [ ] `[I]` ⚪ Google Calendar: popup de agendado de videollamadas
- [ ] `[L]` ⚪ Filtros avanzados de tipologías
- [ ] `[L]` ⚪ Motor de automatización de los 7 pasos post-reserva

---

## ✅ COMPLETADAS

> Aquí van las tareas que ya terminaste. Mueve cada item con la fecha en que lo finalizaste.

<!-- Ejemplo de formato:
- [ ] `[C]` Card modo Grid — completada 2026-05-10
-->

_(sin tareas completadas aún)_

---

## 📝 NOTAS Y DECISIONES

- El orden de las fases refleja prioridad de diseño, no de desarrollo.
- El Frontend Público (Fase 1) es el funnel de conversión: tiene prioridad máxima.
- El Admin dashboard (Fase 7) va después del Portal del Comprador (Fase 3) porque la experiencia del cliente es el core del producto.
- Las fases 5, 6 y 7 pueden diseñarse en paralelo una vez el core (Fases 1-3) esté en Figma.
- El modo "Plan" de las cards (vista sobre plano del edificio) se puede postponar sin bloquear nada crítico.
