import { useState } from "react";

const C = {
  bg:        "#F4F0E8",
  bgWarm:    "#EDE8DE",
  bgCard:    "#FFFFFF",
  bgInput:   "#F8F5EF",
  sidebar:   "#2E3D28",
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
  redDark:   "#8B1C12",
  blue:      "#2C5F8A",
  blueBg:    "#EBF2FA",
  border:    "#E0DAD0",
  borderMid: "#CEC8BC",
  text:      "#26231C",
  textSub:   "#6B6355",
  textMuted: "#A09080",
  shadow:    "0 1px 4px rgba(0,0,0,0.07)",
  shadowMd:  "0 4px 20px rgba(0,0,0,0.10)",
};
const FH = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const FB = "Georgia,'Times New Roman',serif";
const FM = "'Courier New',Courier,monospace";

/* ── helpers ── */
function capitalize(s) {
  return s.replace(/\b\w/g, c => c.toUpperCase());
}
function formatPhone(s) {
  const d = s.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  return s;
}

/* ── Pill ── */
function Pill({ color, bg, label, small }) {
  return (
    <span style={{
      background: bg, color,
      fontSize: small ? "10px" : "11px",
      padding: small ? "2px 8px" : "3px 10px",
      borderRadius: "4px", fontFamily: FM,
      border: `1px solid ${color}22`, whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

/* ── Card ── */
function Card({ children, style = {}, danger }) {
  return (
    <div style={{
      background: C.bgCard,
      border: `1px solid ${danger ? C.red + "44" : C.border}`,
      borderRadius: "12px", boxShadow: C.shadow,
      overflow: "hidden", ...style,
    }}>{children}</div>
  );
}

/* ── CardHeader ── */
function CardHeader({ icon, title, sub, badge, danger }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "12px",
      padding: "18px 22px 16px",
      borderBottom: `1px solid ${danger ? C.red + "33" : C.border}`,
      background: danger ? C.redBg : C.bgCard,
    }}>
      <span style={{ fontSize: "20px", marginTop: "1px" }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "14px", fontFamily: FH, fontWeight: 400, color: danger ? C.red : C.text }}>{title}</span>
          {badge && <Pill color={badge.color} bg={badge.bg} label={badge.label} small />}
        </div>
        {sub && <p style={{ margin: "3px 0 0", fontSize: "12px", color: C.textSub, fontFamily: FB }}>{sub}</p>}
      </div>
    </div>
  );
}

/* ── Field ── */
function Field({ label, value, onChange, type = "text", placeholder, hint, verified, error, readOnly, required, suffix }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label style={{ fontSize: "11px", color: C.textMuted, fontFamily: FM, letterSpacing: "0.5px" }}>
          {label.toUpperCase()}{required && <span style={{ color: C.red, marginLeft: "3px" }}>*</span>}
        </label>
        {verified && <span style={{ fontSize: "10px", color: C.green, fontFamily: FM }}>✓ Verificado</span>}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          type={type}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: "10px 13px",
            paddingRight: suffix ? "40px" : "13px",
            background: readOnly ? C.bgWarm : C.bgInput,
            border: `1px solid ${error ? C.red : focused ? C.green : C.border}`,
            borderRadius: "7px", fontSize: "13px",
            fontFamily: FB, color: C.text, outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.15s",
            cursor: readOnly ? "not-allowed" : "text",
          }}
        />
        {suffix && (
          <span style={{ position: "absolute", right: "12px", fontSize: "14px" }}>{suffix}</span>
        )}
      </div>
      {error && <span style={{ fontSize: "11px", color: C.red, fontFamily: FM }}>⚠ {error}</span>}
      {hint && !error && <span style={{ fontSize: "11px", color: C.textMuted, fontFamily: FM }}>{hint}</span>}
    </div>
  );
}

/* ── SaveBtn ── */
function SaveBtn({ onClick, saved, loading }) {
  return (
    <button onClick={onClick} style={{
      background: saved ? C.greenBg : C.sidebar,
      color: saved ? C.green : "#fff",
      border: `1px solid ${saved ? C.green + "44" : C.sidebar}`,
      borderRadius: "7px", padding: "9px 22px",
      fontSize: "13px", cursor: "pointer",
      fontFamily: FB, fontWeight: 600,
      transition: "all 0.2s",
      display: "flex", alignItems: "center", gap: "6px",
    }}>
      {saved ? "✓ Guardado" : loading ? "Guardando…" : "Guardar cambios"}
    </button>
  );
}

/* ══ MAIN COMPONENT ══ */
export default function ProfilePage() {
  /* — state — */
  const [nombre, setNombre]     = useState("Miguel");
  const [apellido, setApellido] = useState("Perez");
  const [pais, setPais]         = useState("");
  const [telefono, setTelefono] = useState("8495854171");
  const [email]                 = useState("miguelpva85@gmail.com");
  const [lang, setLang]         = useState("es");
  const [tz, setTz]             = useState("America/Santo_Domingo");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);

  const [show2FA, setShow2FA]   = useState(false);
  const [twoFACode, setTwoFACode] = useState("");

  const [showDanger, setShowDanger] = useState(false);
  const [deletePhrase, setDeletePhrase] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [savedPersonal, setSavedPersonal] = useState(false);
  const [savedPrefs, setSavedPrefs]       = useState(false);
  const [resetSent, setResetSent]         = useState(false);
  const [pwMsg, setPwMsg]                 = useState("");

  const [activeTab, setActiveTab] = useState("personal");

  /* — completitud — */
  const fields = [nombre, apellido, pais, telefono, email];
  const filled = fields.filter(Boolean).length;
  const pct = Math.round(filled / fields.length * 100);
  const incomplete = pct < 100;

  /* — errors — */
  const errApellido = apellido && apellido === apellido.toLowerCase() ? null : null;
  const errPais = !pais ? "Campo requerido para tus documentos legales" : null;
  const errTel = telefono && !/^\d{7,15}$/.test(telefono.replace(/\D/g,"")) ? "Formato no válido" : null;

  const TABS = [
    { key: "personal",   icon: "👤", label: "Datos personales" },
    { key: "acceso",     icon: "🔐", label: "Acceso y seguridad" },
    { key: "preferencias",icon:"⚙️", label: "Preferencias" },
    { key: "peligro",    icon: "⚠️", label: "Zona de peligro" },
  ];

  const PAISES = ["República Dominicana","España","Estados Unidos","Colombia","México","Argentina","Reino Unido","Francia","Alemania","Italia","Otro"];
  const ZONAS  = ["America/Santo_Domingo","Europe/Madrid","America/New_York","America/Bogota","America/Mexico_City","Europe/London","Europe/Paris"];
  const ACCESOS = [
    { fecha:"01 may 2026 · 10:14", lugar:"Santo Domingo, RD",  nav:"Chrome · Windows", current:true  },
    { fecha:"29 abr 2026 · 18:42", lugar:"Miami, FL · USA",    nav:"Safari · iPhone",  current:false },
    { fecha:"27 abr 2026 · 09:05", lugar:"Santo Domingo, RD",  nav:"Chrome · Windows", current:false },
  ];

  return (
    <div style={{
      minHeight:"100vh", background:C.bg,
      fontFamily:FB, color:C.text,
    }}>
      {/* ── TOP BAR (simulated) ── */}
      <div style={{
        background:C.sidebar, padding:"14px 32px",
        display:"flex", alignItems:"center", gap:"16px",
        borderBottom:`1px solid rgba(255,255,255,0.08)`,
      }}>
        <div style={{ flex:1 }}>
          <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontFamily:FM, letterSpacing:"3px" }}>DUNA DEVELOPMENT</span>
          <div style={{ fontSize:"14px", fontFamily:FH, color:"#fff", fontWeight:400 }}>Portal del Comprador</div>
        </div>
        <div style={{
          width:"34px", height:"34px", borderRadius:"50%",
          background:`linear-gradient(135deg,${C.gold},${C.amber})`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"13px", fontWeight:700, color:"#fff", fontFamily:FH,
        }}>MP</div>
      </div>

      <div style={{ maxWidth:"860px", margin:"0 auto", padding:"32px 24px" }}>

        {/* ── PAGE TITLE ── */}
        <div style={{ marginBottom:"24px" }}>
          <h1 style={{ margin:"0 0 4px", fontSize:"22px", fontFamily:FH, fontWeight:400, color:C.text }}>Mi Perfil</h1>
          <p style={{ margin:0, fontSize:"13px", color:C.textSub, fontFamily:FB }}>
            Gestiona tus datos personales, acceso y preferencias de comunicación.
          </p>
        </div>

        {/* ── COMPLETITUD ── */}
        {incomplete && (
          <div style={{
            display:"flex", alignItems:"center", gap:"14px",
            padding:"14px 18px", marginBottom:"20px",
            background:C.amberBg, border:`1px solid ${C.amber}44`,
            borderLeft:`3px solid ${C.amber}`, borderRadius:"10px",
          }}>
            <span style={{ fontSize:"20px" }}>📋</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"13px", fontFamily:FB, color:C.amber, fontWeight:600 }}>
                Tu perfil está al {pct}% · Completa todos los campos
              </div>
              <div style={{ fontSize:"12px", color:C.textSub, fontFamily:FM, marginTop:"2px" }}>
                Los datos faltantes pueden afectar la generación de tus documentos legales.
              </div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div style={{ fontSize:"22px", fontFamily:FH, color:C.amber, fontWeight:400 }}>{pct}%</div>
              <div style={{ background:C.border, borderRadius:"4px", height:"4px", width:"60px", overflow:"hidden", marginTop:"4px" }}>
                <div style={{ width:`${pct}%`, height:"100%", background:C.amber, borderRadius:"4px" }} />
              </div>
            </div>
          </div>
        )}

        {/* ── KYIC WARNING ── */}
        <div style={{
          display:"flex", alignItems:"center", gap:"10px",
          padding:"12px 16px", marginBottom:"24px",
          background:C.blueBg, border:`1px solid ${C.blue}33`,
          borderRadius:"8px", fontSize:"12px", color:C.blue, fontFamily:FM,
        }}>
          <span style={{ fontSize:"16px" }}>ℹ️</span>
          <span>Los datos marcados con <span style={{ color:C.red }}>*</span> aparecen directamente en tus contratos y documentos legales. Asegúrate de que coincidan exactamente con tu documento de identidad.</span>
        </div>

        {/* ── TABS ── */}
        <div style={{ display:"flex", gap:"4px", marginBottom:"20px", borderBottom:`1px solid ${C.border}`, paddingBottom:"0" }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              padding:"10px 18px", fontSize:"13px", fontFamily:FB,
              background:"transparent", border:"none",
              borderBottom:`2px solid ${activeTab===t.key ? C.green : "transparent"}`,
              color:activeTab===t.key ? C.green : C.textSub,
              cursor:"pointer", fontWeight:activeTab===t.key ? 600 : 400,
              display:"flex", gap:"6px", alignItems:"center",
              transition:"all 0.15s",
            }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════
            TAB: DATOS PERSONALES
        ════════════════════════════════ */}
        {activeTab === "personal" && (
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <Card>
              <CardHeader
                icon="👤"
                title="Datos personales"
                sub="Utilizados en tus contratos, expediente KYC y comunicaciones."
                badge={pct===100 ? {color:C.green,bg:C.greenBg,label:"✓ Perfil completo"} : {color:C.amber,bg:C.amberBg,label:"Completitud "+pct+"%"}}
              />
              <div style={{ padding:"20px 22px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"14px" }}>
                  <Field
                    label="Nombre" value={nombre} onChange={v => setNombre(capitalize(v))}
                    placeholder="Tu nombre" required verified
                    hint="Se normalizará automáticamente (Mayúsculas iniciales)"
                  />
                  <Field
                    label="Apellido" value={apellido} onChange={v => setApellido(capitalize(v))}
                    placeholder="Tu apellido" required
                    hint={apellido && apellido !== capitalize(apellido) ? "⚡ Se corregirá al guardar: "+capitalize(apellido) : undefined}
                  />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"14px" }}>
                  {/* País con selector */}
                  <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <label style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM, letterSpacing:"0.5px" }}>
                        PAÍS DE RESIDENCIA<span style={{ color:C.red, marginLeft:"3px" }}>*</span>
                      </label>
                    </div>
                    <select value={pais} onChange={e => setPais(e.target.value)} style={{
                      padding:"10px 13px",
                      background:C.bgInput, border:`1px solid ${!pais ? C.red : C.border}`,
                      borderRadius:"7px", fontSize:"13px", fontFamily:FB, color:pais?C.text:C.textMuted,
                      outline:"none", cursor:"pointer",
                    }}>
                      <option value="">Seleccionar país…</option>
                      {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {!pais && <span style={{ fontSize:"11px", color:C.red, fontFamily:FM }}>⚠ Requerido para tus documentos legales</span>}
                  </div>
                  {/* Teléfono */}
                  <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                    <label style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM, letterSpacing:"0.5px" }}>
                      TELÉFONO / WHATSAPP<span style={{ color:C.red, marginLeft:"3px" }}>*</span>
                    </label>
                    <div style={{ display:"flex", gap:"8px" }}>
                      <select style={{
                        padding:"10px 8px", background:C.bgInput, border:`1px solid ${C.border}`,
                        borderRadius:"7px", fontSize:"12px", fontFamily:FM, color:C.text, outline:"none",
                        flexShrink:0,
                      }}>
                        <option>🇩🇴 +1</option>
                        <option>🇪🇸 +34</option>
                        <option>🇺🇸 +1</option>
                        <option>🇬🇧 +44</option>
                        <option>🇨🇴 +57</option>
                      </select>
                      <input
                        value={telefono} onChange={e => setTelefono(e.target.value.replace(/\D/g,""))}
                        placeholder="Número de teléfono"
                        style={{
                          flex:1, padding:"10px 13px", background:C.bgInput,
                          border:`1px solid ${errTel?C.red:C.border}`,
                          borderRadius:"7px", fontSize:"13px", fontFamily:FM, color:C.text, outline:"none",
                        }}
                      />
                    </div>
                    {telefono && !errTel && (
                      <span style={{ fontSize:"11px", color:C.green, fontFamily:FM }}>
                        ✓ Formato: {formatPhone(telefono)}
                      </span>
                    )}
                    {errTel && <span style={{ fontSize:"11px", color:C.red, fontFamily:FM }}>⚠ {errTel}</span>}
                  </div>
                </div>

                {/* Email (read-only con aviso) */}
                <div style={{ marginBottom:"20px" }}>
                  <Field
                    label="Correo electrónico" value={email} readOnly verified
                    hint="Para cambiar tu email, contacta con el equipo de administración."
                    suffix="🔒"
                  />
                </div>

                {/* Expediente vinculado */}
                <div style={{
                  padding:"12px 14px", background:C.bgWarm,
                  borderRadius:"8px", border:`1px solid ${C.border}`,
                  marginBottom:"20px", display:"flex", gap:"12px", alignItems:"center",
                }}>
                  <span style={{ fontSize:"18px" }}>🗂️</span>
                  <div>
                    <div style={{ fontSize:"12px", fontFamily:FB, color:C.text, fontWeight:600 }}>Expediente vinculado: EXP-0041</div>
                    <div style={{ fontSize:"11px", color:C.textSub, fontFamily:FM, marginTop:"2px" }}>
                      Makai Cap Cana · Unidad 3B Torre Sur · Broker: Carlos Méndez
                    </div>
                  </div>
                  <div style={{ marginLeft:"auto" }}>
                    <Pill color={C.green} bg={C.greenBg} label="✓ KYC Verificado" small />
                  </div>
                </div>

                <div style={{ display:"flex", justifyContent:"flex-end", gap:"10px" }}>
                  <SaveBtn onClick={() => { setSavedPersonal(true); setTimeout(()=>setSavedPersonal(false),2500); }} saved={savedPersonal} />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════════════════════
            TAB: ACCESO Y SEGURIDAD
        ════════════════════════════════ */}
        {activeTab === "acceso" && (
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

            {/* Email */}
            <Card>
              <CardHeader icon="📧" title="Correo electrónico" sub="Tu email de acceso y notificaciones." />
              <div style={{ padding:"20px 22px" }}>
                <Field label="Email actual" value={email} readOnly verified suffix="🔒"
                  hint="El email es tu identificador de cuenta. Para cambiarlo, escribe a administracion@dunadevelopment.com con verificación de identidad." />
              </div>
            </Card>

            {/* Contraseña */}
            <Card>
              <CardHeader icon="🔑" title="Contraseña" sub="Actualiza tu contraseña directamente o solicita reset por email." />
              <div style={{ padding:"20px 22px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"16px" }}>
                  <Field label="Nueva contraseña" type="password" placeholder="Mínimo 8 caracteres" onChange={()=>{}} value="" />
                  <Field label="Confirmar contraseña" type="password" placeholder="Repite la contraseña" onChange={()=>{}} value="" />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px" }}>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <button style={{
                      background:C.sidebar, color:"#fff", border:"none",
                      borderRadius:"7px", padding:"9px 20px", fontSize:"13px",
                      cursor:"pointer", fontFamily:FB, fontWeight:600,
                    }}>Actualizar contraseña</button>
                    <button onClick={()=>{setResetSent(true);setPwMsg("Email enviado a "+email);setTimeout(()=>{setResetSent(false);setPwMsg("");},4000);}} style={{
                      background:"transparent", color:C.textSub, border:`1px solid ${C.border}`,
                      borderRadius:"7px", padding:"9px 16px", fontSize:"13px",
                      cursor:"pointer", fontFamily:FB,
                    }}>Enviar reset por email</button>
                  </div>
                  {pwMsg && <Pill color={C.green} bg={C.greenBg} label={"✓ "+pwMsg} />}
                </div>
              </div>
            </Card>

            {/* 2FA */}
            <Card>
              <CardHeader
                icon="🛡️" title="Verificación en dos pasos (2FA)"
                sub="Añade una capa extra de seguridad. Recomendado para cuentas con contratos activos."
                badge={{color:C.amber,bg:C.amberBg,label:"No activado"}}
              />
              <div style={{ padding:"20px 22px" }}>
                <div style={{
                  padding:"14px 16px", background:C.amberBg,
                  border:`1px solid ${C.amber}33`, borderRadius:"8px",
                  marginBottom:"16px", fontSize:"13px", color:C.amber, fontFamily:FB, lineHeight:"1.6",
                }}>
                  ⚠ Tu cuenta tiene documentos y contratos activos. Activar 2FA protege tu información en caso de que alguien acceda a tu email.
                </div>
                {!show2FA ? (
                  <button onClick={()=>setShow2FA(true)} style={{
                    background:C.sidebar, color:"#fff", border:"none",
                    borderRadius:"7px", padding:"10px 20px", fontSize:"13px",
                    cursor:"pointer", fontFamily:FB, fontWeight:600,
                  }}>🛡️ Activar verificación en dos pasos</button>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                    <div style={{ fontSize:"13px", color:C.textSub, fontFamily:FB }}>
                      Se ha enviado un código de verificación a <strong>{email}</strong>. Introdúcelo para confirmar la activación.
                    </div>
                    <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                      <input value={twoFACode} onChange={e=>setTwoFACode(e.target.value)}
                        placeholder="000000" maxLength={6} style={{
                        width:"120px", padding:"10px 14px", textAlign:"center",
                        letterSpacing:"6px", fontSize:"18px", fontFamily:FM,
                        background:C.bgInput, border:`1px solid ${C.border}`,
                        borderRadius:"7px", color:C.text, outline:"none",
                      }} />
                      <button style={{
                        background:C.green, color:"#fff", border:"none",
                        borderRadius:"7px", padding:"10px 18px", fontSize:"13px",
                        cursor:"pointer", fontFamily:FB, fontWeight:600,
                      }}>Verificar y activar</button>
                      <button onClick={()=>setShow2FA(false)} style={{
                        background:"none", color:C.textMuted, border:"none",
                        fontSize:"12px", cursor:"pointer", fontFamily:FB,
                      }}>Cancelar</button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Historial de accesos */}
            <Card>
              <CardHeader icon="🕐" title="Historial de accesos" sub="Últimas conexiones a tu cuenta. Si detectas algo sospechoso, cambia tu contraseña." />
              <div style={{ padding:"0" }}>
                {ACCESOS.map((a,i) => (
                  <div key={i} style={{
                    display:"flex", gap:"14px", alignItems:"center",
                    padding:"14px 22px",
                    borderBottom: i<ACCESOS.length-1 ? `1px solid ${C.border}` : "none",
                    background: a.current ? C.greenBg : C.bgCard,
                  }}>
                    <span style={{ fontSize:"20px", flexShrink:0 }}>{a.current ? "💻" : "🖥️"}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"3px" }}>
                        <span style={{ fontSize:"13px", fontFamily:FB, color:C.text }}>{a.lugar}</span>
                        {a.current && <Pill color={C.green} bg={C.greenBg} label="Sesión actual" small />}
                      </div>
                      <div style={{ fontSize:"11px", color:C.textSub, fontFamily:FM }}>{a.nav} · {a.fecha}</div>
                    </div>
                    {!a.current && (
                      <button style={{
                        background:"transparent", color:C.red, border:`1px solid ${C.red}33`,
                        borderRadius:"5px", padding:"5px 10px", fontSize:"11px",
                        cursor:"pointer", fontFamily:FM,
                      }}>Cerrar sesión</button>
                    )}
                  </div>
                ))}
                <div style={{ padding:"12px 22px", borderTop:`1px solid ${C.border}` }}>
                  <button style={{
                    background:"transparent", color:C.red, border:"none",
                    fontSize:"12px", cursor:"pointer", fontFamily:FB,
                  }}>⬡ Cerrar todas las otras sesiones</button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════════════════════
            TAB: PREFERENCIAS
        ════════════════════════════════ */}
        {activeTab === "preferencias" && (
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <Card>
              <CardHeader icon="🌐" title="Idioma y zona horaria" sub="Ajusta cómo recibes la información según tu ubicación." />
              <div style={{ padding:"20px 22px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"20px" }}>
                  <div>
                    <label style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM, letterSpacing:"0.5px", display:"block", marginBottom:"6px" }}>IDIOMA DE LA PLATAFORMA</label>
                    <select value={lang} onChange={e=>setLang(e.target.value)} style={{
                      width:"100%", padding:"10px 13px",
                      background:C.bgInput, border:`1px solid ${C.border}`,
                      borderRadius:"7px", fontSize:"13px", fontFamily:FB, color:C.text, outline:"none",
                    }}>
                      <option value="es">🇪🇸 Español</option>
                      <option value="en">🇺🇸 English</option>
                      <option value="fr">🇫🇷 Français</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM, letterSpacing:"0.5px", display:"block", marginBottom:"6px" }}>ZONA HORARIA</label>
                    <select value={tz} onChange={e=>setTz(e.target.value)} style={{
                      width:"100%", padding:"10px 13px",
                      background:C.bgInput, border:`1px solid ${C.border}`,
                      borderRadius:"7px", fontSize:"13px", fontFamily:FB, color:C.text, outline:"none",
                    }}>
                      {ZONAS.map(z => <option key={z} value={z}>{z.replace("_"," ")}</option>)}
                    </select>
                    <span style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM, marginTop:"4px", display:"block" }}>
                      Los recordatorios de pago se enviarán en tu hora local.
                    </span>
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                  <SaveBtn onClick={()=>{setSavedPrefs(true);setTimeout(()=>setSavedPrefs(false),2500);}} saved={savedPrefs} />
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader icon="🔔" title="Notificaciones" sub="Elige cómo y cuándo quieres recibir actualizaciones de tu proceso." />
              <div style={{ padding:"20px 22px" }}>
                {[
                  { label:"Recordatorios de pago", sub:"7 días antes de cada cuota",     email:true,  wa:true  },
                  { label:"Estado de documentos",   sub:"Cuando se actualiza un documento",email:true, wa:false },
                  { label:"Avance de obra",          sub:"Actualización mensual",          email:true,  wa:false },
                  { label:"Mensajes del broker",     sub:"Nuevos mensajes de Carlos M.",   email:false, wa:true  },
                  { label:"Novedades del proyecto",  sub:"Noticias de Makai Cap Cana",     email:true,  wa:false },
                ].map((n,i) => (
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:"14px",
                    padding:"13px 0",
                    borderBottom: i<4 ? `1px solid ${C.border}` : "none",
                  }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:"13px", fontFamily:FB, color:C.text }}>{n.label}</div>
                      <div style={{ fontSize:"11px", color:C.textSub, fontFamily:FM, marginTop:"2px" }}>{n.sub}</div>
                    </div>
                    <div style={{ display:"flex", gap:"12px", flexShrink:0 }}>
                      {[
                        { key:"email", icon:"📧", label:"Email",     val:notifEmail,    set:setNotifEmail    },
                        { key:"wa",    icon:"💬", label:"WhatsApp",  val:notifWhatsapp, set:setNotifWhatsapp },
                      ].map(ch => (
                        <label key={ch.key} style={{ display:"flex", alignItems:"center", gap:"5px", cursor:"pointer" }}>
                          <div onClick={()=>ch.set(v=>!v)} style={{
                            width:"36px", height:"20px", borderRadius:"10px",
                            background:ch.val ? C.green : C.borderMid,
                            position:"relative", transition:"background 0.2s", cursor:"pointer",
                          }}>
                            <div style={{
                              position:"absolute", top:"2px",
                              left: ch.val ? "18px" : "2px",
                              width:"16px", height:"16px", borderRadius:"50%",
                              background:"#fff", transition:"left 0.2s",
                              boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
                            }} />
                          </div>
                          <span style={{ fontSize:"11px", color:C.textSub, fontFamily:FM }}>{ch.icon} {ch.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Divisa */}
            <Card>
              <CardHeader icon="💱" title="Divisa y formato numérico" sub="Para compradores internacionales." />
              <div style={{ padding:"20px 22px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                  <div>
                    <label style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM, letterSpacing:"0.5px", display:"block", marginBottom:"6px" }}>DIVISA DE REFERENCIA</label>
                    <select style={{
                      width:"100%", padding:"10px 13px",
                      background:C.bgInput, border:`1px solid ${C.border}`,
                      borderRadius:"7px", fontSize:"13px", fontFamily:FB, color:C.text, outline:"none",
                    }}>
                      <option>USD — Dólar estadounidense</option>
                      <option>EUR — Euro</option>
                      <option>GBP — Libra esterlina</option>
                      <option>DOP — Peso dominicano</option>
                    </select>
                  </div>
                  <div style={{
                    padding:"14px", background:C.bgWarm,
                    borderRadius:"8px", border:`1px solid ${C.border}`,
                    display:"flex", flexDirection:"column", justifyContent:"center",
                  }}>
                    <div style={{ fontSize:"11px", color:C.textMuted, fontFamily:FM, marginBottom:"4px" }}>TIPO DE CAMBIO ACTUAL</div>
                    <div style={{ fontSize:"15px", fontFamily:FH, color:C.text }}>1 USD = 0.92 EUR</div>
                    <div style={{ fontSize:"10px", color:C.textMuted, fontFamily:FM, marginTop:"3px" }}>Actualizado: 01 may 2026</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════════════════════
            TAB: ZONA DE PELIGRO
        ════════════════════════════════ */}
        {activeTab === "peligro" && (
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

            {/* Aviso contractual bloqueante */}
            <div style={{
              padding:"16px 20px",
              background:C.redBg, border:`1px solid ${C.red}44`,
              borderLeft:`4px solid ${C.red}`, borderRadius:"10px",
              display:"flex", gap:"14px", alignItems:"flex-start",
            }}>
              <span style={{ fontSize:"22px", flexShrink:0 }}>🚫</span>
              <div>
                <div style={{ fontSize:"14px", fontFamily:FH, color:C.red, fontWeight:400, marginBottom:"6px" }}>
                  Tienes un contrato activo — algunas acciones están restringidas
                </div>
                <div style={{ fontSize:"13px", color:C.textSub, fontFamily:FB, lineHeight:"1.6" }}>
                  Tu cuenta está vinculada a la compra de <strong>Makai Residences Unidad 3B</strong> con contrato en proceso. Para realizar cambios que afecten a tu expediente legal, debes contactar directamente con el equipo de administración.
                </div>
                <div style={{ marginTop:"10px" }}>
                  <a href="mailto:administracion@dunadevelopment.com" style={{ fontSize:"12px", color:C.blue, fontFamily:FM }}>
                    📧 administracion@dunadevelopment.com
                  </a>
                </div>
              </div>
            </div>

            {/* Descarga de datos */}
            <Card>
              <CardHeader icon="📦" title="Exportar mis datos" sub="Descarga una copia completa de tu información personal y documentos." />
              <div style={{ padding:"20px 22px" }}>
                <p style={{ margin:"0 0 14px", fontSize:"13px", color:C.textSub, fontFamily:FB, lineHeight:"1.6" }}>
                  Puedes solicitar un archivo ZIP con todos tus datos personales, documentos firmados, historial de pagos y comunicaciones. La descarga estará disponible en tu correo en un plazo máximo de 24 horas hábiles.
                </p>
                <button style={{
                  background:C.sidebar, color:"#fff", border:"none",
                  borderRadius:"7px", padding:"10px 20px", fontSize:"13px",
                  cursor:"pointer", fontFamily:FB, fontWeight:600,
                }}>📥 Solicitar exportación de datos</button>
              </div>
            </Card>

            {/* Eliminar cuenta — bloqueada */}
            <Card danger>
              <CardHeader
                icon="🗑️" title="Eliminar cuenta" danger
                sub="Acción irreversible. Todos tus datos, documentos y acceso serán eliminados permanentemente."
                badge={{ color:C.red, bg:C.redBg, label:"Restringida — contrato activo" }}
              />
              <div style={{ padding:"20px 22px" }}>

                {/* Bloqueada por contrato */}
                <div style={{
                  padding:"16px", background:"#FFF5F5", border:`1px solid ${C.red}33`,
                  borderRadius:"8px", marginBottom:"16px",
                }}>
                  <div style={{ fontSize:"13px", fontFamily:FB, color:C.red, fontWeight:600, marginBottom:"6px" }}>
                    🚫 No puedes eliminar tu cuenta mientras tienes una compra en proceso
                  </div>
                  <div style={{ fontSize:"13px", color:C.textSub, fontFamily:FB, lineHeight:"1.6" }}>
                    Tu expediente <strong>EXP-0041</strong> tiene contratos activos y documentos pendientes de firma. Eliminar tu cuenta en este estado podría invalidar documentos legales y comprometer el proceso de compra. Para solicitar la cancelación de la compra, contacta con tu broker Carlos Méndez.
                  </div>
                </div>

                {/* Expandir para ver el flujo de todos modos */}
                <button onClick={()=>setShowDanger(d=>!d)} style={{
                  background:"none", color:C.textMuted, border:`1px solid ${C.borderMid}`,
                  borderRadius:"6px", padding:"8px 14px", fontSize:"12px",
                  cursor:"pointer", fontFamily:FM, marginBottom: showDanger ? "16px" : "0",
                }}>
                  {showDanger ? "▲ Ocultar" : "▼ Ver proceso de eliminación de cuenta"}
                </button>

                {showDanger && (
                  <div style={{
                    padding:"16px", background:C.bg,
                    border:`1px solid ${C.red}33`, borderRadius:"8px",
                    opacity:0.6, pointerEvents:"none",
                  }}>
                    <div style={{ fontSize:"12px", color:C.textSub, fontFamily:FM, marginBottom:"12px" }}>
                      Para eliminar tu cuenta cuando no tengas contratos activos, deberás completar 3 pasos:
                    </div>
                    {[
                      "Paso 1 · Confirmación de identidad por email",
                      "Paso 2 · Escribir tu nombre completo exacto: «Miguel Perez»",
                      "Paso 3 · Confirmación final con código SMS",
                    ].map((s,i)=>(
                      <div key={i} style={{ display:"flex", gap:"10px", marginBottom:"8px" }}>
                        <div style={{
                          width:"22px", height:"22px", borderRadius:"50%", flexShrink:0,
                          background:C.redBg, border:`1px solid ${C.red}44`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:"11px", color:C.red, fontFamily:FM,
                        }}>{i+1}</div>
                        <span style={{ fontSize:"12px", color:C.textSub, fontFamily:FM, paddingTop:"2px" }}>{s}</span>
                      </div>
                    ))}
                    <input disabled placeholder="Escribe tu nombre completo para confirmar…" style={{
                      width:"calc(100% - 24px)", padding:"10px 12px", marginTop:"8px",
                      background:C.bgCard, border:`1px solid ${C.red}44`,
                      borderRadius:"6px", fontSize:"13px", fontFamily:FB, color:C.textMuted,
                    }} />
                    <button disabled style={{
                      marginTop:"10px", background:C.red, color:"rgba(255,255,255,0.5)",
                      border:"none", borderRadius:"7px", padding:"9px 20px", fontSize:"13px",
                      cursor:"not-allowed", fontFamily:FB, opacity:0.5,
                    }}>Eliminar cuenta definitivamente</button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
