import { getRole } from '../role.js';

export const meta = { title: 'Documentos', breadcrumb: 'Gestión · Documentos y archivos' };

export function render(data) {
  const isSA = getRole() === 'senior_agent';
  // Senior agent sees docs from clients assigned to Ana Rodríguez only
  const agentClients = isSA
    ? data.clients.filter(c => c.agent === 'Ana Rodríguez').map(c => `${c.firstName} ${c.lastName}`)
    : null;
  const documents = agentClients
    ? data.documents.filter(d => agentClients.includes(d.client))
    : data.documents;

  const counts = {
    all:       documents.length,
    pending:   documents.filter(d => d.status === 'pending').length,
    signature: documents.filter(d => d.status === 'signature').length,
    expired:   documents.filter(d => d.status === 'expired').length,
    done:      documents.filter(d => d.status === 'approved' || d.status === 'signed').length,
  };

  const typeIcon = { KYC: '🪪', Contrato: '📝', Promesa: '📋', Reserva: '🔖', 'Plan de Pagos': '📊', Identificación: '🪪' };

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Documentos</h1>
    <span style="font-size:11px;color:var(--sub)">${counts.all} archivos en total</span>
    <div class="view-actions">
      <button class="btn btn-ghost btn-sm" onclick="openExportModal('Documentos')">🔒 Exportar</button>
      <button class="btn btn-primary btn-sm" onclick="openSubirDocumentoModal()">+ Subir documento</button>
    </div>
  </div>

  <!-- Stats rápidas -->
  <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
    ${[
      { label: 'Pendientes revisión', val: counts.pending,   cls: 'var(--orange)' },
      { label: 'Por firmar',          val: counts.signature, cls: 'var(--red)' },
      { label: 'Vencidos',            val: counts.expired,   cls: 'var(--red)' },
      { label: 'Aprobados / Firmados',val: counts.done,      cls: 'var(--green-txt)' },
    ].map(s => `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;min-width:140px">
        <div style="font-size:22px;font-weight:600;color:${s.cls}">${s.val}</div>
        <div style="font-size:11px;color:var(--sub);margin-top:2px">${s.label}</div>
      </div>
    `).join('')}
  </div>

  <!-- Filtros -->
  <div class="filter-bar">
    <span class="filter-pill active" data-filter="all">Todos <span class="count">${counts.all}</span></span>
    <span class="filter-pill" data-filter="pending">Pendiente revisión <span class="count">${counts.pending}</span></span>
    <span class="filter-pill" data-filter="signature">Por firmar <span class="count">${counts.signature}</span></span>
    <span class="filter-pill" data-filter="expired">Vencidos <span class="count">${counts.expired}</span></span>
    <span class="filter-pill" data-filter="done">Aprobados <span class="count">${counts.done}</span></span>
  </div>

  <!-- Tabla -->
  <div class="panel">
    <table class="data-table" id="docs-table">
      <thead>
        <tr>
          <th>Documento</th>
          <th>Cliente</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Fecha límite</th>
          <th>Tamaño</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${documents.map(d => {
          const rowFilter = (d.status === 'approved' || d.status === 'signed') ? 'done' : d.status;
          return `
          <tr data-status="${rowFilter}">
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:18px;line-height:1">${typeIcon[d.type] || '📄'}</span>
                <div>
                  <div class="cell-name">${d.name}</div>
                  <div class="cell-sub">Subido ${d.uploaded}</div>
                </div>
              </div>
            </td>
            <td><span style="font-size:12px;color:var(--cream-dim)">${d.client}</span></td>
            <td>
              <span style="font-size:11px;color:var(--sub);background:var(--bg-surface);border-radius:4px;padding:2px 8px;white-space:nowrap">${d.type}</span>
            </td>
            <td><span class="badge badge-${d.statusCls}">${d.statusLabel}</span></td>
            <td>
              ${d.deadline
                ? `<span style="font-size:11px;color:${d.status === 'expired' ? 'var(--red)' : 'var(--sub)'}">${d.deadline}</span>`
                : `<span style="font-size:11px;color:var(--muted)">—</span>`}
            </td>
            <td><span style="font-size:11px;color:var(--muted)">${d.size}</span></td>
            <td>
              <div style="display:flex;gap:8px;align-items:center">
                <span class="cell-link" onclick="openDocModal(${d.id})">Ver</span>
                ${d.status === 'pending'   ? `<span class="cell-link" style="color:var(--green-txt)" onclick="approveDoc(${d.id})">Aprobar</span>` : ''}
                ${d.status === 'signature' ? `<span class="cell-link" style="color:var(--orange)">Firmar</span>` : ''}
              </div>
            </td>
          </tr>`;
        }).join('')}
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
      document.querySelectorAll('#docs-table tbody tr').forEach(row => {
        row.style.display = (f === 'all' || row.dataset.status === f) ? '' : 'none';
      });
    });
  });

  window.approveDoc = () => showToast('✓ Documento aprobado', 'var(--green-txt)');
}

function showToast(msg, color) {
  const e = document.getElementById('duna-toast');
  if (e) e.remove();
  const t = document.createElement('div');
  t.id = 'duna-toast';
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;font-size:12px;font-weight:500;color:${color};box-shadow:var(--shadow)`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
