export const meta = { title: 'Dashboard', breadcrumb: 'Portal Broker · Inicio' };

export function render(data) {
  // José Rodríguez — broker id:1
  const broker = data.brokers.find(b => b.id === 1);
  // His clients: those referred by him (first 5 clients in data match his 5 clients count)
  const myClients = data.clients.slice(0, 5);
  const myTxs     = data.transactions.filter(t =>
    myClients.some(c => `${c.firstName} ${c.lastName}` === t.client)
  );
  const confirmed = myTxs.filter(t => t.status === 'confirmed');
  const pending   = myTxs.filter(t => t.status === 'pending');
  const overdue   = myTxs.filter(t => t.status === 'overdue');

  const activity = [
    { dot: 'green',  text: 'Carlos Méndez completó el KYC',             time: 'hace 5 min'  },
    { dot: 'blue',   text: 'Plan de pagos aprobado para Luis Pérez',     time: 'hace 2h'     },
    { dot: 'orange', text: 'Sophie Martin — documentos en revisión',     time: 'hace 4h'     },
    { dot: 'red',    text: 'Pago vencido: Roberto Silva — cuota #2',     time: 'hace 1 día'  },
    { dot: 'green',  text: 'María López completó pago de cuota #5',      time: 'hace 2 días' },
  ];

  return `
<div class="view-container">

  <!-- Welcome banner -->
  <div style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid var(--green-txt);border-radius:8px;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
    <div>
      <div style="font-size:14px;font-weight:600;color:var(--cream-dim)">Bienvenido, José</div>
      <div style="font-size:12px;color:var(--sub);margin-top:2px">JR Real Estate · Agente colaborador de Duna Development Group</div>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <span class="badge badge-green">Contrato activo</span>
      <span style="font-size:10px;color:var(--muted)">Vence: ${broker.contractExpiry}</span>
    </div>
  </div>

  <!-- KPIs -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
    ${[
      { label: 'Mis clientes',       val: broker.clients,      color: 'var(--blue)',      icon: '📁' },
      { label: 'Comisión acumulada', val: broker.commission,   color: 'var(--green-txt)', icon: '💰' },
      { label: 'Pagos pendientes',   val: pending.length,      color: 'var(--orange)',    icon: '⏳' },
      { label: 'Pagos vencidos',     val: overdue.length,      color: 'var(--red)',       icon: '⚠' },
    ].map(k => `
      <div class="panel" style="padding:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div style="font-size:10px;color:var(--sub)">${k.label}</div>
          <span style="font-size:14px;opacity:.5">${k.icon}</span>
        </div>
        <div style="font-size:24px;font-weight:600;color:${k.color};font-family:'Inter',sans-serif">${k.val}</div>
      </div>
    `).join('')}
  </div>

  <!-- Main grid: clients snapshot + activity -->
  <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:16px">

    <!-- Mis clientes (resumen) -->
    <div class="panel">
      <div class="panel-header" style="height:42px">
        <span style="font-size:12px;font-weight:600;color:var(--cream-dim)">Mis Clientes</span>
        <button class="btn btn-ghost btn-sm" onclick="window.location.hash='mis-clientes-broker'">Ver todos →</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Unidad</th>
            <th>Estado</th>
            <th>Pagado</th>
          </tr>
        </thead>
        <tbody>
          ${myClients.slice(0, 5).map(c => `
            <tr>
              <td>
                <div class="cell-name">${c.firstName} ${c.lastName}</div>
                <div class="cell-sub">${c.country}</div>
              </td>
              <td><span style="font-size:11px;color:var(--sub)">${c.unit}</span></td>
              <td><span class="badge badge-${c.statusColor}">${c.statusLabel}</span></td>
              <td><span class="cell-price">${c.paid}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Actividad reciente -->
    <div class="panel">
      <div class="panel-header" style="height:42px">
        <span style="font-size:12px;font-weight:600;color:var(--cream-dim)">Actividad reciente</span>
      </div>
      <div style="padding:8px 0">
        ${activity.map(a => `
          <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 16px">
            <div class="dot dot-${a.dot}" style="margin-top:4px;flex-shrink:0"></div>
            <div style="flex:1">
              <div style="font-size:12px;color:var(--cream-dim)">${a.text}</div>
              <div style="font-size:10px;color:var(--muted);margin-top:2px">${a.time}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

  </div>

</div>`;
}

export function init() {}
