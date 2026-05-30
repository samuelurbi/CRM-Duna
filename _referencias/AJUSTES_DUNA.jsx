import { useState } from "react";

const C = {
  bg:"#F4F0E8", bgWarm:"#EDE8DE", bgCard:"#FFFFFF", bgInput:"#F8F5EF",
  sidebar:"#2E3D28", sidebarMid:"#364830",
  gold:"#B8942A", goldBg:"#FBF5E6",
  green:"#3A6B35", greenBg:"#EBF3E9",
  amber:"#9A6B1E", amberBg:"#FDF4E3",
  red:"#B03A2E", redBg:"#FCECEA",
  blue:"#2C5F8A", blueBg:"#EBF2FA",
  teal:"#2A7A6A", tealBg:"#E8F5F2",
  border:"#E0DAD0", borderMid:"#CEC8BC",
  text:"#26231C", textSub:"#6B6355", textMuted:"#A09080",
  shadow:"0 1px 4px rgba(0,0,0,0.07)",
  shadowMd:"0 4px 20px rgba(0,0,0,0.11)",
};
const FH="'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const FB="Georgia,'Times New Roman',serif";
const FM="'Courier New',Courier,monospace";

/* ══ HELPERS ══ */
function Toggle({ val, onChange, disabled }) {
  return (
    <div onClick={()=>!disabled&&onChange()} style={{
      width:"40px", height:"22px", borderRadius:"11px",
      background:val?C.green:C.borderMid,
      cursor:disabled?"not-allowed":"pointer",
      position:"relative", transition:"background 0.2s",
      opacity:disabled?0.5:1, flexShrink:0,
    }}>
      <div style={{
        position:"absolute", top:"3px", left:val?"21px":"3px",
        width:"16px", height:"16px", borderRadius:"50%",
        background:"#fff", transition:"left 0.2s",
        boxShadow:"0 1px 3px rgba(0,0,0,0.25)",
      }}/>
    </div>
  );
}

function Field({ label, value, onChange, type="text", hint, suffix, prefix, small, readOnly }) {
  return (
    <div>
      {label&&<label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px",letterSpacing:"0.8px"}}>{label.toUpperCase()}</label>}
      <div style={{position:"relative",display:"flex",alignItems:"center"}}>
        {prefix&&<span style={{position:"absolute",left:"12px",fontSize:"13px",color:C.textMuted,fontFamily:FM}}>{prefix}</span>}
        <input type={type} value={value} onChange={e=>onChange&&onChange(e.target.value)}
          readOnly={readOnly}
          style={{
            width:"100%", padding:`${small?"7px":"9px"} 12px`,
            paddingLeft:prefix?"28px":"12px",
            paddingRight:suffix?"36px":"12px",
            boxSizing:"border-box",
            background:readOnly?C.bgWarm:C.bgInput,
            border:`1px solid ${C.border}`,
            borderRadius:"7px", fontSize:"13px",
            fontFamily:FM, color:C.text, outline:"none",
            cursor:readOnly?"not-allowed":"text",
          }}/>
        {suffix&&<span style={{position:"absolute",right:"12px",fontSize:"12px",color:C.textMuted,fontFamily:FM}}>{suffix}</span>}
      </div>
      {hint&&<p style={{margin:"4px 0 0",fontSize:"10px",color:C.textMuted,fontFamily:FM,lineHeight:"1.5"}}>{hint}</p>}
    </div>
  );
}

function Select({ label, value, onChange, options, hint }) {
  return (
    <div>
      {label&&<label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px",letterSpacing:"0.8px"}}>{label.toUpperCase()}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)} style={{
        width:"100%", padding:"9px 12px",
        background:C.bgInput, border:`1px solid ${C.border}`,
        borderRadius:"7px", fontSize:"13px",
        fontFamily:FB, color:C.text, outline:"none", cursor:"pointer",
      }}>
        {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
      {hint&&<p style={{margin:"4px 0 0",fontSize:"10px",color:C.textMuted,fontFamily:FM,lineHeight:"1.5"}}>{hint}</p>}
    </div>
  );
}

function Row({ label, sub, children, warn, tip }) {
  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"flex-start",
      gap:"16px", padding:"14px 0",
      borderBottom:`1px solid ${C.border}`,
    }}>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:"13px",fontFamily:FB,color:C.text,marginBottom:"2px"}}>{label}</div>
        {sub&&<div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,lineHeight:"1.5"}}>{sub}</div>}
        {warn&&<div style={{marginTop:"5px",fontSize:"10px",color:C.red,fontFamily:FM,background:C.redBg,padding:"3px 8px",borderRadius:"3px",display:"inline-block"}}>⚠ {warn}</div>}
        {tip&&<div style={{marginTop:"5px",fontSize:"10px",color:C.blue,fontFamily:FM,background:C.blueBg,padding:"3px 8px",borderRadius:"3px",display:"inline-block"}}>💡 {tip}</div>}
      </div>
      <div style={{flexShrink:0}}>{children}</div>
    </div>
  );
}

function SectionCard({ title, sub, children, warn, tip }) {
  return (
    <div style={{background:C.bgCard,border:`1px solid ${warn?C.red+"55":C.border}`,borderRadius:"12px",overflow:"hidden",boxShadow:C.shadow,marginBottom:"16px"}}>
      <div style={{
        padding:"14px 20px",
        background:warn?C.redBg:C.bgWarm,
        borderBottom:`1px solid ${warn?C.red+"33":C.border}`,
      }}>
        <div style={{fontSize:"14px",fontFamily:FH,color:warn?C.red:C.text,fontWeight:400}}>{title}</div>
        {sub&&<div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,marginTop:"2px"}}>{sub}</div>}
        {tip&&<div style={{marginTop:"6px",fontSize:"11px",fontFamily:FM,color:C.blue,background:C.blueBg,padding:"4px 10px",borderRadius:"5px",display:"inline-block"}}>💡 {tip}</div>}
      </div>
      <div style={{padding:"0 20px 6px"}}>{children}</div>
    </div>
  );
}

function AlertBanner({ type, msg, action, onAction }) {
  const cfg={
    error:{color:C.red,bg:C.redBg,icon:"🔴"},
    warn:{color:C.amber,bg:C.amberBg,icon:"⚠️"},
    info:{color:C.blue,bg:C.blueBg,icon:"ℹ️"},
    ok:{color:C.green,bg:C.greenBg,icon:"✓"},
  }[type]||{color:C.blue,bg:C.blueBg,icon:"ℹ️"};
  return (
    <div style={{
      display:"flex",alignItems:"center",gap:"10px",
      padding:"11px 16px",background:cfg.bg,
      border:`1px solid ${cfg.color}44`,
      borderLeft:`3px solid ${cfg.color}`,
      borderRadius:"8px",marginBottom:"10px",
    }}>
      <span style={{fontSize:"15px",flexShrink:0}}>{cfg.icon}</span>
      <span style={{flex:1,fontSize:"12px",fontFamily:FB,color:C.text,lineHeight:"1.5"}}>{msg}</span>
      {action&&<button onClick={onAction} style={{background:cfg.color,color:"#fff",border:"none",borderRadius:"5px",padding:"5px 12px",fontSize:"11px",cursor:"pointer",fontFamily:FB,whiteSpace:"nowrap"}}>{action}</button>}
    </div>
  );
}

function Btn({ label, primary, danger, small, onClick }) {
  return (
    <button onClick={onClick} style={{
      background:primary?C.sidebar:danger?C.redBg:"transparent",
      color:primary?"#fff":danger?C.red:C.textSub,
      border:`1px solid ${primary?C.sidebar:danger?C.red+"44":C.border}`,
      borderRadius:"7px",padding:small?"6px 14px":"9px 20px",
      fontSize:small?"11px":"13px",cursor:"pointer",
      fontFamily:FB,fontWeight:primary?600:400,whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

/* ══ SECTIONS ══ */
const SECTIONS = [
  {k:"alertas",      icon:"🔴", label:"Alertas críticas",         badge:"5 problemas"},
  {k:"lanzamiento",  icon:"🚀", label:"Lanzamiento y ventas"},
  {k:"diseno",       icon:"🎨", label:"Diseño e idioma"},
  {k:"descuentos",   icon:"💸", label:"Descuentos"},
  {k:"pagos",        icon:"💳", label:"Pasarelas de pago"},
  {k:"filtros",      icon:"⊞",  label:"Barra de filtros"},
  {k:"tarjetas",     icon:"◫",  label:"Vista de tarjeta y lista"},
  {k:"precios",      icon:"📊", label:"Costos y precios"},
  {k:"enlaces",      icon:"🔗", label:"Textos y enlaces"},
  {k:"imagenes",     icon:"🖼️", label:"Imágenes y marca"},
];

/* ══ MAIN ══ */
export default function AjustesAdmin() {
  const [activeSection, setActiveSection] = useState("alertas");
  const [saved, setSaved] = useState(false);

  /* STATE */
  const [s, setS] = useState({
    // Lanzamiento
    mostrarTimer:true,
    fechaLanzamiento:"",
    rastreador:"vendidas",
    unidadesOffline:0,
    depositoActivo:true,
    depositoMonto:2000,
    mostrarBotonReservar:true,        // CORREGIDO: era false
    ocultarPrecioVendida:true,
    lanzamientoAuto:false,
    mantenimiento:false,
    tasaInteres:10.25,
    contadorListaCorta:1,
    mostrarUsuariosOnline:true,
    umbralOnline:5,                   // CORREGIDO: era 2
    formularioReservaHoras:48,
    requisitosCuenta:true,            // CORREGIDO: era false
    requisitosPais:true,              // CORREGIDO: era false
    verificacionMovil:true,           // CORREGIDO: era false

    // Diseño
    motivoLabel:"¿Cuál es tu objetivo con esta compra?",
    motivos:["Compra para uso propio","Inversión / renta vacacional","Apartamento vacacional","Soy broker / agencia inmobiliaria","Solo explorando"],
    idiomaPlatforma:"es",
    unidadMedida:"ambas",             // CORREGIDO: era solo ft²

    // Descuentos
    descuentoGlobal:true,
    tipoDescuento:"fijo",
    montoDescuento:20000,
    descuentoSinEncuesta:false,
    encuestaPreguntas:[
      "¿Cuál es tu objetivo con esta compra?",
      "¿En qué plazo tienes previsto decidir?",
      "¿Ya conoces Cap Cana?",
      "¿Cómo prefieres que te contactemos?",
    ],

    // Pagos
    pasarela:"stripe",
    stripeKey:"pk_live_••••••••••••••••",
    transferenciaBancaria:true,
    zelle:true,
    bancoSwift:"TDOMCATTTOR",
    bancoIban:"DM00 0012 0000 0000 0000 01",
    bancoNombre:"Banco Popular Dominicano",
    bancoBeneficiario:"Duna Development Group, SRL",

    // Filtros
    mostrarTipo:true,
    mostrarVista:true,
    mostrarPiso:true,
    mostrarPrecio:true,
    mostrarOrientacion:true,
    mostrarBanos:true,
    mostrarM2:true,
    filtroDefault:"disponible",       // CORREGIDO: era "todo"
    clasificacionDefault:"popular",   // CORREGIDO: era "ninguno"
    incrementoPrecio:25000,           // CORREGIDO: era 100000

    // Tarjetas
    mostrarAreaInterna:true,
    mostrarAreaExterna:true,
    mostrarParking:true,
    mostrarBalcon:true,               // CORREGIDO: era false
    mostrarVistaCampo:true,           // CORREGIDO: era false
    vistaCampoTitulo:"Vista",         // CORREGIDO: era "Perspectiva"
    outlookTitulo:"Vista / Orientación", // CORREGIDO: era "Outlook"
    mostrarSuperavit:true,            // CORREGIDO: era false

    // Precios
    prefixMoneda:"$",
    porcentajeDeposito:25,            // CORREGIDO: era 10%
    crecimientoCapital:5,
    mostrarAlquiler:true,
    mostrarRetornoNeto:true,
    mostrarROITotal:true,
    mostrarCostoMensual:true,         // CORREGIDO: era false
    mostrarSuperavitMensual:true,     // CORREGIDO: era false
    labelHOA:"Cuotas de Comunidad",   // CORREGIDO: era "HOA Levies"
    labelMensual:"Gastos mensuales",  // CORREGIDO: era "Monthly Fees"

    // Textos
    whatsappUri:"https://wa.me/18095550100?text=Hola,%20me%20interesa%20Makai%20Residences",
    terminosUrl:"https://makai-capcana.com/terms-and-conditions",
    privacidadUrl:"https://makai-capcana.com/privacy-policy",
    utmCookie:"makai_utm_source",
    paginacion:100,
    textoBienvenida:"¡Felicitaciones, [Nombre del comprador]!\n\nHas asegurado la Unidad [Unidad] en Makai Residences Cap Cana.",
  });

  const set = (k,v) => setS(prev=>({...prev,[k]:v}));

  const handleSave = () => {
    setSaved(true);
    setTimeout(()=>setSaved(false), 2500);
  };

  const CRITICOS = [
    {type:"error",msg:"El botón RESERVAR está desactivado — ningún cliente puede completar una reserva online.",action:"Ir a Lanzamiento", sec:"lanzamiento"},
    {type:"error",msg:"La encuesta para desbloquear el descuento de $20,000 no está configurada — el argumento comercial principal está roto.",action:"Ir a Descuentos",sec:"descuentos"},
    {type:"error",msg:"El URI de WhatsApp está vacío — el botón de chat no funciona.",action:"Ir a Textos",sec:"enlaces"},
    {type:"warn",msg:"El requisito de cuenta está desactivado — 740 usuarios en 14 días y solo el 10% se registró.",action:"Ir a Lanzamiento",sec:"lanzamiento"},
    {type:"warn",msg:"El % de depósito para métricas es 10% pero el plan de pagos establece 25% — los cálculos de ROI mostrados al cliente son incorrectos.",action:"Ir a Precios",sec:"precios"},
  ];

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:FB,color:C.text}}>

      {/* TOPBAR */}
      <div style={{
        background:C.sidebar,padding:"12px 24px",
        display:"flex",alignItems:"center",gap:"16px",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        position:"sticky",top:0,zIndex:30,
      }}>
        <div style={{flex:1}}>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px"}}>DUNA DEVELOPMENT · ADMIN</div>
          <div style={{fontSize:"14px",fontFamily:FH,color:"#fff",fontWeight:400}}>Configuración del Sistema</div>
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <div style={{
            fontSize:"11px",color:"#E8A09A",fontFamily:FM,
            background:"rgba(176,58,46,0.25)",border:"1px solid rgba(176,58,46,0.4)",
            borderRadius:"6px",padding:"5px 12px",
          }}>🔴 {CRITICOS.length} alertas críticas</div>
          <button onClick={handleSave} style={{
            background:saved?C.greenBg:C.gold,
            color:saved?C.green:"#fff",
            border:`1px solid ${saved?C.green+"44":"transparent"}`,
            borderRadius:"7px",padding:"8px 20px",
            fontSize:"13px",cursor:"pointer",fontFamily:FB,fontWeight:600,
            transition:"all 0.2s",
          }}>
            {saved?"✓ Guardado":"Guardar cambios"}
          </button>
        </div>
      </div>

      <div style={{display:"flex"}}>

        {/* SIDEBAR NAV */}
        <div style={{
          width:"220px",flexShrink:0,
          background:C.bgCard,borderRight:`1px solid ${C.border}`,
          position:"sticky",top:"48px",height:"calc(100vh - 48px)",
          overflowY:"auto",padding:"14px 10px",
        }}>
          {SECTIONS.map(s=>(
            <button key={s.k} onClick={()=>setActiveSection(s.k)} style={{
              width:"100%",display:"flex",alignItems:"center",gap:"9px",
              padding:"9px 11px",borderRadius:"7px",cursor:"pointer",
              background:activeSection===s.k?C.greenBg:"transparent",
              border:`1px solid ${activeSection===s.k?C.green+"44":"transparent"}`,
              color:activeSection===s.k?C.green:C.textSub,
              fontSize:"12px",textAlign:"left",marginBottom:"2px",
              fontFamily:FB,fontWeight:activeSection===s.k?600:400,
              transition:"all 0.12s",
            }}>
              <span style={{fontSize:"14px",flexShrink:0}}>{s.icon}</span>
              <span style={{flex:1}}>{s.label}</span>
              {s.badge&&<span style={{
                fontSize:"9px",fontFamily:FM,color:C.red,
                background:C.redBg,padding:"1px 6px",borderRadius:"8px",
                border:`1px solid ${C.red}33`,
              }}>{s.badge}</span>}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{flex:1,padding:"24px 28px",overflowY:"auto",maxWidth:"820px"}}>

          {/* ══ ALERTAS ══ */}
          {activeSection==="alertas" && (
            <div>
              <h2 style={{margin:"0 0 6px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Alertas críticas</h2>
              <p style={{margin:"0 0 20px",fontSize:"12px",color:C.textSub,fontFamily:FM}}>
                Estos problemas están afectando activamente la conversión y la experiencia del usuario.
              </p>
              {CRITICOS.map((a,i)=>(
                <AlertBanner key={i} type={a.type} msg={a.msg} action={a.action} onAction={()=>setActiveSection(a.sec)} />
              ))}
              <div style={{
                marginTop:"20px",padding:"16px 18px",
                background:C.greenBg,border:`1px solid ${C.green}33`,borderRadius:"10px",
              }}>
                <div style={{fontSize:"13px",fontFamily:FH,color:C.green,marginBottom:"8px"}}>✓ Todo lo demás está bien configurado</div>
                <div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,lineHeight:"1.7"}}>
                  Las métricas de inversión (ROI, crecimiento capital), las imágenes de marca, el tracking UTM, los textos legales y el flujo de reserva están correctamente configurados. Los 5 problemas de arriba son los únicos bloqueantes activos.
                </div>
              </div>
            </div>
          )}

          {/* ══ LANZAMIENTO ══ */}
          {activeSection==="lanzamiento" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Lanzamiento y ventas</h2>

              <AlertBanner type="error" msg="El botón RESERVAR está desactivado. Los clientes ven 'CONSULTAR' y no pueden completar la reserva. Actívalo ahora." />

              <SectionCard title="Botón de reserva" sub="Controla si el comprador puede reservar directamente o solo consultar">
                <Row label="Mostrar botón RESERVAR"
                  sub="Cuando está desactivado, el comprador solo ve 'CONSULTAR' — no puede reservar online."
                  warn={!s.mostrarBotonReservar?"Sin este toggle activo no hay ventas digitales":undefined}>
                  <Toggle val={s.mostrarBotonReservar} onChange={()=>set("mostrarBotonReservar",!s.mostrarBotonReservar)}/>
                </Row>
                <Row label="Depósito de reserva obligatorio" sub="Cobrar depósito vía pasarela de pago al reservar">
                  <Toggle val={s.depositoActivo} onChange={()=>set("depositoActivo",!s.depositoActivo)}/>
                </Row>
                {s.depositoActivo&&(
                  <div style={{padding:"12px 0"}}>
                    <Field label="Monto del depósito (USD)" value={s.depositoMonto} onChange={v=>set("depositoMonto",v)} prefix="$"
                      hint="Este depósito se descuenta del pago del 25%. Actualmente: $2,000." />
                  </div>
                )}
                <Row label="Ocultar precio en unidades no disponibles"
                  sub="Las unidades vendidas/reservadas/pendientes no muestran precio al público">
                  <Toggle val={s.ocultarPrecioVendida} onChange={()=>set("ocultarPrecioVendida",!s.ocultarPrecioVendida)}/>
                </Row>
              </SectionCard>

              <SectionCard title="Acceso y registro" sub="Controla qué se requiere para ver el inventario"
                tip="Activar el requisito de cuenta multiplica los leads capturados por 10.">
                <AlertBanner type="warn" msg="Con el registro desactivado tienes 740 visitantes pero solo 74 registros. Activarlo convierte cada visita en un lead." />
                <Row label="Requerir registro para ver precios"
                  sub="El visitante debe crear una cuenta antes de acceder al inventario completo."
                  warn={!s.requisitosCuenta?"Desactivado — visitantes anónimos sin capturar como leads":undefined}>
                  <Toggle val={s.requisitosCuenta} onChange={()=>set("requisitosCuenta",!s.requisitosCuenta)}/>
                </Row>
                <Row label="Requerir país al registrarse"
                  sub="El usuario debe indicar su país de residencia. Crítico para segmentación y fiscalidad.">
                  <Toggle val={s.requisitosPais} onChange={()=>set("requisitosPais",!s.requisitosPais)}/>
                </Row>
                <Row label="Verificación del número de móvil"
                  sub="El usuario verifica su teléfono antes de interactuar. Mejora calidad del lead.">
                  <Toggle val={s.verificacionMovil} onChange={()=>set("verificacionMovil",!s.verificacionMovil)}/>
                </Row>
              </SectionCard>

              <SectionCard title="Rastreador de ventas y temporizador">
                <Row label="Mostrar contador de ventas en el banner">
                  <Toggle val={s.mostrarTimer} onChange={()=>set("mostrarTimer",!s.mostrarTimer)}/>
                </Row>
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  <Select label="Rastreador de unidades" value={s.rastreador} onChange={v=>set("rastreador",v)}
                    options={[{v:"vendidas",l:"Unidades vendidas"},{v:"disponibles",l:"Unidades disponibles"},{v:"ambas",l:"Ambas"}]}/>
                  <Field label="Unidades vendidas fuera de plataforma" value={s.unidadesOffline}
                    onChange={v=>set("unidadesOffline",v)} hint="Suma al contador total. Para ventas hechas offline."/>
                </div>
              </SectionCard>

              <SectionCard title="Usuarios en línea y visibilidad social">
                <Row label="Mostrar contador de usuarios en línea"
                  sub="Muestra cuántas personas están viendo el inventario ahora mismo — genera urgencia.">
                  <Toggle val={s.mostrarUsuariosOnline} onChange={()=>set("mostrarUsuariosOnline",!s.mostrarUsuariosOnline)}/>
                </Row>
                <div style={{padding:"12px 0"}}>
                  <Field label="Mostrar contador cuando haya al menos X usuarios" value={s.umbralOnline}
                    onChange={v=>set("umbralOnline",v)} hint="Recomendado: 5. Actualmente configurado en 2 — puede verse vacío demasiado."/>
                </div>
                <Row label="Lanzamiento automático de unidades pendientes"
                  sub="Libera unidades en 'Pendiente' si llevan más de 1 hora sin confirmarse.">
                  <Toggle val={s.lanzamientoAuto} onChange={()=>set("lanzamientoAuto",!s.lanzamientoAuto)}/>
                </Row>
                <Row label="Página de mantenimiento"
                  sub="Solo admins pueden ver el inventario. Activar antes de cambios importantes.">
                  <Toggle val={s.mantenimiento} onChange={()=>set("mantenimiento",!s.mantenimiento)}/>
                </Row>
                <div style={{padding:"12px 0"}}>
                  <Field label="Tasa de interés (%)" value={s.tasaInteres} onChange={v=>set("tasaInteres",v)} suffix="%" hint="Usada en cálculos de métricas de inversión. Verificar coherencia con ROI mostrado (15.33%)."/>
                </div>
              </SectionCard>
            </div>
          )}

          {/* ══ DISEÑO ══ */}
          {activeSection==="diseno" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Diseño e idioma</h2>

              <AlertBanner type="warn" msg="El formulario de captación de leads está en inglés. Recomendado: traducir todas las opciones al español y añadir la opción de broker." />

              <SectionCard title="Idioma de la plataforma">
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  <Select label="Idioma principal" value={s.idiomaPlatforma} onChange={v=>set("idiomaPlatforma",v)}
                    options={[{v:"es",l:"Español"},{v:"en",l:"English"},{v:"fr",l:"Français"}]}
                    hint="Afecta todos los textos de la plataforma pública."/>
                  <Select label="Unidad de medida de área" value={s.unidadMedida} onChange={v=>set("unidadMedida",v)}
                    options={[{v:"m2",l:"m² (metros cuadrados)"},{v:"ft2",l:"ft² (pies cuadrados)"},{v:"ambas",l:"Ambas — m² y ft²"}]}
                    hint="Recomendado: ambas. Mercado europeo usa m², americano usa ft²."/>
                </div>
              </SectionCard>

              <SectionCard title="Formulario de captación — Motivo de interés"
                sub="Estas opciones aparecen en el formulario de registro del cliente."
                tip="Añadir opción de broker permite auto-clasificar profesionales desde el registro.">
                <div style={{padding:"12px 0"}}>
                  <Field label="Etiqueta del campo" value={s.motivoLabel} onChange={v=>set("motivoLabel",v)}
                    hint="Texto que aparece encima del desplegable de motivo de compra."/>
                </div>
                <div style={{marginTop:"4px"}}>
                  <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,letterSpacing:"0.8px"}}>OPCIONES DEL DESPLEGABLE</label>
                  <div style={{marginTop:"8px",display:"flex",flexDirection:"column",gap:"6px"}}>
                    {s.motivos.map((m,i)=>(
                      <div key={i} style={{display:"flex",gap:"8px",alignItems:"center"}}>
                        <span style={{fontSize:"11px",fontFamily:FM,color:C.textMuted,minWidth:"16px"}}>{i+1}.</span>
                        <input value={m} onChange={e=>{const arr=[...s.motivos];arr[i]=e.target.value;set("motivos",arr);}} style={{
                          flex:1,padding:"7px 10px",background:C.bgInput,
                          border:`1px solid ${C.border}`,borderRadius:"6px",
                          fontSize:"12px",fontFamily:FB,color:C.text,outline:"none",
                        }}/>
                        <button onClick={()=>set("motivos",s.motivos.filter((_,j)=>j!==i))} style={{
                          background:C.redBg,color:C.red,border:`1px solid ${C.red}33`,
                          borderRadius:"5px",padding:"5px 9px",fontSize:"12px",cursor:"pointer",
                        }}>✕</button>
                      </div>
                    ))}
                    <button onClick={()=>set("motivos",[...s.motivos,"Nueva opción"])} style={{
                      background:"transparent",color:C.green,border:`1px dashed ${C.green}55`,
                      borderRadius:"6px",padding:"7px",fontSize:"12px",cursor:"pointer",fontFamily:FB,
                    }}>+ Añadir opción</button>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {/* ══ DESCUENTOS ══ */}
          {activeSection==="descuentos" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Descuentos</h2>
              <AlertBanner type="error" msg="La encuesta de desbloqueo no está configurada — el descuento de $20,000 es inaccessible para todos los compradores actuales." />

              <SectionCard title="Descuento global de lanzamiento">
                <Row label="Descuento global activo">
                  <Toggle val={s.descuentoGlobal} onChange={()=>set("descuentoGlobal",!s.descuentoGlobal)}/>
                </Row>
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  <Select label="Tipo de descuento" value={s.tipoDescuento} onChange={v=>set("tipoDescuento",v)}
                    options={[{v:"fijo",l:"Cantidad fija (USD)"},{v:"pct",l:"Porcentaje (%)"}]}/>
                  <Field label={s.tipoDescuento==="fijo"?"Monto del descuento (USD)":"Porcentaje de descuento"}
                    value={s.montoDescuento} onChange={v=>set("montoDescuento",v)}
                    prefix={s.tipoDescuento==="fijo"?"$":undefined}
                    suffix={s.tipoDescuento==="pct"?"%":undefined}
                    hint={s.tipoDescuento==="fijo"?"$20,000 fijo es el 7% en una unidad de $285K pero solo el 3% en un Penthouse de $680K.":""}/>
                </div>
              </SectionCard>

              <SectionCard title="Mecánica de desbloqueo del descuento"
                sub="El comprador debe completar una encuesta para desbloquear el descuento — efecto psicológico de reciprocidad."
                tip="Configura 3-4 preguntas cortas. Cada respuesta te da inteligencia de venta sobre el lead.">
                <Row label="Descuento sin encuesta (acceso directo)"
                  sub="Si se activa, el descuento se aplica a todos sin necesidad de completar encuesta.">
                  <Toggle val={s.descuentoSinEncuesta} onChange={()=>set("descuentoSinEncuesta",!s.descuentoSinEncuesta)}/>
                </Row>
                {!s.descuentoSinEncuesta&&(
                  <div style={{padding:"14px 0"}}>
                    <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,letterSpacing:"0.8px",display:"block",marginBottom:"8px"}}>PREGUNTAS DE LA ENCUESTA (3-4 recomendadas)</label>
                    <div style={{
                      padding:"12px 14px",background:C.amberBg,border:`1px solid ${C.amber}33`,
                      borderRadius:"8px",marginBottom:"12px",fontSize:"11px",color:C.amber,fontFamily:FM,
                    }}>
                      ⚠ La sección "Encuesta" en el sidebar está vacía. Debes configurar estas preguntas ahí para que el flujo de desbloqueo funcione.
                    </div>
                    {s.encuestaPreguntas.map((p,i)=>(
                      <div key={i} style={{display:"flex",gap:"8px",marginBottom:"8px",alignItems:"center"}}>
                        <span style={{fontSize:"11px",fontFamily:FM,color:C.textMuted,minWidth:"20px"}}>{i+1}.</span>
                        <input value={p} onChange={e=>{const arr=[...s.encuestaPreguntas];arr[i]=e.target.value;set("encuestaPreguntas",arr);}} style={{
                          flex:1,padding:"8px 11px",background:C.bgInput,border:`1px solid ${C.border}`,
                          borderRadius:"6px",fontSize:"12px",fontFamily:FB,color:C.text,outline:"none",
                        }}/>
                      </div>
                    ))}
                    <button onClick={()=>set("encuestaPreguntas",[...s.encuestaPreguntas,"Nueva pregunta"])} style={{
                      background:"transparent",color:C.green,border:`1px dashed ${C.green}55`,
                      borderRadius:"6px",padding:"7px",fontSize:"12px",cursor:"pointer",fontFamily:FB,marginTop:"4px",
                    }}>+ Añadir pregunta</button>
                  </div>
                )}
              </SectionCard>
            </div>
          )}

          {/* ══ PAGOS ══ */}
          {activeSection==="pagos" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Pasarelas de pago</h2>

              <SectionCard title="Stripe — Tarjeta de crédito/débito"
                sub="Visa, Mastercard, Amex. Funciona en todos los países de tu mercado (Canadá, EEUU, España, Francia)."
                tip="Duna Development tiene cuenta Stripe activa — configurar ahora.">
                <Row label="Habilitar pago con tarjeta (Stripe)">
                  <Toggle val={s.pasarela==="stripe"} onChange={()=>set("pasarela","stripe")}/>
                </Row>
                <div style={{padding:"12px 0"}}>
                  <Field label="Clave pública de Stripe (pk_live_...)" value={s.stripeKey} onChange={v=>set("stripeKey",v)}
                    hint="La clave pública es segura para el frontend. Nunca uses la clave secreta aquí."/>
                </div>
              </SectionCard>

              <SectionCard title="Transferencia bancaria internacional"
                sub="Para pagos de $66,250 (25%), cuotas de construcción y precio final. El método principal en inmobiliaria.">
                <Row label="Habilitar instrucciones de transferencia">
                  <Toggle val={s.transferenciaBancaria} onChange={()=>set("transferenciaBancaria",!s.transferenciaBancaria)}/>
                </Row>
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  {[
                    {k:"bancoNombre",l:"Banco receptor",         val:s.bancoNombre},
                    {k:"bancoBeneficiario",l:"Beneficiario",     val:s.bancoBeneficiario},
                    {k:"bancoSwift",l:"SWIFT / BIC",             val:s.bancoSwift},
                    {k:"bancoIban",l:"Cuenta / IBAN",            val:s.bancoIban},
                  ].map(f=>(
                    <Field key={f.k} label={f.l} value={f.val} onChange={v=>set(f.k,v)}/>
                  ))}
                </div>
                <div style={{
                  padding:"10px 13px",background:C.blueBg,border:`1px solid ${C.blue}22`,
                  borderRadius:"7px",fontSize:"11px",color:C.blue,fontFamily:FM,lineHeight:"1.6",
                }}>
                  ℹ️ Estas instrucciones se mostrarán automáticamente en el portal del comprador y en la pantalla de confirmación de pago. El comprador podrá subir el comprobante directamente desde su área privada.
                </div>
              </SectionCard>

              <SectionCard title="Zelle (compradores de EEUU)"
                sub="El método de transferencia más usado en Estados Unidos para pagos inmobiliarios.">
                <Row label="Habilitar opción Zelle">
                  <Toggle val={s.zelle} onChange={()=>set("zelle",!s.zelle)}/>
                </Row>
              </SectionCard>
            </div>
          )}

          {/* ══ FILTROS ══ */}
          {activeSection==="filtros" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Barra de filtros</h2>

              <SectionCard title="Filtro y clasificación predeterminados"
                tip="Mostrar solo 'Disponible' mejora la primera impresión. 'Más populares' crea prueba social.">
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                  <Select label="Filtro predeterminado al entrar" value={s.filtroDefault} onChange={v=>set("filtroDefault",v)}
                    options={[
                      {v:"todo",l:"Mostrando todo"},
                      {v:"disponible",l:"Solo disponibles ← Recomendado"},
                      {v:"disponible_pendiente",l:"Disponibles y en proceso"},
                    ]}
                    hint="Con 80 disponibles y 22 vendidas, mostrar todo llena la pantalla de grises."/>
                  <Select label="Clasificación predeterminada" value={s.clasificacionDefault} onChange={v=>set("clasificacionDefault",v)}
                    options={[
                      {v:"ninguno",l:"Sin orden"},
                      {v:"numero",l:"Número de unidad"},
                      {v:"precio_asc",l:"Precio: menor a mayor"},
                      {v:"precio_desc",l:"Precio: mayor a menor"},
                      {v:"popular",l:"Más populares ← Recomendado"},
                      {v:"disponibilidad",l:"Disponibilidad"},
                    ]}
                    hint="'Más populares' muestra primero las unidades con más preselecciones — prueba social inmediata."/>
                </div>
                <div style={{padding:"0 0 12px"}}>
                  <Field label="Incremento del slider de precio (USD)" value={s.incrementoPrecio} onChange={v=>set("incrementoPrecio",v)}
                    prefix="$" hint="Recomendado: $25,000. Con $100,000 el slider tiene solo 4 posiciones para tu rango de precios ($285K–$680K)."/>
                </div>
              </SectionCard>

              <SectionCard title="Filtros visibles en la barra">
                {[
                  {k:"mostrarTipo",      l:"Tipo de unidad",     sub:"1 Cama, 2 Camas, Penthouse..."},
                  {k:"mostrarVista",     l:"Vista / Orientación",sub:"Lago, Jardín, Golf..."},
                  {k:"mostrarPiso",      l:"Piso",               sub:"Número de planta"},
                  {k:"mostrarPrecio",    l:"Precio",             sub:"Rango de precio con slider"},
                  {k:"mostrarOrientacion",l:"Orientación cardinal",sub:"N, S, E, O, SE, NE..."},
                  {k:"mostrarBanos",     l:"Número de baños",    sub:"Filtro por baños — útil para familias"},
                  {k:"mostrarM2",        l:"Superficie mínima",  sub:"m² mínimos — útil para inversores que buscan unidades compactas"},
                ].map(f=>(
                  <Row key={f.k} label={f.l} sub={f.sub}>
                    <Toggle val={s[f.k]} onChange={()=>set(f.k,!s[f.k])}/>
                  </Row>
                ))}
              </SectionCard>
            </div>
          )}

          {/* ══ TARJETAS ══ */}
          {activeSection==="tarjetas" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Vista de tarjeta y lista</h2>

              <SectionCard title="Etiquetas de campos" sub="Textos que aparecen como encabezados en las vistas">
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  <Field label="Etiqueta del campo Orientación/Vista" value={s.outlookTitulo} onChange={v=>set("outlookTitulo",v)}
                    hint='Actualmente es "Outlook" (en inglés). Corregir a "Vista" u "Orientación".'/>
                  <Field label="Campo dinámico — título" value={s.vistaCampoTitulo} onChange={v=>set("vistaCampoTitulo",v)}
                    hint='Era "Perspectiva". Recomendado: "Vista" — diferencial clave de Makai.'/>
                </div>
              </SectionCard>

              <SectionCard title="Datos visibles en la tarjeta (Grid)" sub="Iconos y specs que aparecen en cada tarjeta del inventario">
                {[
                  {k:"mostrarAreaInterna",l:"Área interior (m² / ft²)",    sub:"Superficie de la unidad — dato de comparación básico"},
                  {k:"mostrarAreaExterna",l:"Área exterior / terraza",      sub:"Terraza con vista al lago — argumento de venta clave"},
                  {k:"mostrarBalcon",     l:"Balcón",                        sub:"Actualmente desactivado — recomendado activar"},
                  {k:"mostrarParking",    l:"Plaza de parking",              sub:"Incluida en la unidad"},
                  {k:"mostrarVistaCampo", l:"Campo dinámico (Vista / Orientación)",sub:"Usar para mostrar 'Frente al lago', 'Vista al golf', etc."},
                ].map(f=>(
                  <Row key={f.k} label={f.l} sub={f.sub}
                    tip={!s[f.k]&&(f.k==="mostrarBalcon"||f.k==="mostrarVistaCampo")?"Desactivado — recomendado activar":undefined}>
                    <Toggle val={s[f.k]} onChange={()=>set(f.k,!s[f.k])}/>
                  </Row>
                ))}
              </SectionCard>

              <SectionCard title="Datos visibles en el modal de detalle">
                <Row label="Mostrar sección de gastos (HOA, tarifas)"
                  sub="HOA, tarifas mensuales y gastos adicionales en el modal de cada unidad.">
                  <Toggle val={true} onChange={()=>{}}/>
                </Row>
                <Row label="Mostrar superávit/déficit mensual"
                  sub="Diferencia entre alquiler estimado y gastos mensuales. El argumento definitivo para inversores."
                  tip="Superávit estimado de Makai: ~$7,693/mes">
                  <Toggle val={s.mostrarSuperavit} onChange={()=>set("mostrarSuperavit",!s.mostrarSuperavit)}/>
                </Row>
              </SectionCard>
            </div>
          )}

          {/* ══ PRECIOS ══ */}
          {activeSection==="precios" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Costos y precios</h2>

              <AlertBanner type="error" msg='El porcentaje de depósito está al 10% pero el plan de pagos real establece el 25%. Los cálculos de ROI mostrados al comprador son incorrectos.' />

              <SectionCard title="Moneda y medición">
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  <Field label="Prefijo de moneda" value={s.prefixMoneda} onChange={v=>set("prefixMoneda",v)} hint="Usar $ para USD"/>
                  <Select label="Unidad de área" value={s.unidadMedida} onChange={v=>set("unidadMedida",v)}
                    options={[{v:"m2",l:"m²"},{v:"ft2",l:"ft²"},{v:"ambas",l:"m² y ft² (recomendado)"}]}/>
                </div>
              </SectionCard>

              <SectionCard title="Métricas de inversión"
                sub="Datos que se muestran al comprador en la ficha de cada unidad para justificar la inversión.">
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  <Field label="Porcentaje de depósito para cálculos (%)" value={s.porcentajeDeposito}
                    onChange={v=>set("porcentajeDeposito",v)} suffix="%"
                    hint="Cambiar de 10% a 25% — el primer pago real es el 25% del precio de venta."/>
                  <Field label="Crecimiento de capital anual (%)" value={s.crecimientoCapital}
                    onChange={v=>set("crecimientoCapital",v)} suffix="%"
                    hint="5% — coincide con el contrato de agentes. Correcto."/>
                </div>
                {[
                  {k:"mostrarAlquiler",        l:"Mostrar alquiler estimado",         sub:"Est. $8,126/mes — argumento de inversión principal"},
                  {k:"mostrarRetornoNeto",      l:"Mostrar retorno neto",              sub:"Net Return: 10.33% anual"},
                  {k:"mostrarROITotal",         l:"Mostrar ROI total anual",           sub:"15.33% combinando retorno neto + apreciación capital"},
                  {k:"mostrarCostoMensual",     l:"Mostrar costo mensual total",       sub:"Suma de HOA + tarifas. Desactivado actualmente — recomendado activar."},
                  {k:"mostrarSuperavitMensual", l:"Mostrar superávit/déficit mensual", sub:"Alquiler - Gastos = ~$7,693/mes positivo. El argumento definitivo para inversores."},
                ].map(f=>(
                  <Row key={f.k} label={f.l} sub={f.sub}
                    tip={!s[f.k]&&(f.k==="mostrarCostoMensual"||f.k==="mostrarSuperavitMensual")?"Desactivado — recomendado activar":undefined}>
                    <Toggle val={s[f.k]} onChange={()=>set(f.k,!s[f.k])}/>
                  </Row>
                ))}
              </SectionCard>

              <SectionCard title="Etiquetas de gastos personalizados"
                sub="Estos textos aparecen como columnas en la ficha de cada unidad.">
                <div style={{padding:"12px 0",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                  <Field label="Etiqueta HOA / Comunidad" value={s.labelHOA} onChange={v=>set("labelHOA",v)}
                    hint='Era "HOA Levies" en inglés. Corregido a español.'/>
                  <Field label="Etiqueta tarifas mensuales" value={s.labelMensual} onChange={v=>set("labelMensual",v)}
                    hint='Era "Monthly Fees" en inglés.'/>
                </div>
                <div style={{padding:"8px 0"}}>
                  <div style={{
                    padding:"12px 14px",background:C.amberBg,border:`1px solid ${C.amber}33`,borderRadius:"8px",
                    fontSize:"11px",color:C.amber,fontFamily:FM,lineHeight:"1.6",
                  }}>
                    ⚠ Las tarifas mensuales de $3,982/mes son muy elevadas para un comprador. Verificar qué incluye exactamente este campo — si incluye gestión Wyndham u otro servicio, añadir una descripción explicativa para no frenar la decisión de compra.
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {/* ══ ENLACES Y TEXTOS ══ */}
          {activeSection==="enlaces" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Textos y enlaces</h2>

              <AlertBanner type="error" msg="El URI de WhatsApp está vacío. El botón de chat de la plataforma no funciona." />

              <SectionCard title="Canales de contacto">
                <div style={{padding:"12px 0"}}>
                  <Field label="URI de WhatsApp" value={s.whatsappUri} onChange={v=>set("whatsappUri",v)}
                    hint="Formato: https://wa.me/NÚMERO?text=Mensaje+preescrito. El número debe incluir prefijo internacional sin el +."/>
                </div>
              </SectionCard>

              <SectionCard title="Página de confirmación post-reserva"
                sub="Lo que ve el comprador inmediatamente después de completar su reserva. Momento de máxima satisfacción — no desperdiciarlo.">
                <div style={{padding:"12px 0"}}>
                  <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px",letterSpacing:"0.8px"}}>TEXTO DE FELICITACIONES</label>
                  <textarea value={s.textoBienvenida} onChange={e=>set("textoBienvenida",e.target.value)} rows={5} style={{
                    width:"100%",padding:"10px 12px",boxSizing:"border-box",
                    background:C.bgInput,border:`1px solid ${C.border}`,
                    borderRadius:"7px",fontSize:"13px",fontFamily:FB,color:C.text,
                    outline:"none",resize:"vertical",
                  }}/>
                  <div style={{fontSize:"10px",color:C.textSub,fontFamily:FM,marginTop:"5px",lineHeight:"1.6"}}>
                    Variables disponibles: [Nombre del comprador] · [Unidad] · [Nombre del desarrollo] · [Cantidad del depósito] · [Hora del acuerdo de reserva]
                  </div>
                </div>
                <div style={{
                  padding:"12px 14px",background:C.goldBg,border:`1px solid ${C.gold}33`,borderRadius:"8px",
                  fontSize:"11px",color:C.amber,fontFamily:FM,lineHeight:"1.7",
                }}>
                  💡 Recomendado añadir: nombre del asesor asignado, próximos pasos numerados (1. Email de confirmación, 2. Contacto del broker en 24h, 3. Acceder al área privada), y un botón directo al portal del comprador.
                </div>
              </SectionCard>

              <SectionCard title="URLs legales">
                <div style={{padding:"12px 0",display:"flex",flexDirection:"column",gap:"12px"}}>
                  <Field label="Términos y condiciones" value={s.terminosUrl} onChange={v=>set("terminosUrl",v)}/>
                  <Field label="Política de privacidad" value={s.privacidadUrl} onChange={v=>set("privacidadUrl",v)}/>
                  <Field label="Cookie UTM (nombre del parámetro)" value={s.utmCookie} onChange={v=>set("utmCookie",v)}
                    hint="Para trackear la fuente de cada registro. Actualmente: makai_utm_source — correcto."/>
                </div>
              </SectionCard>
            </div>
          )}

          {/* ══ IMÁGENES ══ */}
          {activeSection==="imagenes" && (
            <div>
              <h2 style={{margin:"0 0 20px",fontSize:"18px",fontFamily:FH,fontWeight:400}}>Imágenes y marca</h2>
              <AlertBanner type="ok" msg="Todas las imágenes de marca están correctamente configuradas. Logo, banner, login y registro." />
              {[
                {l:"Logo del desarrollo",      sub:"800×200px · WebP sin fondo · Visible en barra de navegación", ok:true},
                {l:"Imagen de encabezado / banner", sub:"2900×1000px · WebP · Banner principal del inventario",     ok:true},
                {l:"Imagen de inicio de sesión",   sub:"1000×1000px · WebP · Pantalla de login",                    ok:true},
                {l:"Imagen de registro",            sub:"1000×1554px · WebP · Pantalla de registro",                 ok:true},
              ].map((img,i)=>(
                <div key={i} style={{
                  display:"flex",gap:"14px",alignItems:"center",
                  padding:"14px 18px",background:C.bgCard,
                  border:`1px solid ${C.border}`,borderRadius:"10px",
                  marginBottom:"10px",boxShadow:C.shadow,
                }}>
                  <div style={{
                    width:"48px",height:"48px",borderRadius:"8px",
                    background:C.greenBg,border:`1px solid ${C.green}33`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"20px",flexShrink:0,
                  }}>🖼️</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"13px",fontFamily:FH,color:C.text}}>{img.l}</div>
                    <div style={{fontSize:"11px",fontFamily:FM,color:C.textSub,marginTop:"2px"}}>{img.sub}</div>
                  </div>
                  <span style={{fontSize:"11px",color:C.green,background:C.greenBg,padding:"3px 10px",borderRadius:"4px",fontFamily:FM}}>✓ Subida</span>
                  <Btn label="Reemplazar" small />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
