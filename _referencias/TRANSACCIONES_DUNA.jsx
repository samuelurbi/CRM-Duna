import { useState, useRef } from "react";

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
  shadowMd:"0 6px 28px rgba(0,0,0,0.14)",
};
const FH = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const FB = "Georgia,'Times New Roman',serif";
const FM = "'Courier New',Courier,monospace";

const VALID_CODES = ["DUNA2026", "MAKAI-ADM", "EXPORT99"];

/* ── INFORME TYPES ── */
const INFORMES = [
  {
    id:"todas",    icon:"📋",
    label:"Todas las transacciones",
    desc:"Listado completo de todas las transacciones registradas incluyendo estado, precio, agente y origen.",
    formato:["CSV","Excel","PDF"],
    campos:["Unidad","Cliente","Email","Teléfono","Estado","Precio","Origen","Agente","Fecha","Notas","Comisión"],
    nivel:"completo",
    stats:{ registros:22, valor:"$8,991,000", periodo:"Desde lanzamiento" },
  },
  {
    id:"ventas",   icon:"✅",
    label:"Solo ventas cerradas",
    desc:"Únicamente unidades con estado Vendido. Incluye datos de comprador y comisión del agente.",
    formato:["CSV","Excel","PDF"],
    campos:["Unidad","Cliente","Email","Precio","Agente","Comisión pagada","Fecha venta"],
    nivel:"ventas",
    stats:{ registros:22, valor:"$8,991,000", periodo:"22 unidades vendidas" },
  },
  {
    id:"pipeline", icon:"⏳",
    label:"Pipeline activo",
    desc:"Transacciones en estado Pendiente o Reservado. Para seguimiento del equipo comercial.",
    formato:["CSV","Excel"],
    campos:["Unidad","Cliente","Estado","Precio","Agente","Días activo","Notas"],
    nivel:"pipeline",
    stats:{ registros:3, valor:"$940,000", periodo:"3 activas" },
  },
  {
    id:"utm",      icon:"📊",
    label:"Por mes y fuente UTM",
    desc:"Transacciones agrupadas por mes y fuente de tráfico. Para análisis de marketing.",
    formato:["CSV","Excel"],
    campos:["Mes","Fuente UTM","Total transacciones","Valor total","Conversión"],
    nivel:"analytics",
    stats:{ registros:14, valor:"N/A", periodo:"Últimos 14 días" },
  },
  {
    id:"agentes",  icon:"👥",
    label:"Rendimiento por agente",
    desc:"Ventas, comisiones y métricas por agente. Para reportes de RRHH y liquidación.",
    formato:["CSV","Excel","PDF"],
    campos:["Agente","Rol","Unidades vendidas","Valor total","Comisión total","Estado comisión"],
    nivel:"rrhh",
    stats:{ registros:6, valor:"$N/A", periodo:"6 agentes activos" },
  },
  {
    id:"cancelaciones", icon:"🚫",
    label:"Cancelaciones",
    desc:"Transacciones canceladas o revertidas con motivo registrado.",
    formato:["CSV","Excel"],
    campos:["Unidad","Cliente","Precio original","Fecha cancelación","Motivo","Agente"],
    nivel:"auditoria",
    stats:{ registros:0, valor:"$0", periodo:"Sin cancelaciones" },
  },
];

const NIVEL_BADGES = {
  completo:  { label:"Acceso total", color:C.red,    bg:C.redBg    },
  ventas:    { label:"Ventas",       color:C.green,  bg:C.greenBg  },
  pipeline:  { label:"Pipeline",    color:C.amber,  bg:C.amberBg  },
  analytics: { label:"Analytics",   color:C.blue,   bg:C.blueBg   },
  rrhh:      { label:"RRHH",        color:C.teal,   bg:C.tealBg   },
  auditoria: { label:"Auditoría",   color:C.gold,   bg:C.goldBg   },
};

/* ── MOCK PREVIEW DATA ── */
const PREVIEW_ROWS = [
  { unidad:"523", cliente:"Fedele Pacífico",  estado:"Vendido",  precio:"$470,000", agente:"Ernesto R.",  fecha:"30 abr 2026", origen:"Directa"  },
  { unidad:"416", cliente:"Eduardo Calderón", estado:"Vendido",  precio:"$503,000", agente:"Carlos M.",   fecha:"29 abr 2026", origen:"Broker"   },
  { unidad:"317", cliente:"Ernesto Rivas",    estado:"Vendido",  precio:"$512,000", agente:"Ernesto R.",  fecha:"27 abr 2026", origen:"Directa"  },
  { unidad:"526", cliente:"Esther Méndez",    estado:"Vendido",  precio:"$294,000", agente:"María V.",    fecha:"21 abr 2026", origen:"Pre-sale" },
  { unidad:"319", cliente:"Achraf Benzakour", estado:"Vendido",  precio:"$413,000", agente:"Vanessa G.",  fecha:"17 abr 2026", origen:"Referido" },
  { unidad:"412", cliente:"Sophie Laurent",   estado:"Reservado",precio:"$520,000", agente:"Carlos M.",   fecha:"14 abr 2026", origen:"Agencia"  },
  { unidad:"301", cliente:"Robert Harrington",estado:"Pendiente",precio:"$285,000", agente:"Ana R.",      fecha:"12 abr 2026", origen:"Directa"  },
];

const ESTADO_COLORS = {
  "Vendido":  { color:C.green, bg:C.greenBg },
  "Reservado":{ color:C.gold,  bg:C.goldBg  },
  "Pendiente":{ color:C.amber, bg:C.amberBg },
};

/* ── CODE INPUT COMPONENT ── */
function CodeInput({ value, onChange, hasError }) {
  const inputRef = useRef();
  return (
    <div style={{ position:"relative" }}>
      <input
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g,"").slice(0,12))}
        style={{
          position:"absolute", opacity:0, width:"100%", height:"100%",
          top:0, left:0, cursor:"text", zIndex:2,
        }}
        autoComplete="off"
        spellCheck={false}
        autoFocus
      />
      <div onClick={()=>inputRef.current?.focus()} style={{
        display:"flex", alignItems:"center", gap:"6px",
        cursor:"text", padding:"4px 0",
        justifyContent:"center",
      }}>
        {value.split("").concat(Array(Math.max(0,8-value.length)).fill("")).slice(0,8).map((ch,i) => {
          const isCursor = i === value.length;
          return (
            <div key={i} style={{
              width:"44px", height:"56px",
              background:hasError?C.redBg:C.bgInput,
              border:`2px solid ${hasError?C.red:isCursor?C.green:ch?C.borderMid:C.border}`,
              borderRadius:"9px",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"22px", fontFamily:FM, fontWeight:700,
              color:hasError?C.red:C.text,
              transition:"border-color 0.15s",
              position:"relative",
            }}>
              {ch}
              {isCursor && !hasError && (
                <div style={{
                  position:"absolute", bottom:"8px", left:"50%",
                  transform:"translateX(-50%)",
                  width:"2px", height:"18px", background:C.green,
                  animation:"blink 1s step-end infinite",
                }} />
              )}
            </div>
          );
        })}
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ── EXPORT AUTH MODAL ── */
function ExportModal({ informe, formato, dateFrom, dateTo, onClose, onSuccess }) {
  const [code, setCode]       = useState("");
  const [error, setError]     = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked]   = useState(false);
  const [blockSecs, setBlockSecs] = useState(0);
  const [loading, setLoading]   = useState(false);

  const badge = NIVEL_BADGES[informe.nivel];

  const handleVerify = () => {
    if (blocked || loading) return;
    if (VALID_CODES.includes(code.trim())) {
      setLoading(true);
      setTimeout(()=>{ setLoading(false); onSuccess(); }, 1800);
    } else {
      const n = attempts + 1;
      setAttempts(n);
      setError(true);
      setCode("");
      if (n >= 3) {
        setBlocked(true);
        let s = 60;
        setBlockSecs(s);
        const t = setInterval(()=>{
          s--;
          setBlockSecs(s);
          if(s<=0){ clearInterval(t); setBlocked(false); setAttempts(0); }
        },1000);
      }
    }
  };

  return (
    <div style={{
      position:"fixed", inset:0,
      background:"rgba(26,23,18,0.65)",
      backdropFilter:"blur(4px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex:200, padding:"20px",
    }} onClick={e=>e.target===e.currentTarget&&onClose()}>

      <div style={{
        background:C.bgCard, borderRadius:"16px",
        width:"100%", maxWidth:"480px",
        boxShadow:C.shadowMd, overflow:"hidden",
      }}>
        {/* Modal header */}
        <div style={{
          background:C.sidebar, padding:"20px 24px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <div>
            <div style={{ fontSize:"10px", letterSpacing:"2px", color:"rgba(255,255,255,0.4)", fontFamily:FM, marginBottom:"3px" }}>
              AUTORIZACIÓN REQUERIDA
            </div>
            <div style={{ fontSize:"16px", fontFamily:FH, color:"#fff", fontWeight:400 }}>
              Exportar datos
            </div>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)",
            border:"none", borderRadius:"7px", padding:"7px 12px",
            cursor:"pointer", fontSize:"16px",
          }}>✕</button>
        </div>

        <div style={{ padding:"24px" }}>

          {/* Resumen de lo que se exporta */}
          <div style={{
            padding:"14px 16px",
            background:C.bgWarm, border:`1px solid ${C.border}`,
            borderRadius:"10px", marginBottom:"22px",
          }}>
            <div style={{ fontSize:"10px", color:C.textMuted, fontFamily:FM, letterSpacing:"1px", marginBottom:"10px" }}>
              ARCHIVO A EXPORTAR
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
              <span style={{ fontSize:"22px" }}>{informe.icon}</span>
              <div style={{ flex:1, minWidth:"160px" }}>
                <div style={{ fontSize:"13px", fontFamily:FH, color:C.text }}>{informe.label}</div>
                <div style={{ fontSize:"11px", color:C.textSub, fontFamily:FM, marginTop:"2px" }}>
                  {informe.stats.registros} registros · {formato}
                  {dateFrom&&` · Desde ${dateFrom}`}
                  {dateTo&&` · Hasta ${dateTo}`}
                </div>
              </div>
              <span style={{
                fontSize:"10px", fontFamily:FM, letterSpacing:"0.5px",
                color:badge.color, background:badge.bg,
                padding:"3px 10px", borderRadius:"4px",
                border:`1px solid ${badge.color}22`,
              }}>{badge.label}</span>
            </div>
          </div>

          {/* Security context */}
          <div style={{
            display:"flex", gap:"10px", alignItems:"flex-start",
            padding:"12px 14px", marginBottom:"22px",
            background:C.amberBg, border:`1px solid ${C.amber}33`,
            borderRadius:"9px",
          }}>
            <span style={{ fontSize:"16px", flexShrink:0 }}>🔒</span>
            <div style={{ fontSize:"12px", color:C.amber, fontFamily:FB, lineHeight:"1.6" }}>
              Los datos de exportación son confidenciales. Introduce el código de autorización
              que te haya proporcionado el administrador para continuar.
            </div>
          </div>

          {/* Code input */}
          {!loading ? (
            <>
              <div style={{ textAlign:"center", marginBottom:"16px" }}>
                <div style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM, letterSpacing:"2px", marginBottom:"14px" }}>
                  CÓDIGO DE AUTORIZACIÓN
                </div>
                <CodeInput value={code} onChange={v=>{ setCode(v); setError(false); }} hasError={error} />
              </div>

              {error && !blocked && (
                <div style={{
                  textAlign:"center", marginBottom:"12px",
                  fontSize:"12px", color:C.red, fontFamily:FM,
                  padding:"8px 14px", background:C.redBg,
                  border:`1px solid ${C.red}33`, borderRadius:"7px",
                }}>
                  ✕ Código incorrecto · {3-attempts} intento{3-attempts!==1?"s":""} restante{3-attempts!==1?"s":""}
                </div>
              )}

              {blocked && (
                <div style={{
                  textAlign:"center", marginBottom:"12px",
                  padding:"12px 16px", background:C.redBg,
                  border:`1px solid ${C.red}44`, borderRadius:"8px",
                }}>
                  <div style={{ fontSize:"14px", marginBottom:"4px" }}>🔒</div>
                  <div style={{ fontSize:"12px", color:C.red, fontFamily:FM, fontWeight:700 }}>
                    Acceso bloqueado · {blockSecs}s
                  </div>
                  <div style={{ fontSize:"11px", color:C.textSub, fontFamily:FM, marginTop:"3px" }}>
                    Contacta al administrador si no tienes el código
                  </div>
                </div>
              )}

              <div style={{ display:"flex", gap:"10px", marginTop:"8px" }}>
                <button onClick={onClose} style={{
                  flex:1, padding:"11px",
                  background:"transparent", color:C.textSub,
                  border:`1px solid ${C.border}`, borderRadius:"8px",
                  fontSize:"13px", cursor:"pointer", fontFamily:FB,
                }}>Cancelar</button>
                <button
                  onClick={handleVerify}
                  disabled={code.length<4||blocked}
                  style={{
                    flex:2, padding:"11px",
                    background:code.length>=4&&!blocked?C.sidebar:"#ccc",
                    color:"#fff", border:"none", borderRadius:"8px",
                    fontSize:"13px", cursor:code.length>=4&&!blocked?"pointer":"not-allowed",
                    fontFamily:FB, fontWeight:600,
                    transition:"background 0.15s",
                  }}
                >🔓 Verificar y descargar</button>
              </div>

              <div style={{ textAlign:"center", marginTop:"14px", fontSize:"11px", color:C.textMuted, fontFamily:FM }}>
                ¿No tienes el código?{" "}
                <span style={{ color:C.blue, cursor:"pointer" }}>admin@dunadevelopment.com</span>
              </div>
            </>
          ) : (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{
                width:"48px", height:"48px", borderRadius:"50%",
                border:`3px solid ${C.greenBg}`,
                borderTop:`3px solid ${C.green}`,
                animation:"spin 0.8s linear infinite",
                margin:"0 auto 16px",
              }} />
              <div style={{ fontSize:"14px", fontFamily:FH, color:C.text }}>Generando archivo…</div>
              <div style={{ fontSize:"12px", color:C.textSub, fontFamily:FM, marginTop:"4px" }}>
                Preparando {informe.label} en formato {formato}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function InformeTransacciones() {
  const [selectedInforme, setSelectedInforme] = useState("todas");
  const [selectedFormato, setSelectedFormato] = useState("CSV");
  const [dateFrom, setDateFrom]   = useState("");
  const [dateTo, setDateTo]       = useState("");
  const [showModal, setShowModal] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [expandCampos, setExpandCampos] = useState(false);
  const [previewFilter, setPreviewFilter] = useState("todos");

  const informe = INFORMES.find(i => i.id === selectedInforme);
  const badge   = informe ? NIVEL_BADGES[informe.nivel] : null;

  const handleExportSuccess = () => {
    setShowModal(false);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 5000);
  };

  const previewFiltered = previewFilter === "todos"
    ? PREVIEW_ROWS
    : PREVIEW_ROWS.filter(r => r.estado.toLowerCase() === previewFilter);

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:FB, color:C.text }}>

      {/* TOPBAR */}
      <div style={{
        background:C.sidebar, padding:"12px 24px",
        display:"flex", alignItems:"center", gap:"16px",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontFamily:FM, letterSpacing:"2px" }}>
            DUNA DEVELOPMENT · ADMIN
          </div>
          <div style={{ fontSize:"14px", fontFamily:FH, color:"#fff", fontWeight:400 }}>
            Informe de Transacciones
          </div>
        </div>
        <div style={{
          fontSize:"11px", color:"rgba(255,255,255,0.4)", fontFamily:FM,
          padding:"6px 14px", background:"rgba(255,255,255,0.05)",
          border:"1px solid rgba(255,255,255,0.1)", borderRadius:"6px",
        }}>
          🔍 Consulta libre · 🔒 Exportación protegida
        </div>
      </div>

      <div style={{ maxWidth:"980px", margin:"0 auto", padding:"32px 24px" }}>

        {/* PAGE TITLE */}
        <div style={{ marginBottom:"24px" }}>
          <h1 style={{ margin:"0 0 4px", fontSize:"22px", fontFamily:FH, fontWeight:400, color:C.text }}>
            Informe de transacciones
          </h1>
          <p style={{ margin:0, fontSize:"13px", color:C.textSub, fontFamily:FB }}>
            Consulta y filtra los datos libremente. Para exportar necesitarás un código de autorización del administrador.
          </p>
        </div>

        {/* SUCCESS BANNER */}
        {downloaded && (
          <div style={{
            display:"flex", alignItems:"center", gap:"12px",
            padding:"14px 18px", marginBottom:"20px",
            background:C.greenBg, border:`1px solid ${C.green}44`,
            borderLeft:`4px solid ${C.green}`, borderRadius:"10px",
          }}>
            <span style={{ fontSize:"20px" }}>✅</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"13px", fontFamily:FB, color:C.green, fontWeight:600 }}>
                Exportación completada — archivo descargado
              </div>
              <div style={{ fontSize:"11px", color:C.textSub, fontFamily:FM, marginTop:"2px" }}>
                Esta descarga ha sido registrada en el historial de auditoría.
              </div>
            </div>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"320px 1fr", gap:"20px" }}>

          {/* ── LEFT: CONFIGURACIÓN ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

            {/* Selector de informe */}
            <div style={{
              background:C.bgCard, border:`1px solid ${C.border}`,
              borderRadius:"12px", overflow:"hidden", boxShadow:C.shadow,
            }}>
              <div style={{
                padding:"14px 18px",
                background:C.bgWarm, borderBottom:`1px solid ${C.border}`,
              }}>
                <div style={{ fontSize:"13px", fontFamily:FH, color:C.text, fontWeight:400 }}>
                  Tipo de informe
                </div>
                <div style={{ fontSize:"11px", color:C.textSub, fontFamily:FM, marginTop:"2px" }}>
                  Selecciona qué datos consultar
                </div>
              </div>
              <div style={{ padding:"10px" }}>
                {INFORMES.map(inf => {
                  const b = NIVEL_BADGES[inf.nivel];
                  const isSel = selectedInforme === inf.id;
                  return (
                    <div
                      key={inf.id}
                      onClick={() => {
                        setSelectedInforme(inf.id);
                        setSelectedFormato(inf.formato[0]);
                        setExpandCampos(false);
                      }}
                      style={{
                        display:"flex", alignItems:"center", gap:"10px",
                        padding:"10px 12px", borderRadius:"8px",
                        background:isSel?C.greenBg:"transparent",
                        border:`1px solid ${isSel?C.green+"44":"transparent"}`,
                        cursor:"pointer", marginBottom:"3px",
                        transition:"all 0.12s",
                      }}
                    >
                      <span style={{ fontSize:"17px", flexShrink:0 }}>{inf.icon}</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{
                          fontSize:"12px", fontFamily:FB,
                          color:isSel?C.green:C.text,
                          fontWeight:isSel?600:400,
                          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                        }}>{inf.label}</div>
                        <div style={{ fontSize:"10px", fontFamily:FM, color:C.textMuted, marginTop:"1px" }}>
                          {inf.stats.registros} registros
                        </div>
                      </div>
                      <span style={{
                        fontSize:"9px", fontFamily:FM,
                        color:b.color, background:b.bg,
                        padding:"2px 6px", borderRadius:"3px",
                        border:`1px solid ${b.color}22`,
                        flexShrink:0,
                      }}>{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Configuración de exportación */}
            <div style={{
              background:C.bgCard, border:`1px solid ${C.border}`,
              borderRadius:"12px", overflow:"hidden", boxShadow:C.shadow,
            }}>
              <div style={{
                padding:"14px 18px",
                background:C.bgWarm, borderBottom:`1px solid ${C.border}`,
              }}>
                <div style={{ fontSize:"13px", fontFamily:FH, color:C.text, fontWeight:400 }}>
                  Configurar exportación
                </div>
              </div>
              <div style={{ padding:"16px 18px" }}>

                {/* Formato */}
                <div style={{ marginBottom:"14px" }}>
                  <label style={{ fontSize:"10px", color:C.textMuted, fontFamily:FM, display:"block", marginBottom:"7px", letterSpacing:"1px" }}>
                    FORMATO
                  </label>
                  <div style={{ display:"flex", gap:"6px" }}>
                    {informe?.formato.map(f => (
                      <button key={f} onClick={()=>setSelectedFormato(f)} style={{
                        flex:1, padding:"8px 6px",
                        background:selectedFormato===f?C.sidebar:C.bgInput,
                        color:selectedFormato===f?"#fff":C.textSub,
                        border:`1px solid ${selectedFormato===f?C.sidebar:C.border}`,
                        borderRadius:"7px", fontSize:"11px",
                        cursor:"pointer", fontFamily:FM,
                        fontWeight:selectedFormato===f?700:400,
                      }}>
                        {f==="CSV"?"📄":f==="Excel"?"📊":"📑"} {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fechas */}
                <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"16px" }}>
                  {[
                    {label:"DESDE", val:dateFrom, set:setDateFrom},
                    {label:"HASTA", val:dateTo,   set:setDateTo  },
                  ].map(f=>(
                    <div key={f.label}>
                      <label style={{ fontSize:"10px", color:C.textMuted, fontFamily:FM, display:"block", marginBottom:"4px", letterSpacing:"1px" }}>
                        {f.label}
                      </label>
                      <input type="date" value={f.val} onChange={e=>f.set(e.target.value)} style={{
                        width:"100%", padding:"8px 11px", boxSizing:"border-box",
                        background:C.bgInput, border:`1px solid ${C.border}`,
                        borderRadius:"7px", fontSize:"12px",
                        fontFamily:FM, color:C.text, outline:"none",
                      }} />
                    </div>
                  ))}
                </div>

                {/* Campos incluidos */}
                <div style={{
                  padding:"10px 12px",
                  background:C.bg, border:`1px solid ${C.border}`,
                  borderRadius:"8px", marginBottom:"16px",
                }}>
                  <div
                    onClick={()=>setExpandCampos(v=>!v)}
                    style={{ display:"flex", justifyContent:"space-between", cursor:"pointer" }}
                  >
                    <span style={{ fontSize:"11px", fontFamily:FB, color:C.text }}>
                      Campos incluidos
                    </span>
                    <span style={{ fontSize:"10px", color:C.textMuted, fontFamily:FM }}>
                      {informe?.campos.length} {expandCampos?"▲":"▼"}
                    </span>
                  </div>
                  {expandCampos && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"4px", marginTop:"10px" }}>
                      {informe?.campos.map(c=>(
                        <span key={c} style={{
                          fontSize:"10px", fontFamily:FM,
                          padding:"2px 8px", borderRadius:"3px",
                          background:C.bgCard, border:`1px solid ${C.border}`,
                          color:C.textSub,
                        }}>{c}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA — EXPORT con lock */}
                <button
                  onClick={()=>setShowModal(true)}
                  style={{
                    width:"100%", padding:"13px",
                    background:C.sidebar, color:"#fff",
                    border:"none", borderRadius:"9px",
                    fontSize:"14px", cursor:"pointer",
                    fontFamily:FB, fontWeight:600,
                    display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                    boxShadow:"0 3px 12px rgba(46,61,40,0.3)",
                    transition:"background 0.15s",
                  }}
                >
                  <span style={{ fontSize:"16px" }}>🔒</span>
                  Exportar {selectedFormato}
                </button>
                <div style={{
                  textAlign:"center", marginTop:"8px",
                  fontSize:"10px", color:C.textMuted, fontFamily:FM,
                }}>
                  Se solicitará código de autorización
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: PREVIEW ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

            {/* Stats cards */}
            {informe && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px" }}>
                {[
                  { label:"Registros",         val:informe.stats.registros,   color:C.blue  },
                  { label:"Valor total",        val:informe.stats.valor,       color:C.green },
                  { label:"Período",            val:informe.stats.periodo,     color:C.amber },
                ].map(s=>(
                  <div key={s.label} style={{
                    background:C.bgCard, border:`1px solid ${C.border}`,
                    borderRadius:"10px", padding:"14px 16px",
                    textAlign:"center", boxShadow:C.shadow,
                  }}>
                    <div style={{ fontSize:"18px", fontFamily:FH, color:s.color, fontWeight:400 }}>{s.val}</div>
                    <div style={{ fontSize:"10px", fontFamily:FM, color:C.textMuted, marginTop:"3px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Preview table */}
            <div style={{
              background:C.bgCard, border:`1px solid ${C.border}`,
              borderRadius:"12px", overflow:"hidden", boxShadow:C.shadow,
              flex:1,
            }}>
              <div style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"14px 18px",
                background:C.bgWarm, borderBottom:`1px solid ${C.border}`,
                flexWrap:"wrap", gap:"10px",
              }}>
                <div>
                  <div style={{ fontSize:"13px", fontFamily:FH, color:C.text, fontWeight:400 }}>
                    Vista previa de datos
                  </div>
                  <div style={{ fontSize:"11px", color:C.textSub, fontFamily:FM, marginTop:"2px" }}>
                    Muestra las primeras filas — los datos reales varían según el filtro de fechas
                  </div>
                </div>
                <div style={{ display:"flex", gap:"5px" }}>
                  {["todos","Vendido","Reservado","Pendiente"].map(f=>(
                    <button key={f} onClick={()=>setPreviewFilter(f==="todos"?"todos":f)} style={{
                      background:previewFilter===(f==="todos"?"todos":f)?C.sidebar:C.bgCard,
                      color:previewFilter===(f==="todos"?"todos":f)?"#fff":C.textSub,
                      border:`1px solid ${previewFilter===(f==="todos"?"todos":f)?C.sidebar:C.border}`,
                      borderRadius:"5px", padding:"4px 10px",
                      fontSize:"10px", cursor:"pointer", fontFamily:FM,
                    }}>{f==="todos"?"Todos":f}</button>
                  ))}
                </div>
              </div>

              {/* Table header */}
              <div style={{
                display:"grid",
                gridTemplateColumns:"60px 140px 80px 110px 120px 100px 90px",
                padding:"9px 18px",
                background:"#F0EDE4", borderBottom:`1px solid ${C.border}`,
                fontSize:"10px", color:C.textMuted, fontFamily:FM, letterSpacing:"0.8px",
                gap:"4px",
              }}>
                <span>UNIDAD</span>
                <span>CLIENTE</span>
                <span>ESTADO</span>
                <span>PRECIO</span>
                <span>AGENTE</span>
                <span>FECHA</span>
                <span>ORIGEN</span>
              </div>

              {/* Table rows */}
              {previewFiltered.map((row,i)=>{
                const ec = ESTADO_COLORS[row.estado] || {};
                return (
                  <div key={i} style={{
                    display:"grid",
                    gridTemplateColumns:"60px 140px 80px 110px 120px 100px 90px",
                    padding:"11px 18px",
                    borderBottom:`1px solid ${C.border}`,
                    alignItems:"center", gap:"4px",
                    background:i%2===0?C.bgCard:C.bg,
                  }}>
                    <span style={{ fontSize:"12px", fontFamily:FM, fontWeight:700, color:C.text }}>#{row.unidad}</span>
                    <span style={{ fontSize:"12px", fontFamily:FB, color:C.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{row.cliente}</span>
                    <span style={{
                      fontSize:"10px", fontFamily:FM,
                      color:ec.color, background:ec.bg,
                      padding:"2px 7px", borderRadius:"4px",
                      border:`1px solid ${ec.color}22`,
                      whiteSpace:"nowrap",
                    }}>{row.estado}</span>
                    <span style={{ fontSize:"13px", fontFamily:FH, color:C.green }}>{row.precio}</span>
                    <span style={{ fontSize:"11px", fontFamily:FB, color:C.textSub }}>{row.agente}</span>
                    <span style={{ fontSize:"11px", fontFamily:FM, color:C.textMuted }}>{row.fecha}</span>
                    <span style={{ fontSize:"10px", fontFamily:FM, color:C.textSub }}>{row.origen}</span>
                  </div>
                );
              })}

              {/* Blurred rows hint */}
              <div style={{
                padding:"16px 18px",
                background:`linear-gradient(to bottom, ${C.bgCard}, ${C.bgWarm})`,
                textAlign:"center",
              }}>
                <div style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM }}>
                  ··· {Math.max(0,(informe?.stats.registros||0)-previewFiltered.length)} registros adicionales disponibles en la exportación
                </div>
              </div>
            </div>

            {/* Historial de exportaciones */}
            <div style={{
              background:C.bgCard, border:`1px solid ${C.border}`,
              borderRadius:"12px", overflow:"hidden", boxShadow:C.shadow,
            }}>
              <div style={{
                padding:"13px 18px",
                background:C.bgWarm, borderBottom:`1px solid ${C.border}`,
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <span style={{ fontSize:"13px", fontFamily:FH, color:C.text, fontWeight:400 }}>
                  🔍 Historial de exportaciones
                </span>
                <span style={{ fontSize:"10px", color:C.textMuted, fontFamily:FM }}>Últimas 30 días</span>
              </div>
              {[
                { user:"Miguel Pérez",   tipo:"Todas las transacciones",  fmt:"Excel", fecha:"30 abr · 11:24", ip:"187.xxx.21" },
                { user:"Ana Rodríguez",  tipo:"Rendimiento por agente",   fmt:"PDF",   fecha:"28 abr · 09:05", ip:"187.xxx.45" },
                { user:"Miguel Pérez",   tipo:"Solo ventas cerradas",      fmt:"CSV",   fecha:"22 abr · 16:33", ip:"187.xxx.21" },
              ].map((h,i)=>(
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:"12px",
                  padding:"11px 18px",
                  borderBottom:i<2?`1px solid ${C.border}`:"none",
                  background:i%2===0?C.bgCard:C.bg,
                }}>
                  <div style={{
                    width:"30px", height:"30px", borderRadius:"50%",
                    background:C.sidebar, flexShrink:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"11px", fontWeight:700, color:"#fff", fontFamily:FH,
                  }}>
                    {h.user.split(" ").map(n=>n[0]).join("").slice(0,2)}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"11px", fontFamily:FB, color:C.text }}>{h.user}</div>
                    <div style={{ fontSize:"10px", fontFamily:FM, color:C.textSub, marginTop:"1px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{h.tipo}</div>
                  </div>
                  <div style={{
                    fontSize:"10px", fontFamily:FM,
                    color:C.blue, background:C.blueBg,
                    padding:"2px 7px", borderRadius:"3px", flexShrink:0,
                  }}>{h.fmt}</div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:"10px", fontFamily:FM, color:C.textSub }}>{h.fecha}</div>
                    <div style={{ fontSize:"9px", fontFamily:FM, color:C.textMuted }}>IP: {h.ip}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* EXPORT MODAL */}
      {showModal && (
        <ExportModal
          informe={informe}
          formato={selectedFormato}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onClose={()=>setShowModal(false)}
          onSuccess={handleExportSuccess}
        />
      )}
    </div>
  );
}
