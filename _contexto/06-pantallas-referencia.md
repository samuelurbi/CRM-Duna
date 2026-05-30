# CRM Duna — Pantallas de Referencia

Este archivo describe detalladamente cada pantalla visible en el PDF exportado del Miro (`_referencias/miro-export.pdf`). Úsalo como referencia de diseño cuando trabajes en cualquier módulo.

---

## Frontend Público — Dashboard de Tipologías (PDF pág. 1–3)

### Header / Nav
- Logo Makai Residences a la izquierda (tipografía serif fina)
- Centro: "21 OF 102 UNITS SOLD" en rojo/coral + "(Icono led verde gif) 32 Usuarios en línea ahora mismo"
- Derecha: icono de favoritos (corazón), botón MENU con ícono de hamburguesa, icono de usuario
- Al clicar el usuario → dropdown con: Contact Agent, Tech Support, Main Website (EN), Brochure (EN), Floor Plans, ROIs (EN), FAQs (EN), Specifications (EN), Main Website (ES), Brochure (ES), Makai Especificaciones (ES), Proceso de Avance de Obra
- Al clicar el usuario (logueado) → dropdown con: My Shortlist, My Profile, Admin Dashboard, Sign Out

### Barra de filtros
- Campos: Unit # (búsqueda), Price (dropdown), Unit Type (dropdown), Direction (dropdown), Outlook (dropdown), Floor (dropdown), Sort (dropdown), Showing All (dropdown)
- Botones: "X Matches" (en verde) + "Reset" (en rojo)

### Modos de vista
- 3 botones: GRID (activo por defecto), PLAN, LIST

### Cards de tipología (modo Grid)
- Imagen/plano de la unidad en la parte superior
- Badge "ADD TO LIST" con estrella y contador de personas que la tienen guardada
- Badge de estado: "SOLD" (overlay oscuro sobre toda la card) / "PENDING" (overlay con badge) / disponible (sin overlay)
- Badge de descuento tachado: "UNLOCK $20,000 DISCOUNT" en verde
- Nombre: número de unidad (ej. "111")
- Descripción: "1st Floor | 1 Bed & Family Room | SE | Lake Facing"
- Precio: "$431,000" en verde prominente
- Métricas en iconos: camas, baños, parking, sqft interior, sqft terraza, sqft total, AC (Yes/No)
- Botones: "MORE INFO" (outline) + "RESERVE" (filled verde)

### Estado PENDING en card
- Badge "PENDING" en gris sobre la imagen
- Nota "Esta unidad fue liberada hace 3 días" (segunda oportunidad)
- Temporizador visible

---

## Popup de Detalle de Unidad (PDF pág. 3)

### Layout general
- Modal/popup a ancho completo o casi
- Header: nombre del proyecto (Makai Residences) + número de unidad (Unit 111) + Logo Proyecto (box con texto placeholder)
- Dos paneles: izquierdo (info) + derecho (galería/plano 3D)

### Panel izquierdo — Vista "Para Invertir"
- Precio: "$431,000" muy grande en verde
- Badge: "UNLOCK $20,000 DISCOUNT" en verde
- Descripción: "1st Floor | 1 Bed & Family Room | SE | Lake Facing"
- Métricas: camas(1), baños(2), parking(1), sqft int(959), sqft terraza(207), sqft total(1166), AC(Yes)
- Datos financieros (modo Para Invertir): HOA Levies: $433/m, Monthly Fees: $3,982/m, Est. Rental: $6,136/m, Net Return: 10.33%, Capital Growth: 3%, Total Annual ROI: 10.33%
- Valor proyectado en entrega: $490,000+
- Botones de acción apilados verticalmente:
  - RESERVAR ONLINE (botón lleno verde)
  - AGENDAR VIDEOLLAMADA (outline)
  - CONTACTAR POR WHATSAPP CON EL BROKER (outline)
- Línea: COMPARTIR + ícono + DESCARGA DE RESPONSABILIDAD + ícono info

### Panel derecho — Galería
- Slider de imágenes con flechas izquierda/derecha
- Fotos del interior de la unidad (render)
- Contador de slides: "1/4"

### Vista "Para Vivir" (tab alternativo)
- Misma estructura pero sin datos financieros
- Muestra amenidades y lifestyle arriba
- Dos banners con fotos del proyecto

---

## Portal del Comprador — Versión antigua (PDF pág. 4 superior izquierda)

### Sidebar
- Logo Duna Development + "PORTAL DEL COMPRADOR"
- Inicio (activo)
- Mi Proceso (con badge de notificación naranja)
- Documentos (con badge)
- Plan de Pagos
- Chat con Broker
- Mi Perfil
- Footer: nombre del usuario "Kellycaribe2022"

### Área principal
- "iBienvenido, Kellycaribe2022! 🌅"
- "Aquí puedes seguir tu proceso de compra, firmar documentos y hablar con tu broker."
- Banner rojo: "2 documentos pendientes de tu firma" + botón "Firmar ahora"
- Banner azul: "Tu borrador de promesa de compraventa está en revisión legal" + botón "Ver documento"
- Card de la unidad: "Makai Residences Cap Cana" + Apartamento 22 + Torre Sur + valor total + barra de progreso + agente Carlos M. con foto
- "Estado del proceso" con 7 pasos visuales circulares: Reserva ✓, KYC ✓, Documentación ✓, Formulario (activo/naranja), Plan de Pago, Promesa de, [último]

---

## Portal del Comprador — Versión nueva/mejorada (PDF pág. 4 inferior + pág. 12)

### Header
- "MAKAI RESIDENCES" con logo pequeño
- Navegación superior: Inicio, Mi Compra, Pagos, Documentos, Mi unidad, Avance de Obra, Hablar con [nombre asesor], Mi perfil
- Acciones rápidas a la derecha: buscar, notificaciones (badge), avatar usuario

### Home/Inicio (pág. 4 inferior)
- Fecha: "Martes, 22 de Abril de 2026"
- "Buenos días, Robert 🌅"
- Subtítulo: "Tu inversión en Makai Residences avanza. Tienes 2 documentos pendientes de tu firma."
- Accesos rápidos: botón "Firmar documentos" (verde) + botón "Hablar con Carlos" (outline)
- Banner rojo de urgencia: "2 documentos pendientes de tu firma · Vencen el 17 may (29 días)" + botón "Firmar ahora" + subnota "Requiere tu acción"
- Banner azul: "Tu promesa de compraventa está en revisión por el equipo legal de Duna" + botón "Ver estado" + "En proceso por Duna"
- Card de la propiedad (izquierda): foto, "Makai Residences Cap Cana", Apartamento 38 → Torre Sur, Precio de compra: $285,000 / Valor acumulado: $298,500, Avance de obra: barra 30%, "Entrega estimada Q3 2027" + "Ver todo →"
- Card de próximo pago (centro-derecha): "Próximo pago" / "$66,250" / fecha "13 may 2026 — 14 días" / "Ver instrucciones de pago" / "Pagado hasta hoy: $8,000 · 2%"
- Card de asesor asignado (derecha): foto + nombre "Carlos Méndez" + "Disponible ahora" / preguntas rápidas: "¿Cuándo es mi próximo pago?" / "¿Qué estado está el contrato?" / "Tengo una duda sobre el documento"
- Estado del proceso (bottom): timeline de 7 pasos: Formulario KYC ✓, Documentación CRM ✓, Formulario de (activo), Plan de Pagos, Promesa de, Contrato, Firma Final + "Ver detalle →"

### Mi Compra — Tu proceso de compra (pág. 12)
- "Tu proceso de compra — Sigue estos pasos para completar tu inversión en Duna Residencias"
- 6 pasos verticales con estados:
  1. Reserva pagada → Completado ✓ / fecha
  2. KYC — Conoce tu cliente → Completado ✓ / "Completar ahora →"
  3. Promesa de Compraventa → En revisión / "Expedición en el paso anterior"
  4. Plan de Pago → Sin iniciar / "Expedición en el paso anterior"
  5. Documentación de pago → Sin iniciar (gris)
  6. Firma del contrato → Sin iniciar (gris)

### Mi Plan de Pagos (pág. 12)
- Header: "Mi plan de pagos" + total del plan + valor acumulado + próximo pago
- "Makai Residences — Agente asignado: [nombre]"
- Tabla de tramos:
  - Tramo 1 completado (verde): Reserva · fecha · $2,500 → $2,500 completado
  - Tramos pendientes con fechas y montos
- Desglose al fondo: Descuento (%), Entrada residencial (%), Extra + Amenity (%/monto), Cierre + Gamerap (%/monto)

### Mis Documentos (pág. 12)
- Lista de documentos:
  - KYC — Formulario Conoce tu Cliente → "Firmar" (botón naranja)
  - Promesa de Compraventa → "Firmar" (botón naranja)
  - Plan de Pagos Personalizado → "Ya firmado" (verde)
  - Brochure Obra Residencial → "1 Descarga"
  - Ficha Unidad #22 → "1 Descarga"

### Mi Unidad (pág. 12)
- Card de la unidad con foto
- Datos: Makai Residences, dirección, características (camas, baños, sqft)
- Operaciones financieras: tabla con Precio de compra, Reserva, Valor estimado, Cuotas pendientes, Total acumulado
- Sección de documentos: lista de docs asociados a la unidad

### Avance de Obra (pág. 12)
- "Avance de obra — Seguimiento detallado del avance de tu proyecto"
- Barra de progreso grande: 18%
- "Datos del proceso" — lista de hitos/etapas completadas
- Galería de fotos por trimestre: Q1 (4 fotos), Q2 (4 fotos), Q3 (4 fotos), Q4 (4 fotos) — cada una con número de referencia

### Mensajes (pág. 12)
- "Mensajes — Comunicación directa con el equipo de Duna Development"
- Chat thread estilo iMessage/WhatsApp
- Mensaje del equipo Duna: "Hola [Nombre], la noticia de tu KYC está pendiente. Necesitamos el pago el X de las. Para terminar..."
- Respuesta de Carlos Méndez: "Perfecto Carlos, muchas gracias. ¿Ya tienes confirmado el pago el X de 2026?"
- Respuesta automática: "El KYC se replay Laurent será en revisión por nuestro equipo legal. Te avisamos en a 24h."
- Campo de texto + botón Enviar

---

## Mi Perfil — 4 tabs (PDF pág. 5)

### Tab 1: Datos personales
- Alerta: "Tu perfil está al 80% — completa todos los campos"
- Advertencia azul sobre datos y documentos legales
- Campos: Nombre, Apellido, Expediente CRM ID, Siglas, Nota, teléfono, email
- Botón "Guardar cambios"

### Tab 2: Acceso y seguridad
- Correo electrónico (con verificación)
- Contraseña (actualizar con confirmación actual + nueva + confirmar nueva)
- Verificación de dos pasos (2FA): estado "Pendiente" + botón "Activar verificación en dos pasos"
- Historial de accesos: lista de dispositivos/IPs/fechas

### Tab 3: Preferencias
- Idioma: dropdown (Español, etc.)
- Moneda: dropdown (América Santo Domingo) + botón Guardar cambios
- Notificaciones: toggles On/Off + frecuencia para cada tipo:
  - Recordatorio de pago
  - Estado de documentos
  - Avance de Obra
  - Mensaje del broker
  - Novedad del proceso
  - Otros (y resumen semanal)

### Tab 4: Zona de peligro
- "Tomar un control activo — algunas acciones son irreversibles"
- Advertencia sobre documentos legales y proceso activo
- Enlace de contacto: admin@makaibeta@makai.com
- Exportar mis datos: descripción + botón "Solicitar exportación de datos" (ZIP con toda la info)
- Eliminar cuenta: dos condiciones:
  - Si hay compra en proceso: bloqueado — "No puedes eliminar tu cuenta mientras tienes una compra en proceso. Tu expediente CRM contiene contratos activos..."
  - Si no hay compra: disponible con confirmación

---

## Panel Admin — Dashboard Global (PDF pág. 4 superior derecha)

- Header: "D DUNA CRM" + "Dashboard" + buscador "Buscar cliente, expediente..." + icono notificaciones (badge 31) + avatar Admin Duna
- Sidebar: Dashboard, Expedientes (badge), Gestión Documental (badge), Reservas y Contratos (badge), Proyectos, Postventa, Aprobaciones (badge rojo), Tareas (badge rojo)
- Métricas superiores (4 cards): Expedientes activos (41, X incompletos), Documentos pendientes (5, X sin prioridad), Aprobaciones en cola (7, X alta prioridad), Tareas vencidas (12, X escaladas hoy)
- Proyectos activos (tabla): Makai Cap Cana, Naviva Residences, LIV at Cap Cana, Album Corpore — con columnas de unidades totales, vendidas, disponibles + "Ver todo →"
- Aprobaciones urgentes: lista con nombre del cliente, tipo (descuento/cancelación/devolución), monto, asesor, días restantes + botones "Aprobar" y X
- Expedientes recientes: lista con avatar, nombre, estado (Pendiente/Validado) + "Ver todos →"
- Tareas del día: lista con tarea, asignado a, fecha + "Ver todas →"
- Alerta: "A 33 alertas activas — Requieren atención"

---

## Panel Admin — Panel de Control (PDF pág. 6 superior izquierda)

- "Panel de Control — Makai Residences Cap Cana — Vista interna del equipo Duna Development"
- Alertas siguientes acciones: lista de tareas urgentes con botones "Resolver"
- Estado del inventario: Total (102), Vendidas (22 = 22%), Disponibles (80 = 78%), Reservadas (0 +badge), Pendientes (0 +badge)
- Gráfico de progreso del proyecto + línea de tiempo
- Respuesta estimada total
- Funnel de conversión — 14 días: Visitas → Registro → Consultas → Reserve (con números)
- Ventas por semana: gráfico de barras (últimas semanas)
- Unidades sin contrato con reservas: lista por proyecto (Makai, Naviva, Lift, Album) con monto, contratos/tipología
- Actividad reciente del equipo: lista de eventos recientes (nuevo registro, unidad marcada disponible, lead sin contactar, aprobación pendiente, pago confirmado)
- Analytics últimas 14 días: Visitantes (740), Bounce rate (57%), Avg session (2m53s), Conversion (10%), Abandono (2%)

---

## Panel Admin — Vista Makai desde Admin (PDF pág. 6 superior derecha)

- Header: "MAKAI RESIDENCES — Cap Cana — Proyectos Transacciones"
- Métricas: "22 vendidas · 80 disponibles — $41.99M USD"
- KPIs: $8.99M vendido total, 22 vendidas, 15.33% de retorno, $8,126 revenue/unidad
- Gráfico de velocidad de ventas (líneas)
- Inventario de disponibilidad: tabla con tipos de unidad, cantidades
- Costos de operación
- Acceso rápido al CRM

---

## Panel Admin — Gestión de Unidades (PDF pág. 6 inferior izquierda)

- "Unidades — Ver, editar y gestionar todas las unidades del proyecto"
- Métricas: 102 total, 75 disponibles, X no listas, X reservadas, 23 vendidas, 4 pendientes
- Buscador + filtros: Todas / Disponible / No listo / Vendido / Pendiente / [otros]
- Tabla con columnas: checkbox, Unit #, Estado (badge de color), Floor, Tipología, Price, Bed, Bath, Sqft, ROI%, Views, [columnas adicionales], toggle de disponibilidad (On/Off verde)
- Botones: Exportar Global + Nueva Unidad

---

## Panel Admin — Transacciones (PDF pág. 6 inferior derecha)

- "Transacciones — Registro de todas las transacciones online — Makai Residences Cap Cana"
- Métricas: 15 Totales, 10 Vendidas, 1 En proceso, 4 Rembolsadas, $9.16M Total de ventas, $417,400 Precio valor
- Alerta: "X ventas pendientes de pago — Requieren seguimiento"
- Buscador + filtros: Todas / Vendido / Reservado / En proceso / Rembolsado
- Tabla con columnas: #Trans, Estado (badge), Cliente, Email, Precio, Agente, Fecha, Días
- Botón: Exportar + Nueva transacción

---

## Informe de Transacciones (PDF pág. 7 izquierda)

- "Informe de transacciones — Consulta y filtra los datos libremente. Para exportar necesitas un código de autorización del administrador"
- Tipos de informe seleccionables:
  - Todas las transacciones (23 registros)
  - Solo ventas cerradas (22 registros)
  - Pipeline activo (1 registros)
  - Por mes y fuente UTM
  - Rendimiento por agente
  - Cancelaciones
- Vista puerta de datos (tabla): Filtros (Todas/Vendido/Rembolsado/Pendiente), columnas: #, Estado, Cliente, Precio, Agente, Fecha, Origen
- Configurar exportación: Formato (CSV/Excel/PDF), Fecha inicio/fin, Campos incluidos
- Botón: Exportar CSV
- Historial de exportaciones: lista de exportaciones previas con formato, fecha, usuario + botón Repetir

---

## Login / Register (PDF pág. 7 centro)

### Login
- Imagen del proyecto (Makai Residences con foto del edificio y palmeras)
- "Sign In to Makai Price List & Plans"
- Campos: Email, Password
- Botón "Sign In" (verde)
- "Sign In with Google" (outline)
- Links: "Forgot password?" y "Don't have an account? Register"

### Register
- Misma imagen de fondo
- Campos: First Name, Last Name, Email, Country (dropdown), Contact Number (con bandera), Create Password
- Checkbox: "Acepto los Términos y Condiciones"
- Botón "Register Now" (verde)
- Link: "Already have an account? Login"
- Sticky note amarilla señalando: "indicar si eres profesional o cliente final — Si es broker, el usuario se queda pendiente de aprobación"

---

## Registro de Usuarios — Admin (PDF pág. 7 derecha)

- "Registro de Usuarios — Directorio unificado de todos los usuarios de la plataforma — clientes, agentes, brokers y administradores"
- Métricas por rol: 16 Total, 15 Activos, 4 Clientes, 7 Agente, 3 Broker, 1 Agencia, 1 Admin
- Buscador por nombre, email, expediente
- Tabs: Todos (16) / Clientes Duna / Agentes Duna / Agentes Senior / Broker / Agencia Senior / Administradores
- Tabla con columnas: avatar+nombre, rol (badge de color), email, teléfono, fecha registro, proyecto, toggle activo/inactivo, acciones (editar, ver, eliminar)

---

## Portal de Profesionales — Brokers y Agencias (PDF pág. 8)

### Dashboard del Broker
- Nombre de la agencia: "Sunset Real Estate"
- KPIs: 3 tipologías, 2 clientes, $97,960 comisiones, $13,600 comisiones esta semana
- Lista de clientes: tabla con nombre, proyecto, estado (badge) + monto + botón Reservar
- "A la lista de clientes" enlace

### Mis Clientes — detalle
- "Mis clientes — Gestiona los clientes registrados en tu lista de clientes (actualmente X). Te animas primero en XYZ para que el cliente X pase a la siguiente y lleve la reserva. Debes sacar mensaje más activos en el tuyo."
- Botón: Registrar cliente
- Lista de clientes con foto, nombre, estado, monto, fecha, botón Reservar
- Calculadora de comisión integrada (campo de cálculo al pie)
- Total calculado: "$71,000"

### Mi Acuerdo de Colaboración
- Formulario con campos del acuerdo
- Sección de búsqueda de unidad
- Notas adicionales
- Botones: Sin confirmación / Continuar

### Comisiones y Facturas
- Métricas: comisión pendiente total, comisión validada, pendiente de pago
- Lista de transacciones con: nombre cliente, proyecto (badge), monto, estado (Activo/Pendiente), botones (Enviar, Factura, Certificado)
- Advertencia sobre acuerdo no confirmado y fecha límite

### Analítica de Comisiones
- "Por proyecto": tabla con Makai, Independiente, Lift, Agencia — con montos
- "Top profesionales": lista con foto, nombre, monto
- "Agencias vs Brokers independientes": comparativa con porcentajes y montos
- Estado de planes de comisión: Renovación pendiente (monto), Vencidas-supuestas (monto), Facturación en emisión (monto), Aprobadas sin liquidar (monto)

### Material de Ventas
- "Solo puedes usar material aprobado por Duna. No está permitido modificar, vender ni usar este material publicitario (Art. 5 del Acuerdo)."
- "Si todo el material está registrado y firmado digitalmente. Si no tienes un item de los firmados del Acuerdo que obligatoria es el que la documento anterior."
- Grid de recursos (cards con icono + título + descripción + botón de descarga):
  - Presentación del proyecto (PDF, 12 páginas por Duna)
  - Planos de unidades (PDF oficial)
  - Video tour 3D (MP4, 4 min sin edición)
  - Ficha de inversión
  - Brochure oficial (Fracción · Precio 99.99%)
  - Kit de redes sociales (Primario + planta · Medidas ajustadas)
  - Fotos avance obra (Real · 12 fotos recientes)
  - Calculadora de comisión

### Mensajes con Duna Development
- "Mensajes con Duna Development — Comunicación directa con el equipo comercial y administración"
- Chat thread:
  - Duna equipo: "Hola Simon, la comisión de la cual fue presentada. Medición el pago el X de enero."
  - Simon (broker): "Perfecto Carlos, muchas gracias. ¿Ya tienes confirmado el pago el X de 2026?"
  - Duna: "El KYC se replay Laurent será en revisión por nuestro equipo legal. Te avisamos en 24h."
- Campo de texto + botón Enviar

---

## Gestión de Externos — Admin (PDF pág. 11)

### Vista principal de Comisiones y Externos
- "Comisiones y Externos — Makai Residences"
- Métricas: $9,250 (comisión interna), $45,756.00 (comisión externa), $17,346 Regular, $13,670 (broker asignado)
- Alerta urgente: "1 cambio brillantemente — momento de las primero del pedido"
- Botón: Pagar ahora
- Alerta: "5 para notificado — porcentaje de la primera"
- Tabla de comisiones externas: columnas — código, nombre broker/agencia, tipo (badge Agencia/Independiente), email, teléfono, toggle activo, acciones

### Comisiones que esperan acción
- Lista con nombre agente, tipo, monto ("$15,740.00 Comisiones pendientes aprobación")
- Cada item con estado y botón de acción
- "$6,306.00 Comisiones nuevas" (segunda sección)

### Analítica de comisiones
- "Por profesional": tabla con nombre, monto (Respanish, IndéPanish, Lift, Agencia)
- "Top profesionales": lista con foto+nombre y monto
- "Agencias vs Brokers independientes": barras de comparativa
- "Estado de planes de comisión": Renovación pendiente, Vencidas, Facturación en emisión, Aprobadas sin liquidar

### Retenciones DGII
- "Retenciones — todos los vendedores utilizados están obligados para la Dirección General de Impuestos Internos (DGII)"
- Advertencia legal: "Bueno Señor, Hola al Art. 7 del Decreto de Agentes. Toda está obligado a retener: Persona Jurídica (empresa): 10% (Art. 15(a)) sobre el monto de la comisión. Persona Física: Cantidad: 12% (203 · 124 Código Tributario) · El monto del saldo en el nombre de la retención."
- Tabla con columnas: nombre broker/agente, tipo, comisión bruta, retención (%), neto, estado, acciones + botón "Retención [x]"
- Totales al pie: suma columnas
- Botones: Exportar (solo brokers) + Anunciar Solicitud de comisiones

---

## Módulo Presupuesto / Plan de Pagos (PDF pág. 10)

### Configuración básica del presupuesto
- Header: "Módulo Financiero — Unidad #56 — Giuseppe Gangemi"
- Tabs: Plan financiero / Tramos / Pack Bienvenida / Resumen global
- Sección configuración: campos de precio, forma de pago
- Tramo 1 — Reserva (completado): datos completados
- Tramo 2 — Tramoy Centro-Agito (checkbox): datos con fechas y montos
- Tramo 3 — Cuotas mensuales (%): tabla con fechas, montos, estado (Pagado/Programado/Pendiente)
- Tramo 4 — Contra entrega (%): detalles finales
- Botón: Añadir tramo de financiamiento

### Tramos de pago
- Tabla detallada por tramos con columnas: fecha, monto, estado, observación
- Cada cuota marcada con estado y montos

### Pack de Bienvenida
- "Pack de bienvenida — Bienvenido al equipo Duna. Ahora necesitas firmar digitalmente los siguientes documentos para completar tu proceso de compra."
- Lista de 4 items:
  - KYC — Conoce tu Cliente → estado (firmado) + "Revisar firma"
  - Promesa de Compraventa → "Abierto para firma" (pendiente) + "Firmar para firma"
  - Plan de Pagos → "Abierto para firma" + "Firmar para firma"
  - Contrato de compra → sin iniciar
- Checklist para iniciar el proceso:
  - Insertar pagos y confirmar saldo ○
  - KYC completado y firmado por todos los socios ○
  - Promesa de CompraVenta firmada ○
  - Plan de pago firmado ○
  - 1 documentos por titular validado ○
- Botón: "Iniciar Proceso Ahora →" (gris/bloqueado)

### Resumen financiero global
- Estructura del plan de pagos: Precio Activo, Descuento (-monto), Inventario al día, Plazo de venta, Grupo → Extra + Amenity, Stages → Downpayment (%), Cierre → Gamerap (%), TOTAL DEL CONTRATO: $596,500.00
- Estado de cobro (columna derecha): %, %, $, total sin completar, recibo pendiente, Pendiente Total: $44,650.00 + fecha estimada 12 ago. 2026
- Comisiones brutas registradas: tabla con monto agente, monto extra, total (todos en $0.00 / vacíos)

---

## Avance de Obra — Vista Admin (PDF actualización cliente, mayo 2026)

Pantalla para que el administrador cree y publique reportes de avance de obra visibles en el portal del comprador.

### Header
- Título: "Avance de Obra — Makai Residences Cap Cana"
- Selector de fecha (mes/periodo del reporte)
- Botón "Polo de Avance" (acción principal)

### Tabs
- **Nueva reporte** (activo por defecto) — formulario de creación
- **Mis reportes** — historial de reportes publicados
- **Material** — gestión de archivos y fotos

### KPIs (fila superior)
- **18%** — Avance actual del proyecto
- **22** — Completadas a verificar
- **0/12** — (tareas/hitos del periodo)
- **3/11** — Completadas / total del periodo

### Sección: Datos del reporte
- Selector de periodo (ejemplo: "Mayo 2026")
- Barra de progreso del avance: "13%" con label "175 completadas"
- Campo de texto: resumen interno del reporte (para el equipo)

### Sección: Resumen para los compradores
- Editor de texto para el mensaje que verán los compradores en su portal
- Texto editable, tono informativo y positivo

### Sección: Notificaciones
- Toggle "Notificar a los compradores" (on/off)
- Checkbox de canal: Email
- Preview del mensaje de notificación que se enviará
- Nota: "Función de enviará mensajes de WhatsApp al número confirmado" — indica integración WhatsApp también

### Sección derecha: Avance informativo (galería de fotos)
- Grid de thumbnails de fotos organizadas por categorías/etapas (cuadrados placeholder cuando vacíos)
- Botón "Subir todas las fotos" (bulk upload)
- Las fotos se agrupan visualmente por sección o fase de obra

### Footer: Publicar reporte
- Texto explicativo: "Al publicar, los reportes estarán visibles en el portal de todos los compradores y se enviará notificación a los compradores"
- Botón secundario: "Enviar borrador"
- Botón secundario: "Ver / Modificar"
- Botón primario (verde): "Publicar reporte" — acción principal que dispara notificaciones

---

## Comunicación y Plantillas — Módulo Admin (PDF actualización cliente, mayo 2026)

Módulo completo de comunicaciones automatizadas. Accesible desde el panel de administrador.

### Navegación del módulo (4 tabs)
1. **Plantillas**
2. **Automatizaciones**
3. **Historial**
4. **Configuración**

---

### Tab 1: Plantillas de comunicación

- Header con contador de plantillas + botón "Nueva plantilla"
- Lista de plantillas con:
  - Toggle on/off (activar/desactivar plantilla)
  - Nombre de la plantilla
  - Tags de canal: `Email` y/o `WhatsApp` (badges de color)
  - Botón "Ir a la plantilla" (editar)

**Plantillas existentes (referencia):**
- Bienvenida por nuevo — Email
- Recordatorio KYC pendiente — Email
- Recordatorio pago próximo — WhatsApp
- Actualización hace un día — Email / WhatsApp
- Cuotas Bellaguardia — WhatsApp
- Cuotas próxima a vencer — La día — WhatsApp
- Carta cuota vencida — Email
- Tramo nueva vencida — Email

---

### Tab 2: Automatizaciones

- Descripción: envíos automáticos basados en eventos del sistema
- Lista de automatizaciones con toggle on/off + nombre + "N Pasos"
- Cada automatización es un flujo de pasos configurables (0 pasos = sin configurar aún)

**Automatizaciones existentes:**
- Por reserva — 0 Pasos
- Recordatorio de KYC — 0 Pasos
- Recordatorio de pago — 0 Pasos
- Pago realizado — 0 Pasos
- Segunda vencimiento — 0 Pasos
- Control de equipado — 0 Pasos
- otro tipo, acción test — 0 Pasos (placeholder)
- otro tipo, acción yrd — 0 Pasos (placeholder)

---

### Tab 3: Historial de envíos

- Botón "Importar historial"
- Tabla con columnas: Fecha · Destinatario (nombre + email/teléfono) · Canal (badge WhatsApp / Email) · Estado · Acción
- Nombres de ejemplo en la pantalla: Henrique Segala, Peter Kleier, Julian Glimko, Ethan Laurent, Diana Romero, Martha Roma, Silvio Rome, Ana T. Demi

---

### Tab 4: Configuración de canales

**Sub-tab Email:**
- Campo: dirección de envío (ejemplo: `mercedes@developer(project).com`)
- Botón "Configurar"
- Descripción sobre el remitente y configuración SMTP

**Sub-tab WhatsApp Business API:**
- Campo: Token
- Campo: Phone ID
- Campo: Cuenta (nombre de la cuenta de negocio)
- Botón "Generar URL" (para webhook)
- Instrucciones de configuración con Meta/Facebook Business
- Botón primario (verde): "Conectar WhatsApp Business API"
- Nota legal sobre requerimientos de Meta Business

---

## Portal Admin Duna — Vista de Agente/Asesor (PDF actualización cliente, mayo 2026)

Portal propio para agentes de Duna Development (distinto del panel de administrador global). Usuario de ejemplo: "Carlos Duna".

### Sidebar de navegación
- Mi Dashboard
- Mis Clientes
- Mi Pipeline
- Mis Tareas
- Transacciones *(acceso limitado según plan)*
- Anuncios *(sección de comunicados internos)*
- Mensajes
- Avatar + nombre del agente al pie (ej. "Carlos Duna")

---

### Mi Dashboard
- Panel "Trader Monitor" con métricas del agente
- Cards de KPIs propios (leads, cierres, comisiones)
- Lista de actividad reciente o alertas del día
- Tabla o resumen de clientes en proceso

---

### Mis Clientes
- Lista de clientes asignados al agente
- Cada fila: nombre del cliente, estado del proceso (badge), monto de la operación, botones de acción
- Filtros y búsqueda propios del agente

---

### Mi Pipeline
- Vista kanban o por etapas del pipeline de ventas personal
- Columnas/etapas del proceso de compra
- Cards de clientes en cada etapa con nombre y datos clave

---

### Mis Tareas
- Lista de tareas asignadas al agente
- Cada tarea: descripción, cliente relacionado, fecha límite, estado

---

### Transacciones *(estado vacío)*
- Empty state: `"Acceso a transacciones limitado en este plan"`
- Implica que el acceso a transacciones se controla por nivel/plan del agente

---

### Anuncios *(estado vacío)*
- Empty state: `"Click en Comenzar ahora Prueba"`
- Sección para comunicados internos de Duna hacia los agentes

---

### Mensajes *(estado vacío)*
- Empty state: `"No tienes mensajes todavía"`
- Chat o bandeja de mensajes del agente con clientes o con el equipo Duna
