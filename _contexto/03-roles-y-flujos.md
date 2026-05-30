# CRM Duna — Roles y Flujos de Usuario

## Los 5 roles

| Rol | Descripción | Acceso |
|---|---|---|
| **Visitante** | Navega el frontend público sin cuenta | Solo páginas públicas |
| **Comprador** | Cliente que reservó o compró una unidad | Portal privado del comprador |
| **Agente** | Vendedor interno de Duna | Panel de agente + clientes asignados |
| **Agente Senior** | Agente con permisos ampliados | Todo lo de agente + equipo + reportes |
| **Admin** | Control total del sistema | Todo sin restricciones |
| **Broker/Profesional** | Externo (agencia o broker independiente) | Portal profesionales (aprobación requerida) |

---

## Flujo Visitante → Comprador

1. Visitante llega al landing page del proyecto (ej. Makai Residences)
2. Hace clic en "Lista de precios" o "Ver unidades"
3. Es redirigido al subdominio del CRM con la vista del proyecto activo
4. Ve el grid de tipologías con precios, disponibilidad y filtros
5. Selecciona una unidad → se abre el popup/drawer de detalle
6. Dentro del popup puede:
   - Ver tabs "Para Vivir / Para Invertir"
   - Ver jerarquía de precio (total + precio/sqft + entrada desde $5K)
   - Ver valor proyectado en entrega (ej. $490,000 en 2027)
   - Ver comparativa de mercado ("12% por debajo de Cap Cana")
   - Descargar planos (con medidas / sin medidas)
   - Compartir con co-inversor (adjunta ficha PDF)
   - Activar alerta de precio/disponibilidad
7. Acciones disponibles desde el popup:
   - **Reservar Online** (→ inicia registro/login → pago $5,000 vía Stripe)
   - **Agendar Videollamada** (→ popup de Google Calendar)
   - **Contactar por WhatsApp** (→ abre WhatsApp con texto pre-cargado con datos de la unidad)
8. Al reservar → se registra/loguea → entra a Portal del Comprador
9. Se disparan automáticamente los 7 pasos del motor de automatización

### Microcopys importantes del frontend público

- Contador de demanda en vivo: "👁 12 personas están viendo este proyecto ahora mismo"
- "👁 23 personas vieron esta unidad hoy y 188 esta semana"
- "Última consulta hace 2 horas"
- Badge en card con estado: SOLD / PENDING / AVAILABLE
- "Esta unidad fue liberada hace 3 días" (unidad que alguien reservó y soltó)
- Temporizador: "Tu unidad está reservada por 48 horas" (countdown)
- Tooltip en banner de descuento: "Válido hasta el 30 de abril"
- Disponibilidad del asesor: "Tu asesor está disponible ahora mismo" (con efecto de movimiento)
- Si no disponible: "Tu asesor estará disponible en 2h" → popup para captar nombre, email, teléfono y hora preferible
- Botón de reserva: debajo pone "Reserva 100% reembolsable"
- Botón compartir: "Enviar a un socio / pareja"
- Header: "21 OF 102 UNITS SOLD" + icono led verde gif + "32 Usuarios en línea ahora mismo"

---

## Flujo Comprador (Portal privado post-reserva)

### Navegación sidebar
- Inicio
- Mi Compra
- Mis Documentos
- Plan de Pagos
- Avance de Obra
- Hablar con Carlos (nombre del asesor asignado)
- Mi Perfil

### Secciones del portal

**Inicio (Home)**
- Bienvenida personalizada: "Buenos días, Robert 🌅"
- Alerta destacada de acción pendiente (ej. "2 documentos pendientes de tu firma — Vencen el 17 may (9 días)")
- Estado general de la compra (resumen)
- Próximo pago con monto, fecha y botón "Ver instrucciones de pago"
- Asesor asignado con estado de disponibilidad y botón de WhatsApp
- Accesos rápidos: "Firmar documentos" / "Hablar con Carlos"

**Mi Compra (Tu proceso de compra)**
- Timeline de 6 pasos con estados (completado ✓ / en proceso / pendiente / bloqueado):
  1. Reserva pagada
  2. KYC — Conoce tu cliente
  3. Promesa de Compraventa
  4. Plan de Pago
  5. Documentación de pago
  6. Firma del contrato

**Mis Documentos**
- Lista de documentos con estado (Firmar / Descargar / Pendiente)
- 4 documentos obligatorios: KYC, Plan de Pagos, Promesa de Compra, Contrato
- Documentos adicionales: Brochure, Ficha unidad, etc.

**Plan de Pagos**
- Tabla con tramos, fechas, montos, estado de cada cuota
- Desglose: Precio de compra, valor acumulado pagado, avance de obra
- Botón de pago online (Stripe)

**Avance de Obra**
- Porcentaje de avance total (barra de progreso)
- Galería de fotos por etapa (Q1 2025, Q2 2025, etc.)
- Hitos completados / en curso

**Mensajes / Chat**
- Chat interno con el equipo de Duna
- Historial almacenado en ficha del cliente
- También accesible por WhatsApp (enlace directo)

**Mi Perfil (4 tabs)**
- Datos personales: nombre, apellido, email, teléfono, país
- Acceso y seguridad: contraseña, 2FA, historial de accesos
- Preferencias: idioma, zona horaria, notificaciones por tipo (vencimiento de pago, estado de documentos, avance de obra, mensaje del broker, novedad del proceso)
- Zona de peligro: exportar mis datos (archivo ZIP con docs + historial), eliminar cuenta (bloqueado si hay compra activa con mensaje explicativo)

---

## Flujo Agente

### Dashboard
- KPIs personales: leads activos, cierres del mes, pagos pendientes de clientes
- Alertas del día: acciones urgentes
- Actividad reciente del equipo

### Secciones
- Mis Clientes (lista con estado de cada proceso)
- Ficha de Cliente (historial, documentos, pagos, chat)
- Pipeline de Ventas (kanban o lista con estados del lead)
- Gestión Documental
- Reservas y Contratos
- Postventa
- Aprobaciones
- Tareas

### Agente Senior (permisos adicionales)
- Vista del equipo completo
- Reportes de ventas por agente
- Reasignación de clientes entre agentes
- Aprobaciones de descuentos o condiciones especiales

---

## Flujo Broker/Profesional (portal externo)

### Registro
- En la pantalla de Register hay un campo: "¿Eres profesional o cliente final?"
- Si selecciona profesional/broker → cuenta queda en estado **Pendiente de aprobación**
- El admin recibe notificación para aprobar

### Portal del Broker (una vez aprobado)
- Dashboard con KPIs: tipologías disponibles, clientes referidos, comisiones totales/pendientes
- Mis Clientes: lista con estado de cada proceso y calculadora de comisión
- Mi Acuerdo: acuerdo de colaboración con Duna (firma digital incluida)
- Comisiones y Facturas: historial detallado con estados (pendiente, aprobada, pagada)
- Analítica de comisiones: por proyecto, por tipología, por estado
- Material de Ventas: recursos aprobados por Duna (brochures, planos, videos, redes sociales — no modificables)
- Mensajes: chat directo con el equipo comercial de Duna

### Gestión de Brokers desde Admin
- Lista de todos los externos con métricas
- Comisiones que esperan acción (aprobar/rechazar)
- Analítica de comisiones por broker, agencia
- Retenciones DGII (impuestos RD) con exportación

---

## Flujo Admin

### Dashboard global
- Métricas consolidadas de todos los proyectos
- Expedientes activos, documentos pendientes, aprobaciones en cola, tareas vencidas
- Proyectos activos con unidades vendidas/disponibles por proyecto
- Aprobaciones urgentes (descuentos, cancelaciones, devoluciones)
- Expedientes recientes
- Tareas del día

### Módulos
- Expedientes (fichas de clientes)
- Gestión Documental
- Reservas y Contratos
- Proyectos
- Postventa
- Aprobaciones
- Tareas
- Gestión de Unidades
- Transacciones
- Informe de Transacciones
- Registro de Usuarios (clientes, agentes, brokers, admins)
- Gestión de Externos (brokers y agencias)
- Configuración del Sistema

### Configuración del Sistema (módulo completo)
- Alertas críticas configurables
- Lanzamiento y ventas (textos de UI, botones, idiomas, pasarela de pago activa)
- Flujos de registro (KYC obligatorio, documentos requeridos, verificación 2FA)
- Plantillas de notificaciones y temporización de emails
- Base de firma (integración con proveedor de firma digital)
- Ficha de proyecto (campos configurables por proyecto)
- Tipos de transacción configurables
- Costos y precios (estructura de comisiones, descuentos, etiquetas)
- Correo y enlace (SMTP, página de confirmación post-pago, URLs de términos legales)
- Imágenes y marca (logo, banner, favicon, imagen de login — todo por proyecto)
