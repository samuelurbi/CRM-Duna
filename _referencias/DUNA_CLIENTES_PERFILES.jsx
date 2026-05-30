import { useState, useMemo, useRef } from "react";

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
  border:"#E0DAD0", borderMid:"#CEC8BC",
  text:"#26231C", textSub:"#6B6355", textMuted:"#A09080",
  shadow:"0 1px 4px rgba(0,0,0,0.07)",
  shadowMd:"0 6px 24px rgba(0,0,0,0.13)",
};
const FH="'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const FB="Georgia,'Times New Roman',serif";
const FM="'Courier New',Courier,monospace";

/* ══════════════════════════════════════
   ROLES & PERMISSIONS MATRIX
══════════════════════════════════════ */
const ROLES = {
  cliente: {
    label:"Cliente Final", color:C.green, bg:C.greenBg, icon:"👤",
    permisos:{
      ver_inventario:true, reservar:true, ver_documentos_propios:true,
      firmar_documentos:true, chat_broker:true, ver_plan_pagos:true,
      ver_avance_obra:true, exportar_datos:false, ver_otros_clientes:false,
      gestionar_agentes:false, ver_comisiones:false, acceso_admin:false,
    }
  },
  agente: {
    label:"Agente Duna", color:C.blue, bg:C.blueBg, icon:"💼",
    permisos:{
      ver_inventario:true, reservar:true, ver_documentos_propios:true,
      firmar_documentos:false, chat_broker:true, ver_plan_pagos:true,
      ver_avance_obra:true, exportar_datos:false, ver_otros_clientes:true,
      gestionar_agentes:false, ver_comisiones:true, acceso_admin:false,
    }
  },
  broker: {
    label:"Broker / Agencia", color:C.purple, bg:C.purpleBg, icon:"🤝",
    permisos:{
      ver_inventario:true, reservar:true, ver_documentos_propios:false,
      firmar_documentos:false, chat_broker:true, ver_plan_pagos:false,
      ver_avance_obra:true, exportar_datos:false, ver_otros_clientes:false,
      gestionar_agentes:false, ver_comisiones:true, acceso_admin:false,
    }
  },
  admin: {
    label:"Administrador", color:C.red, bg:C.redBg, icon:"⚙️",
    permisos:{
      ver_inventario:true, reservar:true, ver_documentos_propios:true,
      firmar_documentos:true, chat_broker:true, ver_plan_pagos:true,
      ver_avance_obra:true, exportar_datos:true, ver_otros_clientes:true,
      gestionar_agentes:true, ver_comisiones:true, acceso_admin:true,
    }
  },
};

const PERMISOS_LABELS = {
  ver_inventario:         "Ver inventario de unidades",
  reservar:               "Reservar / comprar unidades",
  ver_documentos_propios: "Ver sus documentos",
  firmar_documentos:      "Firmar documentos digitalmente",
  chat_broker:            "Chat con equipo Duna",
  ver_plan_pagos:         "Ver plan de pagos",
  ver_avance_obra:        "Ver avance de obra",
  exportar_datos:         "Exportar datos",
  ver_otros_clientes:     "Ver perfiles de otros usuarios",
  gestionar_agentes:      "Gestionar agentes y roles",
  ver_comisiones:         "Ver comisiones",
  acceso_admin:           "Acceso al panel de administración",
};

/* ══ MOCK DATA ══ */
const CLIENTES = [
  { id:1,  nombre:"Dave Manser",         email:"davemanser1972@gmail.com",     tel:"+1 403-330-3403",  pais:"Canadá",   rol:"cliente", sesionesHoy:3, sesionesTotal:20, guardados:16, unidadesVistas:["111","115","PH-01"], origen:"Google",    registro:"25 abr 2026", ultimaSesion:"Hoy 13:07", caliente:true,  tiempoMedio:"8m 32s", dispositivo:"Desktop", hora:"10–14h" },
  { id:2,  nombre:"Anyss Fakhfakh",      email:"anyssfakhfakh@gmail.com",      tel:"+1 514-839-4830",  pais:"Canadá",   rol:"cliente", sesionesHoy:2, sesionesTotal:28, guardados:4,  unidadesVistas:["111","112","115"],  origen:"Email",     registro:"15 abr 2026", ultimaSesion:"Hoy 03:12", caliente:true,  tiempoMedio:"6m 50s", dispositivo:"Mobile",  hora:"22–02h" },
  { id:3,  nombre:"Samuel Urbina",       email:"samuelurbi93@gmail.com",       tel:"+58 412-605-4038", pais:"Venezuela",rol:"cliente", sesionesHoy:1, sesionesTotal:11, guardados:1,  unidadesVistas:["217"],             origen:"Instagram", registro:"14 abr 2026", ultimaSesion:"Hoy 14:05", caliente:false, tiempoMedio:"2m 11s", dispositivo:"Mobile",  hora:"14–18h" },
  { id:4,  nombre:"Adit Chaudhry",       email:"aditc31@gmail.com",            tel:"+1 416-737-2489",  pais:"N/A",      rol:"cliente", sesionesHoy:1, sesionesTotal:76, guardados:0,  unidadesVistas:["319","426"],        origen:"Google",    registro:"21 mar 2026", ultimaSesion:"Ayer 02:43",caliente:false, tiempoMedio:"1m 55s", dispositivo:"Desktop", hora:"02–06h" },
  { id:5,  nombre:"Ridhi Johal",         email:"ridhi_g@hotmail.com",          tel:"+1 647-955-5645",  pais:"Canadá",   rol:"cliente", sesionesHoy:0, sesionesTotal:32, guardados:0,  unidadesVistas:["111","112"],        origen:"Google",    registro:"19 mar 2026", ultimaSesion:"Ayer 21:55",caliente:false, tiempoMedio:"2m 30s", dispositivo:"Desktop", hora:"18–22h" },
  { id:6,  nombre:"Jack Scott Rey",      email:"jackscottking@gmail.com",      tel:"+27 734-645-093",  pais:"Sudáfrica",rol:"cliente", sesionesHoy:1, sesionesTotal:1,  guardados:0,  unidadesVistas:["111"],             origen:"Web",       registro:"Hoy",          ultimaSesion:"Hoy 11:39", caliente:false, tiempoMedio:"0m 32s", dispositivo:"Mobile",  hora:"11–15h" },
];

const AGENTES = [
  { id:10, nombre:"Carlos Méndez",   email:"cmenendez@dunadevelopment.com", tel:"+1 809-555-0123", pais:"RD",    rol:"agente", cargo:"Broker Senior",      sesionesHoy:8, sesionesTotal:218, ventasCerradas:12, enPipeline:4, comisionTotal:"$48,400", ultimaSesion:"Hoy 15:30", registro:"19 feb 2026", activo:true  },
  { id:11, nombre:"Ana Rodríguez",   email:"arodriguez@dunadevelopment.com",tel:"+1 809-555-0124", pais:"RD",    rol:"agente", cargo:"Agente Comercial",   sesionesHoy:5, sesionesTotal:134, ventasCerradas:6,  enPipeline:2, comisionTotal:"$22,100", ultimaSesion:"Hoy 14:20", registro:"19 feb 2026", activo:true  },
  { id:12, nombre:"Ernesto Rivas",   email:"erivas@dunadevelopment.com",    tel:"+1 809-555-0125", pais:"RD",    rol:"agente", cargo:"Agente Comercial",   sesionesHoy:3, sesionesTotal:218, ventasCerradas:8,  enPipeline:3, comisionTotal:"$31,200", ultimaSesion:"Hoy 13:45", registro:"19 feb 2026", activo:true  },
  { id:13, nombre:"Ángel Ramírez",   email:"aramirez@dunadevelopment.com",  tel:"+1 809-555-0126", pais:"RD",    rol:"agente", cargo:"Gestor Administrativo",sesionesHoy:4,sesionesTotal:134, ventasCerradas:0,  enPipeline:0, comisionTotal:"—",       ultimaSesion:"Ayer 21:26",registro:"19 feb 2026", activo:false },
];

const BROKERS = [
  { id:20, nombre:"Júnior Bourassa",     email:"juniorbourassa@sunsetrealestate.ca", tel:"+1 873-354-0971", pais:"Canadá",  rol:"broker", empresa:"Sunset Real Estate", sesionesHoy:2, sesionesTotal:17, clientesVinculados:8, ventasCerradas:2, comisionPendiente:"$9,200",  ultimaSesion:"Hoy 04:45",  registro:"16 abr 2026" },
  { id:21, nombre:"Jean François Soucy", email:"jfsoucy@sunsetrealestate.ca",        tel:"+1 418-802-2919", pais:"Canadá",  rol:"broker", empresa:"Sunset Real Estate", sesionesHoy:0, sesionesTotal:10, clientesVinculados:3, ventasCerradas:1, comisionPendiente:"$16,250", ultimaSesion:"Ayer 22:24", registro:"16 abr 2026" },
  { id:22, nombre:"María Rocío Márquez", email:"sales.makai@passfwd.com",            tel:"+56 809-264-846", pais:"N/A",     rol:"broker", empresa:"Guise Realty",       sesionesHoy:1, sesionesTotal:37, clientesVinculados:5, ventasCerradas:0, comisionPendiente:"—",       ultimaSesion:"Hoy 11:30",  registro:"22 mar 2026" },
  { id:23, nombre:"Peinado David",       email:"damainversiones2025@gmail.com",      tel:"+34 606-508-328", pais:"España",  rol:"broker", empresa:"Dama Inversiones",   sesionesHoy:1, sesionesTotal:79, clientesVinculados:2, ventasCerradas:0, comisionPendiente:"—",       ultimaSesion:"Ayer 00:23", registro:"11 abr 2026" },
];

/* ══ SESSION ANALYTICS DATA ══ */
const SESION_DATA = {
  hoy:           { total:24, clientes:18, agentes:4, brokers:2 },
  semana:        { total:187,clientes:142,agentes:28,brokers:17},
  mes:           { total:740,clientes:574,agentes:98,brokers:68},
  historico:     { total:4820,clientes:3890,agentes:512,brokers:418},
  duracion_media:"2m 18s",
  pico_hora:     "10:00–14:00",
  dispositivos:  { desktop:54, mobile:38, tablet:8 },
  fuentes:       { google:42, instagram:28, directo:18, referido:8, email:4 },
};

const REG_DATA = {
  clientes: { hoy:3, semana:14, mes:47, total:CLIENTES.length + 2373 },
  brokers:  { hoy:0, semana:2,  mes:8,  total:BROKERS.length + 28    },
  agentes:  { hoy:0, semana:0,  mes:1,  total:AGENTES.length         },
};

const CHART_7D = [42,68,35,91,58,73,47];
const DIAS = ["L","M","X","J","V","S","D"];

const VALID_CODES = ["DUNA2026","MAKAI-ADM","EXPORT99"];

/* ══ HELPERS ══ */
function RolBadge({ rol, small }) {
  const r = ROLES[rol] || ROLES.cliente;
  return (
    <span style={{
      background:r.bg, color:r.color,
      fontSize:small?"10px":"11px",
      padding:small?"2px 7px":"3px 10px",
      borderRadius:"4px", fontFamily:FM,
      border:`1px solid ${r.color}22`,
      whiteSpace:"nowrap",
      display:"inline-flex", alignItems:"center", gap:"4px",
    }}>
      <span style={{fontSize:small?"11px":"12px"}}>{r.icon}</span>
      {r.label}
    </span>
  );
}

function Avatar({ nombre, rol, size=32 }) {
  const r = ROLES[rol] || ROLES.cliente;
  const initials = nombre.split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase();
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%",
      background:r.bg, border:`2px solid ${r.color}44`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.33, fontWeight:700, color:r.color, fontFamily:FH,
      flexShrink:0,
    }}>{initials}</div>
  );
}

function Stat({ label, val, sub, color }) {
  return (
    <div style={{
      background:C.bgCard, border:`1px solid ${C.border}`,
      borderRadius:"9px", padding:"14px 16px",
      boxShadow:C.shadow,
    }}>
      <div style={{fontSize:"22px", fontFamily:FH, color:color||C.text, fontWeight:400}}>{val}</div>
      <div style={{fontSize:"12px", fontFamily:FB, color:C.text, marginTop:"3px"}}>{label}</div>
      {sub && <div style={{fontSize:"10px", fontFamily:FM, color:C.textMuted, marginTop:"2px"}}>{sub}</div>}
    </div>
  );
}

/* ══ EXPORT MODAL ══ */
function ExportModal({ seccion, onClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [blockSecs, setBlockSecs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef();

  const verify = () => {
    if (VALID_CODES.includes(code.trim().toUpperCase())) {
      setLoading(true);
      setTimeout(()=>{ setLoading(false); setDone(true); }, 1800);
    } else {
      const n = attempts + 1;
      setAttempts(n);
      setError(true);
      setCode("");
      if (n >= 3) {
        setBlocked(true);
        let s = 60;
        setBlockSecs(s);
        const t = setInterval(()=>{ s--; setBlockSecs(s); if(s<=0){clearInterval(t);setBlocked(false);setAttempts(0);}},1000);
      }
    }
  };

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(26,23,18,0.65)",
      backdropFilter:"blur(5px)", display:"flex", alignItems:"center",
      justifyContent:"center", zIndex:400, padding:"20px",
    }} onClick={e=>e.target===e.currentTarget&&!done&&onClose()}>
      <div style={{
        background:C.bgCard, borderRadius:"14px",
        width:"100%", maxWidth:"440px",
        boxShadow:C.shadowMd, overflow:"hidden",
      }}>
        <div style={{ background:C.sidebar, padding:"18px 22px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px",marginBottom:"2px"}}>EXPORTACIÓN PROTEGIDA</div>
            <div style={{fontSize:"15px",fontFamily:FH,color:"#fff",fontWeight:400}}>Código de autorización</div>
          </div>
          {!done&&<button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"15px"}}>✕</button>}
        </div>
        <div style={{padding:"24px"}}>
          {done ? (
            <div style={{textAlign:"center",padding:"16px 0"}}>
              <div style={{fontSize:"40px",marginBottom:"12px"}}>✅</div>
              <div style={{fontSize:"15px",fontFamily:FH,color:C.green,marginBottom:"6px"}}>Exportación completada</div>
              <div style={{fontSize:"12px",fontFamily:FM,color:C.textSub,marginBottom:"20px"}}>
                {seccion} exportado correctamente. El archivo se ha guardado en tus descargas.
              </div>
              <div style={{fontSize:"11px",color:C.amber,background:C.amberBg,padding:"10px 14px",borderRadius:"8px",fontFamily:FM,marginBottom:"16px"}}>
                🔍 Esta exportación ha sido registrada en el historial de auditoría.
              </div>
              <button onClick={onClose} style={{background:C.sidebar,color:"#fff",border:"none",borderRadius:"7px",padding:"10px 24px",fontSize:"13px",cursor:"pointer",fontFamily:FB,fontWeight:600}}>Cerrar</button>
            </div>
          ) : loading ? (
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{width:"44px",height:"44px",borderRadius:"50%",border:`3px solid ${C.greenBg}`,borderTop:`3px solid ${C.green}`,animation:"spin 0.8s linear infinite",margin:"0 auto 14px"}} />
              <div style={{fontSize:"14px",fontFamily:FH,color:C.text}}>Generando archivo…</div>
            </div>
          ) : (
            <>
              <div style={{fontSize:"12px",color:C.textSub,fontFamily:FB,lineHeight:"1.6",marginBottom:"20px"}}>
                Introduce el código que te ha proporcionado el administrador para exportar: <strong>{seccion}</strong>
              </div>
              <div style={{marginBottom:"16px"}}>
                <input
                  ref={inputRef}
                  value={code}
                  onChange={e=>{ setCode(e.target.value.toUpperCase()); setError(false); }}
                  onKeyDown={e=>e.key==="Enter"&&code.length>=4&&!blocked&&verify()}
                  placeholder="Introduce el código..."
                  autoFocus
                  style={{
                    width:"100%", padding:"13px 16px", boxSizing:"border-box",
                    background:error?C.redBg:C.bgInput,
                    border:`2px solid ${error?C.red:code.length>0?C.green:C.border}`,
                    borderRadius:"9px", fontSize:"18px", fontFamily:FM,
                    fontWeight:700, letterSpacing:"4px", textAlign:"center",
                    color:error?C.red:C.text, outline:"none",
                    transition:"border-color 0.15s",
                  }}
                />
                {error&&!blocked&&(
                  <div style={{fontSize:"11px",color:C.red,fontFamily:FM,marginTop:"6px",textAlign:"center"}}>
                    ✕ Código incorrecto · {3-attempts} intento{3-attempts!==1?"s":""} restante{3-attempts!==1?"s":""}
                  </div>
                )}
                {blocked&&(
                  <div style={{fontSize:"11px",color:C.red,fontFamily:FM,marginTop:"6px",textAlign:"center",background:C.redBg,padding:"8px",borderRadius:"6px"}}>
                    🔒 Bloqueado temporalmente · {blockSecs}s
                  </div>
                )}
              </div>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={onClose} style={{flex:1,padding:"11px",background:"transparent",color:C.textSub,border:`1px solid ${C.border}`,borderRadius:"7px",fontSize:"13px",cursor:"pointer",fontFamily:FB}}>Cancelar</button>
                <button onClick={verify} disabled={code.length<4||blocked} style={{flex:2,padding:"11px",background:code.length>=4&&!blocked?C.sidebar:"#ccc",color:"#fff",border:"none",borderRadius:"7px",fontSize:"13px",cursor:code.length>=4&&!blocked?"pointer":"not-allowed",fontFamily:FB,fontWeight:600}}>
                  🔓 Verificar y exportar
                </button>
              </div>
              <div style={{textAlign:"center",marginTop:"12px",fontSize:"11px",color:C.textMuted,fontFamily:FM}}>
                ¿No tienes el código? <span style={{color:C.blue}}>admin@dunadevelopment.com</span>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ══ PERMISOS TABLE ══ */
function PermisosTable() {
  return (
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontFamily:FB,fontSize:"12px"}}>
        <thead>
          <tr style={{background:C.bgWarm}}>
            <th style={{padding:"10px 14px",textAlign:"left",fontFamily:FM,fontSize:"10px",color:C.textMuted,letterSpacing:"1px",borderBottom:`1px solid ${C.border}`,fontWeight:400}}>PERMISO</th>
            {Object.entries(ROLES).map(([k,r])=>(
              <th key={k} style={{padding:"10px 14px",textAlign:"center",borderBottom:`1px solid ${C.border}`,fontWeight:400}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
                  <span style={{fontSize:"16px"}}>{r.icon}</span>
                  <span style={{fontSize:"10px",fontFamily:FM,color:r.color,letterSpacing:"0.5px"}}>{r.label.toUpperCase()}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(PERMISOS_LABELS).map(([key,label],i)=>(
            <tr key={key} style={{background:i%2===0?C.bgCard:C.bg}}>
              <td style={{padding:"10px 14px",color:C.text,borderBottom:`1px solid ${C.border}`}}>{label}</td>
              {Object.entries(ROLES).map(([rol,r])=>(
                <td key={rol} style={{padding:"10px 14px",textAlign:"center",borderBottom:`1px solid ${C.border}`}}>
                  {r.permisos[key]
                    ? <span style={{color:C.green,fontSize:"16px"}}>✓</span>
                    : <span style={{color:C.border,fontSize:"16px"}}>—</span>
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══ SESSIONS OVERVIEW ══ */
function SessionsOverview() {
  const maxBar = Math.max(...CHART_7D);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>

      {/* SESIONES */}
      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"20px",boxShadow:C.shadow}}>
        <div style={{fontSize:"14px",fontFamily:FH,color:C.text,marginBottom:"16px",fontWeight:400}}>
          📊 Sesiones por período
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"12px",marginBottom:"20px"}}>
          {[
            {label:"Hoy",       val:SESION_DATA.hoy.total,       sub:`${SESION_DATA.hoy.clientes}C · ${SESION_DATA.hoy.agentes}A · ${SESION_DATA.hoy.brokers}B`,color:C.blue},
            {label:"Esta semana",val:SESION_DATA.semana.total,   sub:`${SESION_DATA.semana.clientes}C · ${SESION_DATA.semana.agentes}A · ${SESION_DATA.semana.brokers}B`,color:C.green},
            {label:"Este mes",   val:SESION_DATA.mes.total,      sub:`${SESION_DATA.mes.clientes}C · ${SESION_DATA.mes.agentes}A · ${SESION_DATA.mes.brokers}B`,color:C.amber},
            {label:"Histórico",  val:SESION_DATA.historico.total,sub:`${SESION_DATA.historico.clientes}C · ${SESION_DATA.historico.agentes}A · ${SESION_DATA.historico.brokers}B`,color:C.gold},
          ].map(s=>(
            <div key={s.label} style={{
              background:C.bgWarm,border:`1px solid ${C.border}`,
              borderTop:`3px solid ${s.color}`,borderRadius:"9px",padding:"13px 14px",
            }}>
              <div style={{fontSize:"22px",fontFamily:FH,color:s.color,fontWeight:400}}>{s.val.toLocaleString()}</div>
              <div style={{fontSize:"11px",fontFamily:FB,color:C.text,marginTop:"3px"}}>{s.label}</div>
              <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,marginTop:"3px"}}>{s.sub}</div>
              <div style={{fontSize:"9px",fontFamily:FM,color:C.textMuted,marginTop:"2px"}}>C=Clientes A=Agentes B=Brokers</div>
            </div>
          ))}
        </div>

        {/* Mini chart 7 días */}
        <div style={{fontSize:"11px",fontFamily:FM,color:C.textMuted,marginBottom:"8px",letterSpacing:"1px"}}>
          SESIONES ÚLTIMOS 7 DÍAS
        </div>
        <div style={{display:"flex",alignItems:"flex-end",gap:"8px",height:"70px"}}>
          {CHART_7D.map((v,i)=>(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
              <span style={{fontSize:"10px",fontFamily:FM,color:C.textSub}}>{v}</span>
              <div style={{
                width:"100%",borderRadius:"4px 4px 0 0",
                height:`${(v/maxBar)*50}px`,
                background:i===6?C.blue:C.green,
                opacity:i===6?0.5:1,
              }} />
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:"8px",marginTop:"4px"}}>
          {DIAS.map((d,i)=>(
            <div key={i} style={{flex:1,textAlign:"center",fontSize:"10px",fontFamily:FM,color:C.textMuted}}>{d}</div>
          ))}
        </div>
      </div>

      {/* REGISTROS */}
      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"20px",boxShadow:C.shadow}}>
        <div style={{fontSize:"14px",fontFamily:FH,color:C.text,marginBottom:"16px",fontWeight:400}}>
          👥 Nuevos registros por período
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {[
            {label:"Clientes finales", data:REG_DATA.clientes, color:C.green, icon:"👤"},
            {label:"Brokers/Agencias", data:REG_DATA.brokers,  color:C.purple,icon:"🤝"},
            {label:"Agentes Duna",     data:REG_DATA.agentes,  color:C.blue,  icon:"💼"},
          ].map(r=>(
            <div key={r.label} style={{
              padding:"12px 14px",background:C.bgWarm,
              border:`1px solid ${C.border}`,borderRadius:"9px",
            }}>
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}>
                <span style={{fontSize:"16px"}}>{r.icon}</span>
                <span style={{fontSize:"12px",fontFamily:FB,color:C.text,fontWeight:600}}>{r.label}</span>
                <span style={{
                  marginLeft:"auto",fontSize:"10px",fontFamily:FM,
                  color:r.color,background:"white",
                  padding:"2px 8px",borderRadius:"3px",border:`1px solid ${r.color}33`,
                }}>Total: {r.data.total.toLocaleString()}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px"}}>
                {[
                  {p:"Hoy",     v:r.data.hoy},
                  {p:"Semana",  v:r.data.semana},
                  {p:"Mes",     v:r.data.mes},
                ].map(p=>(
                  <div key={p.p} style={{textAlign:"center",padding:"8px",background:C.bgCard,borderRadius:"6px",border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:"18px",fontFamily:FH,color:p.v>0?r.color:C.textMuted}}>{p.v}</div>
                    <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,marginTop:"2px"}}>{p.p}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ANALYTICS ADICIONAL */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
        {/* Dispositivos */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"18px",boxShadow:C.shadow}}>
          <div style={{fontSize:"13px",fontFamily:FH,color:C.text,marginBottom:"12px",fontWeight:400}}>📱 Dispositivos</div>
          {[
            {label:"Desktop",d:SESION_DATA.dispositivos.desktop,color:C.blue  },
            {label:"Mobile", d:SESION_DATA.dispositivos.mobile, color:C.green },
            {label:"Tablet", d:SESION_DATA.dispositivos.tablet, color:C.amber },
          ].map(d=>(
            <div key={d.label} style={{marginBottom:"10px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                <span style={{fontSize:"11px",fontFamily:FB,color:C.text}}>{d.label}</span>
                <span style={{fontSize:"11px",fontFamily:FM,color:d.color,fontWeight:700}}>{d.d}%</span>
              </div>
              <div style={{background:C.bgWarm,borderRadius:"4px",height:"6px",overflow:"hidden"}}>
                <div style={{width:`${d.d}%`,height:"100%",background:d.color,borderRadius:"4px"}} />
              </div>
            </div>
          ))}
        </div>

        {/* Fuentes */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"18px",boxShadow:C.shadow}}>
          <div style={{fontSize:"13px",fontFamily:FH,color:C.text,marginBottom:"12px",fontWeight:400}}>📡 Fuente de captación</div>
          {[
            {label:"Google",    v:SESION_DATA.fuentes.google,    color:C.blue  },
            {label:"Instagram", v:SESION_DATA.fuentes.instagram, color:C.purple},
            {label:"Directo",   v:SESION_DATA.fuentes.directo,   color:C.green },
            {label:"Referido",  v:SESION_DATA.fuentes.referido,  color:C.gold  },
            {label:"Email",     v:SESION_DATA.fuentes.email,     color:C.teal  },
          ].map(f=>(
            <div key={f.label} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"7px"}}>
              <div style={{width:"8px",height:"8px",borderRadius:"50%",background:f.color,flexShrink:0}} />
              <span style={{flex:1,fontSize:"11px",fontFamily:FB,color:C.text}}>{f.label}</span>
              <div style={{width:"60px",background:C.bgWarm,borderRadius:"3px",height:"5px",overflow:"hidden"}}>
                <div style={{width:`${f.v}%`,height:"100%",background:f.color,borderRadius:"3px"}} />
              </div>
              <span style={{fontSize:"11px",fontFamily:FM,color:f.color,minWidth:"28px",textAlign:"right"}}>{f.v}%</span>
            </div>
          ))}
        </div>

        {/* Métricas de calidad */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"18px",boxShadow:C.shadow}}>
          <div style={{fontSize:"13px",fontFamily:FH,color:C.text,marginBottom:"12px",fontWeight:400}}>⏱ Calidad de sesión</div>
          {[
            {label:"Duración media global",     val:SESION_DATA.duracion_media, color:C.text   },
            {label:"Hora pico de actividad",    val:SESION_DATA.pico_hora,      color:C.blue   },
            {label:"Tasa de rebote estimada",   val:"68%",                       color:C.red    },
            {label:"Sesiones >2 min",           val:"32%",                       color:C.green  },
            {label:"Usuarios recurrentes",      val:"23%",                       color:C.amber  },
            {label:"Encuesta respondida",       val:"0%",                        color:C.red    },
          ].map(m=>(
            <div key={m.label} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontSize:"11px",fontFamily:FB,color:C.textSub}}>{m.label}</span>
              <span style={{fontSize:"12px",fontFamily:FH,color:m.color,fontWeight:400}}>{m.val}</span>
            </div>
          ))}
        </div>

        {/* Ideas adicionales */}
        <div style={{background:C.goldBg,border:`1px solid ${C.gold}33`,borderRadius:"12px",padding:"18px",boxShadow:C.shadow}}>
          <div style={{fontSize:"13px",fontFamily:FH,color:C.gold,marginBottom:"12px",fontWeight:400}}>
            💡 Más datos a incorporar
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
            {[
              "Score de temperatura del lead (1–10)",
              "Mapa de países de origen",
              "Tiempo en cada unidad concreta",
              "% scroll en la ficha de unidad",
              "Clicks en 'Reservar' sin completar",
              "Comparativas guardadas por usuario",
              "Idioma del navegador",
              "Conversión por fuente UTM",
            ].map((t,i)=>(
              <div key={i} style={{display:"flex",gap:"7px",alignItems:"flex-start"}}>
                <span style={{color:C.gold,flexShrink:0,marginTop:"1px"}}>◆</span>
                <span style={{fontSize:"11px",fontFamily:FB,color:C.textSub,lineHeight:"1.4"}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══ TABLE SECTION (shared structure) ══ */
function UserTable({ data, tipo }) {
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [exportModal, setExportModal] = useState(false);

  const filtered = data.filter(u=>
    u.nombre.toLowerCase().includes(search.toLowerCase())||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const isCliente  = tipo==="cliente";
  const isAgente   = tipo==="agente";
  const isBroker   = tipo==="broker";

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
      <div style={{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{
          display:"flex",alignItems:"center",gap:"6px",
          background:C.bgInput,border:`1px solid ${C.border}`,
          borderRadius:"7px",padding:"8px 14px",flex:1,minWidth:"200px",
        }}>
          <span style={{color:C.textMuted}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Buscar..." style={{
            border:"none",background:"transparent",fontSize:"13px",
            fontFamily:FB,color:C.text,outline:"none",flex:1,
          }}/>
        </div>
        <button onClick={()=>setExportModal(true)} style={{
          display:"flex",alignItems:"center",gap:"6px",
          background:"transparent",color:C.textSub,
          border:`1px solid ${C.border}`,borderRadius:"7px",
          padding:"8px 16px",fontSize:"12px",cursor:"pointer",fontFamily:FB,
        }}>🔒 Exportar</button>
        <span style={{fontSize:"11px",color:C.textSub,fontFamily:FM}}>{filtered.length} registros</span>
      </div>

      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",overflow:"hidden",boxShadow:C.shadow}}>
        {/* Header */}
        <div style={{
          display:"grid",
          gridTemplateColumns:isCliente?"180px 80px 80px 70px 90px 100px 80px 80px":
                              isAgente? "180px 140px 80px 80px 100px 120px 80px":
                                        "180px 140px 80px 80px 90px 120px 80px",
          padding:"9px 14px",background:C.bgWarm,
          borderBottom:`1px solid ${C.border}`,
          fontSize:"10px",color:C.textMuted,fontFamily:FM,letterSpacing:"0.8px",
          gap:"4px",alignItems:"center",
        }}>
          <span>USUARIO</span>
          {isAgente&&<span>CARGO</span>}
          {isBroker&&<span>EMPRESA</span>}
          {!isAgente&&!isBroker&&<span>PAÍS</span>}
          <span>SESIONES</span>
          <span>{isCliente?"GUARDADOS":isAgente?"VENTAS":"CLIENTES"}</span>
          {isAgente&&<span>EN PIPELINE</span>}
          <span>ORIGEN{isAgente||isBroker?"":""}</span>
          <span>ÚLT. SESIÓN</span>
          <span>VER</span>
        </div>

        {filtered.map((u,i)=>(
          <div key={u.id} style={{
            display:"grid",
            gridTemplateColumns:isCliente?"180px 80px 80px 70px 90px 100px 80px 80px":
                                isAgente? "180px 140px 80px 80px 100px 120px 80px":
                                          "180px 140px 80px 80px 90px 120px 80px",
            padding:"11px 14px",borderBottom:`1px solid ${C.border}`,
            alignItems:"center",gap:"4px",
            background:u.caliente?`${C.amberBg}55`:i%2===0?C.bgCard:C.bg,
          }}>
            <div style={{display:"flex",gap:"8px",alignItems:"center",minWidth:0}}>
              <Avatar nombre={u.nombre} rol={u.rol} size={28} />
              <div style={{minWidth:0}}>
                <div style={{fontSize:"12px",fontFamily:FB,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {u.caliente&&"🔥 "}{u.nombre}
                </div>
                <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.email}</div>
              </div>
            </div>
            {isAgente&&<span style={{fontSize:"11px",fontFamily:FB,color:C.textSub}}>{u.cargo}</span>}
            {isBroker&&<span style={{fontSize:"11px",fontFamily:FB,color:C.textSub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.empresa}</span>}
            {!isAgente&&!isBroker&&<span style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>{u.pais}</span>}
            <span style={{fontSize:"12px",fontFamily:FH,color:C.blue}}>{u.sesionesTotal}</span>
            <span style={{fontSize:"12px",fontFamily:FH,color:
              isCliente?(u.guardados>5?C.red:u.guardados>0?C.amber:C.textMuted):
              isAgente?C.green:C.purple}}>
              {isCliente?u.guardados:isAgente?u.ventasCerradas:u.clientesVinculados}
            </span>
            {isAgente&&<span style={{fontSize:"12px",fontFamily:FH,color:C.amber}}>{u.enPipeline}</span>}
            <span style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>
              {isCliente?u.origen:isAgente?u.comisionTotal:u.comisionPendiente}
            </span>
            <span style={{fontSize:"10px",fontFamily:FM,color:C.textMuted}}>{u.ultimaSesion}</span>
            <button onClick={()=>setSel(u)} style={{
              background:C.bg,border:`1px solid ${C.border}`,borderRadius:"5px",
              padding:"4px 9px",fontSize:"12px",cursor:"pointer",
            }}>👁</button>
          </div>
        ))}
      </div>

      {/* Mini detail panel */}
      {sel && (
        <div style={{
          background:C.bgCard,border:`1px solid ${C.border}`,
          borderRadius:"12px",padding:"18px 20px",
          boxShadow:C.shadowMd,
        }}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px"}}>
            <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
              <Avatar nombre={sel.nombre} rol={sel.rol} size={44} />
              <div>
                <div style={{fontSize:"16px",fontFamily:FH,color:C.text,fontWeight:400}}>{sel.nombre}</div>
                <div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,marginTop:"2px"}}>{sel.email} · {sel.tel}</div>
                <div style={{marginTop:"6px"}}><RolBadge rol={sel.rol} small /></div>
              </div>
            </div>
            <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:"18px"}}>✕</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}}>
            {(isCliente?[
              {l:"Sesiones hoy",    v:sel.sesionesHoy,     c:C.blue  },
              {l:"Sesiones total",  v:sel.sesionesTotal,   c:C.blue  },
              {l:"Unidades guardadas",v:sel.guardados,    c:sel.guardados>5?C.red:C.amber},
              {l:"Unidades vistas", v:sel.unidadesVistas?.length||0,c:C.green},
              {l:"Tiempo medio",    v:sel.tiempoMedio,     c:C.text  },
              {l:"Dispositivo",     v:sel.dispositivo,     c:C.textSub},
            ]:isAgente?[
              {l:"Ventas cerradas",   v:sel.ventasCerradas, c:C.green },
              {l:"En pipeline",       v:sel.enPipeline,     c:C.amber },
              {l:"Comisión total",    v:sel.comisionTotal,  c:C.gold  },
              {l:"Sesiones total",    v:sel.sesionesTotal,  c:C.blue  },
              {l:"Cargo",             v:sel.cargo,          c:C.textSub},
              {l:"Estado",            v:sel.activo?"Activo":"Inactivo",c:sel.activo?C.green:C.red},
            ]:[
              {l:"Clientes vinculados",v:sel.clientesVinculados,c:C.purple},
              {l:"Ventas cerradas",   v:sel.ventasCerradas, c:C.green },
              {l:"Comisión pendiente",v:sel.comisionPendiente,c:C.amber},
              {l:"Sesiones total",    v:sel.sesionesTotal,  c:C.blue  },
              {l:"Empresa",           v:sel.empresa,        c:C.textSub},
              {l:"País",              v:sel.pais,           c:C.textSub},
            ]).map(s=>(
              <div key={s.l} style={{background:C.bgWarm,borderRadius:"7px",padding:"10px 12px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,marginBottom:"3px"}}>{s.l}</div>
                <div style={{fontSize:"14px",fontFamily:FH,color:s.c,fontWeight:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {exportModal&&<ExportModal seccion={`${tipo==="cliente"?"Clientes finales":tipo==="agente"?"Agentes Duna":"Brokers y Agencias"}`} onClose={()=>setExportModal(false)} />}
    </div>
  );
}

/* ══ MAIN ══ */
export default function ClientesAdmin() {
  const [mainTab, setMainTab] = useState("analitica");
  const MAIN_TABS = [
    {k:"analitica", l:"📊 Analítica y sesiones"},
    {k:"clientes",  l:"👤 Clientes finales",   count:CLIENTES.length},
    {k:"agentes",   l:"💼 Agentes Duna",        count:AGENTES.length},
    {k:"brokers",   l:"🤝 Brokers y Agencias",  count:BROKERS.length},
    {k:"permisos",  l:"🔐 Roles y permisos"},
  ];

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:FB,color:C.text}}>

      {/* TOPBAR */}
      <div style={{
        background:C.sidebar,padding:"12px 24px",
        display:"flex",alignItems:"center",gap:"16px",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{flex:1}}>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px"}}>DUNA DEVELOPMENT · ADMIN</div>
          <div style={{fontSize:"14px",fontFamily:FH,color:"#fff",fontWeight:400}}>Clientes y Profesionales</div>
        </div>
        <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
          {[
            {label:`${REG_DATA.clientes.total.toLocaleString()} clientes`,color:"rgba(58,107,53,0.8)"},
            {label:`${REG_DATA.brokers.total} brokers`,                   color:"rgba(107,63,160,0.8)"},
            {label:`${REG_DATA.agentes.total} agentes`,                   color:"rgba(44,95,138,0.8)"},
          ].map(p=>(
            <div key={p.label} style={{
              padding:"4px 12px",background:p.color,
              borderRadius:"5px",fontSize:"11px",color:"#fff",fontFamily:FM,
            }}>{p.label}</div>
          ))}
        </div>
      </div>

      <div style={{padding:"20px 28px"}}>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"16px"}}>
          <div>
            <h1 style={{margin:"0 0 4px",fontSize:"20px",fontFamily:FH,fontWeight:400,color:C.text}}>
              Clientes, Agentes y Profesionales
            </h1>
            <p style={{margin:0,fontSize:"13px",color:C.textSub,fontFamily:FB}}>
              Gestión unificada de todos los usuarios de la plataforma con datos de comportamiento y analítica
            </p>
          </div>
        </div>

        {/* TABS */}
        <div style={{
          display:"flex",gap:"0",borderBottom:`1px solid ${C.border}`,
          marginBottom:"20px",overflowX:"auto",
        }}>
          {MAIN_TABS.map(t=>(
            <button key={t.k} onClick={()=>setMainTab(t.k)} style={{
              padding:"11px 18px",fontSize:"12px",fontFamily:FB,
              background:"transparent",border:"none",
              borderBottom:`2px solid ${mainTab===t.k?C.green:"transparent"}`,
              color:mainTab===t.k?C.green:C.textSub,
              cursor:"pointer",fontWeight:mainTab===t.k?600:400,
              whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"6px",
            }}>
              {t.l}
              {t.count!=null&&(
                <span style={{
                  fontSize:"10px",fontFamily:FM,
                  background:mainTab===t.k?C.greenBg:C.bgWarm,
                  color:mainTab===t.k?C.green:C.textMuted,
                  padding:"1px 7px",borderRadius:"10px",
                  border:`1px solid ${mainTab===t.k?C.green+"44":C.border}`,
                }}>{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {mainTab==="analitica" && <SessionsOverview />}
        {mainTab==="clientes"  && <UserTable data={CLIENTES} tipo="cliente" />}
        {mainTab==="agentes"   && <UserTable data={AGENTES}  tipo="agente"  />}
        {mainTab==="brokers"   && <UserTable data={BROKERS}  tipo="broker"  />}
        {mainTab==="permisos"  && (
          <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",overflow:"hidden",boxShadow:C.shadow}}>
            <div style={{padding:"16px 20px",background:C.bgWarm,borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:"14px",fontFamily:FH,color:C.text,fontWeight:400}}>Matriz de roles y permisos</div>
              <div style={{fontSize:"12px",color:C.textSub,fontFamily:FB,marginTop:"3px"}}>
                Qué puede hacer cada tipo de usuario en la plataforma. Configurable desde Ajustes → Permisos.
              </div>
            </div>
            <PermisosTable />
            <div style={{padding:"14px 20px",borderTop:`1px solid ${C.border}`,background:C.bg,display:"flex",justifyContent:"flex-end"}}>
              <button style={{
                background:C.sidebar,color:"#fff",border:"none",
                borderRadius:"7px",padding:"9px 18px",fontSize:"12px",
                cursor:"pointer",fontFamily:FB,fontWeight:600,
              }}>⚙️ Editar permisos</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
