# CRM Duna — Contenidos y Textos de UI

Microcopy, CTAs, mensajes del sistema y textos clave de la interfaz.

---

## Frontend Público — Header

- `"21 OF 102 UNITS SOLD"` (contador global en rojo/coral)
- `"(icono led verde gif) 32 Usuarios en línea ahora mismo"` (en rojo)

---

## Frontend Público — Cards de Tipología

### Estados de la card
- Disponible: sin texto de estado
- Pendiente: `"PENDING"`
- Vendida: `"SOLD"`
- Segunda oportunidad: `"Esta unidad fue liberada hace 3 días"` (implica que alguien la tuvo reservada y la soltó)
- Temporizador: `"Tu unidad está reservada por 48 horas"` (countdown)

### Badge de descuento (card)
- `"UNLOCK $20,000 DISCOUNT"` (en verde)
- Tooltip al hacer hover: `"Válido hasta el 30 de abril"`

### Badge de interés
- `"ADD TO LIST"` con estrella + contador "Guardada por X personas"

---

## Frontend Público — Popup de Detalle

### Jerarquía de precio
- Precio total: `"$431,000"` (grande, verde)
- Badge: `"UNLOCK $20,000 DISCOUNT"`
- Precio por sqft: `"$450/sqft"` (debajo del precio total)
- Referencia: `"(referencia vs. Miami Beach: $900/sqft)"`
- Comparativa: `"Precio 12% por debajo del mercado en Cap Cana"`
- Entrada: `"Comienza con $5,000"` (en color llamativo, un poco más pequeño que el precio)
- Valor proyectado: `"Precio hoy: $431,000 · Valor estimado en entrega (2027): $490,000+"`

### Contador de demanda en vivo
- `"👁 12 personas están viendo este proyecto ahora mismo."`
- `"👁 23 personas vieron esta unidad hoy y 188 personas esta semana"`
- `"Última consulta hace 2 horas"`

### Estado del asesor
- Disponible: `"Tu asesor está disponible ahora mismo"` (color llamativo + efecto ligero de movimiento)
- No disponible: `"Tu asesor estará disponible en 2h"`
  - Popup de captura: nombre, email, teléfono, hora preferible de llamada

### Botones de acción
- `"RESERVAR ONLINE"` → subtexto: `"Reserva 100% reembolsable"`
- `"AGENDAR VIDEOLLAMADA"`
- `"CONTACTAR POR WHATSAPP CON EL BROKER"`
- `"Enviar a un socio / pareja"` (antes era "Compartir")
- `"Agregar a la lista"` → oferta de alerta: `"Te avisamos si baja de precio o quedan menos de 3 unidades"`
- `"DESCARGA DE RESPONSABILIDAD"`

### WhatsApp pre-cargado
Template: `"Hola, tengo interés en la Unidad [NÚMERO] de [PROYECTO] ([PRECIO] USD). ¿Podemos hablar?"`
Ejemplo: `"Hola, tengo interés en la Unidad 111 de Makai Residences (431K USD). ¿Podemos hablar?"`

---

## Portal del Comprador — Home

### Bienvenida
- `"Buenos días, [Nombre] 🌅"`
- `"Tu inversión en Makai Residences avanza. Tienes X documentos pendientes de tu firma."`

### Banner de urgencia (rojo)
- `"X documentos pendientes de tu firma · Vencen el [fecha] (N días)"`
- Subnota: `"Requiere tu acción"`
- Botón: `"Firmar ahora"`

### Banner informativo (azul)
- `"Tu promesa de compraventa está en revisión por el equipo legal de Duna"`
- Subnota: `"En proceso por Duna"`
- Botón: `"Ver estado"`

### Próximo pago
- Label: `"Próximo pago"`
- Botón: `"Ver instrucciones de pago"`
- Info: `"Pagado hasta hoy: $X,XXX · N%"`

### Asesor asignado
- Estado: `"Disponible ahora"`
- Preguntas rápidas sugeridas:
  - `"¿Cuándo es mi próximo pago?"`
  - `"¿Qué estado está el contrato?"`
  - `"Tengo una duda sobre el documento"`

---

## Portal del Comprador — Mi Compra (Timeline)

Nombre de los pasos:
1. `"Reserva pagada"`
2. `"KYC — Conoce tu cliente"`
3. `"Promesa de Compraventa"`
4. `"Plan de Pago"`
5. `"Documentación de pago"`
6. `"Firma del contrato"`

Estados del paso:
- Completado: `"Completado ✓"` + fecha
- En proceso: `"En revisión"` / `"Abierto para firma"`
- Bloqueado: `"Expedición en el paso anterior"`
- Sin iniciar: gris, sin texto de acción

---

## Portal del Comprador — Mi Perfil

### Tab Datos personales
- Alerta: `"Tu perfil está al [N]% — completa todos los campos"`
- Advertencia: `"Los datos marcados con * aparecerán directamente en tus contratos y documentos legales. Asegúrate de que coincidan exactamente con tu documento de identidad."`

### Tab Acceso y seguridad
- 2FA pendiente: `"Verificación de dos pasos — Pendiente"`
- CTA 2FA: `"Activar verificación en dos pasos"`
- Subtexto: `"Si ya tienes todos tus documentos y contratos activos, activar esto el pregunta la información de uso de que aguja usted ya sabe"`

### Tab Zona de peligro
- Título: `"Tomar un control activo — algunas acciones son irreversibles"`
- Advertencia: `"Los datos marcados con * aparecerán directamente en tus contratos y documentos legales. Asegúrate de que coincidan exactamente con tu documento de identidad."`
- Exportar datos: `"Solicitar exportación de datos"` → descripción: ZIP con toda la info personal, documentos firmados, historial de pagos y comunicaciones
- Eliminar cuenta (bloqueada): `"No puedes eliminar tu cuenta mientras tienes una compra en proceso. Tu expediente CRM contiene contratos activos y documentos pendientes de firma. Para solicitar la cancelación de la compra, contacta a tu broker o al equipo de Duna."`

---

## Portal del Comprador — Mensajes

Ejemplo de thread:
- Duna: `"Hola [Nombre], la noticia de tu KYC está pendiente. Necesitamos el pago el X para terminar..."`
- Carlos Méndez: `"Perfecto Carlos, muchas gracias. ¿Ya tienes confirmado el pago el X de 2026?"`
- Duna (auto): `"El KYC está en revisión por nuestro equipo legal. Te avisamos en 24h."`

---

## Pack de Bienvenida — Textos

- Título: `"Pack de bienvenida"`
- Subtítulo: `"Bienvenido al equipo Duna. Ahora necesitas firmar digitalmente los siguientes documentos para completar tu proceso de compra."`
- Botón principal (bloqueado): `"Iniciar Proceso Ahora →"`
- Checklist:
  - `"Insertar pagos y confirmar saldo"`
  - `"KYC completado y firmado por todos los socios"`
  - `"Promesa de CompraVenta firmada"`
  - `"Plan de pago firmado"`
  - `"1 documentos por titular validado"`

---

## Portal de Brokers — Material de Ventas

Aviso legal: `"Solo puedes usar material aprobado por Duna. No está permitido modificar, vender ni usar este material publicitario (Art. 5 del Acuerdo). Si todo el material está registrado y firmado digitalmente. Si no tienes un item de los firmados del Acuerdo que obligatoria es el que la documento anterior."`

---

## Admin — Dashboard

- Alerta global: `"A [N] alertas activas — Requieren atención"`
- Aprobaciones urgentes: usa nombres reales de clientes en producción

---

## Mensajes del Sistema / Notificaciones automáticas

Tipos de notificación configurables:
- Recordatorio de pago (N días antes del vencimiento)
- Estado de documentos (cuando cambia estado)
- Avance de Obra (cuando se publica nueva actualización)
- Mensaje del broker (nuevo mensaje en el chat)
- Novedad del proceso (cuando avanza un paso del timeline)
- Resumen semanal (digest de todos los eventos de la semana)

---

## Idiomas

El sistema es **bilingüe español/inglés**. Los idiomas disponibles se configuran por proyecto desde Admin → Configuración → Lanzamiento y Ventas.

Merge tags para emails:
- `{{Nombre}}` / `{{Name}}`
- `{{Asesor}}` / `{{Advisor}}`
- `{{Proyecto}}` / `{{Project}}`
- `{{Unidad}}` / `{{Unit}}`
- `{{Precio}}` / `{{Price}}`
- `{{FechaProximoPago}}` / `{{NextPaymentDate}}`
- `{{MontoProximoPago}}` / `{{NextPaymentAmount}}`

---

## Avance de Obra — Admin *(nuevo mayo 2026)*

### Acciones del reporte
- Botón borrador: `"Enviar borrador"`
- Botón revisar: `"Ver / Modificar"`
- Botón publicar (primario): `"Publicar reporte"`
- Descripción al publicar: `"Al publicar, los reportes estarán visibles en el portal de todos los compradores y se enviará notificación a los compradores"`
- Ejemplo de nombre del reporte: `"Publicar reporte de Mayo 2026"`

### Notificaciones al publicar
- Toggle: `"Notificar a los compradores"`
- Nota WhatsApp: `"Función de enviará mensajes de WhatsApp al número confirmado"`

### Galería de fotos
- Botón upload: `"Subir todas las fotos"`

---

## Comunicación y Plantillas *(nuevo mayo 2026)*

### Plantillas
- Botón nuevo: `"Nueva plantilla"`
- Botón editar: `"Ir a la plantilla"`

### Automatizaciones
- Descripción general: texto explicativo sobre envíos automáticos basados en eventos del sistema

### Historial
- Botón: `"Importar historial"`

### Configuración — WhatsApp Business API
- Botón conectar: `"Conectar WhatsApp Business API"`
- Botón helper: `"Generar URL"`
- Nota legal: referencia a requerimientos de Meta/Facebook Business para activar la API

---

## Portal Admin Duna — Agente *(nuevo mayo 2026)*

### Empty states por sección
- Transacciones: `"Acceso a transacciones limitado en este plan"`
- Anuncios: `"Click en Comenzar ahora Prueba"`
- Mensajes: `"No tienes mensajes todavía"`

### Dashboard del agente
- Panel principal: `"Trader Monitor"` (nombre del widget de métricas del agente)
