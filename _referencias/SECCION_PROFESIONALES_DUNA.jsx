import { useState } from "react";

/* ═══════════════════════════════════════
   TOKENS
═══════════════════════════════════════ */
const C = {
  bg:"#F4F0E8", bgWarm:"#EDE8DE", bgCard:"#FFFFFF", bgInput:"#F8F5EF",
  sidebar:"#2E3D28", sidebarMid:"#364830",
  gold:"#B8942A", goldLight:"#D4AE50", goldBg:"#FBF5E6",
  green:"#3A6B35", greenBg:"#EBF3E9",
  amber:"#9A6B1E", amberBg:"#FDF4E3",
  red:"#B03A2E", redBg:"#FCECEA",
  blue:"#2C5F8A", blueBg:"#EBF2FA",
  teal:"#2A7A6A", tealBg:"#E8F5F2",
  purple:"#6B3FA0", purpleBg:"#F0EAF8",
  border:"#E0DAD0", text:"#26231C",
  textSub:"#6B6355", textMuted:"#A09080",
  shadow:"0 1px 4px rgba(0,0,0,0.07)",
  shadowMd:"0 6px 24px rgba(0,0,0,0.13)",
};
const FH="'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const FB="Georgia,'Times New Roman',serif";
const FM="'Courier New',Courier,monospace";

/* ═══════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════ */
const PROFESIONAL = {
  nombre:"Júnior Bourassa",
  empresa:"Sunset Real Estate",
  tipo:"agencia",          // "broker" | "agencia"
  pais:"🇨🇦 Canadá",
  email:"juniorbourassa@sunsetrealestate.ca",
  tel:"+1 873-354-0971",
  rnc:"N/A (Extranjero)",
  licencia:"QC-2021-4872",
  banco:"TD Canada Trust",
  iban:"CA98 TDCT 0210 0102 1234 56",
  swift:"TDOMCATTTOR",
  onboardingCompleto:true,
  acuerdoFirmado:true,
  acuerdoVence:"2027-02-17",
  comisionRate:6,
  estado:"activo",   // "activo" | "pausado" | "suspendido" | "pendiente"
};

const CLIENTES_BROKER = [
  { id:1, nombre:"Achraf Benzakour",  unidad:"#319", precio:413000, estado:"vendido",  etapa:"Contrato firmado",    fecha:"17 abr 2026", comision:24780, comisionEstado:"pagada",    activo:false },
  { id:2, nombre:"Anis Chaabouni",    unidad:"#426", precio:325000, estado:"vendido",  etapa:"Promesa firmada",     fecha:"17 abr 2026", comision:19500, comisionEstado:"pendiente", activo:false },
  { id:3, nombre:"Sophie Laurent",    unidad:"#412", precio:520000, estado:"reservado",etapa:"KYC en revisión",     fecha:"14 abr 2026", comision:31200, comisionEstado:"bloqueado", activo:true  },
  { id:4, nombre:"Marco Vitelli",     unidad:"#207", precio:375000, estado:"pendiente",etapa:"Propuesta enviada",   fecha:"10 abr 2026", comision:22500, comisionEstado:"bloqueado", activo:true  },
  { id:5, nombre:"Diane Moreau",      unidad:null,   precio:null,   estado:"prospecto", etapa:"Primera consulta",   fecha:"08 abr 2026", comision:null,  comisionEstado:"n/a",       activo:true  },
];

const FACTURAS = [
  { id:"FAC-2026-003", cliente:"Achraf Benzakour", unidad:"#319", precio:413000, comision:24780, retencion:7434,  neto:17346, estado:"pagada",    fechaEmision:"22 abr 2026", fechaPago:"02 may 2026" },
  { id:"FAC-2026-001", cliente:"Anis Chaabouni",   unidad:"#426", precio:325000, comision:19500, retencion:5850,  neto:13650, estado:"pendiente", fechaEmision:"20 abr 2026", fechaPago:null          },
];

const ACUERDO = {
  version:"v2 · 2026",
  fechaFirma:"17 feb 2026",
  fechaVence:"17 feb 2027",
  diasRestantes:292,
  firmadoPor:"Júnior Bourassa",
  contrafirmadoPor:"Josue Axel Virgen González",
  comisionAgencia:"6% precio final de venta",
  condicionPago:"100% al 25% de pago + firma Promesa CV",
  plazoPago:"30 días desde recepción de factura",
  retencion:"30% ITBIS (persona jurídica)",
  renovacionAutomatica:false,
};

const HISTORIAL_ACUERDOS = [
  { version:"v2 · 2026", firmado:"17 feb 2026", vence:"17 feb 2027", estado:"vigente"  },
  { version:"v1 · 2025", firmado:"14 feb 2025", vence:"14 feb 2026", estado:"vencido"  },
];

const MENSAJES = [
  { de:"duna",    nombre:"Carlos Méndez",  txt:"Hola Júnior, la comisión de Achraf ha sido procesada. Recibirás el pago el 2 de mayo.", hora:"Hoy 10:30" },
  { de:"broker",  nombre:"Tú",             txt:"Perfecto Carlos, muchas gracias. ¿Ya tienen confirmado el estado del KYC de Sophie?",  hora:"Hoy 10:42" },
  { de:"duna",    nombre:"Ana Rodríguez",  txt:"El KYC de Sophie Laurent está en revisión por nuestro equipo legal. Te confirmo en 48h.", hora:"Hoy 11:05" },
];

const MATERIALES = [
  { icon:"🖼️", nombre:"Renders del proyecto",    sub:"18 imágenes · Aprobadas por Duna",         tipo:"ZIP"  },
  { icon:"📐", nombre:"Planos de unidades",       sub:"Por tipología · PDF oficial",               tipo:"PDF"  },
  { icon:"🎬", nombre:"Video tour 360°",           sub:"MP4 · 2 min 34s · Alta resolución",        tipo:"MP4"  },
  { icon:"📊", nombre:"Ficha de inversión",        sub:"ROI, plan de pagos, comparativas",          tipo:"PDF"  },
  { icon:"📋", nombre:"Brochure oficial",          sub:"24 páginas · Versión en ES/EN/FR",          tipo:"PDF"  },
  { icon:"📱", nombre:"Kit redes sociales",        sub:"Stories + posts · Medidas aprobadas",       tipo:"ZIP"  },
  { icon:"🏗️", nombre:"Fotos avance obra",         sub:"Abril 2026 · 12 fotos verificadas",        tipo:"ZIP"  },
  { icon:"💰", nombre:"Calculadora de comisión",   sub:"Excel interactivo con tus tasas aplicadas", tipo:"XLSX" },
];

/* ═══════════════════════════════════════
   ONBOARDING FLOW (primer acceso)
═══════════════════════════════════════ */
const ONBOARDING_STEPS = [
  { id:1, title:"Tipo de profesional",     sub:"Broker independiente o Agencia",         done:true  },
  { id:2, title:"Datos personales",         sub:"Nombre, identificación, domicilio",       done:true  },
  { id:3, title:"Datos fiscales y bancarios",sub:"RNC, banco, IBAN/SWIFT",                done:true  },
  { id:4, title:"Licencia inmobiliaria",    sub:"Número de licencia profesional",          done:true  },
  { id:5, title:"Documentos KYC propios",   sub:"ID, referencias bancaria y profesional",  done:false },
];

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
function StatusBadge({ estado, small }) {
  const MAP = {
    activo:      {c:C.green,  b:C.greenBg,  l:"● Activo"     },
    pausado:     {c:C.amber,  b:C.amberBg,  l:"⏸ Pausado"    },
    suspendido:  {c:C.red,    b:C.redBg,    l:"✕ Suspendido"  },
    pendiente:   {c:C.blue,   b:C.blueBg,   l:"◎ Pendiente"  },
    pagada:      {c:C.green,  b:C.greenBg,  l:"✓ Pagada"     },
    pendiente_p: {c:C.amber,  b:C.amberBg,  l:"⏳ Pendiente"  },
    bloqueado:   {c:C.textMuted,b:"#F0EDEA",l:"🔒 Bloqueada"  },
    n_a:         {c:C.textMuted,b:"#F0EDEA",l:"—"             },
    vigente:     {c:C.green,  b:C.greenBg,  l:"✓ Vigente"    },
    vencido:     {c:C.red,    b:C.redBg,    l:"Vencido"       },
    vendido:     {c:C.green,  b:C.greenBg,  l:"Vendido"       },
    reservado:   {c:C.gold,   b:C.goldBg,   l:"Reservado"     },
    prospecto:   {c:C.blue,   b:C.blueBg,   l:"Prospecto"     },
    "pendiente-deal":{c:C.amber,b:C.amberBg,l:"En proceso"   },
  };
  const key = estado==="pendiente"&&!MAP.pendiente_p ? "pendiente_p" : estado;
  const cfg = MAP[estado] || MAP.pendiente;
  return (
    <span style={{
      background:cfg.b, color:cfg.c,
      fontSize:small?"10px":"11px",
      padding:small?"2px 7px":"3px 10px",
      borderRadius:"4px", fontFamily:FM,
      border:`1px solid ${cfg.c}22`,
      whiteSpace:"nowrap",
    }}>{cfg.l}</span>
  );
}

function Card({ children, style={}, noPad }) {
  return (
    <div style={{
      background:C.bgCard, border:`1px solid ${C.border}`,
      borderRadius:"12px", boxShadow:C.shadow,
      padding:noPad?0:"18px 20px", overflow:noPad?"hidden":"visible",
      ...style,
    }}>{children}</div>
  );
}

function SectionHead({ title, sub, right }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px"}}>
      <div>
        <div style={{fontSize:"14px",fontFamily:FH,color:C.text,fontWeight:400}}>{title}</div>
        {sub&&<div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,marginTop:"2px"}}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function Btn({ label, primary, danger, onClick, small }) {
  return (
    <button onClick={onClick} style={{
      background:primary?C.sidebar:danger?C.redBg:"transparent",
      color:primary?"#fff":danger?C.red:C.textSub,
      border:`1px solid ${primary?C.sidebar:danger?C.red+"44":C.border}`,
      borderRadius:"7px",
      padding:small?"5px 12px":"8px 18px",
      fontSize:small?"11px":"12px",cursor:"pointer",
      fontFamily:FB,fontWeight:primary?600:400,
      whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

/* ═══════════════════════════════════════
   ONBOARDING SCREEN
═══════════════════════════════════════ */
function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [tipo, setTipo] = useState("");
  const [form, setForm] = useState({});
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const stepContent = [
    null,
    // Step 1: tipo
    <div key={1}>
      <p style={{margin:"0 0 20px",fontSize:"13px",color:C.textSub,fontFamily:FB,lineHeight:"1.6"}}>
        Selecciona cómo colaboras con Duna Development. Esto determina tu tasa de comisión y los documentos requeridos.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
        {[
          {k:"broker",  icon:"👤", title:"Broker independiente", desc:"Persona física. Comisión: 4% menos retenciones (18% ITBIS + 10% ISR).", color:C.blue},
          {k:"agencia", icon:"🏢", title:"Agencia inmobiliaria", desc:"Empresa registrada. Comisión: 6% del precio final. Retención: 30% ITBIS.", color:C.purple},
        ].map(t=>(
          <div key={t.k} onClick={()=>setTipo(t.k)} style={{
            padding:"20px",borderRadius:"10px",cursor:"pointer",
            background:tipo===t.k?t.color+"11":C.bgWarm,
            border:`2px solid ${tipo===t.k?t.color:C.border}`,
            transition:"all 0.15s",
          }}>
            <div style={{fontSize:"28px",marginBottom:"10px"}}>{t.icon}</div>
            <div style={{fontSize:"14px",fontFamily:FH,color:C.text,marginBottom:"6px"}}>{t.title}</div>
            <div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,lineHeight:"1.5"}}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>,
    // Step 2: datos personales
    <div key={2}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
        {[
          {k:"nombre",    l:"Nombre / Razón social *",  ph:"Tu nombre o nombre de empresa"},
          {k:"apellido",  l:"Apellido (persona física)", ph:""},
          {k:"email",     l:"Email profesional *",       ph:"email@tuempresa.com"},
          {k:"tel",       l:"Teléfono / WhatsApp *",     ph:"+1 (809) 000-0000"},
          {k:"pais",      l:"País de residencia *",      ph:""},
          {k:"direccion", l:"Dirección fiscal",          ph:"Dirección completa"},
          {k:"licencia",  l:"Nº licencia inmobiliaria",  ph:"Si aplica en tu país"},
          {k:"web",       l:"Sitio web / redes",         ph:"https://"},
        ].map(f=>(
          <div key={f.k}>
            <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px",letterSpacing:"0.5px"}}>{f.l.toUpperCase()}</label>
            <input value={form[f.k]||""} onChange={e=>set(f.k,e.target.value)} placeholder={f.ph} style={{
              width:"100%",padding:"9px 12px",boxSizing:"border-box",
              background:C.bgInput,border:`1px solid ${C.border}`,
              borderRadius:"7px",fontSize:"13px",fontFamily:FB,color:C.text,outline:"none",
            }}/>
          </div>
        ))}
      </div>
    </div>,
    // Step 3: fiscal y bancario
    <div key={3}>
      <div style={{
        padding:"12px 14px",background:C.amberBg,border:`1px solid ${C.amber}33`,
        borderRadius:"8px",marginBottom:"16px",fontSize:"12px",color:C.amber,fontFamily:FM,lineHeight:"1.6",
      }}>
        ⚠ Estos datos son necesarios para emitir las facturas de comisión y realizar las transferencias. El contrato establece que debes emitir factura válida a nombre de DUNNA DEVELOPMENT GROUP, SRL · RNC 1-31-43862-8.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
        {[
          {k:"rnc",    l:"RNC / NIF / Tax ID *",          ph:"Número de contribuyente"},
          {k:"banco",  l:"Banco *",                        ph:"Nombre del banco"},
          {k:"cuenta", l:"Número de cuenta / IBAN *",      ph:"IBAN o número de cuenta"},
          {k:"swift",  l:"SWIFT / BIC *",                  ph:"Código SWIFT del banco"},
          {k:"titular",l:"Titular de la cuenta *",         ph:"Nombre exacto del titular"},
          {k:"moneda", l:"Moneda de la cuenta",            ph:"USD / EUR / CAD..."},
        ].map(f=>(
          <div key={f.k}>
            <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px",letterSpacing:"0.5px"}}>{f.l.toUpperCase()}</label>
            <input value={form[f.k]||""} onChange={e=>set(f.k,e.target.value)} placeholder={f.ph} style={{
              width:"100%",padding:"9px 12px",boxSizing:"border-box",
              background:C.bgInput,border:`1px solid ${C.border}`,
              borderRadius:"7px",fontSize:"13px",fontFamily:FB,color:C.text,outline:"none",
            }}/>
          </div>
        ))}
      </div>
    </div>,
    // Step 4: KYC docs
    <div key={4}>
      <div style={{
        padding:"12px 14px",background:C.blueBg,border:`1px solid ${C.blue}33`,
        borderRadius:"8px",marginBottom:"16px",fontSize:"12px",color:C.blue,fontFamily:FM,lineHeight:"1.6",
      }}>
        ℹ️ El acuerdo establece cumplimiento con la Ley 155-17 de prevención de lavado de activos. Debes acreditar tu identidad como profesional antes de operar.
      </div>
      {(tipo==="broker" ? [
        "Formulario KYC Persona Física (completar en línea)",
        "Copia del documento de identidad (pasaporte o cédula)",
        "Carta de referencia bancaria",
        "Carta de referencia profesional",
      ] : [
        "Formulario KYC Persona Jurídica (completar en línea)",
        "Certificado de Registro Mercantil vigente",
        "Certificación de inscripción en el RNC",
        "Estatutos sociales vigentes",
        "Documento de designación del representante",
        "Copia del documento de identidad del representante",
        "Lista de Suscripción y Pago de Acciones",
        "Carta de referencia bancaria",
        "Carta de referencia profesional",
      ]).map((doc,i)=>(
        <div key={i} style={{
          display:"flex",gap:"12px",alignItems:"center",
          padding:"11px 14px",background:C.bgWarm,
          border:`1px solid ${C.border}`,borderRadius:"8px",marginBottom:"7px",
        }}>
          <input type="checkbox" style={{accentColor:C.green,width:"15px",height:"15px",flexShrink:0}}/>
          <span style={{fontSize:"12px",fontFamily:FB,color:C.text}}>{doc}</span>
          <Btn label="Subir" small />
        </div>
      ))}
    </div>,
  ];

  const pct = Math.round((step-1)/4*100);

  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",fontFamily:FB}}>
      <div style={{width:"100%",maxWidth:"640px"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{fontSize:"11px",letterSpacing:"3px",color:C.gold,fontFamily:FM,marginBottom:"6px"}}>DUNA DEVELOPMENT GROUP</div>
          <h1 style={{margin:"0 0 8px",fontSize:"24px",fontFamily:FH,fontWeight:400,color:C.text}}>Portal de Profesionales</h1>
          <p style={{margin:0,fontSize:"13px",color:C.textSub,fontFamily:FB}}>
            Completa tu registro profesional para acceder a tu dashboard
          </p>
        </div>

        {/* Progress */}
        <div style={{display:"flex",gap:"0",marginBottom:"28px"}}>
          {[1,2,3,4].map((s,i)=>{
            const done=s<step, active=s===step;
            return (
              <div key={s} style={{display:"flex",alignItems:"center",flex:1}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
                  <div style={{
                    width:"36px",height:"36px",borderRadius:"50%",
                    background:done?C.green:active?C.sidebar:C.bgWarm,
                    border:`2px solid ${done?C.green:active?C.sidebar:C.border}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"14px",color:done||active?"#fff":C.textMuted,
                    fontFamily:FM,fontWeight:700,
                  }}>{done?"✓":s}</div>
                  <div style={{fontSize:"10px",fontFamily:FM,color:done?C.green:active?C.sidebar:C.textMuted,marginTop:"5px",textAlign:"center",lineHeight:"1.3"}}>
                    {["Tipo","Datos","Fiscal","Documentos"][s-1]}
                  </div>
                </div>
                {i<3&&<div style={{height:"2px",flex:0.5,background:done?C.green:C.border,marginBottom:"16px"}}/>}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <Card style={{marginBottom:"16px"}}>
          <div style={{marginBottom:"18px",paddingBottom:"14px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:"15px",fontFamily:FH,color:C.text,fontWeight:400,marginBottom:"3px"}}>
              {["Tipo de profesional","Datos personales y profesionales","Datos fiscales y bancarios","Documentos de identificación"][step-1]}
            </div>
            <div style={{fontSize:"11px",color:C.textSub,fontFamily:FM}}>Paso {step} de 4</div>
          </div>
          {stepContent[step]}
        </Card>

        {/* Nav */}
        <div style={{display:"flex",gap:"10px",justifyContent:"space-between"}}>
          {step>1
            ? <Btn label="← Anterior" onClick={()=>setStep(s=>s-1)}/>
            : <div/>
          }
          {step<4
            ? <Btn label="Continuar →" primary onClick={()=>setStep(s=>s+1)}/>
            : <Btn label="Completar registro →" primary onClick={onComplete}/>
          }
        </div>

        <div style={{marginTop:"14px",textAlign:"center",fontSize:"11px",color:C.textMuted,fontFamily:FM}}>
          ¿Tienes dudas? Escribe a <span style={{color:C.blue}}>brokers@dunadevelopment.com</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN PROFESSIONAL DASHBOARD
═══════════════════════════════════════ */
function ProfessionalDashboard() {
  const [tab, setTab] = useState("inicio");
  const [chatMsg, setChatMsg] = useState("");
  const [msgs, setMsgs] = useState(MENSAJES);

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    setMsgs(m=>[...m,{de:"broker",nombre:"Tú",txt:chatMsg,hora:new Date().toLocaleTimeString("es-DO",{hour:"2-digit",minute:"2-digit"})}]);
    setChatMsg("");
  };

  const ventasCerradas = CLIENTES_BROKER.filter(c=>c.estado==="vendido").length;
  const comisionTotal  = CLIENTES_BROKER.filter(c=>c.comision).reduce((a,b)=>a+(b.comision||0),0);
  const comisionPagada = FACTURAS.filter(f=>f.estado==="pagada").reduce((a,f)=>a+f.neto,0);
  const comisionPend   = FACTURAS.filter(f=>f.estado==="pendiente").reduce((a,f)=>a+f.neto,0);
  const diasAlerta     = ACUERDO.diasRestantes < 60;

  const TABS = [
    {k:"inicio",     l:"⌂ Inicio"},
    {k:"clientes",   l:"👥 Mis clientes",  n:CLIENTES_BROKER.filter(c=>c.activo).length},
    {k:"acuerdo",    l:"📋 Mi acuerdo",     n:diasAlerta?1:null},
    {k:"comisiones", l:"💰 Comisiones",     n:FACTURAS.filter(f=>f.estado==="pendiente").length},
    {k:"materiales", l:"📁 Material"},
    {k:"mensajes",   l:"💬 Mensajes",       n:1},
  ];

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:FB,color:C.text}}>

      {/* TOPBAR */}
      <div style={{
        background:C.sidebar,padding:"0 24px",
        display:"flex",alignItems:"center",gap:"16px",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        position:"sticky",top:0,zIndex:20,
      }}>
        <div style={{padding:"12px 0",flex:1}}>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px"}}>DUNA DEVELOPMENT · PORTAL PROFESIONAL</div>
          <div style={{fontSize:"14px",fontFamily:FH,color:"#fff",fontWeight:400}}>{PROFESIONAL.empresa}</div>
        </div>
        <div style={{display:"flex",gap:"0",borderBottom:"none"}}>
          {TABS.map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} style={{
              padding:"18px 14px",fontSize:"12px",fontFamily:FB,
              background:"transparent",border:"none",
              borderBottom:`3px solid ${tab===t.k?C.goldLight:"transparent"}`,
              color:tab===t.k?C.goldLight:"rgba(255,255,255,0.55)",
              cursor:"pointer",fontWeight:tab===t.k?600:400,
              display:"flex",alignItems:"center",gap:"5px",
              transition:"all 0.15s",whiteSpace:"nowrap",
            }}>
              {t.l}
              {t.n&&<span style={{
                background:C.gold,color:"#fff",fontSize:"9px",fontWeight:700,
                minWidth:"16px",height:"16px",borderRadius:"8px",
                display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px",
              }}>{t.n}</span>}
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"12px 0"}}>
          <div style={{
            width:"32px",height:"32px",borderRadius:"50%",
            background:`linear-gradient(135deg,${C.gold},${C.amber})`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"12px",fontWeight:700,color:"#fff",fontFamily:FH,
          }}>JB</div>
          <StatusBadge estado={PROFESIONAL.estado} small />
        </div>
      </div>

      <div style={{padding:"24px 28px"}}>

        {/* ══ INICIO ══ */}
        {tab==="inicio" && (
          <div style={{display:"flex",flexDirection:"column",gap:"18px"}}>

            {diasAlerta && (
              <div style={{
                display:"flex",gap:"12px",alignItems:"center",
                padding:"13px 18px",background:C.amberBg,
                border:`1px solid ${C.amber}44`,borderLeft:`3px solid ${C.amber}`,borderRadius:"10px",
              }}>
                <span style={{fontSize:"20px"}}>⚠️</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:"13px",fontFamily:FB,color:C.amber,fontWeight:600}}>
                    Tu acuerdo de colaboración vence en {ACUERDO.diasRestantes} días
                  </div>
                  <div style={{fontSize:"11px",color:C.textSub,fontFamily:FM,marginTop:"2px"}}>
                    Vence el {ACUERDO.fechaVence} · Debes renovarlo para seguir operando
                  </div>
                </div>
                <Btn label="Renovar acuerdo" primary onClick={()=>setTab("acuerdo")} />
              </div>
            )}

            {/* KPIs */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"12px"}}>
              {[
                {icon:"👥",l:"Clientes activos",    val:CLIENTES_BROKER.filter(c=>c.activo).length, c:C.blue   },
                {icon:"✅",l:"Ventas cerradas",      val:ventasCerradas,                              c:C.green  },
                {icon:"💰",l:"Comisión generada",    val:"$"+comisionTotal.toLocaleString(),           c:C.gold   },
                {icon:"⏳",l:"Comisión pendiente",   val:"$"+comisionPend.toLocaleString(),            c:C.amber  },
              ].map(s=>(
                <Card key={s.l}>
                  <div style={{fontSize:"20px",marginBottom:"8px"}}>{s.icon}</div>
                  <div style={{fontSize:"22px",fontFamily:FH,color:s.c,fontWeight:400}}>{s.val}</div>
                  <div style={{fontSize:"11px",fontFamily:FB,color:C.text,marginTop:"3px"}}>{s.l}</div>
                </Card>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:"16px"}}>
              {/* Pipeline */}
              <Card>
                <SectionHead title="Mi pipeline" sub="Estado de cada cliente" right={<Btn label="Ver todos →" small onClick={()=>setTab("clientes")} />} />
                {CLIENTES_BROKER.slice(0,4).map((cl,i)=>{
                  const stMap={vendido:{c:C.green,b:C.greenBg},reservado:{c:C.gold,b:C.goldBg},pendiente:{c:C.amber,b:C.amberBg},prospecto:{c:C.blue,b:C.blueBg}};
                  const s=stMap[cl.estado]||stMap.prospecto;
                  return (
                    <div key={cl.id} style={{
                      display:"flex",gap:"10px",alignItems:"center",
                      padding:"10px 0",borderBottom:i<3?`1px solid ${C.border}`:"none",
                    }}>
                      <div style={{
                        width:"32px",height:"32px",borderRadius:"50%",flexShrink:0,
                        background:s.b,display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:"11px",fontWeight:700,color:s.c,fontFamily:FH,
                      }}>{cl.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:"12px",fontFamily:FB,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cl.nombre}</div>
                        <div style={{fontSize:"10px",fontFamily:FM,color:C.textSub,marginTop:"1px"}}>{cl.etapa}</div>
                      </div>
                      <StatusBadge estado={cl.estado} small />
                      {cl.comision&&<div style={{fontSize:"11px",fontFamily:FH,color:C.gold,textAlign:"right",flexShrink:0}}>${cl.comision.toLocaleString()}</div>}
                    </div>
                  );
                })}
              </Card>

              {/* Link + acuerdo */}
              <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                <Card>
                  <div style={{fontSize:"12px",fontFamily:FH,color:C.text,marginBottom:"8px"}}>🔗 Tu link de referido</div>
                  <div style={{
                    display:"flex",gap:"6px",padding:"9px 12px",
                    background:C.bgWarm,border:`1px solid ${C.border}`,borderRadius:"7px",marginBottom:"8px",
                  }}>
                    <span style={{flex:1,fontSize:"11px",fontFamily:FM,color:C.textSub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      sales.makai-capcana.com/?ref=JB-4021
                    </span>
                    <button style={{background:C.gold,color:"#fff",border:"none",borderRadius:"5px",padding:"3px 10px",fontSize:"11px",cursor:"pointer",fontFamily:FM,flexShrink:0}}>📋</button>
                  </div>
                  <div style={{fontSize:"10px",color:C.textSub,fontFamily:FM}}>
                    {CLIENTES_BROKER.length} clientes registrados con tu link
                  </div>
                </Card>

                <Card style={{background:C.greenBg,border:`1px solid ${C.green}33`}}>
                  <div style={{fontSize:"11px",color:C.textMuted,fontFamily:FM,marginBottom:"6px"}}>ACUERDO DE COLABORACIÓN</div>
                  <div style={{fontSize:"13px",fontFamily:FH,color:C.green}}>✓ Vigente · {ACUERDO.version}</div>
                  <div style={{fontSize:"11px",color:C.textSub,fontFamily:FM,marginTop:"3px"}}>Vence: {ACUERDO.fechaVence} · {ACUERDO.diasRestantes} días</div>
                  <div style={{
                    marginTop:"10px",background:"rgba(255,255,255,0.6)",
                    borderRadius:"6px",padding:"8px 10px",
                  }}>
                    <div style={{fontSize:"11px",color:C.green,fontFamily:FM}}>Tu comisión: {ACUERDO.comisionAgencia}</div>
                  </div>
                </Card>

                <Card>
                  <div style={{fontSize:"12px",fontFamily:FH,color:C.text,marginBottom:"10px"}}>💰 Calculadora de comisión</div>
                  <div style={{fontSize:"11px",color:C.textSub,fontFamily:FM,marginBottom:"8px"}}>Selecciona una unidad para calcular tu comisión estimada:</div>
                  <select style={{width:"100%",padding:"8px 10px",background:C.bgInput,border:`1px solid ${C.border}`,borderRadius:"6px",fontSize:"12px",fontFamily:FB,color:C.text,outline:"none",marginBottom:"8px"}}>
                    <option>Unidad #111 · $431,000</option>
                    <option>Unidad #115 · $489,000</option>
                    <option>Penthouse PH-01 · $680,000</option>
                  </select>
                  <div style={{
                    padding:"10px 12px",background:C.goldBg,
                    border:`1px solid ${C.gold}33`,borderRadius:"7px",
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                  }}>
                    <span style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>Tu comisión (6%):</span>
                    <span style={{fontSize:"18px",fontFamily:FH,color:C.gold}}>$25,860</span>
                  </div>
                  <div style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,marginTop:"5px"}}>
                    Neto tras retención 30% ITBIS: <strong style={{color:C.text}}>$18,102</strong>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ══ CLIENTES ══ */}
        {tab==="clientes" && (
          <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <h2 style={{margin:"0 0 3px",fontSize:"18px",fontFamily:FH,fontWeight:400,color:C.text}}>Mis clientes</h2>
                <p style={{margin:0,fontSize:"12px",color:C.textSub,fontFamily:FM}}>
                  Todos los clientes registrados con tu link de referido · {CLIENTES_BROKER.length} total
                </p>
              </div>
              <Btn label="+ Registrar cliente" primary />
            </div>

            <div style={{
              padding:"12px 14px",background:C.blueBg,border:`1px solid ${C.blue}33`,
              borderRadius:"8px",fontSize:"12px",color:C.blue,fontFamily:FM,lineHeight:"1.5",
            }}>
              ℹ️ Puedes iniciar una reserva en nombre de tu cliente directamente desde aquí. El sistema generará el KYC para que tu cliente lo complete y Duna lo revisará. Recuerda que debes entregar los documentos de debida diligencia conforme a la Ley 155-17 de RD.
            </div>

            {CLIENTES_BROKER.map((cl,i)=>{
              const stMap={vendido:{c:C.green,b:C.greenBg},reservado:{c:C.gold,b:C.goldBg},pendiente:{c:C.amber,b:C.amberBg},prospecto:{c:C.blue,b:C.blueBg}};
              const s=stMap[cl.estado]||stMap.prospecto;
              const comisionStyle={pagada:{c:C.green,b:C.greenBg,l:"✓ Pagada"},pendiente:{c:C.amber,b:C.amberBg,l:"⏳ Pendiente"},bloqueado:{c:C.textMuted,b:"#F0EDEA",l:"🔒 Bloqueada — espera trigger"},"n/a":{c:C.textMuted,b:"#F0EDEA",l:"—"}};
              const cs=comisionStyle[cl.comisionEstado]||comisionStyle["n/a"];
              return (
                <Card key={cl.id}>
                  <div style={{display:"flex",gap:"14px",alignItems:"flex-start",flexWrap:"wrap"}}>
                    <div style={{
                      width:"44px",height:"44px",borderRadius:"50%",flexShrink:0,
                      background:s.b,display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:"15px",fontWeight:700,color:s.c,fontFamily:FH,
                    }}>{cl.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                    <div style={{flex:1,minWidth:"180px"}}>
                      <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"4px",flexWrap:"wrap"}}>
                        <span style={{fontSize:"14px",fontFamily:FH,color:C.text,fontWeight:400}}>{cl.nombre}</span>
                        <StatusBadge estado={cl.estado} small />
                      </div>
                      <div style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>{cl.etapa} · {cl.fecha}</div>
                      {cl.unidad&&<div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,marginTop:"2px"}}>Unidad {cl.unidad} · ${cl.precio?.toLocaleString()}</div>}
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      {cl.comision ? (
                        <>
                          <div style={{fontSize:"16px",fontFamily:FH,color:C.gold}}>${cl.comision.toLocaleString()}</div>
                          <span style={{
                            fontSize:"10px",fontFamily:FM,color:cs.c,background:cs.b,
                            padding:"2px 7px",borderRadius:"3px",border:`1px solid ${cs.c}22`,
                          }}>{cs.l}</span>
                        </>
                      ):<span style={{fontSize:"11px",color:C.textMuted,fontFamily:FM}}>Sin comisión aún</span>}
                    </div>
                    <div style={{display:"flex",gap:"6px",flexShrink:0,alignSelf:"center"}}>
                      {cl.estado==="prospecto"&&<Btn label="Iniciar reserva" primary small />}
                      {cl.estado==="pendiente"&&<Btn label="Ver estado" small />}
                      {cl.estado==="reservado"&&<Btn label="Ver proceso" small />}
                      <Btn label="Mensajear" small />
                    </div>
                  </div>
                  {cl.comisionEstado==="bloqueado"&&(
                    <div style={{
                      marginTop:"12px",padding:"9px 12px",
                      background:C.bgWarm,border:`1px solid ${C.border}`,borderRadius:"7px",
                      fontSize:"11px",color:C.textSub,fontFamily:FM,
                    }}>
                      🔒 Comisión bloqueada hasta que el comprador pague el 25% del precio y firme la Promesa de Compraventa (Art. 4 del Acuerdo).
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* ══ ACUERDO ══ */}
        {tab==="acuerdo" && (
          <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
            <div>
              <h2 style={{margin:"0 0 3px",fontSize:"18px",fontFamily:FH,fontWeight:400,color:C.text}}>Acuerdo de Colaboración</h2>
              <p style={{margin:0,fontSize:"12px",color:C.textSub,fontFamily:FM}}>Makai Residences · Duna Development Group, SRL</p>
            </div>

            {/* Estado del acuerdo */}
            <Card style={{background:C.greenBg,border:`1px solid ${C.green}44`}}>
              <div style={{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"}}>
                <div style={{fontSize:"32px"}}>✅</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:"15px",fontFamily:FH,color:C.green}}>Acuerdo vigente y firmado digitalmente</div>
                  <div style={{fontSize:"11px",color:C.textSub,fontFamily:FM,marginTop:"3px"}}>
                    Firmado el {ACUERDO.fechaFirma} · Vence el {ACUERDO.fechaVence} · {ACUERDO.diasRestantes} días restantes
                  </div>
                </div>
                <Btn label="📄 Descargar PDF firmado" />
              </div>
            </Card>

            {/* Condiciones clave */}
            <Card>
              <SectionHead title="Condiciones de tu acuerdo" sub="Extraídas del contrato firmado" />
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
                {[
                  {l:"Tipo de colaborador",     v:"Agencia inmobiliaria",             c:C.purple},
                  {l:"Tasa de comisión",         v:"6% del precio final de venta",    c:C.gold  },
                  {l:"Condición de cobro",       v:"25% pagado + Promesa firmada",    c:C.green },
                  {l:"Plazo de pago Duna",       v:"30 días desde factura recibida",  c:C.blue  },
                  {l:"Retención aplicable",      v:"30% ITBIS (persona jurídica)",    c:C.amber },
                  {l:"Facturas a nombre de",     v:"DUNNA DEV. · RNC 1-31-43862-8",  c:C.text  },
                  {l:"Renovación",               v:"Anual · Manual",                   c:C.teal  },
                  {l:"Ley aplicable",            v:"República Dominicana",            c:C.textSub},
                ].map(f=>(
                  <div key={f.l} style={{background:C.bgWarm,borderRadius:"7px",padding:"10px 13px",border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,marginBottom:"3px"}}>{f.l.toUpperCase()}</div>
                    <div style={{fontSize:"13px",fontFamily:FB,color:f.c}}>{f.v}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Historial */}
            <Card>
              <SectionHead title="Historial de acuerdos" />
              {HISTORIAL_ACUERDOS.map((a,i)=>(
                <div key={i} style={{
                  display:"flex",gap:"14px",alignItems:"center",
                  padding:"12px 0",borderBottom:i<HISTORIAL_ACUERDOS.length-1?`1px solid ${C.border}`:"none",
                }}>
                  <span style={{fontSize:"20px"}}>{a.estado==="vigente"?"📄":"🗄️"}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"13px",fontFamily:FH,color:C.text,fontWeight:400}}>Acuerdo {a.version}</div>
                    <div style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>Firmado: {a.firmado} · Vencimiento: {a.vence}</div>
                  </div>
                  <StatusBadge estado={a.estado} small />
                  <Btn label="Descargar" small />
                </div>
              ))}
            </Card>

            {/* Renovación */}
            <Card style={{border:`1px solid ${C.amber}44`,background:C.amberBg}}>
              <SectionHead title="Renovación anual" sub={`Próxima renovación: ${ACUERDO.fechaVence}`} />
              <p style={{margin:"0 0 14px",fontSize:"12px",color:C.textSub,fontFamily:FB,lineHeight:"1.6"}}>
                Cuando llegue la fecha de renovación, el equipo de Duna generará el nuevo acuerdo con las condiciones actualizadas. Recibirás una notificación 60 días antes para revisar y firmar. Si no se renueva antes de la fecha de vencimiento, tu acceso quedará suspendido automáticamente.
              </p>
              <Btn label="Solicitar renovación anticipada" />
            </Card>
          </div>
        )}

        {/* ══ COMISIONES ══ */}
        {tab==="comisiones" && (
          <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
            <h2 style={{margin:"0 0 3px",fontSize:"18px",fontFamily:FH,fontWeight:400,color:C.text}}>Comisiones y Facturas</h2>

            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px"}}>
              {[
                {l:"Comisión total generada", v:"$"+comisionTotal.toLocaleString(),  c:C.gold  },
                {l:"Cobrado (neto)",           v:"$"+comisionPagada.toLocaleString(), c:C.green },
                {l:"Pendiente de cobro",       v:"$"+comisionPend.toLocaleString(),   c:C.amber },
              ].map(s=>(
                <Card key={s.l}>
                  <div style={{fontSize:"22px",fontFamily:FH,color:s.c,fontWeight:400,marginBottom:"4px"}}>{s.v}</div>
                  <div style={{fontSize:"12px",fontFamily:FB,color:C.text}}>{s.l}</div>
                </Card>
              ))}
            </div>

            {/* Trigger info */}
            <div style={{
              padding:"14px 16px",background:C.blueBg,border:`1px solid ${C.blue}33`,
              borderRadius:"9px",display:"flex",gap:"10px",
            }}>
              <span style={{fontSize:"18px",flexShrink:0}}>ℹ️</span>
              <div style={{fontSize:"12px",color:C.blue,fontFamily:FM,lineHeight:"1.6"}}>
                <strong>¿Cuándo se desbloquea tu comisión?</strong> Según el Art. 4 del Acuerdo: cuando el comprador haya pagado el 25% del precio de venta Y firmado la Promesa de Compraventa. Una vez desbloqueada, debes enviar tu factura fiscal a Duna. Tendrán 30 días para pagarte.
              </div>
            </div>

            {FACTURAS.map((f,i)=>(
              <Card key={f.id}>
                <div style={{display:"flex",gap:"14px",alignItems:"flex-start",flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:"220px"}}>
                    <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"6px",flexWrap:"wrap"}}>
                      <span style={{fontSize:"11px",color:C.textMuted,fontFamily:FM}}>{f.id}</span>
                      <span style={{fontSize:"14px",fontFamily:FH,color:C.text,fontWeight:400}}>{f.cliente}</span>
                      <StatusBadge estado={f.estado} small />
                    </div>
                    <div style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>
                      Unidad {f.unidad} · Precio venta: ${f.precio.toLocaleString()} · Emitida: {f.fechaEmision}
                    </div>
                    {f.fechaPago&&<div style={{fontSize:"11px",fontFamily:FM,color:C.green,marginTop:"2px"}}>✓ Pagado el {f.fechaPago}</div>}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",flexShrink:0}}>
                    {[
                      {l:"Comisión bruta", v:"$"+f.comision.toLocaleString(), c:C.gold},
                      {l:"Retención 30%",  v:"-$"+f.retencion.toLocaleString(),c:C.red},
                      {l:"Neto a cobrar",  v:"$"+f.neto.toLocaleString(),      c:C.green},
                    ].map(d=>(
                      <div key={d.l} style={{textAlign:"center",padding:"8px",background:C.bgWarm,borderRadius:"6px",border:`1px solid ${C.border}`}}>
                        <div style={{fontSize:"14px",fontFamily:FH,color:d.c}}>{d.v}</div>
                        <div style={{fontSize:"9px",fontFamily:FM,color:C.textMuted,marginTop:"2px"}}>{d.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:"6px",flexShrink:0,alignSelf:"center"}}>
                    <Btn label="📄 Ver factura" small />
                    <Btn label="⬇ PDF" small />
                  </div>
                </div>
              </Card>
            ))}

            <div style={{
              padding:"14px 16px",background:C.goldBg,border:`1px solid ${C.gold}33`,
              borderRadius:"9px",
            }}>
              <div style={{fontSize:"12px",fontFamily:FH,color:C.gold,marginBottom:"6px"}}>📋 ¿Cómo emitir tu factura?</div>
              <div style={{fontSize:"11px",color:C.textSub,fontFamily:FM,lineHeight:"1.7"}}>
                1. Cuando tu cliente pague el 25% y firme la Promesa, recibirás una notificación de comisión desbloqueada.<br/>
                2. Emite tu factura a: <strong>DUNNA DEVELOPMENT GROUP, SRL · RNC 1-31-43862-8</strong><br/>
                3. Envíala por correo o súbela en esta sección.<br/>
                4. Duna procesará el pago en máximo 30 días naturales.
              </div>
              <div style={{marginTop:"12px"}}>
                <Btn label="📤 Subir factura" primary />
              </div>
            </div>
          </div>
        )}

        {/* ══ MATERIALES ══ */}
        {tab==="materiales" && (
          <div>
            <div style={{marginBottom:"16px"}}>
              <h2 style={{margin:"0 0 3px",fontSize:"18px",fontFamily:FH,fontWeight:400,color:C.text}}>Material de ventas</h2>
              <p style={{margin:0,fontSize:"12px",color:C.textSub,fontFamily:FM}}>
                Solo puedes usar material aprobado por Duna. No está permitido modificar renders, planos ni material publicitario (Art. 1 del Acuerdo).
              </p>
            </div>
            <div style={{
              padding:"11px 14px",background:C.amberBg,border:`1px solid ${C.amber}33`,
              borderRadius:"8px",marginBottom:"16px",fontSize:"11px",color:C.amber,fontFamily:FM,
            }}>
              ⚠ Todo el material está registrado y marcado digitalmente. Su uso fuera de los términos del Acuerdo puede dar lugar a la terminación anticipada del contrato.
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"12px"}}>
              {MATERIALES.map((m,i)=>(
                <div key={i} style={{
                  display:"flex",gap:"12px",alignItems:"center",
                  padding:"14px 16px",background:C.bgCard,
                  border:`1px solid ${C.border}`,borderRadius:"10px",boxShadow:C.shadow,
                }}>
                  <span style={{fontSize:"24px",flexShrink:0}}>{m.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:"12px",fontFamily:FH,color:C.text}}>{m.nombre}</div>
                    <div style={{fontSize:"10px",fontFamily:FM,color:C.textSub,marginTop:"2px"}}>{m.sub}</div>
                    <span style={{
                      fontSize:"9px",fontFamily:FM,color:C.blue,background:C.blueBg,
                      padding:"1px 6px",borderRadius:"3px",marginTop:"4px",display:"inline-block",
                    }}>{m.tipo}</span>
                  </div>
                  <Btn label="⬇" small primary />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ MENSAJES ══ */}
        {tab==="mensajes" && (
          <div style={{display:"flex",flexDirection:"column",gap:"0",maxWidth:"680px"}}>
            <div style={{marginBottom:"16px"}}>
              <h2 style={{margin:"0 0 3px",fontSize:"18px",fontFamily:FH,fontWeight:400,color:C.text}}>Mensajes con Duna Development</h2>
              <p style={{margin:0,fontSize:"12px",color:C.textSub,fontFamily:FM}}>Comunicación directa con el equipo comercial y administrativo</p>
            </div>
            <div style={{
              background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",
              overflow:"hidden",boxShadow:C.shadow,
            }}>
              <div style={{
                padding:"12px 18px",background:C.sidebar,
                display:"flex",alignItems:"center",gap:"10px",
              }}>
                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:C.green}}/>
                <span style={{fontSize:"13px",fontFamily:FH,color:"#fff",fontWeight:400}}>Equipo Duna Development</span>
                <span style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM}}>· Responde en ~2h hábiles</span>
              </div>
              <div style={{padding:"18px",minHeight:"280px",display:"flex",flexDirection:"column",gap:"12px",background:C.bg}}>
                {msgs.map((m,i)=>{
                  const isBroker=m.de==="broker";
                  return (
                    <div key={i} style={{display:"flex",justifyContent:isBroker?"flex-end":"flex-start",gap:"8px"}}>
                      {!isBroker&&(
                        <div style={{
                          width:"28px",height:"28px",borderRadius:"50%",flexShrink:0,
                          background:`linear-gradient(135deg,${C.gold},${C.amber})`,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:"10px",fontWeight:700,color:"#fff",fontFamily:FH,marginTop:"2px",
                        }}>{m.nombre.split(" ").map(x=>x[0]).join("").slice(0,2)}</div>
                      )}
                      <div style={{
                        maxWidth:"70%",padding:"10px 13px",
                        background:isBroker?C.sidebar:C.bgCard,
                        color:isBroker?"#fff":C.text,
                        borderRadius:isBroker?"12px 12px 2px 12px":"12px 12px 12px 2px",
                        fontSize:"12px",fontFamily:FB,lineHeight:"1.55",
                        border:isBroker?"none":`1px solid ${C.border}`,
                        boxShadow:C.shadow,
                      }}>
                        {!isBroker&&<div style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,marginBottom:"3px"}}>{m.nombre}</div>}
                        {m.txt}
                        <div style={{fontSize:"10px",opacity:0.4,marginTop:"4px",textAlign:"right",fontFamily:FM}}>{m.hora}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{padding:"12px 14px",borderTop:`1px solid ${C.border}`,display:"flex",gap:"8px",background:C.bgCard}}>
                <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&sendMsg()}
                  placeholder="Escribe tu mensaje al equipo de Duna..."
                  style={{flex:1,padding:"10px 14px",background:C.bgInput,border:`1px solid ${C.border}`,borderRadius:"7px",fontSize:"13px",fontFamily:FB,color:C.text,outline:"none"}}
                />
                <Btn label="Enviar" primary onClick={sendMsg} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN — TOGGLE VIEW
═══════════════════════════════════════ */
export default function ProPortal() {
  const [view, setView] = useState("dashboard"); // "onboarding" | "dashboard"

  return (
    <div>
      {/* Demo switcher */}
      <div style={{
        position:"fixed",bottom:"16px",right:"16px",zIndex:500,
        display:"flex",gap:"6px",
      }}>
        {[
          {k:"onboarding", l:"Ver: Onboarding"},
          {k:"dashboard",  l:"Ver: Dashboard"},
        ].map(b=>(
          <button key={b.k} onClick={()=>setView(b.k)} style={{
            background:view===b.k?C.sidebar:"rgba(0,0,0,0.6)",color:"#fff",
            border:`1px solid rgba(255,255,255,0.2)`,borderRadius:"6px",
            padding:"7px 14px",fontSize:"11px",cursor:"pointer",fontFamily:FM,
          }}>{b.l}</button>
        ))}
      </div>

      {view==="onboarding"
        ? <OnboardingScreen onComplete={()=>setView("dashboard")} />
        : <ProfessionalDashboard />
      }
    </div>
  );
}
