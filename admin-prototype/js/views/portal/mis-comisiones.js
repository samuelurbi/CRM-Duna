export const meta = { title: 'Mis Comisiones', breadcrumb: 'Portal Broker · Mis Comisiones' };

// Commission detail for José Rodríguez — 2% on confirmed transactions from his clients
const COMMISSIONS = [
  { id: 1, client: 'Carlos Méndez',  unit: 'U-111', concept: 'Cuota inicial — Reserva',    base: '$21,550',  pct: '2%', commission: '$431',    date: '2026-03-15', status: 'paid'    },
  { id: 2, client: 'Ana García',     unit: 'U-205', concept: 'Cuota inicial — Reserva',    base: '$19,450',  pct: '2%', commission: '$389',    date: '2026-03-22', status: 'paid'    },
  { id: 3, client: 'Luis Pérez',     unit: 'U-308', concept: 'Cuota 1/24 — Plan pagos',    base: '$17,291',  pct: '2%', commission: '$346',    date: '2026-04-10', status: 'paid'    },
  { id: 4, client: 'Luis Pérez',     unit: 'U-308', concept: 'Cuota 2/24 — Plan pagos',    base: '$17,291',  pct: '2%', commission: '$346',    date: '2026-05-10', status: 'pending' },
  { id: 5, client: 'María López',    unit: 'U-114', concept: 'Cuota 5/24 — Plan pagos',    base: '$17,958',  pct: '2%', commission: '$359',    date: '2026-04-28', status: 'paid'    },
  { id: 6, client: 'Roberto Silva',  unit: 'U-220', concept: 'Cuota 1/24 — Plan pagos',    base: '$16,458',  pct: '2%', commission: '$329',    date: '2026-04-01', status: 'overdue' },
  { id: 7, client: 'Sophie Martin',  unit: 'U-312', concept: 'Cuota inicial — Reserva',    base: '$89,000',  pct: '2%', commission: '$1,780',  date: '2026-04-12', status: 'paid'    },
  { id: 8, client: 'James Wilson',   unit: 'U-401', concept: 'Pago total — Contrato',      base: '$480,000', pct: '2%', commission: '$3,640',  date: '2025-12-01', status: 'paid'    },
];

export function render(data) {
  const broker = data.brokers.find(b => b.id === 1);

  const paid    = COMMISSIONS.filter(c => c.status === 'paid');
  const pending = COMMISSIONS.filter(c => c.status === 'pending');
  const overdue = COMMISSIONS.filter(c => c.status === 'overdue');

  const toAmt = str => parseFloat(str.replace(/[$,]/g, ''));
  const fmt   = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0 });

  const paidTotal = paid.reduce((s, c) => s + toAmt(c.commission), 0);
  const pendTotal = pending.reduce((s, c) => s + toAmt(c.commission), 0);
  const overdTotal= overdue.reduce((s, c) => s + toAmt(c.commission), 0);

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Mis Comisiones</h1>
    <span style="font-size:11px;color:var(--sub)">JR Real Estate · Tasa: 2%</span>
    <div class="view-actions">
      <button class="btn btn-ghost btn-sm" onclick="openExportModal('Comisiones')">🔒 Exportar</button>
    </div>
  </div>

  <!-- KPI cards -->
  <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">
    <div style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid var(--green-txt);border-radius:8px;padding:14px 20px;min-width:180px">
      <div style="font-size:11px;color:var(--sub);margin-bottom:4px">Comisiones pagadas</div>
      <div style="font-size:24px;font-weight:600;color:var(--green-txt);font-family:'Inter',sans-serif">${fmt(paidTotal)}</div>
      <div style="font-size:11px;color:var(--muted);margin-top:2px">${paid.length} liquidaciones</div>
    </div>
    <div style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid var(--orange);border-radius:8px;padding:14px 20px;min-width:180px">
      <div style="font-size:11px;color:var(--sub);margin-bottom:4px">Pendiente de cobro</div>
      <div style="font-size:24px;font-weight:600;color:var(--orange);font-family:'Inter',sans-serif">${fmt(pendTotal)}</div>
      <div style="font-size:11px;color:var(--muted);margin-top:2px">${pending.length} en proceso</div>
    </div>
    <div style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid var(--red);border-radius:8px;padding:14px 20px;min-width:180px">
      <div style="font-size:11px;color:var(--sub);margin-bottom:4px">Pago vencido</div>
      <div style="font-size:24px;font-weight:600;color:var(--red);font-family:'Inter',sans-serif">${fmt(overdTotal)}</div>
      <div style="font-size:11px;color:var(--muted);margin-top:2px">${overdue.length} en mora</div>
    </div>
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:14px 20px;min-width:180px">
      <div style="font-size:11px;color:var(--sub);margin-bottom:4px">Total acumulado</div>
      <div style="font-size:24px;font-weight:600;color:var(--cream-dim);font-family:'Inter',sans-serif">${broker.commission}</div>
      <div style="font-size:11px;color:var(--muted);margin-top:2px">${COMMISSIONS.length} transacciones</div>
    </div>
  </div>

  <!-- Filtros -->
  <div class="filter-bar">
    <span class="filter-pill active" data-filter="all">Todas <span class="count">${COMMISSIONS.length}</span></span>
    <span class="filter-pill" data-filter="paid">Pagadas <span class="count">${paid.length}</span></span>
    <span class="filter-pill" data-filter="pending">Pendientes <span class="count">${pending.length}</span></span>
    <span class="filter-pill" data-filter="overdue">Vencidas <span class="count">${overdue.length}</span></span>
  </div>

  <!-- Tabla -->
  <div class="panel">
    <table class="data-table" id="commissions-table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Unidad</th>
          <th>Concepto</th>
          <th>Base</th>
          <th>%</th>
          <th>Comisión</th>
          <th>Fecha</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        ${COMMISSIONS.map(c => {
          const stCls   = { paid: 'green', pending: 'orange', overdue: 'red' }[c.status];
          const stLabel = { paid: 'Pagada', pending: 'Pendiente', overdue: 'Vencida' }[c.status];
          return `
          <tr data-status="${c.status}">
            <td><div class="cell-name">${c.client}</div></td>
            <td><span style="font-size:11px;color:var(--sub)">${c.unit}</span></td>
            <td><span style="font-size:11px;color:var(--cream-dim)">${c.concept}</span></td>
            <td><span style="font-size:12px;color:var(--sub)">${c.base}</span></td>
            <td><span style="font-size:11px;color:var(--muted)">${c.pct}</span></td>
            <td><span class="cell-price" style="color:${stCls === 'green' ? 'var(--green-txt)' : stCls === 'red' ? 'var(--red)' : 'var(--orange)'}">${c.commission}</span></td>
            <td><span style="font-size:11px;color:var(--sub)">${c.date}</span></td>
            <td><span class="badge badge-${stCls}">${stLabel}</span></td>
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
      document.querySelectorAll('#commissions-table tbody tr').forEach(row => {
        row.style.display = (f === 'all' || row.dataset.status === f) ? '' : 'none';
      });
    });
  });
}
