import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════ */
const C = {
  bg:        "#F4F0E8",
  bgWarm:    "#EDE8DE",
  bgCard:    "#FFFFFF",
  bgInput:   "#F8F5EF",
  sidebar:   "#2E3D28",
  sidebarMid:"#364830",
  gold:      "#B8942A",
  goldLight: "#D4AE50",
  goldBg:    "#FBF5E6",
  green:     "#3A6B35",
  greenLight:"#4D8A45",
  greenBg:   "#EBF3E9",
  amber:     "#9A6B1E",
  amberBg:   "#FDF4E3",
  red:       "#B03A2E",
  redBg:     "#FCECEA",
  blue:      "#2C5F8A",
  blueBg:    "#EBF2FA",
  border:    "#E0DAD0",
  text:      "#26231C",
  textSub:   "#6B6355",
  textMuted: "#A09080",
  shadow:    "0 1px 4px rgba(0,0,0,0.07)",
  shadowMd:  "0 4px 20px rgba(0,0,0,0.10)",
};
const FH = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const FB = "Georgia,'Times New Roman',serif";
const FM = "'Courier New',Courier,monospace";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const DATA = {
  totalUnidades: 102,
  vendidas: 22,
  disponibles: 80,
  reservadas: 0,
  pendientes: 0,
  valorVentas: 8991000,
  valorDisponible: 36997000,
  valorTotal: 45988000,
  reservasCompletadas: 5671745,
  avanceObra: 38,
  roiAnual: 15.33,
  alquilerMensual: 8126,
  precioDesde: 350000,
  descuento: 20000,
  entrega: "Q3 2027",
  proyecto: "Makai Residences",
  ubicacion: "Cap Cana, República Dominicana",
};

const ANALYTICS = {
  enLinea: 2,
  usuarios14d: 740,
  nuevos14d: 574,
  sesionMedia: "00:32",
  vistasTotal: 1494,
  tasaRegistro: 10.0,
  tasaConsulta: 11.0,
  tasaReserva: 0,
};

const ACTIVIDAD = [
  { tipo:"lead",    msg:"Nuevo registro: Sophie Laurent",         sub:"Vía web · Interés en PH",          tiempo:"hace 2h",  color:"#2C5F8A" },
  { tipo:"deal",    msg:"Unidad vendida confirmada: #203",        sub:"Contrato recibido · $431,000",     tiempo:"hace 4h",  color:"#3A6B35" },
  { tipo:"alerta",  msg:"Lead sin contactar: Kenji Tanaka",       sub:"Registrado hace 28h sin respuesta",tiempo:"hace 1d",  color:"#B03A2E" },
  { tipo:"aprob",   msg:"Aprobación pendiente: Descuento #APR-088",sub:"Carlos M. · 5% descuento",       tiempo:"hace 1d",  color:"#9A6B1E" },
  { tipo:"pago",    msg:"Pago confirmado: Harrington EXP-0041",   sub:"$66,250 · Complemento 25%",        tiempo:"hace 2d",  color:"#3A6B35" },
];

const ALERTAS = [
  { icon:"⏰", msg:"Reserva próxima a vencer: Unidad 203 — Moreau", urgente:true  },
  { icon:"📋", msg:"2 aprobaciones pendientes sin respuesta > 24h", urgente:true  },
  { icon:"👤", msg:"3 leads calientes sin contactar en +24h",        urgente:true  },
  { icon:"📄", msg:"4 documentos pendientes de firma del cliente",   urgente:false },
  { icon:"💳", msg:"Pago vence esta semana: Harrington · $66,250",   urgente:false },
];

const UNIDADES_CALIENTES = [
  { id:"PH-01", tipo:"Penthouse 2 Hab", vistas:47, interes:12, precio:"$680,000", estado:"disponible" },
  { id:"203",   tipo:"1 Hab · 1er Piso",vistas:38, interes:9,  precio:"$431,000", estado:"disponible" },
  { id:"307",   tipo:"2 Hab · 3er Piso",vistas:31, interes:7,  precio:"$520,000", estado:"disponible" },
  { id:"102",   tipo:"1 Hab · PB",       vistas:28, interes:6,  precio:"$390,000", estado:"disponible" },
];

const VENTAS_SEMANA = [
  { semana:"S1 Abr", val:2 },
  { semana:"S2 Abr", val:3 },
  { semana:"S3 Abr", val:1 },
  { semana:"S4 Abr", val:2 },
  { semana:"S1 May", val:0 },
];

/* ═══════════════════════════════════════════
   SHARED
═══════════════════════════════════════════ */
function KPICard({ label, value, sub, color, icon, alert, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: C.bgCard,
      border: `1px solid ${alert ? C.red+"55" : C.border}`,
      borderTop: `3px solid ${alert ? C.red : color || C.green}`,
      borderRadius:"10px", padding:"16px 18px",
      boxShadow: C.shadow, cursor: onClick ? "pointer" : "default",
      transition:"box-shadow 0.15s",
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
        <span style={{fontSize:"20px"}}>{icon}</span>
        {alert && <span style={{fontSize:"10px",background:C.redBg,color:C.red,padding:"2px 7px",borderRadius:"4px",fontFamily:FM}}>⚠ ALERTA</span>}
      </div>
      <div style={{fontSize:"26px",fontFamily:FH,fontWeight:400,color:alert?C.red:color||C.text,marginBottom:"4px"}}>{value}</div>
      <div style={{fontSize:"12px",fontFamily:FB,color:C.text,marginBottom:"2px"}}>{label}</div>
      {sub && <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted}}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
      <h3 style={{margin:0,fontSize:"14px",fontFamily:FH,fontWeight:400,color:C.text,letterSpacing:"0.3px"}}>{children}</h3>
      {action && <button onClick={onAction} style={{background:"none",border:"none",color:C.green,fontSize:"12px",cursor:"pointer",fontFamily:FB}}>{action}</button>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   VIEW 1 — ADMIN PANEL DASHBOARD
═══════════════════════════════════════════ */
function AdminPanel() {
  const pctVendido = Math.round(DATA.vendidas/DATA.totalUnidades*100);
  const ritmo = 1.8;
  const semanasRestantes = Math.round(DATA.disponibles/ritmo);
  const maxBar = Math.max(...VENTAS_SEMANA.map(v=>v.val));

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>

      {/* ALERTAS OPERATIVAS */}
      <div style={{
        background: C.redBg, border:`1px solid ${C.red}44`,
        borderLeft:`4px solid ${C.red}`, borderRadius:"10px",
        padding:"14px 18px",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
          <span style={{fontSize:"16px"}}>🚨</span>
          <span style={{fontSize:"13px",fontFamily:FH,color:C.red,fontWeight:400}}>
            {ALERTAS.filter(a=>a.urgente).length} alertas urgentes requieren atención
          </span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
          {ALERTAS.map((a,i)=>(
            <div key={i} style={{
              display:"flex",alignItems:"center",gap:"10px",
              padding:"8px 12px",
              background: a.urgente ? "#fff" : C.bgWarm,
              borderRadius:"7px",
              border:`1px solid ${a.urgente ? C.red+"33" : C.border}`,
            }}>
              <span style={{fontSize:"14px"}}>{a.icon}</span>
              <span style={{flex:1,fontSize:"12px",fontFamily:FB,color:C.text}}>{a.msg}</span>
              {a.urgente && <span style={{fontSize:"10px",background:C.redBg,color:C.red,padding:"2px 7px",borderRadius:"3px",fontFamily:FM,whiteSpace:"nowrap"}}>URGENTE</span>}
            </div>
          ))}
        </div>
      </div>

      {/* KPIs INVENTARIO */}
      <div>
        <SectionTitle>Estado del inventario</SectionTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"12px",marginBottom:"14px"}}>
          <KPICard icon="⊞" label="Total unidades"   value={DATA.totalUnidades} sub="Fase 2 completa"       color={C.text}  />
          <KPICard icon="✓" label="Vendidas"          value={`${DATA.vendidas} (${pctVendido}%)`} sub={`$${(DATA.valorVentas/1e6).toFixed(2)}M USD`} color={C.green} />
          <KPICard icon="◻" label="Disponibles"       value={`${DATA.disponibles} (${100-pctVendido}%)`} sub={`$${(DATA.valorDisponible/1e6).toFixed(1)}M disponible`} color={C.blue}  />
          <KPICard icon="⏳" label="Reservadas"        value={DATA.reservadas} alert={DATA.reservadas===0} sub="0 clientes en proceso" color={C.amber} />
          <KPICard icon="◎" label="Pendientes"        value={DATA.pendientes} alert={DATA.pendientes===0} sub="0 en negociación" color={C.amber} />
        </div>

        {/* Barra de inventario */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"16px 20px",boxShadow:C.shadow}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
            <span style={{fontSize:"12px",fontFamily:FM,color:C.textSub}}>Progreso de ventas del proyecto</span>
            <span style={{fontSize:"12px",fontFamily:FM,color:C.textSub}}>
              Proyección cierre total: ~{semanasRestantes} semanas · Ritmo actual: {ritmo}/sem
            </span>
          </div>
          <div style={{background:C.bgWarm,borderRadius:"8px",height:"22px",overflow:"hidden",position:"relative",marginBottom:"8px"}}>
            <div style={{
              width:`${pctVendido}%`, height:"100%",
              background:`linear-gradient(90deg,${C.green},${C.greenLight})`,
              borderRadius:"8px 0 0 8px",
              display:"flex",alignItems:"center",paddingLeft:"10px",
            }}>
              <span style={{fontSize:"11px",color:"#fff",fontFamily:FM,fontWeight:700,whiteSpace:"nowrap"}}>
                {DATA.vendidas} vendidas
              </span>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:"11px",fontFamily:FM,color:C.textMuted}}>
            <span style={{color:C.green,fontWeight:700}}>■ {pctVendido}% vendido</span>
            <span>■ {100-pctVendido}% disponible</span>
            <span>Objetivo: 3 unidades/semana</span>
            <span style={{color:C.red}}>⚠ Por debajo del objetivo ({ritmo}/sem actual)</span>
          </div>
        </div>
      </div>

      {/* FUNNEL + VENTAS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>

        {/* Funnel */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"18px 20px",boxShadow:C.shadow}}>
          <SectionTitle>Funnel de conversión · 14 días</SectionTitle>
          {[
            { label:"Visitas",      val:ANALYTICS.usuarios14d, pct:100,  color:C.blue,   icon:"👁" },
            { label:"Registros",    val:74,  pct:10,   color:C.gold,   icon:"✍️" },
            { label:"Consultas",    val:8,   pct:10.8, color:C.amber,  icon:"💬" },
            { label:"Reservas",     val:0,   pct:0,    color:C.red,    icon:"🔴",alert:true },
          ].map((s,i)=>(
            <div key={i} style={{marginBottom:"10px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <span style={{fontSize:"13px"}}>{s.icon}</span>
                  <span style={{fontSize:"12px",fontFamily:FB,color:s.alert?C.red:C.text}}>{s.label}</span>
                  {s.alert && <span style={{fontSize:"10px",background:C.redBg,color:C.red,padding:"1px 6px",borderRadius:"3px",fontFamily:FM}}>0% CONVERSIÓN</span>}
                </div>
                <div style={{textAlign:"right"}}>
                  <span style={{fontSize:"13px",fontFamily:FH,color:s.alert?C.red:C.text,fontWeight:400}}>{s.val}</span>
                  {i>0&&<span style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,marginLeft:"6px"}}>({s.pct}%)</span>}
                </div>
              </div>
              <div style={{background:C.bgWarm,borderRadius:"4px",height:"6px",overflow:"hidden"}}>
                <div style={{width:`${s.pct}%`,height:"100%",background:s.color,borderRadius:"4px"}} />
              </div>
            </div>
          ))}
          <div style={{
            marginTop:"12px",padding:"10px 12px",
            background:C.redBg,border:`1px solid ${C.red}22`,borderRadius:"7px",
            fontSize:"11px",color:C.red,fontFamily:FM,lineHeight:"1.6",
          }}>
            ⚠ Duración media de sesión: <strong>00:32 seg</strong> — Los usuarios no están encontrando lo que buscan. Revisar urgentemente el flujo de entrada al inventario.
          </div>
        </div>

        {/* Ventas por semana */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"18px 20px",boxShadow:C.shadow}}>
          <SectionTitle>Ventas por semana</SectionTitle>
          <div style={{display:"flex",alignItems:"flex-end",gap:"10px",height:"100px",marginBottom:"8px"}}>
            {VENTAS_SEMANA.map((v,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
                <span style={{fontSize:"11px",fontFamily:FM,color:v.val===0?C.red:C.text,fontWeight:"700"}}>{v.val}</span>
                <div style={{
                  width:"100%",borderRadius:"5px 5px 0 0",
                  height:v.val===0?"4px":`${(v.val/maxBar)*70}px`,
                  background:v.val===0?C.red+"44":i===VENTAS_SEMANA.length-1?C.amber:C.green,
                  transition:"height 0.3s",
                }} />
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:"10px"}}>
            {VENTAS_SEMANA.map((v,i)=>(
              <div key={i} style={{flex:1,textAlign:"center",fontSize:"9px",fontFamily:FM,color:C.textMuted}}>{v.semana}</div>
            ))}
          </div>
          <div style={{marginTop:"12px",display:"flex",justifyContent:"space-between",paddingTop:"12px",borderTop:`1px solid ${C.border}`}}>
            <div>
              <div style={{fontSize:"10px",color:C.textMuted,fontFamily:FM}}>Ritmo actual</div>
              <div style={{fontSize:"16px",fontFamily:FH,color:C.amber}}>{ritmo}/semana</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"10px",color:C.textMuted,fontFamily:FM}}>Objetivo</div>
              <div style={{fontSize:"16px",fontFamily:FH,color:C.green}}>3/semana</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:"10px",color:C.textMuted,fontFamily:FM}}>Cierre proyectado</div>
              <div style={{fontSize:"16px",fontFamily:FH,color:C.text}}>~{semanasRestantes} sem</div>
            </div>
          </div>
        </div>
      </div>

      {/* UNIDADES CALIENTES + ACTIVIDAD */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>

        {/* Unidades más vistas sin reservar */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"18px 20px",boxShadow:C.shadow}}>
          <SectionTitle action="Ver todas →">🔥 Unidades con más interés sin reservar</SectionTitle>
          <div style={{fontSize:"11px",color:C.textSub,fontFamily:FM,marginBottom:"12px"}}>
            Alta intención de compra frenada — contactar proactivamente
          </div>
          {UNIDADES_CALIENTES.map((u,i)=>(
            <div key={i} style={{
              display:"flex",alignItems:"center",gap:"12px",
              padding:"10px 0",
              borderBottom:i<UNIDADES_CALIENTES.length-1?`1px solid ${C.border}`:"none",
            }}>
              <div style={{
                width:"32px",height:"32px",borderRadius:"6px",
                background:C.greenBg,border:`1px solid ${C.green}33`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"10px",fontFamily:FM,fontWeight:700,color:C.green,flexShrink:0,
              }}>#{u.id}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:"12px",fontFamily:FB,color:C.text}}>{u.tipo}</div>
                <div style={{display:"flex",gap:"10px",marginTop:"2px"}}>
                  <span style={{fontSize:"10px",fontFamily:FM,color:C.textSub}}>👁 {u.vistas} vistas</span>
                  <span style={{fontSize:"10px",fontFamily:FM,color:C.amber}}>❤ {u.interes} interés</span>
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:"13px",fontFamily:FH,color:C.green}}>{u.precio}</div>
                <button style={{
                  fontSize:"10px",fontFamily:FM,color:C.blue,background:"none",
                  border:`1px solid ${C.blue}33`,borderRadius:"4px",
                  padding:"2px 8px",cursor:"pointer",marginTop:"3px",
                }}>Contactar</button>
              </div>
            </div>
          ))}
        </div>

        {/* Actividad reciente */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"18px 20px",boxShadow:C.shadow}}>
          <SectionTitle action="Ver todo →">Actividad reciente del equipo</SectionTitle>
          {ACTIVIDAD.map((a,i)=>(
            <div key={i} style={{
              display:"flex",gap:"10px",alignItems:"flex-start",
              padding:"10px 0",
              borderBottom:i<ACTIVIDAD.length-1?`1px solid ${C.border}`:"none",
            }}>
              <div style={{
                width:"8px",height:"8px",borderRadius:"50%",
                background:a.color,flexShrink:0,marginTop:"5px",
              }} />
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:"12px",fontFamily:FB,color:C.text,lineHeight:"1.4"}}>{a.msg}</div>
                <div style={{fontSize:"10px",fontFamily:FM,color:C.textSub,marginTop:"2px"}}>{a.sub}</div>
              </div>
              <span style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,flexShrink:0,marginTop:"2px"}}>{a.tiempo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ANALYTICS RESUMEN */}
      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"18px 20px",boxShadow:C.shadow}}>
        <SectionTitle>Analytics · Últimos 14 días</SectionTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"12px"}}>
          {[
            { label:"Usuarios",         val:ANALYTICS.usuarios14d,      color:C.blue,  icon:"👥" },
            { label:"Nuevos",           val:ANALYTICS.nuevos14d,        color:C.blue,  icon:"🆕" },
            { label:"Vistas pág.",      val:ANALYTICS.vistasTotal,      color:C.text,  icon:"📄" },
            { label:"Duración media",   val:ANALYTICS.sesionMedia+"s",  color:C.red,   icon:"⏱",alert:true },
            { label:"Tasa registro",    val:ANALYTICS.tasaRegistro+"%", color:C.amber, icon:"✍️" },
            { label:"Tasa reserva",     val:"0%",                        color:C.red,   icon:"🔴",alert:true },
          ].map(m=>(
            <div key={m.label} style={{
              background:m.alert?C.redBg:C.bg,
              border:`1px solid ${m.alert?C.red+"44":C.border}`,
              borderRadius:"8px",padding:"12px 14px",textAlign:"center",
            }}>
              <div style={{fontSize:"16px",marginBottom:"4px"}}>{m.icon}</div>
              <div style={{fontSize:"18px",fontFamily:FH,color:m.color,fontWeight:400}}>{m.val}</div>
              <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,marginTop:"3px"}}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════
   VIEW 2 — RESUMEN DEL PROYECTO (Presentation)
═══════════════════════════════════════════ */
function ResumenProyecto() {
  const pctVendido = Math.round(DATA.vendidas/DATA.totalUnidades*100);
  const [tick, setTick] = useState(0);

  useEffect(()=>{
    const t = setInterval(()=>setTick(n=>n+1),3000);
    return ()=>clearInterval(t);
  },[]);

  const stats = [
    { val:`$${(DATA.valorVentas/1e6).toFixed(2)}M`, label:"En ventas cerradas",      color:"#fff"        },
    { val:`${DATA.vendidas}`,                        label:"Unidades vendidas",        color:C.goldLight   },
    { val:`${DATA.roiAnual}%`,                       label:"ROI total anual estimado", color:C.goldLight   },
    { val:`$${(DATA.alquilerMensual).toLocaleString()}`, label:"Alquiler mensual est.", color:"#fff"      },
  ];

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg, #1E2A1A 0%, #2E3D28 40%, #1A2418 100%)`,
      display:"flex",flexDirection:"column",
      fontFamily:FB, color:"#fff",
      position:"relative",overflow:"hidden",
    }}>

      {/* Decorative circles */}
      {[
        {w:500,h:500,top:"-200px",right:"-200px",op:0.04},
        {w:300,h:300,bottom:"-100px",left:"-100px",op:0.05},
        {w:200,h:200,top:"40%",left:"60%",op:0.03},
      ].map((c,i)=>(
        <div key={i} style={{
          position:"absolute",width:c.w,height:c.h,borderRadius:"50%",
          border:`1px solid rgba(184,148,42,${c.op*5})`,
          background:`radial-gradient(circle, rgba(184,148,42,${c.op}) 0%, transparent 70%)`,
          top:c.top,right:c.right,bottom:c.bottom,left:c.left,
          pointerEvents:"none",
        }} />
      ))}

      {/* Header */}
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",
        padding:"28px 48px 20px",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        position:"relative",
      }}>
        <div>
          <div style={{fontSize:"10px",letterSpacing:"4px",color:"rgba(255,255,255,0.4)",fontFamily:FM,marginBottom:"4px"}}>
            DUNA DEVELOPMENT GROUP
          </div>
          <div style={{fontSize:"28px",fontFamily:FH,fontWeight:400,letterSpacing:"2px",color:"#fff"}}>
            MAKAI RESIDENCES
          </div>
          <div style={{fontSize:"13px",color:C.goldLight,fontFamily:FM,marginTop:"2px",letterSpacing:"1px"}}>
            Cap Cana · República Dominicana
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            background:"rgba(184,148,42,0.15)",border:"1px solid rgba(184,148,42,0.3)",
            borderRadius:"8px",padding:"8px 16px",
          }}>
            <div style={{width:"8px",height:"8px",borderRadius:"50%",background:C.goldLight,
              animation:"pulse 2s infinite",
            }} />
            <span style={{fontSize:"12px",fontFamily:FM,color:C.goldLight,letterSpacing:"1px"}}>
              FASE 2 EN VENTA
            </span>
          </div>
          <div style={{marginTop:"8px",fontSize:"11px",color:"rgba(255,255,255,0.4)",fontFamily:FM}}>
            {new Date().toLocaleDateString("es-DO",{day:"numeric",month:"long",year:"numeric"})}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{flex:1,padding:"28px 48px",display:"flex",flexDirection:"column",gap:"24px"}}>

        {/* INVENTORY BAR — hero element */}
        <div style={{
          background:"rgba(255,255,255,0.04)",
          border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:"14px",padding:"24px 28px",
        }}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"12px"}}>
            <div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px",marginBottom:"4px"}}>
                INVENTARIO TOTAL · 102 UNIDADES
              </div>
              <div style={{fontSize:"32px",fontFamily:FH,fontWeight:400,color:"#fff",letterSpacing:"1px"}}>
                {DATA.vendidas} vendidas · {DATA.disponibles} disponibles
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",fontFamily:FM,marginBottom:"4px"}}>VALOR TOTAL DEL PROYECTO</div>
              <div style={{fontSize:"22px",fontFamily:FH,color:C.goldLight}}>${(DATA.valorTotal/1e6).toFixed(2)}M USD</div>
            </div>
          </div>

          {/* Bar */}
          <div style={{background:"rgba(255,255,255,0.08)",borderRadius:"10px",height:"28px",overflow:"hidden",position:"relative"}}>
            <div style={{
              width:`${pctVendido}%`,height:"100%",
              background:`linear-gradient(90deg, ${C.green}, ${C.goldLight})`,
              borderRadius:"10px 0 0 10px",
              display:"flex",alignItems:"center",paddingLeft:"14px",
              transition:"width 1s ease",
            }}>
              <span style={{fontSize:"12px",fontFamily:FM,color:"#fff",fontWeight:700,whiteSpace:"nowrap"}}>
                ■ {pctVendido}% VENDIDO
              </span>
            </div>
          </div>

          <div style={{display:"flex",gap:"28px",marginTop:"10px"}}>
            {[
              {color:C.green,   label:`${DATA.vendidas} vendidas (${pctVendido}%)`,           val:`$${(DATA.valorVentas/1e6).toFixed(2)}M`   },
              {color:"rgba(255,255,255,0.2)",label:`${DATA.disponibles} disponibles (${100-pctVendido}%)`,val:`$${(DATA.valorDisponible/1e6).toFixed(1)}M`},
            ].map(s=>(
              <div key={s.label} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <div style={{width:"10px",height:"10px",borderRadius:"2px",background:s.color,flexShrink:0}} />
                <span style={{fontSize:"12px",fontFamily:FM,color:"rgba(255,255,255,0.6)"}}>{s.label}</span>
                <span style={{fontSize:"12px",fontFamily:FM,color:"rgba(255,255,255,0.4)"}}>·</span>
                <span style={{fontSize:"12px",fontFamily:FM,color:C.goldLight}}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KPI GRID */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px"}}>
          {stats.map((s,i)=>(
            <div key={i} style={{
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderTop:`2px solid ${C.gold}`,
              borderRadius:"12px",padding:"20px 18px",
              textAlign:"center",
            }}>
              <div style={{fontSize:"30px",fontFamily:FH,fontWeight:400,color:s.color,marginBottom:"6px"}}>{s.val}</div>
              <div style={{fontSize:"11px",fontFamily:FM,color:"rgba(255,255,255,0.45)",letterSpacing:"1px"}}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* BOTTOM ROW */}
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr",gap:"14px"}}>

          {/* Avance de obra */}
          <div style={{
            background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"12px",padding:"20px 22px",
          }}>
            <div style={{fontSize:"10px",letterSpacing:"2px",color:"rgba(255,255,255,0.4)",fontFamily:FM,marginBottom:"12px"}}>
              AVANCE DE OBRA
            </div>
            {[
              {label:"Cimentación",        pct:100, done:true },
              {label:"Estructura planta baja",pct:100,done:true},
              {label:"Estructura Torre Sur", pct:60, done:false,activo:true},
              {label:"Acabados",             pct:0,  done:false},
            ].map((h,i)=>(
              <div key={i} style={{marginBottom:"10px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                  <span style={{fontSize:"12px",fontFamily:FB,color:h.done?"rgba(255,255,255,0.8)":h.activo?C.goldLight:"rgba(255,255,255,0.35)"}}>
                    {h.done?"✓ ":h.activo?"● ":"○ "}{h.label}
                  </span>
                  <span style={{fontSize:"11px",fontFamily:FM,color:h.done?C.goldLight:h.activo?C.goldLight:"rgba(255,255,255,0.3)"}}>{h.pct}%</span>
                </div>
                <div style={{background:"rgba(255,255,255,0.08)",borderRadius:"3px",height:"4px",overflow:"hidden"}}>
                  <div style={{width:`${h.pct}%`,height:"100%",background:h.done?C.gold:h.activo?C.goldLight:"transparent",borderRadius:"3px"}} />
                </div>
              </div>
            ))}
            <div style={{
              marginTop:"14px",padding:"10px 12px",
              background:"rgba(184,148,42,0.12)",border:"1px solid rgba(184,148,42,0.25)",
              borderRadius:"7px",
            }}>
              <div style={{fontSize:"11px",color:C.goldLight,fontFamily:FM,marginBottom:"2px"}}>AVANCE GENERAL</div>
              <div style={{fontSize:"22px",fontFamily:FH,color:C.goldLight}}>{DATA.avanceObra}%</div>
              <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,marginTop:"2px"}}>Entrega estimada {DATA.entrega}</div>
            </div>
          </div>

          {/* Inversión */}
          <div style={{
            background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"12px",padding:"20px 22px",
          }}>
            <div style={{fontSize:"10px",letterSpacing:"2px",color:"rgba(255,255,255,0.4)",fontFamily:FM,marginBottom:"14px"}}>
              CASO DE INVERSIÓN
            </div>
            {[
              {label:"Precio desde",           val:`$${(DATA.precioDesde/1e3).toFixed(0)}K USD`},
              {label:"Alquiler mensual est.",   val:`$${DATA.alquilerMensual.toLocaleString()}`},
              {label:"Retorno neto anual",      val:"10.33%"},
              {label:"Apreciación capital/año", val:"5%"},
              {label:"ROI total anual",         val:`${DATA.roiAnual}%`,highlight:true},
              {label:"Payback period",          val:"~4.4 años"},
            ].map((r,i)=>(
              <div key={i} style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",
                padding:"8px 0",
                borderBottom:i<5?"1px solid rgba(255,255,255,0.07)":"none",
              }}>
                <span style={{fontSize:"11px",fontFamily:FM,color:"rgba(255,255,255,0.45)"}}>{r.label}</span>
                <span style={{
                  fontSize:r.highlight?"18px":"13px",
                  fontFamily:r.highlight?FH:FM,
                  color:r.highlight?C.goldLight:"rgba(255,255,255,0.8)",
                  fontWeight:r.highlight?400:400,
                }}>{r.val}</span>
              </div>
            ))}
          </div>

          {/* Descuento + CTA */}
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <div style={{
              flex:1,
              background:`linear-gradient(135deg, rgba(184,148,42,0.2), rgba(184,148,42,0.08))`,
              border:"1px solid rgba(184,148,42,0.35)",
              borderRadius:"12px",padding:"20px 22px",
              display:"flex",flexDirection:"column",justifyContent:"center",
            }}>
              <div style={{fontSize:"10px",letterSpacing:"2px",color:C.goldLight,fontFamily:FM,marginBottom:"8px"}}>
                🔒 DESCUENTO DE LANZAMIENTO
              </div>
              <div style={{fontSize:"36px",fontFamily:FH,fontWeight:400,color:"#fff",marginBottom:"4px"}}>
                $20,000
              </div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.5)",fontFamily:FM,marginBottom:"12px"}}>
                Ahorro en precio de compra · Tiempo limitado
              </div>
              <div style={{
                display:"inline-flex",alignItems:"center",gap:"6px",
                background:C.gold,borderRadius:"7px",padding:"10px 18px",
                fontSize:"13px",fontFamily:FB,fontWeight:600,color:"#fff",
                cursor:"pointer",alignSelf:"flex-start",
              }}>
                Reservar ahora →
              </div>
            </div>

            <div style={{
              background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:"12px",padding:"14px 18px",
            }}>
              <div style={{fontSize:"10px",letterSpacing:"2px",color:"rgba(255,255,255,0.35)",fontFamily:FM,marginBottom:"10px"}}>
                MOMENTUM DEL PROYECTO
              </div>
              {[
                {icon:"🔥",text:`${DATA.vendidas} unidades vendidas desde lanzamiento`},
                {icon:"⏰",text:"Descuento activo · Plazo limitado"},
                {icon:"📈",text:"Proyecto sin desviaciones de entrega"},
              ].map((m,i)=>(
                <div key={i} style={{display:"flex",gap:"8px",marginBottom:i<2?"8px":"0"}}>
                  <span style={{fontSize:"12px"}}>{m.icon}</span>
                  <span style={{fontSize:"11px",fontFamily:FB,color:"rgba(255,255,255,0.6)",lineHeight:"1.4"}}>{m.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding:"12px 48px",
        borderTop:"1px solid rgba(255,255,255,0.07)",
        display:"flex",justifyContent:"space-between",alignItems:"center",
        fontSize:"10px",fontFamily:FM,color:"rgba(255,255,255,0.25)",letterSpacing:"1px",
      }}>
        <span>DUNA DEVELOPMENT GROUP · KELMI CARIBBEAN BUSINESS GROUP</span>
        <span>sales.makai-capcana.com</span>
        <span>Datos actualizados: {new Date().toLocaleDateString("es-DO")}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN — TOGGLE BETWEEN BOTH VIEWS
═══════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("panel");

  return (
    <div style={{minHeight:"100vh",background:view==="panel"?C.bg:"#1E2A1A",fontFamily:FB}}>

      {/* Toggle bar — only shown in panel view */}
      {view === "panel" && (
        <div style={{
          background:C.sidebar,padding:"12px 24px",
          display:"flex",alignItems:"center",gap:"16px",
          position:"sticky",top:0,zIndex:50,
          borderBottom:"1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{flex:1}}>
            <span style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px"}}>DUNA DEVELOPMENT · ADMIN</span>
            <div style={{fontSize:"14px",fontFamily:FH,color:"#fff",fontWeight:400}}>Panel de Control</div>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            {[
              {key:"panel",   label:"◉ Panel de Control",    active:view==="panel"   },
              {key:"resumen", label:"◈ Resumen del Proyecto", active:view==="resumen" },
            ].map(b=>(
              <button key={b.key} onClick={()=>setView(b.key)} style={{
                background:b.active?"rgba(255,255,255,0.12)":"transparent",
                color:b.active?"#fff":"rgba(255,255,255,0.5)",
                border:`1px solid ${b.active?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.08)"}`,
                borderRadius:"7px",padding:"7px 18px",fontSize:"12px",
                cursor:"pointer",fontFamily:FB,
              }}>{b.label}</button>
            ))}
          </div>
          <div style={{
            padding:"6px 14px",
            background:"rgba(176,58,46,0.2)",border:"1px solid rgba(176,58,46,0.4)",
            borderRadius:"6px",fontSize:"11px",color:"#E8A09A",fontFamily:FM,
          }}>🔴 Sesión media: 32s — Revisar urgente</div>
        </div>
      )}

      {/* View content */}
      {view === "panel" && (
        <div style={{padding:"24px 28px"}}>
          {/* Header */}
          <div style={{marginBottom:"20px"}}>
            <h1 style={{margin:"0 0 4px",fontSize:"20px",fontFamily:FH,fontWeight:400,color:C.text}}>Panel de Control</h1>
            <p style={{margin:0,fontSize:"13px",color:C.textSub,fontFamily:FB}}>
              Makai Residences Cap Cana · Vista interna del equipo Duna Development
            </p>
          </div>
          <AdminPanel />
        </div>
      )}

      {view === "resumen" && (
        <div style={{position:"relative"}}>
          <button onClick={()=>setView("panel")} style={{
            position:"fixed",top:"20px",right:"20px",zIndex:100,
            background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",
            border:"1px solid rgba(255,255,255,0.15)",borderRadius:"7px",
            padding:"8px 16px",fontSize:"12px",cursor:"pointer",fontFamily:FB,
            backdropFilter:"blur(8px)",
          }}>← Volver al Panel</button>
          <ResumenProyecto />
        </div>
      )}
    </div>
  );
}
