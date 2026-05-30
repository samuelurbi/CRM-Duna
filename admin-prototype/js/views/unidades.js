export const meta = { title: 'Unidades', breadcrumb: 'Proyectos · Gestión de unidades' };

export function render(data) {
  const { units, projects } = data;
  const makai = projects.find(p => p.id === 1);
  const statusCls = { available:'green', pending:'orange', sold:'red' };
  const statusLabel = { available:'Disponible', pending:'Reservada', sold:'Vendida' };

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Unidades</h1>
    <div style="display:flex;align-items:center;gap:8px;margin-left:8px">
      <span class="badge badge-green">${units.filter(u=>u.status==='available').length} disponibles</span>
      <span class="badge badge-orange">${units.filter(u=>u.status==='pending').length} reservadas</span>
      <span class="badge badge-red">${units.filter(u=>u.status==='sold').length} vendidas</span>
    </div>
    <div class="view-actions">
      <div style="display:flex;background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:3px;gap:2px" id="view-toggle">
        <button class="btn btn-ghost btn-xs active-view" data-view="table" style="background:var(--green-lite);color:var(--green-txt);border:none">≡ Lista</button>
        <button class="btn btn-ghost btn-xs" data-view="grid" style="border:none">⊞ Grid</button>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openNuevaUnidadModal()">+ Nueva unidad</button>
    </div>
  </div>

  <!-- Progress bar del proyecto -->
  <div class="panel" style="margin-bottom:16px;padding:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div>
        <span style="font-size:13px;font-weight:600;color:var(--cream-dim)">Makai Residences</span>
        <span style="font-size:10px;color:var(--sub);margin-left:8px">Cap Cana · Punta Cana</span>
      </div>
      <span style="font-size:12px;color:var(--green-txt);font-weight:600">${makai.sold} DE ${makai.total} UNIDADES VENDIDAS</span>
    </div>
    <div style="background:var(--muted);border-radius:4px;height:6px;overflow:hidden">
      <div style="background:var(--green-txt);height:100%;width:${makai.salesProgress}%;border-radius:4px;transition:width .3s"></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:6px">
      <span style="font-size:10px;color:var(--sub)">${makai.salesProgress}% vendido</span>
      <span style="font-size:10px;color:var(--sub)">${makai.available} unidades disponibles</span>
    </div>
  </div>

  <!-- Filters -->
  <div class="filter-bar">
    <span class="filter-pill active" data-filter="all">Todas <span class="count">${units.length}</span></span>
    <span class="filter-pill" data-filter="available">Disponibles <span class="count">${units.filter(u=>u.status==='available').length}</span></span>
    <span class="filter-pill" data-filter="pending">Reservadas <span class="count">${units.filter(u=>u.status==='pending').length}</span></span>
    <span class="filter-pill" data-filter="sold">Vendidas <span class="count">${units.filter(u=>u.status==='sold').length}</span></span>
    <span class="filter-spacer"></span>
    <div class="filter-search">
      <span class="search-ico">⌕</span>
      <input type="text" placeholder="Buscar unidad…" id="unit-search">
    </div>
  </div>

  <!-- Table view -->
  <div class="panel" id="units-table-view">
    <table class="data-table" id="units-table">
      <thead>
        <tr>
          <th>Unidad</th>
          <th>Tipo</th>
          <th>Planta</th>
          <th>Camas / Baños</th>
          <th>sqft int.</th>
          <th>sqft terraza</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Cliente</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${units.map(u => `
          <tr data-status="${u.status}">
            <td><span class="cell-name">${u.num}</span></td>
            <td><span style="font-size:11px;color:var(--sub)">${u.type}</span></td>
            <td><span class="cell-num">${u.floor}</span></td>
            <td><span style="font-size:12px;color:var(--sub)">${u.bed}B · ${u.bath}Ba</span></td>
            <td><span class="cell-num">${u.sqft.toLocaleString()}</span></td>
            <td><span class="cell-num">${u.sqftTer}</span></td>
            <td><span class="cell-price">$${u.price.toLocaleString()}</span></td>
            <td><span class="badge badge-${statusCls[u.status]}">${statusLabel[u.status]}</span></td>
            <td><span style="font-size:11px;color:var(--sub)">${u.client || '—'}</span></td>
            <td>
              <div style="display:flex;align-items:center;gap:8px">
                <span class="cell-link" onclick="openUnidadModal(${u.id})">Ver</span>
                <label style="display:flex;align-items:center;gap:4px;cursor:pointer;font-size:10px;color:var(--sub)">
                  <input type="checkbox" ${u.status!=='sold'?'':'disabled'} style="cursor:pointer" ${u.status==='available'?'checked':''}>
                  activa
                </label>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Grid view (oculto por defecto) -->
  <div id="units-grid-view" style="display:none">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
      ${units.map(u => `
        <div class="panel" style="cursor:pointer;transition:border-color .12s" onclick="openUnidadModal(${u.id})" onmouseover="this.style.borderColor='rgba(255,255,255,.12)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="height:4px;background:${u.status==='available'?'var(--green-txt)':u.status==='pending'?'var(--orange)':'var(--red)'}"></div>
          <div style="padding:12px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:13px;font-weight:600;color:var(--cream-dim)">${u.num}</span>
              <span class="badge badge-${statusCls[u.status]}" style="font-size:8px">${statusLabel[u.status]}</span>
            </div>
            <div style="font-size:11px;color:var(--sub);margin-bottom:4px">${u.type} · Planta ${u.floor}</div>
            <div style="font-size:11px;color:var(--sub);margin-bottom:8px">${u.bed} bed · ${u.bath} ba · ${u.sqft} sqft</div>
            <div style="font-size:14px;font-weight:600;color:var(--green-txt)">$${u.price.toLocaleString()}</div>
            ${u.client ? `<div style="font-size:10px;color:var(--muted);margin-top:4px">${u.client}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  </div>

</div>`;
}

export function init() {
  // View toggle
  document.querySelectorAll('#view-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#view-toggle button').forEach(b => {
        b.style.background = 'transparent'; b.style.color = 'var(--sub)';
      });
      btn.style.background = 'var(--green-lite)'; btn.style.color = 'var(--green-txt)';
      document.getElementById('units-table-view').style.display = btn.dataset.view === 'table' ? '' : 'none';
      document.getElementById('units-grid-view').style.display  = btn.dataset.view === 'grid'  ? '' : 'none';
    });
  });
  // Filters
  document.querySelectorAll('.filter-pill[data-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;
      document.querySelectorAll('#units-table tbody tr').forEach(r => {
        r.style.display = (f === 'all' || r.dataset.status === f) ? '' : 'none';
      });
    });
  });
  // Search
  document.getElementById('unit-search')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#units-table tbody tr').forEach(r => {
      r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}
