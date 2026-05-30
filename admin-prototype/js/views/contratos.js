export const meta = { title: 'Reservas y Contratos', breadcrumb: 'Gestión · Reservas y contratos' };

export function render(data) {
  const { contracts } = data;

  const counts = {
    all:       contracts.length,
    reserva:   contracts.filter(c => c.type === 'Reserva').length,
    promesa:   contracts.filter(c => c.type === 'Promesa').length,
    contrato:  contracts.filter(c => c.type === 'Contrato').length,
    signature: contracts.filter(c => c.status === 'pending_signature').length,
    overdue:   contracts.filter(c => c.status === 'overdue').length,
  };

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Reservas y Contratos</h1>
    <span style="font-size:11px;color:var(--sub)">${counts.all} contratos activos</span>
    <div class="view-actions">
      <button class="btn btn-ghost btn-sm" onclick="openExportModal('Contratos')">🔒 Exportar</button>
      <button class="btn btn-primary btn-sm" onclick="openNuevaReservaModal()">+ Nueva reserva</button>
    </div>
  </div>

  <!-- Stats -->
  <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
    ${[
      { label: 'Reservas',      val: counts.reserva,   cls: 'var(--blue)' },
      { label: 'Promesas',      val: counts.promesa,   cls: 'var(--orange)' },
      { label: 'Contratos',     val: counts.contrato,  cls: 'var(--green-txt)' },
      { label: 'Por firmar',    val: counts.signature, cls: 'var(--red)' },
      { label: 'Pago vencido',  val: counts.overdue,   cls: 'var(--red)' },
    ].map(s => `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;min-width:110px">
        <div style="font-size:22px;font-weight:600;color:${s.cls}">${s.val}</div>
        <div style="font-size:11px;color:var(--sub);margin-top:2px">${s.label}</div>
      </div>
    `).join('')}
  </div>

  <!-- Filtros -->
  <div class="filter-bar">
    <span class="filter-pill active" data-filter="all">Todos <span class="count">${counts.all}</span></span>
    <span class="filter-pill" data-filter="Reserva">Reservas <span class="count">${counts.reserva}</span></span>
    <span class="filter-pill" data-filter="Promesa">Promesas <span class="count">${counts.promesa}</span></span>
    <span class="filter-pill" data-filter="Contrato">Contratos <span class="count">${counts.contrato}</span></span>
    <span class="filter-pill" data-filter="pending_signature">Por firmar <span class="count">${counts.signature}</span></span>
    <span class="filter-pill" data-filter="overdue">Pago vencido <span class="count">${counts.overdue}</span></span>
  </div>

  <!-- Tabla -->
  <div class="panel">
    <table class="data-table" id="contratos-table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Unidad · Proyecto</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Pagado</th>
          <th>Total</th>
          <th>Fecha firma</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${contracts.map(c => `
          <tr data-type="${c.type}" data-status="${c.status}">
            <td>
              <div class="cell-name">${c.client}</div>
            </td>
            <td>
              <div class="cell-name">${c.unit}</div>
              <div class="cell-sub">${c.project}</div>
            </td>
            <td>
              <span class="badge badge-${c.typeCls}">${c.type}</span>
            </td>
            <td><span class="badge badge-${c.statusCls}">${c.statusLabel}</span></td>
            <td class="cell-price">${c.paid}</td>
            <td>
              <div style="font-size:12px;color:var(--sub)">${c.total}</div>
            </td>
            <td>
              ${c.signed
                ? `<span style="font-size:11px;color:var(--sub)">${c.signed}</span>`
                : c.expires
                  ? `<span style="font-size:11px;color:var(--red)">Vence ${c.expires}</span>`
                  : `<span style="font-size:11px;color:var(--muted)">—</span>`}
            </td>
            <td>
              <div style="display:flex;gap:8px">
                <span class="cell-link" onclick="openContratoModal(${c.id})">Ver</span>
                ${c.status === 'pending_signature' ? `<span class="cell-link" style="color:var(--orange)" onclick="openContratoModal(${c.id})">Firmar</span>` : ''}
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>`;
}

export function init() {
  document.querySelectorAll('.filter-pill[data-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;
      document.querySelectorAll('#contratos-table tbody tr').forEach(row => {
        if (f === 'all') { row.style.display = ''; return; }
        const matchType   = row.dataset.type   === f;
        const matchStatus = row.dataset.status === f;
        row.style.display = (matchType || matchStatus) ? '' : 'none';
      });
    });
  });
}
