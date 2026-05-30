import { useState, useMemo } from "react";

const C = {
  bg:"#F4F0E8", bgWarm:"#EDE8DE", bgCard:"#FFFFFF", bgInput:"#F8F5EF",
  sidebar:"#2E3D28", gold:"#B8942A", goldLight:"#D4AE50", goldBg:"#FBF5E6",
  green:"#3A6B35", greenLight:"#4D8A45", greenBg:"#EBF3E9",
  amber:"#9A6B1E", amberBg:"#FDF4E3",
  red:"#B03A2E", redBg:"#FCECEA",
  blue:"#2C5F8A", blueBg:"#EBF2FA",
  teal:"#2A7A6A", tealBg:"#E8F5F2",
  border:"#E0DAD0", borderMid:"#CEC8BC",
  text:"#26231C", textSub:"#6B6355", textMuted:"#A09080",
  shadow:"0 1px 4px rgba(0,0,0,0.07)", shadowMd:"0 4px 20px rgba(0,0,0,0.10)",
};
const FH="'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
const FB="Georgia,'Times New Roman',serif";
const FM="'Courier New',Courier,monospace";

/* ── ESTADO CONFIG ── */
const EST = {
  disponible: { label:"Disponible",  color:C.blue,  bg:C.blueBg,  dot:"#4A8FD4" },
  pendiente:  { label:"Pendiente",   color:C.amber, bg:C.amberBg, dot:C.amber    },
  reservado:  { label:"Reservado",   color:C.gold,  bg:C.goldBg,  dot:C.gold     },
  completado: { label:"Completado",  color:C.teal,  bg:C.tealBg,  dot:C.teal     },
  vendido:    { label:"Vendido",     color:C.green, bg:C.greenBg, dot:C.green    },
};

/* ── MOCK DATA — 102 units ── */
const genUnidades = () => {
  const tipos = ["1 Cama","1 Cama y Hab. Familiar","2 Camas","1 Cama + Studio Lock-off","Penthouse 1 Cama","Penthouse 2 Camas"];
  const orients = ["N","NE","SE","S","SW","NW"];
  const vistas = ["Mar","Jardín","Laguna","Golf","Ciudad"];
  const precios = { "1 Cama":320000,"1 Cama y Hab. Familiar":431000,"2 Camas":489000,"1 Cama + Studio Lock-off":437000,"Penthouse 1 Cama":580000,"Penthouse 2 Camas":680000 };
  const estados = ["disponible","disponible","disponible","disponible","vendido","disponible","disponible","disponible","disponible","disponible"];

  const units = [];
  let id = 1;
  for (let piso = 1; piso <= 8; piso++) {
    for (let u = 1; u <= 13; u++) {
      if (id > 102) break;
      const tipo = tipos[Math.floor(Math.random()*tipos.length)];
      const est = id <= 22 ? (id <= 18 ? "vendido" : "completado") : estados[Math.floor(Math.random()*estados.length)];
      units.push({
        id, nombre: `${piso}0${u < 10 ? "0"+u : u}`.slice(-3),
        piso, tipo, estado: est,
        precio: precios[tipo] + Math.floor(Math.random()*20000),
        orient: orients[Math.floor(Math.random()*orients.length)],
        vista: vistas[Math.floor(Math.random()*vistas.length)],
        m2: 80 + Math.floor(Math.random()*130),
        vistas_count: Math.floor(Math.random()*50),
        publico: true,
        destacado: false,
        imagenes: Math.floor(Math.random()*3)+3,
        ultima_act: ["Hoy 09:14","Ayer","22 abr","18 abr","15 abr"][Math.floor(Math.random()*5)],
        agente: ["Carlos M.","Ana R.","Luis P.","José R."][Math.floor(Math.random()*4)],
      });
      id++;
    }
    if (id > 102) break;
  }
  return units;
};

const UNIDADES = genUnidades();

/* ── HELPERS ── */
function EstBadge({ estado, small, onClick }) {
  const e = EST[estado] || EST.disponible;
  return (
    <span onClick={onClick} style={{
      background:e.bg, color:e.color,
      fontSize:small?"10px":"11px",
      padding:small?"2px 8px":"4px 10px",
      borderRadius:"5px", fontFamily:FM,
      border:`1px solid ${e.color}22`,
      whiteSpace:"nowrap", cursor:onClick?"pointer":"default",
      letterSpacing:"0.3px",
    }}>{e.label}</span>
  );
}

function HeatBar({ val, max }) {
  const pct = Math.min(100, Math.round(val/max*100));
  const color = pct > 66 ? C.red : pct > 33 ? C.amber : C.blue;
  return (
    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
      <div style={{width:"60px",background:C.bgWarm,borderRadius:"3px",height:"5px",overflow:"hidden",flexShrink:0}}>
        <div style={{width:`${pct}%`,height:"100%",background:color,borderRadius:"3px"}} />
      </div>
      <span style={{fontSize:"11px",fontFamily:FM,color:val>20?C.red:val>10?C.amber:C.textMuted,
        fontWeight:val>10?"700":"400",minWidth:"24px"}}>
        {val>20?"🔥":""}{val}
      </span>
    </div>
  );
}

/* ── ESTADO INLINE SELECTOR ── */
function EstadoSelector({ unidad, onUpdate }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{position:"relative"}}>
      <EstBadge estado={unidad.estado} onClick={()=>setOpen(o=>!o)} />
      {open && (
        <div style={{
          position:"absolute",top:"100%",left:0,zIndex:50,
          background:C.bgCard,border:`1px solid ${C.border}`,
          borderRadius:"8px",padding:"6px",boxShadow:C.shadowMd,
          minWidth:"140px",marginTop:"4px",
        }}>
          {Object.entries(EST).map(([k,v])=>(
            <div key={k} onClick={()=>{onUpdate(unidad.id,k);setOpen(false);}} style={{
              display:"flex",alignItems:"center",gap:"8px",
              padding:"7px 10px",borderRadius:"5px",cursor:"pointer",
              background:unidad.estado===k?C.bgWarm:"transparent",
            }}>
              <div style={{width:"8px",height:"8px",borderRadius:"50%",background:v.dot,flexShrink:0}} />
              <span style={{fontSize:"12px",fontFamily:FB,color:C.text}}>{v.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══ MAIN ══ */
export default function UnidadesAdmin() {
  const [unidades, setUnidades] = useState(UNIDADES);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [viewMode, setViewMode] = useState("tabla");
  const [search, setSearch] = useState("");
  const [filtroPrecioMin, setFiltroPrecioMin] = useState("");
  const [filtroPrecioMax, setFiltroPrecioMax] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroPiso, setFiltroPiso] = useState("");
  const [sortCol, setSortCol] = useState("vistas_count");
  const [sortDir, setSortDir] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [editUnit, setEditUnit] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  /* counts per estado */
  const counts = useMemo(()=>{
    const c = {todos:unidades.length};
    Object.keys(EST).forEach(k=>{ c[k]=unidades.filter(u=>u.estado===k).length; });
    return c;
  },[unidades]);

  /* filter + sort */
  const filtered = useMemo(()=>{
    let list = [...unidades];
    if (filtroEstado!=="todos") list=list.filter(u=>u.estado===filtroEstado);
    if (search) list=list.filter(u=>
      u.nombre.includes(search) ||
      u.tipo.toLowerCase().includes(search.toLowerCase()) ||
      u.agente.toLowerCase().includes(search.toLowerCase())
    );
    if (filtroTipo) list=list.filter(u=>u.tipo===filtroTipo);
    if (filtroPiso) list=list.filter(u=>u.piso===parseInt(filtroPiso));
    if (filtroPrecioMin) list=list.filter(u=>u.precio>=parseInt(filtroPrecioMin));
    if (filtroPrecioMax) list=list.filter(u=>u.precio<=parseInt(filtroPrecioMax));
    list.sort((a,b)=>{
      const v1=a[sortCol], v2=b[sortCol];
      return sortDir==="asc"?(v1>v2?1:-1):(v1<v2?1:-1);
    });
    return list;
  },[unidades,filtroEstado,search,filtroTipo,filtroPiso,filtroPrecioMin,filtroPrecioMax,sortCol,sortDir]);

  const updateEstado = (id,newEst)=>{
    setUnidades(u=>u.map(x=>x.id===id?{...x,estado:newEst,ultima_act:"Ahora"}:x));
  };
  const toggleDestacado = (id)=>{
    setUnidades(u=>u.map(x=>x.id===id?{...x,destacado:!x.destacado}:x));
  };
  const togglePublico = (id)=>{
    setUnidades(u=>u.map(x=>x.id===id?{...x,publico:!x.publico}:x));
  };
  const toggleSelect = (id)=>{
    setSelectedIds(s=>{ const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; });
  };

  const sortBy = (col)=>{
    if(sortCol===col) setSortDir(d=>d==="asc"?"desc":"asc");
    else { setSortCol(col); setSortDir("desc"); }
  };
  const SortIcon = ({col})=>(
    <span style={{color:sortCol===col?C.green:C.textMuted,marginLeft:"3px",fontSize:"10px"}}>
      {sortCol===col?(sortDir==="asc"?"↑":"↓"):"↕"}
    </span>
  );

  const tipos = [...new Set(UNIDADES.map(u=>u.tipo))];
  const maxVistas = Math.max(...unidades.map(u=>u.vistas_count));

  /* bulk actions */
  const handleBulkEstado = (est)=>{
    setUnidades(u=>u.map(x=>selectedIds.has(x.id)?{...x,estado:est}:x));
    setSelectedIds(new Set());
  };

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:FB,color:C.text}}>

      {/* TOP BAR */}
      <div style={{
        background:C.sidebar,padding:"12px 24px",
        display:"flex",alignItems:"center",gap:"16px",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{flex:1}}>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px"}}>DUNA DEVELOPMENT · ADMIN</div>
          <div style={{fontSize:"14px",fontFamily:FH,color:"#fff",fontWeight:400}}>Gestión de Unidades</div>
        </div>
        <div style={{fontSize:"11px",color:"rgba(255,255,255,0.5)",fontFamily:FM}}>
          Makai Residences Cap Cana · 102 unidades
        </div>
      </div>

      <div style={{padding:"24px 28px"}}>

        {/* PAGE HEADER */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"20px"}}>
          <div>
            <h1 style={{margin:"0 0 4px",fontSize:"20px",fontFamily:FH,fontWeight:400,color:C.text}}>Unidades</h1>
            <p style={{margin:0,fontSize:"13px",color:C.textSub,fontFamily:FB}}>
              Ver, editar y gestionar todas las unidades del proyecto
            </p>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button style={{
              background:"transparent",color:C.textSub,border:`1px solid ${C.border}`,
              borderRadius:"7px",padding:"8px 16px",fontSize:"12px",cursor:"pointer",fontFamily:FB,
              display:"flex",gap:"6px",alignItems:"center",
            }}>⬇ Exportar Excel</button>
            <button style={{
              background:C.sidebar,color:"#fff",border:"none",
              borderRadius:"7px",padding:"8px 18px",fontSize:"12px",cursor:"pointer",
              fontFamily:FB,fontWeight:600,
            }}>+ Nueva unidad</button>
          </div>
        </div>

        {/* KPI MINI STRIP */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"10px",marginBottom:"18px"}}>
          {[
            {label:"Total",     val:counts.todos,          color:C.text,  bg:C.bgCard      },
            {label:"Disponibles",val:counts.disponible||0, color:C.blue,  bg:C.blueBg      },
            {label:"Reservadas", val:counts.reservado||0,  color:C.gold,  bg:C.goldBg,  alert:counts.reservado===0},
            {label:"Pendientes", val:counts.pendiente||0,  color:C.amber, bg:C.amberBg, alert:counts.pendiente===0},
            {label:"Vendidas",   val:counts.vendido||0,    color:C.green, bg:C.greenBg     },
            {label:"Completadas",val:counts.completado||0, color:C.teal,  bg:C.tealBg      },
          ].map(k=>(
            <div key={k.label} onClick={()=>setFiltroEstado(
              k.label==="Total"?"todos":
              k.label==="Disponibles"?"disponible":
              k.label==="Reservadas"?"reservado":
              k.label==="Pendientes"?"pendiente":
              k.label==="Vendidas"?"vendido":"completado"
            )} style={{
              background:k.bg, border:`1px solid ${k.alert?C.red+"55":k.color+"33"}`,
              borderRadius:"9px",padding:"12px 14px",cursor:"pointer",
              boxShadow:C.shadow, textAlign:"center",
              transition:"box-shadow 0.15s",
            }}>
              {k.alert && <div style={{fontSize:"9px",color:C.red,fontFamily:FM,marginBottom:"2px"}}>⚠ SIN ACTIVIDAD</div>}
              <div style={{fontSize:"24px",fontFamily:FH,fontWeight:400,color:k.alert?C.red:k.color}}>{k.val}</div>
              <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,marginTop:"2px"}}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTERS BAR */}
        <div style={{
          background:C.bgCard,border:`1px solid ${C.border}`,
          borderRadius:"10px",padding:"14px 16px",
          marginBottom:"16px",boxShadow:C.shadow,
        }}>
          <div style={{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}}>
            {/* Search */}
            <div style={{display:"flex",alignItems:"center",gap:"6px",
              background:C.bgInput,border:`1px solid ${C.border}`,
              borderRadius:"7px",padding:"8px 14px",flex:"1",minWidth:"200px"}}>
              <span style={{color:C.textMuted}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Buscar por número, tipo, agente..." style={{
                border:"none",background:"transparent",fontSize:"13px",
                fontFamily:FB,color:C.text,outline:"none",flex:1,
              }} />
            </div>

            {/* Estado filter tabs */}
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
              {[
                {key:"todos",     label:`Todos (${counts.todos})`},
                {key:"disponible",label:`Disponible (${counts.disponible||0})`},
                {key:"reservado", label:`Reservado (${counts.reservado||0})`, alert:counts.reservado===0},
                {key:"pendiente", label:`Pendiente (${counts.pendiente||0})`,  alert:counts.pendiente===0},
                {key:"completado",label:`Completado (${counts.completado||0})`},
                {key:"vendido",   label:`Vendido (${counts.vendido||0})`},
              ].map(f=>(
                <button key={f.key} onClick={()=>setFiltroEstado(f.key)} style={{
                  background:filtroEstado===f.key?C.sidebar:C.bgCard,
                  color:filtroEstado===f.key?"#fff":f.alert?C.red:C.textSub,
                  border:`1px solid ${filtroEstado===f.key?C.sidebar:f.alert?C.red+"44":C.border}`,
                  borderRadius:"6px",padding:"6px 12px",fontSize:"11px",
                  cursor:"pointer",fontFamily:FM,whiteSpace:"nowrap",
                }}>
                  {f.alert?"⚠ ":""}{f.label}
                </button>
              ))}
            </div>

            {/* Advanced filters toggle */}
            <button onClick={()=>setShowFilters(f=>!f)} style={{
              background:showFilters?C.greenBg:"transparent",
              color:showFilters?C.green:C.textSub,
              border:`1px solid ${showFilters?C.green+"44":C.border}`,
              borderRadius:"6px",padding:"7px 14px",fontSize:"12px",cursor:"pointer",fontFamily:FB,
              whiteSpace:"nowrap",
            }}>⊞ Filtros {showFilters?"▲":"▼"}</button>

            {/* View mode — Grid / List toggle */}
            <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
              <div style={{display:"flex",gap:"2px",background:C.bgWarm,border:`1px solid ${C.border}`,borderRadius:"6px",padding:"3px"}}>
                {[{k:"grid",icon:"⊞",label:"Grid"},{k:"tabla",icon:"≡",label:"Lista"}].map(v=>(
                  <button key={v.k} onClick={()=>setViewMode(v.k)} style={{
                    background:viewMode===v.k?C.bgCard:"transparent",
                    color:viewMode===v.k?C.text:C.textMuted,
                    border:viewMode===v.k?`1px solid ${C.border}`:"1px solid transparent",
                    borderRadius:"4px",padding:"5px 12px",fontSize:"13px",cursor:"pointer",
                    display:"flex",alignItems:"center",gap:"5px",
                  }}>
                    <span>{v.icon}</span>
                    <span style={{fontSize:"11px",fontFamily:FB}}>{v.label}</span>
                  </button>
                ))}
              </div>
              {/* Planta — botón separado */}
              <button onClick={()=>setViewMode("mapa")} style={{
                background:viewMode==="mapa"?C.bgCard:"transparent",
                color:viewMode==="mapa"?C.text:C.textMuted,
                border:viewMode==="mapa"?`1px solid ${C.border}`:`1px solid ${C.border}`,
                borderRadius:"6px",padding:"5px 14px",fontSize:"13px",cursor:"pointer",
                display:"flex",alignItems:"center",gap:"5px",fontFamily:FB,
              }}>
                <span>◫</span>
                <span style={{fontSize:"11px"}}>Planta</span>
              </button>
            </div>
          </div>

          {/* Advanced filters expanded */}
          {showFilters && (
            <div style={{
              display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",
              marginTop:"12px",paddingTop:"12px",borderTop:`1px solid ${C.border}`,
            }}>
              <div>
                <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px"}}>TIPO DE UNIDAD</label>
                <select value={filtroTipo} onChange={e=>setFiltroTipo(e.target.value)} style={{
                  width:"100%",padding:"8px 10px",background:C.bgInput,
                  border:`1px solid ${C.border}`,borderRadius:"6px",
                  fontSize:"12px",fontFamily:FB,color:C.text,outline:"none",
                }}>
                  <option value="">Todos los tipos</option>
                  {tipos.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px"}}>PISO</label>
                <select value={filtroPiso} onChange={e=>setFiltroPiso(e.target.value)} style={{
                  width:"100%",padding:"8px 10px",background:C.bgInput,
                  border:`1px solid ${C.border}`,borderRadius:"6px",
                  fontSize:"12px",fontFamily:FB,color:C.text,outline:"none",
                }}>
                  <option value="">Todos los pisos</option>
                  {[1,2,3,4,5,6,7,8].map(p=><option key={p} value={p}>Piso {p}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px"}}>PRECIO DESDE ($)</label>
                <input value={filtroPrecioMin} onChange={e=>setFiltroPrecioMin(e.target.value)}
                  placeholder="Ej: 350000" style={{
                  width:"100%",padding:"8px 10px",background:C.bgInput,
                  border:`1px solid ${C.border}`,borderRadius:"6px",
                  fontSize:"12px",fontFamily:FM,color:C.text,outline:"none",
                  boxSizing:"border-box",
                }} />
              </div>
              <div>
                <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px"}}>PRECIO HASTA ($)</label>
                <input value={filtroPrecioMax} onChange={e=>setFiltroPrecioMax(e.target.value)}
                  placeholder="Ej: 700000" style={{
                  width:"100%",padding:"8px 10px",background:C.bgInput,
                  border:`1px solid ${C.border}`,borderRadius:"6px",
                  fontSize:"12px",fontFamily:FM,color:C.text,outline:"none",
                  boxSizing:"border-box",
                }} />
              </div>
              <button onClick={()=>{setFiltroTipo("");setFiltroPiso("");setFiltroPrecioMin("");setFiltroPrecioMax("");setSearch("");}} style={{
                background:"transparent",color:C.red,border:`1px solid ${C.red}33`,
                borderRadius:"6px",padding:"8px 14px",fontSize:"12px",cursor:"pointer",fontFamily:FB,
              }}>✕ Limpiar filtros</button>
            </div>
          )}
        </div>

        {/* BULK ACTIONS */}
        {selectedIds.size > 0 && (
          <div style={{
            display:"flex",alignItems:"center",gap:"12px",
            padding:"12px 16px",marginBottom:"12px",
            background:C.blueBg,border:`1px solid ${C.blue}33`,
            borderRadius:"9px",
          }}>
            <span style={{fontSize:"13px",fontFamily:FB,color:C.blue,fontWeight:600}}>
              {selectedIds.size} unidades seleccionadas
            </span>
            <span style={{fontSize:"12px",color:C.textSub,fontFamily:FB}}>Cambiar estado a:</span>
            <div style={{display:"flex",gap:"6px"}}>
              {Object.entries(EST).map(([k,v])=>(
                <button key={k} onClick={()=>handleBulkEstado(k)} style={{
                  background:v.bg,color:v.color,
                  border:`1px solid ${v.color}33`,borderRadius:"5px",
                  padding:"5px 12px",fontSize:"11px",cursor:"pointer",fontFamily:FM,
                }}>{v.label}</button>
              ))}
            </div>
            <button onClick={()=>setSelectedIds(new Set())} style={{
              marginLeft:"auto",background:"none",color:C.textMuted,border:"none",
              fontSize:"12px",cursor:"pointer",fontFamily:FB,
            }}>✕ Cancelar</button>
          </div>
        )}

        {/* RESULTS COUNT */}
        <div style={{
          display:"flex",justifyContent:"space-between",alignItems:"center",
          marginBottom:"10px",
        }}>
          <span style={{fontSize:"12px",color:C.textSub,fontFamily:FM}}>
            Mostrando <strong>{filtered.length}</strong> de {unidades.length} unidades
            {(search||filtroTipo||filtroPiso||filtroPrecioMin||filtroPrecioMax) && (
              <span style={{color:C.amber}}> · Filtros activos</span>
            )}
          </span>
          <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
            <span style={{fontSize:"11px",color:C.textMuted,fontFamily:FM}}>Ordenar por:</span>
            {[
              {col:"vistas_count",label:"Vistas"},
              {col:"precio",label:"Precio"},
              {col:"nombre",label:"Número"},
            ].map(s=>(
              <button key={s.col} onClick={()=>sortBy(s.col)} style={{
                background:sortCol===s.col?C.greenBg:"transparent",
                color:sortCol===s.col?C.green:C.textSub,
                border:`1px solid ${sortCol===s.col?C.green+"44":C.border}`,
                borderRadius:"5px",padding:"4px 10px",fontSize:"11px",cursor:"pointer",fontFamily:FM,
              }}>{s.label} <SortIcon col={s.col} /></button>
            ))}
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewMode === "tabla" && (
          <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",overflow:"hidden",boxShadow:C.shadow}}>
            {/* Header */}
            <div style={{
              display:"grid",
              gridTemplateColumns:"36px 50px 110px 90px 200px 100px 70px 80px 80px 90px 110px 80px 80px",
              padding:"10px 14px",
              background:C.bgWarm,borderBottom:`1px solid ${C.border}`,
              fontSize:"10px",color:C.textMuted,fontFamily:FM,letterSpacing:"0.8px",
              alignItems:"center",gap:"2px",
            }}>
              <span />
              <span onClick={()=>sortBy("nombre")} style={{cursor:"pointer"}}>Nº <SortIcon col="nombre"/></span>
              <span>ESTADO</span>
              <span onClick={()=>sortBy("piso")} style={{cursor:"pointer"}}>PISO <SortIcon col="piso"/></span>
              <span>TIPO</span>
              <span onClick={()=>sortBy("precio")} style={{cursor:"pointer"}}>PRECIO <SortIcon col="precio"/></span>
              <span>ORIENT.</span>
              <span>M²</span>
              <span>PÚBLICO</span>
              <span>DEST.</span>
              <span onClick={()=>sortBy("vistas_count")} style={{cursor:"pointer",color:sortCol==="vistas_count"?C.green:C.textMuted}}>
                INTERÉS <SortIcon col="vistas_count"/>
              </span>
              <span>ÚLT. ACT.</span>
              <span>ACCIONES</span>
            </div>

            {/* Rows */}
            {filtered.map((u,i)=>{
              const isHot = u.vistas_count > 20 && u.estado==="disponible";
              const isSel = selectedIds.has(u.id);
              return (
                <div key={u.id} style={{
                  display:"grid",
                  gridTemplateColumns:"36px 50px 110px 90px 200px 100px 70px 80px 80px 90px 110px 80px 80px",
                  padding:"11px 14px",
                  borderBottom:`1px solid ${C.border}`,
                  alignItems:"center",gap:"2px",
                  background:isSel?C.blueBg:isHot?`${C.amberBg}55`:i%2===0?C.bgCard:C.bg,
                  transition:"background 0.1s",
                }}>
                  {/* Checkbox */}
                  <input type="checkbox" checked={isSel} onChange={()=>toggleSelect(u.id)}
                    style={{accentColor:C.green,width:"14px",height:"14px"}} />

                  {/* Número */}
                  <span style={{fontSize:"12px",fontFamily:FM,color:C.text,fontWeight:600}}>
                    {isHot && <span title="Alta demanda">🔥</span>}
                    {u.nombre}
                  </span>

                  {/* Estado inline */}
                  <EstadoSelector unidad={u} onUpdate={updateEstado} />

                  {/* Piso */}
                  <span style={{fontSize:"12px",fontFamily:FM,color:C.textSub}}>Piso {u.piso}</span>

                  {/* Tipo */}
                  <span style={{fontSize:"12px",fontFamily:FB,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.tipo}</span>

                  {/* Precio */}
                  <span style={{fontSize:"12px",fontFamily:FH,color:C.green,fontWeight:400}}>${u.precio.toLocaleString()}</span>

                  {/* Orient */}
                  <span style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>{u.orient} · {u.vista.slice(0,3)}</span>

                  {/* M2 */}
                  <span style={{fontSize:"11px",fontFamily:FM,color:C.textSub}}>{u.m2}m²</span>

                  {/* Público toggle */}
                  <div onClick={()=>togglePublico(u.id)} style={{
                    width:"36px",height:"20px",borderRadius:"10px",
                    background:u.publico?C.green:C.borderMid,cursor:"pointer",position:"relative",
                  }}>
                    <div style={{
                      position:"absolute",top:"2px",left:u.publico?"18px":"2px",
                      width:"16px",height:"16px",borderRadius:"50%",background:"#fff",
                      transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
                    }} />
                  </div>

                  {/* Destacado */}
                  <div onClick={()=>toggleDestacado(u.id)} style={{
                    display:"flex",alignItems:"center",gap:"4px",cursor:"pointer",
                  }}>
                    <div style={{
                      width:"36px",height:"20px",borderRadius:"10px",
                      background:u.destacado?C.gold:C.borderMid,position:"relative",
                    }}>
                      <div style={{
                        position:"absolute",top:"2px",left:u.destacado?"18px":"2px",
                        width:"16px",height:"16px",borderRadius:"50%",background:"#fff",
                        transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
                      }} />
                    </div>
                    {u.destacado && <span style={{fontSize:"10px",color:C.gold}}>★</span>}
                  </div>

                  {/* Interés / Vistas */}
                  <HeatBar val={u.vistas_count} max={maxVistas} />

                  {/* Última act */}
                  <span style={{fontSize:"10px",fontFamily:FM,color:C.textMuted}}>{u.ultima_act}</span>

                  {/* Acciones */}
                  <div style={{display:"flex",gap:"4px"}}>
                    <button onClick={()=>setEditUnit(u)} title="Editar" style={{
                      background:C.bg,border:`1px solid ${C.border}`,borderRadius:"5px",
                      padding:"4px 8px",fontSize:"13px",cursor:"pointer",
                    }}>✏️</button>
                    <button title="Ver como cliente" style={{
                      background:C.bg,border:`1px solid ${C.border}`,borderRadius:"5px",
                      padding:"4px 8px",fontSize:"13px",cursor:"pointer",
                    }}>👁</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"12px"}}>
            {filtered.map(u=>{
              const e = EST[u.estado]||EST.disponible;
              const isHot = u.vistas_count>20&&u.estado==="disponible";
              return (
                <div key={u.id} style={{
                  background:C.bgCard,border:`1px solid ${isHot?C.amber+"55":C.border}`,
                  borderTop:`3px solid ${e.dot}`,borderRadius:"10px",
                  padding:"14px",boxShadow:C.shadow,cursor:"pointer",
                }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                    <span style={{fontSize:"16px",fontFamily:FH,color:C.text,fontWeight:400}}>
                      {isHot&&"🔥 "}#{u.nombre}
                    </span>
                    <EstBadge estado={u.estado} small />
                  </div>
                  <div style={{fontSize:"12px",fontFamily:FB,color:C.textSub,marginBottom:"4px"}}>{u.tipo}</div>
                  <div style={{fontSize:"11px",fontFamily:FM,color:C.textMuted,marginBottom:"8px"}}>Piso {u.piso} · {u.orient} · {u.m2}m²</div>
                  <div style={{fontSize:"16px",fontFamily:FH,color:C.green,marginBottom:"8px"}}>${u.precio.toLocaleString()}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"8px",borderTop:`1px solid ${C.border}`}}>
                    <HeatBar val={u.vistas_count} max={maxVistas} />
                    <button onClick={()=>setEditUnit(u)} style={{
                      background:C.sidebar,color:"#fff",border:"none",
                      borderRadius:"5px",padding:"4px 10px",fontSize:"11px",cursor:"pointer",fontFamily:FB,
                    }}>Editar</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MAPA VIEW — floor plan grid */}
        {viewMode === "mapa" && (
          <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"24px",boxShadow:C.shadow}}>
            <div style={{fontSize:"13px",fontFamily:FH,color:C.text,marginBottom:"16px"}}>Vista por planta — Makai Residences</div>
            {[8,7,6,5,4,3,2,1].map(piso=>(
              <div key={piso} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                <div style={{fontSize:"10px",fontFamily:FM,color:C.textMuted,width:"50px",textAlign:"right",flexShrink:0}}>Piso {piso}</div>
                <div style={{display:"flex",gap:"4px",flex:1}}>
                  {filtered.filter(u=>u.piso===piso).map(u=>{
                    const e=EST[u.estado]||EST.disponible;
                    const isHot=u.vistas_count>20&&u.estado==="disponible";
                    return (
                      <div key={u.id} title={`#${u.nombre} · ${u.tipo} · $${u.precio.toLocaleString()} · ${e.label}`}
                        onClick={()=>setEditUnit(u)} style={{
                        width:"42px",height:"42px",borderRadius:"6px",
                        background:e.bg,border:`2px solid ${isHot?C.amber:e.dot}`,
                        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                        cursor:"pointer",flexShrink:0,
                        boxShadow:isHot?`0 0 0 2px ${C.amber}55`:"none",
                      }}>
                        <span style={{fontSize:"9px",fontFamily:FM,color:e.color,fontWeight:"700"}}>{u.nombre}</span>
                        {isHot&&<span style={{fontSize:"8px"}}>🔥</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{display:"flex",gap:"16px",marginTop:"16px",paddingTop:"14px",borderTop:`1px solid ${C.border}`,flexWrap:"wrap"}}>
              {Object.entries(EST).map(([k,v])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontFamily:FM,color:C.textSub}}>
                  <div style={{width:"14px",height:"14px",borderRadius:"3px",background:v.bg,border:`1px solid ${v.dot}`}} />
                  {v.label}
                </div>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontFamily:FM,color:C.textSub}}>
                <div style={{width:"14px",height:"14px",borderRadius:"3px",background:C.amberBg,border:`2px solid ${C.amber}`}} />
                🔥 Alta demanda
              </div>
            </div>
          </div>
        )}

      </div>

      {/* EDIT MODAL */}
      {editUnit && (
        <div style={{
          position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",
          display:"flex",alignItems:"center",justifyContent:"center",
          zIndex:100,padding:"20px",
        }} onClick={e=>{if(e.target===e.currentTarget)setEditUnit(null);}}>
          <div style={{
            background:C.bgCard,borderRadius:"14px",
            width:"100%",maxWidth:"560px",boxShadow:C.shadowMd,overflow:"hidden",
          }}>
            {/* Modal header */}
            <div style={{
              display:"flex",justifyContent:"space-between",alignItems:"center",
              padding:"18px 22px",background:C.sidebar,
            }}>
              <div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,0.4)",fontFamily:FM,letterSpacing:"2px",marginBottom:"2px"}}>EDITAR UNIDAD</div>
                <div style={{fontSize:"16px",fontFamily:FH,color:"#fff",fontWeight:400}}>
                  Unidad #{editUnit.nombre} · {editUnit.tipo}
                </div>
              </div>
              <button onClick={()=>setEditUnit(null)} style={{
                background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",
                border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",fontFamily:FM,fontSize:"14px",
              }}>✕</button>
            </div>

            {/* Modal body */}
            <div style={{padding:"22px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"14px"}}>
                {[
                  {label:"Número de unidad", val:editUnit.nombre, readOnly:true},
                  {label:"Piso",             val:`${editUnit.piso}`, readOnly:true},
                  {label:"Tipo",             val:editUnit.tipo},
                  {label:"Precio (USD)",     val:`${editUnit.precio}`},
                  {label:"Orientación",      val:editUnit.orient},
                  {label:"M² totales",       val:`${editUnit.m2}`},
                  {label:"Vista",            val:editUnit.vista},
                  {label:"Imágenes",         val:`${editUnit.imagenes}`, readOnly:true},
                ].map(f=>(
                  <div key={f.label}>
                    <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"4px"}}>{f.label.toUpperCase()}</label>
                    <input defaultValue={f.val} readOnly={f.readOnly} style={{
                      width:"100%",padding:"9px 12px",boxSizing:"border-box",
                      background:f.readOnly?C.bgWarm:C.bgInput,
                      border:`1px solid ${C.border}`,borderRadius:"7px",
                      fontSize:"13px",fontFamily:FM,color:C.text,outline:"none",
                      cursor:f.readOnly?"not-allowed":"text",
                    }} />
                  </div>
                ))}
              </div>

              {/* Estado con selector */}
              <div style={{marginBottom:"16px"}}>
                <label style={{fontSize:"10px",color:C.textMuted,fontFamily:FM,display:"block",marginBottom:"6px"}}>ESTADO</label>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  {Object.entries(EST).map(([k,v])=>(
                    <button key={k}
                      onClick={()=>{ updateEstado(editUnit.id,k); setEditUnit({...editUnit,estado:k}); }}
                      style={{
                        background:editUnit.estado===k?v.bg:C.bgInput,
                        color:editUnit.estado===k?v.color:C.textSub,
                        border:`2px solid ${editUnit.estado===k?v.dot:C.border}`,
                        borderRadius:"7px",padding:"7px 14px",fontSize:"12px",
                        cursor:"pointer",fontFamily:FM,
                      }}>{v.label}</button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div style={{display:"flex",gap:"16px",marginBottom:"20px"}}>
                {[
                  {label:"Visible en catálogo", val:editUnit.publico, key:"publico"},
                  {label:"Destacada ★",          val:editUnit.destacado, key:"destacado"},
                ].map(t=>(
                  <label key={t.key} style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}>
                    <div onClick={()=>{
                      if(t.key==="publico") togglePublico(editUnit.id);
                      else toggleDestacado(editUnit.id);
                      setEditUnit({...editUnit,[t.key]:!editUnit[t.key]});
                    }} style={{
                      width:"40px",height:"22px",borderRadius:"11px",
                      background:t.val?C.green:C.borderMid,position:"relative",
                    }}>
                      <div style={{
                        position:"absolute",top:"3px",left:t.val?"21px":"3px",
                        width:"16px",height:"16px",borderRadius:"50%",background:"#fff",
                        transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
                      }} />
                    </div>
                    <span style={{fontSize:"12px",fontFamily:FB,color:C.textSub}}>{t.label}</span>
                  </label>
                ))}
              </div>

              {/* Actions */}
              <div style={{display:"flex",gap:"10px",justifyContent:"flex-end",paddingTop:"14px",borderTop:`1px solid ${C.border}`}}>
                <button onClick={()=>setEditUnit(null)} style={{
                  background:"transparent",color:C.textSub,border:`1px solid ${C.border}`,
                  borderRadius:"7px",padding:"9px 20px",fontSize:"13px",cursor:"pointer",fontFamily:FB,
                }}>Cancelar</button>
                <button onClick={()=>setEditUnit(null)} style={{
                  background:C.sidebar,color:"#fff",border:"none",
                  borderRadius:"7px",padding:"9px 22px",fontSize:"13px",cursor:"pointer",fontFamily:FB,fontWeight:600,
                }}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
