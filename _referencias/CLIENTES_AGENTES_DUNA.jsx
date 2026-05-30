import { useState, useMemo, useRef } from "react";

const C = {
  bg:"#F4F0E8", bgWarm:"#EDE8DE", bgCard:"#FFFFFF", bgInput:"#F8F5EF",
  sidebar:"#2E3D28", sidebarMid:"#364830",
  gold:"#B8942A", goldBg:"#FBF5E6",
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

/* ══ ROLES ══ */
const ROLES = {
  cliente:   { label:"Cliente Final",    icon:"👤", color:C.green,  bg:C.greenBg  },
  agente:    { label:"Agente Duna",      icon:"💼", color:C.blue,   bg:C.blueBg   },
  broker:    { label:"Broker",           icon:"🤝", color:C.purple, bg:C.purpleBg },
  agencia:   { label:"Agencia",          icon:"🏢", color:C.teal,   bg:C.tealBg   },
  admin:     { label:"Administrador",    icon:"⚙️", color:C.red,    bg:C.redBg    },
};

const VALID_CODES = ["DUNA2026","MAKAI-ADM","EXPORT99"];

/* ══ MOCK DATA — unified, clean ══ */
const USUARIOS = [
  // AGENTES DUNA (verified, real emails)
  { id:1,  nombre:"Carlos",   apellido:"Méndez",    email:"cmenendez@dunadevelopment.com",  tel:"+1 809-555-0123", pais:"🇩🇴 RD",       rol:"agente",  pantalla:true,  activo:true,  registro:"2026-02-17", ultimaSesion:"Hoy 15:30",   empresa:null,          notas:"Broker Senior · 12 ventas cerradas" },
  { id:2,  nombre:"Ernesto",  apellido:"Rivas",     email:"erivas@dunadevelopment.com",     tel:"+1 809-719-7211", pais:"🇩🇴 RD",       rol:"agente",  pantalla:true,  activo:true,  registro:"2026-02-17", ultimaSesion:"Hoy 13:45",   empresa:null,          notas:"Agente Comercial · 8 ventas" },
  { id:3,  nombre:"María",    apellido:"Virginia",  email:"mparra@dunadevelopment.com",     tel:"+1 809-670-7043", pais:"🇩🇴 RD",       rol:"agente",  pantalla:true,  activo:true,  registro:"2026-02-17", ultimaSesion:"Ayer 18:20",  empresa:null,          notas:"Agente Comercial · 6 ventas" },
  { id:4,  nombre:"Vanesa",   apellido:"García",    email:"vgarcia@dunadevelopment.com",    tel:"+1 809-673-8236", pais:"🇩🇴 RD",       rol:"agente",  pantalla:true,  activo:true,  registro:"2026-02-17", ultimaSesion:"Hoy 11:05",   empresa:null,          notas:"Agente Comercial" },
  { id:5,  nombre:"Ángel",    apellido:"Ramírez",   email:"aramirez@dunadevelopment.com",   tel:"+1 809-710-9044", pais:"🇩🇴 RD",       rol:"admin",   pantalla:false, activo:true,  registro:"2026-02-17", ultimaSesion:"Ayer 21:26",  empresa:null,          notas:"Gestor Administrativo" },
  // BROKERS / AGENCIAS
  { id:6,  nombre:"Júnior",   apellido:"Bourassa",  email:"juniorbourassa@sunsetrealestate.ca",tel:"+1 873-354-0971",pais:"🇨🇦 Canadá",  rol:"broker",  pantalla:false, activo:true,  registro:"2026-04-16", ultimaSesion:"Hoy 04:45",   empresa:"Sunset RE",   notas:"8 clientes vinculados · 2 ventas cerradas" },
  { id:7,  nombre:"Jean F.",  apellido:"Soucy",     email:"jfsoucy@sunsetrealestate.ca",    tel:"+1 418-802-2919", pais:"🇨🇦 Canadá",  rol:"broker",  pantalla:false, activo:true,  registro:"2026-04-16", ultimaSesion:"Ayer 22:24",  empresa:"Sunset RE",   notas:"3 clientes vinculados" },
  { id:8,  nombre:"María R.", apellido:"Márquez",   email:"sales.makai@passfwd.com",        tel:"+56 809-264-846", pais:"N/A",          rol:"agencia", pantalla:false, activo:true,  registro:"2026-03-22", ultimaSesion:"Hoy 11:30",   empresa:"Guise Realty",notas:"5 clientes vinculados" },
  { id:9,  nombre:"David",    apellido:"Peinado",   email:"damainversiones2025@gmail.com",  tel:"+34 606-508-328", pais:"🇪🇸 España",   rol:"broker",  pantalla:false, activo:true,  registro:"2026-04-11", ultimaSesion:"Ayer 00:23",  empresa:"Dama Inv.",   notas:"2 clientes" },
  // CLIENTES FINALES
  { id:10, nombre:"Dave",     apellido:"Manser",    email:"davemanser1972@gmail.com",       tel:"+1 403-330-3403", pais:"🇨🇦 Canadá",  rol:"cliente", pantalla:false, activo:true,  registro:"2026-04-25", ultimaSesion:"Hoy 13:07",   empresa:null,          notas:"🔥 16 unidades guardadas · Alta intención" },
  { id:11, nombre:"Anyss",    apellido:"Fakhfakh",  email:"anyssfakhfakh@gmail.com",        tel:"+1 514-839-4830", pais:"🇨🇦 Canadá",  rol:"cliente", pantalla:false, activo:true,  registro:"2026-04-15", ultimaSesion:"Hoy 03:12",   empresa:null,          notas:"4 unidades guardadas" },
  { id:12, nombre:"Samuel",   apellido:"Urbina",    email:"samuelurbi93@gmail.com",         tel:"+58 412-605-4038",pais:"🇻🇪 Venezuela",rol:"cliente", pantalla:false, activo:true,  registro:"2026-04-14", ultimaSesion:"Hoy 14:05",   empresa:null,          notas:"" },
  { id:13, nombre:"Adit",     apellido:"Chaudhry",  email:"aditc31@gmail.com",              tel:"+1 416-737-2489", pais:"N/A",          rol:"cliente", pantalla:false, activo:true,  registro:"2026-03-21", ultimaSesion:"Ayer 02:43",  empresa:null,          notas:"76 sesiones — usuario muy recurrente" },
  { id:14, nombre:"Ridhi",    apellido:"Johal",     email:"ridhi_g@hotmail.com",            tel:"+1 647-955-5645", pais:"🇨🇦 Canadá",  rol:"cliente", pantalla:false, activo:true,  registro:"2026-03-19", ultimaSesion:"Ayer 21:55",  empresa:null,          notas:"" },
  { id:15, nombre:"Jack S.",  apellido:"Rey",       email:"jackscottking@gmail.com",        tel:"+27 734-645-093", pais:"🇿🇦 Sudáfrica",rol:"cliente", pantalla:false, activo:false, registro:"2026-05-01", ultimaSesion:"Hoy 11:39",   empresa:null,          notas:"Nuevo hoy · 1 sesión" },
  { id:16, nombre:"Benjamín", apellido:"Luong",     email:"benjiql@yahoo.com",              tel:"+1 657-333-5385", pais:"🇺🇸 EEUU",     rol:"cliente", pantalla:false, activo:true,  registro:"2026-04-19", ultimaSesion:"Ayer 01:28",  empresa:null,          notas:"" },
];

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
      {r.icon} {r.label}
    </span>
  );
}

function Avatar({ nombre, rol, size=32 }) {
  const r = ROLES[rol] || ROLES.cliente;
  const initials = (nombre[0]||"").toUpperCase() + (nombre.split(" ")[1]?.[0]||"").toUpperCase();
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%",
      background:r.bg, border:`2px solid ${r.color}44`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.33, fontWeight:700, color:r.color, fontFamily:FH,
      flexShrink:0,
    }}>{initials||nombre[0].toUpperCase()}</div>
  );
}

function Toggle({ val, onChange }) {
  return (
    <div onClick={onChange} style={{
      width:"36px", height:"20px", borderRadius:"10px",
      background:val?C.green:C.borderMid, cursor:"pointer",
      position:"relative", transition:"background 0.2s",
    }}>
      <div style={{
        position:"absolute", top:"3px", left:val?"19px":"3px",
        width:"14px", height:"14px", borderRadius:"50%",
        background:"#fff", transition:"left 0.2s",
        boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
      }}/>
    </div>
  );
}

/* ══ EXPORT MODAL ══ */
function ExportModal({ onClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [blockSecs, setBlockSecs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [formato, setFormato] = useState("Excel");
  const [filtro, setFiltro] = useState("todos");

  const verify = () => {
    if (VALID_CODES.includes(code.trim().toUpperCase())) {
      setLoading(true);
      setTimeout(()=>{ setLoading(false); setDone(true); }, 1800);
    } else {
      const n = attempts + 1; setAttempts(n); setError(true); setCode("");
      if (n >= 3) {
        setBlocked(true); let s=60; setBlockSecs(s);
        const t = setInterval(()=>{ s--; setBlockSecs(s); if(s<=0){clearInterval(t);setBlocked(false);setAttempts(0);}},1000);
      }
    }
  };

  return (
    <div style={{
      position:"fixed",inset:0,background:"rgba(26,23,18,0.65)",
      backdropFilter:"blur(5px)",display:"flex",alignItems:"center",
      justifyContent:"center",zIndex:400,padding:"20px",
    }} onClick={e=>e.target===e.currentTarget&&!done&&onClose()}>
      <div style={{background:C.bgCard,borderRadius:"14px",width:"100%",maxWidth:"480px",boxShadow:C.shadowMd,overflow:"hidden"}}>
        <div style={{background:C.sidebar,padding:"18px 22px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px",marginBottom:"2px"}}>EXPORTACIÓN PROTEGIDA</div>
            <div style={{fontSize:"15px",fontFamily:FH,color:"#fff"}}>Exportar Registro de Usuarios</div>
          </div>
          {!done&&<button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"15px"}}>✕</button>}
        </div>
        <div style={{padding:"22px"}}>
          {done ? (
            <div style={{textAlign:"center",padding:"12px 0"}}>
              <div style={{fontSize:"36px",marginBottom:"10px"}}>✅</div>
              <div style={{fontSize:"15px",fontFamily:FH,color:C.green,marginBottom:"6px"}}>Exportación completada</div>
              <div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,marginBottom:"16px"}}>Archivo guardado en tus descargas · Registrado en auditoría</div>
              <button onClick={onClose} style={{background:C.sidebar,color:"#fff",border:"none",borderRadius:"7px",padding:"10px 24px",fontSize:"13px",cursor:"pointer",fontFamily:FB,fontWeight:600}}>Cerrar</button>
            </div>
          ) : loading ? (
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{width:"40px",height:"40px",borderRadius:"50%",border:`3px solid ${C.greenBg}`,borderTop:`3px solid ${C.green}`,animation:"spin 0.8s linear infinite",margin:"0 auto 12px"}}/>
              <div style={{fontSize:"13px",fontFamily:FH,color:C.text}}>Generando archivo…</div>
            </div>
          ) : (
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"18px"}}>
                <div>
                  <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"6px",letterSpacing:"1px"}}>FILTRAR USUARIOS</label>
                  <select value={filtro} onChange={e=>setFiltro(e.target.value)} style={{width:"100%",padding:"9px 10px",background:C.bgInput,border:`1px solid ${C.border}`,borderRadius:"7px",fontSize:"12px",fontFamily:FB,color:C.text,outline:"none"}}>
                    <option value="todos">Todos los usuarios</option>
                    {Object.entries(ROLES).map(([k,v])=><option key={k} value={k}>{v.icon} {v.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"6px",letterSpacing:"1px"}}>FORMATO</label>
                  <div style={{display:"flex",gap:"6px"}}>
                    {["Excel","CSV","PDF"].map(f=>(
                      <button key={f} onClick={()=>setFormato(f)} style={{
                        flex:1,padding:"9px 6px",
                        background:formato===f?C.sidebar:C.bgInput,
                        color:formato===f?"#fff":C.textSub,
                        border:`1px solid ${formato===f?C.sidebar:C.border}`,
                        borderRadius:"7px",fontSize:"11px",cursor:"pointer",fontFamily:FM,
                        fontWeight:formato===f?700:400,
                      }}>{f==="CSV"?"📄":f==="Excel"?"📊":"📑"} {f}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{
                padding:"10px 14px",background:C.amberBg,border:`1px solid ${C.amber}33`,
                borderRadius:"8px",marginBottom:"18px",
                fontSize:"11px",color:C.amber,fontFamily:FM,lineHeight:"1.5",
              }}>
                🔒 Para proteger los datos personales de los usuarios, introduce el código de autorización del administrador.
              </div>
              <input
                value={code} onChange={e=>{setCode(e.target.value.toUpperCase());setError(false);}}
                onKeyDown={e=>e.key==="Enter"&&code.length>=4&&!blocked&&verify()}
                placeholder="Código de autorización..."
                autoFocus
                style={{
                  width:"100%",padding:"13px 16px",boxSizing:"border-box",
                  background:error?C.redBg:C.bgInput,
                  border:`2px solid ${error?C.red:code.length>0?C.green:C.border}`,
                  borderRadius:"9px",fontSize:"18px",fontFamily:FM,
                  fontWeight:700,letterSpacing:"4px",textAlign:"center",
                  color:error?C.red:C.text,outline:"none",marginBottom:"8px",
                }}
              />
              {error&&!blocked&&<div style={{fontSize:"11px",color:C.red,fontFamily:FM,textAlign:"center",marginBottom:"10px"}}>✕ Incorrecto · {3-attempts} intento{3-attempts!==1?"s":""} restante{3-attempts!==1?"s":""}</div>}
              {blocked&&<div style={{fontSize:"11px",color:C.red,fontFamily:FM,textAlign:"center",marginBottom:"10px",background:C.redBg,padding:"8px",borderRadius:"6px"}}>🔒 Bloqueado {blockSecs}s</div>}
              <div style={{display:"flex",gap:"8px",marginTop:"4px"}}>
                <button onClick={onClose} style={{flex:1,padding:"11px",background:"transparent",color:C.textSub,border:`1px solid ${C.border}`,borderRadius:"7px",fontSize:"13px",cursor:"pointer",fontFamily:FB}}>Cancelar</button>
                <button onClick={verify} disabled={code.length<4||blocked} style={{flex:2,padding:"11px",background:code.length>=4&&!blocked?C.sidebar:"#ccc",color:"#fff",border:"none",borderRadius:"7px",fontSize:"13px",cursor:code.length>=4&&!blocked?"pointer":"not-allowed",fontFamily:FB,fontWeight:600}}>🔓 Verificar y exportar</button>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ══ ADD/EDIT USER MODAL ══ */
function UserModal({ usuario, onClose, onSave }) {
  const isNew = !usuario?.id;
  const [form, setForm] = useState(usuario || {
    nombre:"", apellido:"", email:"", tel:"", pais:"", rol:"cliente",
    empresa:"", notas:"", pantalla:false, activo:true,
  });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const isValid = form.nombre && form.apellido && form.email && form.rol;

  return (
    <div style={{
      position:"fixed",inset:0,background:"rgba(26,23,18,0.65)",
      backdropFilter:"blur(4px)",display:"flex",alignItems:"center",
      justifyContent:"center",zIndex:300,padding:"20px",
    }} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{
        background:C.bgCard,borderRadius:"14px",
        width:"100%",maxWidth:"600px",maxHeight:"90vh",
        boxShadow:C.shadowMd,overflow:"hidden",
        display:"flex",flexDirection:"column",
      }}>
        <div style={{background:C.sidebar,padding:"18px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px",marginBottom:"2px"}}>{isNew?"NUEVO USUARIO":"EDITAR USUARIO"}</div>
            <div style={{fontSize:"15px",fontFamily:FH,color:"#fff"}}>{isNew?"Agregar al registro":"Editar perfil de "+form.nombre}</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontSize:"15px"}}>✕</button>
        </div>

        <div style={{overflowY:"auto",padding:"22px",flex:1}}>

          {/* Tipo de usuario */}
          <div style={{marginBottom:"18px"}}>
            <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"8px",letterSpacing:"1px"}}>TIPO DE USUARIO *</label>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {Object.entries(ROLES).map(([k,r])=>(
                <button key={k} onClick={()=>set("rol",k)} style={{
                  padding:"8px 14px",display:"flex",alignItems:"center",gap:"6px",
                  background:form.rol===k?r.bg:C.bgInput,
                  color:form.rol===k?r.color:C.textSub,
                  border:`2px solid ${form.rol===k?r.color:C.border}`,
                  borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontFamily:FB,
                  fontWeight:form.rol===k?600:400,
                }}>{r.icon} {r.label}</button>
              ))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"13px",marginBottom:"13px"}}>
            {[
              {k:"nombre",    l:"Nombre *",              ph:"Nombre"},
              {k:"apellido",  l:"Apellido *",             ph:"Apellido"},
              {k:"email",     l:"Correo electrónico *",   ph:"email@dominio.com"},
              {k:"tel",       l:"Teléfono / WhatsApp",    ph:"+1 (809) 000-0000"},
              {k:"pais",      l:"País",                   ph:"País de residencia"},
              {k:"empresa",   l:"Empresa / Agencia",      ph:"Solo para brokers y agencias"},
            ].map(f=>(
              <div key={f.k}>
                <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px",letterSpacing:"0.5px"}}>{f.l.toUpperCase()}</label>
                <input value={form[f.k]||""} onChange={e=>set(f.k,e.target.value)} placeholder={f.ph} style={{
                  width:"100%",padding:"9px 12px",boxSizing:"border-box",
                  background:!form[f.k]&&f.l.includes("*")?C.redBg+"44":C.bgInput,
                  border:`1px solid ${!form[f.k]&&f.l.includes("*")?C.red+"55":C.border}`,
                  borderRadius:"7px",fontSize:"13px",fontFamily:FB,color:C.text,outline:"none",
                }}/>
              </div>
            ))}
          </div>

          <div style={{marginBottom:"14px"}}>
            <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px",letterSpacing:"0.5px"}}>NOTAS INTERNAS</label>
            <textarea value={form.notas||""} onChange={e=>set("notas",e.target.value)}
              placeholder="Observaciones del equipo sobre este usuario..." style={{
              width:"100%",padding:"9px 12px",boxSizing:"border-box",
              background:C.bgInput,border:`1px solid ${C.border}`,
              borderRadius:"7px",fontSize:"13px",fontFamily:FB,color:C.text,outline:"none",
              resize:"vertical",minHeight:"60px",
            }}/>
          </div>

          <div style={{display:"flex",gap:"24px",padding:"14px 16px",background:C.bgWarm,borderRadius:"9px",border:`1px solid ${C.border}`}}>
            {[
              {k:"pantalla", l:"Visible en la plataforma pública",   sub:"El cliente puede verlo como asesor"},
              {k:"activo",   l:"Usuario activo",                     sub:"Puede acceder a la plataforma"},
            ].map(t=>(
              <label key={t.k} style={{display:"flex",alignItems:"flex-start",gap:"10px",cursor:"pointer",flex:1}}>
                <Toggle val={!!form[t.k]} onChange={()=>set(t.k,!form[t.k])} />
                <div>
                  <div style={{fontSize:"12px",fontFamily:FB,color:C.text}}>{t.l}</div>
                  <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,marginTop:"2px"}}>{t.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div style={{
          padding:"14px 22px",borderTop:`1px solid ${C.border}`,
          background:C.bg,display:"flex",gap:"8px",justifyContent:"flex-end",flexShrink:0,
        }}>
          <button onClick={onClose} style={{padding:"9px 20px",background:"transparent",color:C.textSub,border:`1px solid ${C.border}`,borderRadius:"7px",fontSize:"13px",cursor:"pointer",fontFamily:FB}}>Cancelar</button>
          <button onClick={()=>isValid&&onSave(form)} style={{
            padding:"9px 22px",
            background:isValid?C.sidebar:"#ccc",
            color:"#fff",border:"none",borderRadius:"7px",fontSize:"13px",
            cursor:isValid?"pointer":"not-allowed",fontFamily:FB,fontWeight:600,
          }}>{isNew?"Agregar usuario":"Guardar cambios"}</button>
        </div>
      </div>
    </div>
  );
}

/* ══ MAIN ══ */
export default function RegistroUsuarios() {
  const [usuarios, setUsuarios] = useState(USUARIOS);
  const [search, setSearch]     = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroPantalla, setFiltroPantalla] = useState("todos");
  const [sortCol, setSortCol]   = useState("registro");
  const [sortDir, setSortDir]   = useState("desc");
  const [editUser, setEditUser] = useState(null);
  const [isNew, setIsNew]       = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState(new Set());

  /* counts */
  const counts = useMemo(()=>{
    const c={todos:usuarios.length};
    Object.keys(ROLES).forEach(k=>{c[k]=usuarios.filter(u=>u.rol===k).length;});
    c.pantalla=usuarios.filter(u=>u.pantalla).length;
    c.activos=usuarios.filter(u=>u.activo).length;
    return c;
  },[usuarios]);

  /* filter */
  const filtered = useMemo(()=>{
    let list=[...usuarios];
    if(filtroRol!=="todos") list=list.filter(u=>u.rol===filtroRol);
    if(filtroPantalla==="visible") list=list.filter(u=>u.pantalla);
    if(filtroPantalla==="oculto") list=list.filter(u=>!u.pantalla);
    if(search) list=list.filter(u=>
      `${u.nombre} ${u.apellido}`.toLowerCase().includes(search.toLowerCase())||
      u.email.toLowerCase().includes(search.toLowerCase())||
      (u.empresa||"").toLowerCase().includes(search.toLowerCase())||
      (u.pais||"").toLowerCase().includes(search.toLowerCase())
    );
    list.sort((a,b)=>{
      const v1=a[sortCol]||"",v2=b[sortCol]||"";
      return sortDir==="asc"?String(v1).localeCompare(String(v2)):String(v2).localeCompare(String(v1));
    });
    return list;
  },[usuarios,filtroRol,filtroPantalla,search,sortCol,sortDir]);

  const sortBy=col=>{
    if(sortCol===col) setSortDir(d=>d==="asc"?"desc":"asc");
    else{setSortCol(col);setSortDir("desc");}
  };
  const SI=({col})=>(<span style={{color:sortCol===col?C.green:C.textMuted,marginLeft:"2px",fontSize:"9px"}}>{sortCol===col?(sortDir==="asc"?"↑":"↓"):"↕"}</span>);

  const handleSave=(form)=>{
    if(isNew) setUsuarios(u=>[{...form,id:Date.now(),registro:new Date().toISOString().slice(0,10),ultimaSesion:"Nunca",activo:true},...u]);
    else setUsuarios(u=>u.map(x=>x.id===form.id?form:x));
    setEditUser(null);
  };
  const handleDelete=(id)=>setUsuarios(u=>u.filter(x=>x.id!==id));
  const toggleSelect=(id)=>setSelected(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});
  const togglePantalla=(id)=>setUsuarios(u=>u.map(x=>x.id===id?{...x,pantalla:!x.pantalla}:x));
  const toggleActivo=(id)=>setUsuarios(u=>u.map(x=>x.id===id?{...x,activo:!x.activo}:x));

  const bulkDelete=()=>{ setUsuarios(u=>u.filter(x=>!selected.has(x.id))); setSelected(new Set()); };

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:FB,color:C.text}}>

      {/* TOPBAR */}
      <div style={{background:C.sidebar,padding:"12px 24px",display:"flex",alignItems:"center",gap:"16px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{flex:1}}>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px"}}>DUNA DEVELOPMENT · ADMIN</div>
          <div style={{fontSize:"14px",fontFamily:FH,color:"#fff",fontWeight:400}}>Registro de Usuarios</div>
        </div>
        <div style={{fontSize:"11px",color:"rgba(255,255,255,0.45)",fontFamily:FM}}>
          {counts.activos} activos · {counts.todos} total
        </div>
      </div>

      <div style={{padding:"24px 28px"}}>

        {/* HEADER */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"20px"}}>
          <div>
            <h1 style={{margin:"0 0 4px",fontSize:"20px",fontFamily:FH,fontWeight:400,color:C.text}}>Registro de Usuarios</h1>
            <p style={{margin:0,fontSize:"13px",color:C.textSub,fontFamily:FB}}>
              Directorio unificado de todos los usuarios de la plataforma — clientes, agentes, brokers y administradores
            </p>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button onClick={()=>setExportOpen(true)} style={{
              display:"flex",alignItems:"center",gap:"6px",
              background:"transparent",color:C.textSub,
              border:`1px solid ${C.border}`,borderRadius:"7px",
              padding:"8px 16px",fontSize:"12px",cursor:"pointer",fontFamily:FB,
            }}>🔒 Exportar</button>
            <button onClick={()=>{setIsNew(true);setEditUser({});}} style={{
              background:C.sidebar,color:"#fff",border:"none",
              borderRadius:"7px",padding:"8px 18px",fontSize:"12px",
              cursor:"pointer",fontFamily:FB,fontWeight:600,
            }}>+ Agregar usuario</button>
          </div>
        </div>

        {/* KPI STRIP */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"8px",marginBottom:"16px"}}>
          {[
            {k:"todos",    l:"Total",         val:counts.todos,          c:C.text,   b:C.bgCard    },
            {k:"activos",  l:"Activos",        val:counts.activos,        c:C.green,  b:C.greenBg,  noFilter:true},
            {k:"agente",   l:"Agentes Duna",   val:counts.agente||0,      c:C.blue,   b:C.blueBg    },
            {k:"cliente",  l:"Clientes",       val:counts.cliente||0,     c:C.green,  b:C.greenBg   },
            {k:"broker",   l:"Brokers",        val:counts.broker||0,      c:C.purple, b:C.purpleBg  },
            {k:"agencia",  l:"Agencias",       val:counts.agencia||0,     c:C.teal,   b:C.tealBg    },
            {k:"admin",    l:"Admins",         val:counts.admin||0,       c:C.red,    b:C.redBg     },
          ].map(k=>(
            <div key={k.k} onClick={()=>!k.noFilter&&setFiltroRol(k.k)} style={{
              background:(!k.noFilter&&filtroRol===k.k)?k.b:C.bgCard,
              border:`2px solid ${(!k.noFilter&&filtroRol===k.k)?k.c+"55":C.border}`,
              borderRadius:"9px",padding:"10px 12px",
              cursor:k.noFilter?"default":"pointer",
              textAlign:"center",boxShadow:C.shadow,
              transition:"all 0.12s",
            }}>
              <div style={{fontSize:"22px",fontFamily:FH,fontWeight:400,color:k.c}}>{k.val}</div>
              <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,marginTop:"2px",lineHeight:"1.3"}}>{k.l}</div>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTERS BAR */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"12px 14px",marginBottom:"12px",boxShadow:C.shadow}}>
          <div style={{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:"6px",background:C.bgInput,border:`1px solid ${C.border}`,borderRadius:"7px",padding:"8px 14px",flex:1,minWidth:"200px"}}>
              <span style={{color:C.textMuted}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por nombre, email, empresa, país..." style={{border:"none",background:"transparent",fontSize:"13px",fontFamily:FB,color:C.text,outline:"none",flex:1}}/>
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:"14px"}}>✕</button>}
            </div>

            {/* Rol quick tabs */}
            <div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
              {[{k:"todos",l:`Todos (${counts.todos})`},...Object.entries(ROLES).map(([k,r])=>({k,l:`${r.icon} ${r.label} (${counts[k]||0})`}))].map(f=>(
                <button key={f.k} onClick={()=>setFiltroRol(f.k)} style={{
                  background:filtroRol===f.k?C.sidebar:C.bgCard,
                  color:filtroRol===f.k?"#fff":C.textSub,
                  border:`1px solid ${filtroRol===f.k?C.sidebar:C.border}`,
                  borderRadius:"6px",padding:"5px 10px",fontSize:"10px",
                  cursor:"pointer",fontFamily:FM,whiteSpace:"nowrap",
                }}>{f.l}</button>
              ))}
            </div>

            <button onClick={()=>setShowFilters(v=>!v)} style={{
              background:showFilters?C.greenBg:"transparent",color:showFilters?C.green:C.textSub,
              border:`1px solid ${showFilters?C.green+"44":C.border}`,
              borderRadius:"6px",padding:"6px 12px",fontSize:"11px",cursor:"pointer",fontFamily:FB,
            }}>⊞ Más filtros {showFilters?"▲":"▼"}</button>
          </div>

          {showFilters&&(
            <div style={{display:"flex",gap:"10px",marginTop:"12px",paddingTop:"12px",borderTop:`1px solid ${C.border}`,flexWrap:"wrap"}}>
              <div>
                <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px",letterSpacing:"1px"}}>VISIBILIDAD EN PLATAFORMA</label>
                <select value={filtroPantalla} onChange={e=>setFiltroPantalla(e.target.value)} style={{padding:"8px 10px",background:C.bgInput,border:`1px solid ${C.border}`,borderRadius:"6px",fontSize:"12px",fontFamily:FB,color:C.text,outline:"none"}}>
                  <option value="todos">Todos</option>
                  <option value="visible">Visibles en plataforma</option>
                  <option value="oculto">No visibles</option>
                </select>
              </div>
              <button onClick={()=>{setFiltroRol("todos");setFiltroPantalla("todos");setSearch("");}} style={{
                background:"transparent",color:C.red,border:`1px solid ${C.red}33`,
                borderRadius:"6px",padding:"8px 14px",fontSize:"12px",cursor:"pointer",fontFamily:FB,alignSelf:"flex-end",
              }}>✕ Limpiar</button>
            </div>
          )}
        </div>

        {/* BULK ACTIONS */}
        {selected.size>0&&(
          <div style={{
            display:"flex",alignItems:"center",gap:"12px",
            padding:"11px 16px",marginBottom:"10px",
            background:C.blueBg,border:`1px solid ${C.blue}33`,borderRadius:"8px",
          }}>
            <span style={{fontSize:"12px",fontFamily:FB,color:C.blue,fontWeight:600}}>{selected.size} usuario{selected.size!==1?"s":""} seleccionado{selected.size!==1?"s":""}</span>
            <button onClick={bulkDelete} style={{background:C.redBg,color:C.red,border:`1px solid ${C.red}44`,borderRadius:"6px",padding:"5px 14px",fontSize:"11px",cursor:"pointer",fontFamily:FB}}>🗑 Eliminar seleccionados</button>
            <button onClick={()=>setSelected(new Set())} style={{marginLeft:"auto",background:"none",color:C.textMuted,border:"none",fontSize:"12px",cursor:"pointer",fontFamily:FB}}>✕ Cancelar</button>
          </div>
        )}

        {/* RESULTS + SORT */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
          <span style={{fontSize:"12px",color:C.textSub,fontFamily:FM}}><strong>{filtered.length}</strong> usuarios · {selected.size>0&&`${selected.size} seleccionados`}</span>
          <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
            <span style={{fontSize:"11px",color:C.textMuted,fontFamily:FM}}>Ordenar:</span>
            {[{col:"registro",l:"Registro"},{col:"nombre",l:"Nombre"},{col:"ultimaSesion",l:"Ú. sesión"}].map(s=>(
              <button key={s.col} onClick={()=>sortBy(s.col)} style={{
                background:sortCol===s.col?C.greenBg:"transparent",
                color:sortCol===s.col?C.green:C.textSub,
                border:`1px solid ${sortCol===s.col?C.green+"44":C.border}`,
                borderRadius:"5px",padding:"4px 10px",fontSize:"11px",cursor:"pointer",fontFamily:FM,
              }}>{s.l}<SI col={s.col}/></button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",overflow:"hidden",boxShadow:C.shadow}}>

          {/* Header */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"36px 220px 120px 200px 120px 90px 90px 80px 90px",
            padding:"10px 14px",background:C.bgWarm,
            borderBottom:`1px solid ${C.border}`,
            fontSize:"10px",color:C.textMuted,fontFamily:FM,letterSpacing:"0.8px",
            gap:"4px",alignItems:"center",
          }}>
            <span/>
            <span onClick={()=>sortBy("nombre")} style={{cursor:"pointer"}}>USUARIO<SI col="nombre"/></span>
            <span>ROL</span>
            <span onClick={()=>sortBy("email")} style={{cursor:"pointer"}}>EMAIL<SI col="email"/></span>
            <span>TELÉFONO</span>
            <span onClick={()=>sortBy("registro")} style={{cursor:"pointer"}}>REGISTRO<SI col="registro"/></span>
            <span onClick={()=>sortBy("ultimaSesion")} style={{cursor:"pointer"}}>ÚLT. SESIÓN<SI col="ultimaSesion"/></span>
            <span>PANTALLA</span>
            <span>ACCIONES</span>
          </div>

          {/* Rows */}
          {filtered.map((u,i)=>(
            <div key={u.id} style={{
              display:"grid",
              gridTemplateColumns:"36px 220px 120px 200px 120px 90px 90px 80px 90px",
              padding:"11px 14px",borderBottom:`1px solid ${C.border}`,
              alignItems:"center",gap:"4px",
              background:selected.has(u.id)?C.blueBg:!u.activo?C.bgWarm:i%2===0?C.bgCard:C.bg,
              opacity:u.activo?1:0.65,
            }}>
              <input type="checkbox" checked={selected.has(u.id)} onChange={()=>toggleSelect(u.id)} style={{accentColor:C.green,width:"14px",height:"14px"}}/>

              {/* Usuario */}
              <div style={{display:"flex",gap:"9px",alignItems:"center",minWidth:0}}>
                <Avatar nombre={u.nombre} rol={u.rol} size={30}/>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:"12px",fontFamily:FB,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {u.nombre} {u.apellido}
                  </div>
                  {u.empresa&&<div style={{fontSize:"10px",fontFamily:FM,color:C.textSub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.empresa}</div>}
                  {u.notas&&(
                    <div style={{
                      fontSize:"10px",fontFamily:FM,color:C.amber,
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                    }}>{u.notas.slice(0,35)}{u.notas.length>35?"…":""}</div>
                  )}
                </div>
              </div>

              {/* Rol */}
              <RolBadge rol={u.rol} small/>

              {/* Email */}
              <span style={{fontSize:"11px",fontFamily:FM,color:C.textSub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={u.email}>{u.email}</span>

              {/* Teléfono */}
              <span style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>{u.tel}</span>

              {/* Registro */}
              <span style={{fontSize:"10px",fontFamily:FM,color:C.textMuted}}>{u.registro}</span>

              {/* Última sesión */}
              <span style={{fontSize:"10px",fontFamily:FM,color:C.textMuted}}>{u.ultimaSesion}</span>

              {/* Pantalla toggle */}
              <div style={{display:"flex",justifyContent:"center"}}>
                <Toggle val={u.pantalla} onChange={()=>togglePantalla(u.id)}/>
              </div>

              {/* Acciones */}
              <div style={{display:"flex",gap:"4px"}}>
                <button onClick={()=>{setIsNew(false);setEditUser(u);}} title="Editar" style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:"5px",padding:"4px 7px",fontSize:"12px",cursor:"pointer"}}>✏️</button>
                <button onClick={()=>toggleActivo(u.id)} title={u.activo?"Desactivar":"Activar"} style={{
                  background:u.activo?C.amberBg:C.greenBg,
                  border:`1px solid ${u.activo?C.amber+"44":C.green+"44"}`,
                  borderRadius:"5px",padding:"4px 7px",fontSize:"12px",cursor:"pointer",
                }}>{u.activo?"⏸":"▶"}</button>
                <button onClick={()=>handleDelete(u.id)} title="Eliminar" style={{background:C.redBg,border:`1px solid ${C.red}33`,borderRadius:"5px",padding:"4px 7px",fontSize:"12px",cursor:"pointer"}}>🗑</button>
              </div>
            </div>
          ))}

          {filtered.length===0&&(
            <div style={{padding:"40px",textAlign:"center",color:C.textMuted,fontFamily:FM,fontSize:"13px"}}>
              No se encontraron usuarios con los filtros actuales
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{
          marginTop:"12px",display:"flex",justifyContent:"space-between",alignItems:"center",
          fontSize:"11px",fontFamily:FM,color:C.textMuted,
        }}>
          <span>Mostrando {filtered.length} de {usuarios.length} usuarios</span>
          <div style={{display:"flex",gap:"4px"}}>
            {["«","‹","›","»"].map(b=>(
              <button key={b} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"4px",padding:"5px 9px",fontSize:"11px",cursor:"pointer",color:C.textSub,fontFamily:FM}}>{b}</button>
            ))}
            <select style={{padding:"5px 8px",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"4px",fontSize:"11px",fontFamily:FM,color:C.text,outline:"none"}}>
              <option>25</option><option>50</option><option>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {editUser!==null&&(
        <UserModal
          usuario={isNew?null:editUser}
          onClose={()=>{setEditUser(null);setIsNew(false);}}
          onSave={handleSave}
        />
      )}
      {exportOpen&&<ExportModal onClose={()=>setExportOpen(false)}/>}
    </div>
  );
}
