export const meta = { title: 'Anuncios', breadcrumb: 'Comunicación · Anuncios internos' };

const SEGMENT_LABELS = {
  buyers_active:  { label: 'Compradores activos',    icon: '🏠', count: 7  },
  buyers_process: { label: 'Compradores en proceso', icon: '⏳', count: 3  },
  prospects:      { label: 'Prospectos',             icon: '🔍', count: 3  },
  brokers:        { label: 'Brokers activos',        icon: '🤝', count: 3  },
  team:           { label: 'Equipo interno',         icon: '🔒', count: 2  },
};

// Enrich mock data with segments
const LOCAL_ANN = [
  { id: 1, title: 'Actualización de precios Makai — Q2 2026',
    body: 'A partir del 1 de junio entran en vigor los nuevos precios lista para Makai Residences. Todas las cotizaciones activas tienen 30 días de gracia.',
    segments: ['buyers_active','buyers_process','brokers'], date: '2026-04-28', author: 'Admin Duna', pinned: true },
  { id: 2, title: 'Nuevo proceso de aprobación de descuentos',
    body: 'Todo descuento mayor al 3% sobre precio lista requiere aprobación doble: Gerente Comercial + Administración. El flujo está activo en el CRM.',
    segments: ['team','brokers'], date: '2026-04-15', author: 'Admin Duna', pinned: true },
  { id: 3, title: 'Capacitación CRM — Mayo 2026',
    body: 'Sesión de capacitación el jueves 9 de mayo a las 10 AM (hora RD). Se cubrirán los módulos de expedientes, documentos y aprobaciones. Asistencia obligatoria.',
    segments: ['team'], date: '2026-05-01', author: 'Admin Duna', pinned: false },
];

export function render(data) {
  const pinned  = LOCAL_ANN.filter(a => a.pinned);
  const regular = LOCAL_ANN.filter(a => !a.pinned);

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Anuncios</h1>
    <span style="font-size:11px;color:var(--sub)">${LOCAL_ANN.length} publicados · ${pinned.length} fijados</span>
    <div class="view-actions">
      <button class="btn btn-primary btn-sm" id="btn-nuevo-anuncio">+ Nuevo anuncio</button>
    </div>
  </div>

  ${pinned.length ? `
    <div style="font-size:10px;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">📌 Fijados</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
      ${pinned.map(a => card(a, true)).join('')}
    </div>
  ` : ''}

  ${regular.length ? `
    <div style="font-size:10px;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Recientes</div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${regular.map(a => card(a, false)).join('')}
    </div>
  ` : ''}

</div>`;
}

function card(a, pinned) {
  const segChips = (a.segments || []).map(id => {
    const s = SEGMENT_LABELS[id];
    if (!s) return '';
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;color:var(--sub);background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:2px 8px">${s.icon} ${s.label} <span style="color:var(--muted)">${s.count}</span></span>`;
  }).join('');

  const reach = (a.segments || []).reduce((n, id) => n + (SEGMENT_LABELS[id]?.count || 0), 0);

  return `
  <div style="background:var(--bg-card);border:1px solid ${pinned ? 'rgba(74,94,63,.35)' : 'var(--border)'};border-radius:10px;padding:18px 22px">
    <div style="display:flex;align-items:flex-start;gap:14px">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
          ${pinned ? `<span style="font-size:12px">📌</span>` : ''}
          <span style="font-size:14px;font-weight:500;color:var(--cream)">${a.title}</span>
        </div>
        <p style="font-size:12px;color:var(--sub);line-height:1.6;margin:0 0 12px">${a.body}</p>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          ${segChips}
          <span style="font-size:10px;color:var(--muted);margin-left:4px">→ ${reach} personas</span>
        </div>
        <div style="font-size:10px;color:var(--muted);margin-top:8px">Por ${a.author} · ${a.date}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">
        <span class="cell-link" style="font-size:11px" onclick="editarAnuncio(${a.id})">Editar</span>
        <span class="cell-link" style="font-size:11px;color:var(--muted)" onclick="showToast('Anuncio archivado','var(--muted)')">Archivar</span>
      </div>
    </div>
  </div>`;
}

export function init() {
  document.getElementById('btn-nuevo-anuncio')?.addEventListener('click', () => window.openNuevoAnuncioModal());

  window.editarAnuncio = (id) => {
    const a = LOCAL_ANN.find(x => x.id === id);
    if (a) window.openEditarAnuncioModal(a);
  };
}
