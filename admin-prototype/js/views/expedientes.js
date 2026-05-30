import { getRole } from '../role.js';

export const meta = {
  get title()      { return getRole() === 'senior_agent' ? 'Mis Expedientes'              : 'Expedientes'; },
  get breadcrumb() { return getRole() === 'senior_agent' ? 'Mi gestión · Mis expedientes' : 'Gestión · Expedientes de clientes'; },
};

export function render(data) {
  const isSA = getRole() === 'senior_agent';
  // Senior agent only sees clients assigned to Ana Rodríguez (her team)
  const clients = isSA
    ? data.clients.filter(c => c.agent === 'Ana Rodríguez')
    : data.clients;
  const statusMap = {
    kyc_pending:       { label: 'KYC Pendiente',    cls: 'orange' },
    signature_required:{ label: 'Firma requerida',  cls: 'red' },
    in_review:         { label: 'En revisión',       cls: 'blue' },
    completed:         { label: 'Al día',            cls: 'green' },
    payment_overdue:   { label: 'Pago vencido',      cls: 'red' },
  };
  const steps = ['—','Reserva','KYC','Promesa','Plan Pago','Doc. Pago','Contrato'];

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Expedientes</h1>
    <span style="font-size:11px;color:var(--sub)">${clients.length} clientes activos</span>
    <div class="view-actions">
      <button class="btn btn-ghost btn-sm" onclick="openExportModal('Expedientes')">🔒 Exportar</button>
      <button class="btn btn-primary btn-sm" onclick="openNuevoExpedienteModal()">+ Nuevo expediente</button>
    </div>
  </div>

  <!-- Filters -->
  <div class="filter-bar">
    <span class="filter-pill active" data-filter="all">Todos <span class="count">${clients.length}</span></span>
    <span class="filter-pill" data-filter="kyc_pending">KYC Pendiente <span class="count">${clients.filter(c=>c.status==='kyc_pending').length}</span></span>
    <span class="filter-pill" data-filter="signature_required">Firma requerida <span class="count">${clients.filter(c=>c.status==='signature_required').length}</span></span>
    <span class="filter-pill" data-filter="payment_overdue">Pago vencido <span class="count">${clients.filter(c=>c.status==='payment_overdue').length}</span></span>
    <span class="filter-pill" data-filter="completed">Al día <span class="count">${clients.filter(c=>c.status==='completed').length}</span></span>
    <span class="filter-spacer"></span>
    <div class="filter-search">
      <span class="search-ico">⌕</span>
      <input type="text" placeholder="Buscar cliente…" id="exp-search">
    </div>
  </div>

  <!-- Table -->
  <div class="panel">
    <table class="data-table" id="exp-table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Unidad · Proyecto</th>
          <th>Paso</th>
          <th>Estado</th>
          <th>Asesor</th>
          <th>Pagado</th>
          <th>Últ. actividad</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${clients.map(c => {
          const st = statusMap[c.status] || { label: c.status, cls: 'gray' };
          return `
          <tr data-status="${c.status}">
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="exp-avatar" style="width:28px;height:28px;font-size:11px;background:${avatarColor(c.id)}">${c.initials}</div>
                <div>
                  <div class="cell-name">${c.firstName} ${c.lastName}</div>
                  <div class="cell-sub">${c.country}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="cell-name">${c.unit}</div>
              <div class="cell-sub">${c.project}</div>
            </td>
            <td>
              <div style="display:flex;align-items:center;gap:6px">
                <div style="display:flex;gap:3px">
                  ${[1,2,3,4,5,6].map(s => `
                    <div style="width:6px;height:6px;border-radius:50%;background:${s < c.step ? 'var(--green-txt)' : s === c.step ? 'var(--orange)' : 'var(--muted)'}"></div>
                  `).join('')}
                </div>
                <span style="font-size:10px;color:var(--sub)">${steps[c.step]}</span>
              </div>
            </td>
            <td><span class="badge badge-${st.cls}">${st.label}</span></td>
            <td><span style="font-size:12px;color:var(--sub)">${c.agent}</span></td>
            <td>
              <div class="cell-price">${c.paid}</div>
              <div class="cell-sub">${c.paidPct}% de ${c.price}</div>
            </td>
            <td><span style="font-size:11px;color:var(--muted)">${c.lastAction}</span></td>
            <td>
              <div style="display:flex;gap:6px">
                <span class="cell-link" onclick="window.location.hash='expediente/${c.id}'">Ver →</span>
              </div>
            </td>
          </tr>
        `}).join('')}
      </tbody>
    </table>
  </div>
</div>`;
}

export function init() {
  // Filter pills
  document.querySelectorAll('.filter-pill[data-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      document.querySelectorAll('#exp-table tbody tr').forEach(row => {
        row.style.display = (filter === 'all' || row.dataset.status === filter) ? '' : 'none';
      });
    });
  });
  // Search
  document.getElementById('exp-search')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#exp-table tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

function avatarColor(id) {
  const c = ['#4A5E3F','#3a7abd','#c97c40','#b84040','#6b5b8a','#2a7a6a','#8a5c2a'];
  return c[id % c.length];
}
