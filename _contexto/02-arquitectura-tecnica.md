# CRM Duna — Arquitectura Técnica

## Stack decidido

| Capa | Tecnología | Notas |
|---|---|---|
| Frontend | Next.js 14 + React | App Router, SSR para SEO en páginas públicas |
| Auth | NextAuth.js + JWT | Middleware de protección de rutas por rol |
| Base de datos | PostgreSQL | Via Supabase (auth + storage + realtime incluidos) |
| Storage | AWS S3 / Cloudflare R2 | Documentos, planos, fotos de obra |
| Email | Resend o SendGrid | Notificaciones automáticas del flujo |
| Pagos | Stripe | Pago de cuotas online desde portal comprador |
| Firma digital | DocuSign o similar | 4 contratos del flujo post-reserva |
| WhatsApp | Twilio / Meta Business API | Chat pre-cargado y mensajes automáticos |
| Videollamadas | Google Calendar API | Agendado de citas con asesores |
| Moneda | Exchangerate API | Conversor en tiempo real USD → EUR/CAD/BRL/COP/MXN |

## Capas de la arquitectura

```
FRONTEND (Next.js)
├── Páginas públicas (landing por proyecto, tipologías, precios)
├── Auth (login, register, recuperación)
├── Portal Comprador (área privada del cliente)
├── Panel Agente
├── Panel Agente Senior
├── Panel Admin
└── Portal Profesionales (Brokers/Agencias)

API LAYER (Next.js API Routes)
├── /api/projects — CRUD de proyectos
├── /api/units — Unidades / tipologías
├── /api/users — Usuarios y roles
├── /api/payments — Pagos y transacciones
├── /api/documents — Documentos y firmas
├── /api/chat — Mensajes internos
├── /api/automation — Motor de automatización
├── /api/brokers — Gestión de externos
└── /api/reports — Reportes y exportaciones

BASE DE DATOS (PostgreSQL)
├── projects
├── units
├── users
├── payments
├── documents
├── chat_messages
├── leads
├── brokers
├── commissions
└── automation_logs
```

## Módulo de automatización (7 pasos post-reserva)

Cuando un cliente confirma una reserva, el sistema ejecuta automáticamente:

1. Generación y envío del enlace KYC al cliente
2. Sincronización de datos KYC → ficha CRM
3. Generación del formulario de reserva pre-completado + envío
4. Generación del plan de pagos + envío
5. Generación del borrador de promesa de compraventa + envío
6. Generación del contrato definitivo + envío a titulares
7. Envío de copia compulsada al cliente

## Documentos que requieren firma digital (en orden)

1. Formulario KYC
2. Plan de Pagos
3. Contrato de Promesa de Compra
4. Contrato de Compra del Inmueble

## Multi-tenancy por proyecto

El CRM es una sola plataforma pero se adapta por proyecto:
- Subdominio propio por proyecto (o parámetro de URL)
- Branding cargado dinámicamente (colores, logo, banner, fuentes)
- Las unidades/tipologías se filtran por proyecto
- El selector de proyecto en el header permite cambiar entre desarrollos sin salir de la plataforma

## Seguridad y roles

5 niveles de acceso controlados por middleware de Next.js:

```
visitante → comprador → agente → agente_senior → admin
```

Las rutas se protegen por rol:
- `/portal/*` → comprador
- `/agente/*` → agente o superior
- `/admin/*` → solo admin
- `/profesionales/*` → broker (pendiente aprobación) o aprobado
