export const meta = { title: 'Mis Clientes', breadcrumb: 'Portal Broker · Mis Clientes' };

export function render(data) {
  // José Rodríguez — broker id:1, has 5 clients
  const myClients = data.clients.slice(0, 5);

  const steps = ['—', 'Reserva', 'KYC', 'Promesa', 'Plan Pago', 'Doc. Pago', 'Contrato'];

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Mis Clientes</h1>
    <span style="font-size:11px;color:var(--sub)">${myClients.length} clientes referidos</span>
  </div>

  <!-- Stats -->
  <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
    ${[
      { label: 'Activos',      val: myClients.filter(c => c.status === 'completed' || c.status === 'in_review').length, cls: 'var(--green-txt)' },
      { label: 'KYC pendiente',val: myClients.filter(c => c.status === 'kyc_pending').length,                            cls: 'var(--orange)' },
      { label: 'Pago vencido', val: myClients.filter(c => c.status === 'payment_overdue').length,                       cls: 'var(--red)' },
      { label: 'Completados',  val: myClients.filter(c => c.step === 6).length,                                         cls: 'var(--blue)' },
    ].map(s => `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;min-width:120px">
        <div style="font-size:20px;font-weight:600;color:${s.cls}">${s.val}</div>
        <div style="font-size:11px;color:var(--sub);margin-top:2px">${s.label}</div>
      </div>
    `).join('')}
  </div>

  <!-- Tabla -->
  <div class="panel">
    <table class="data-table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Unidad · Proyecto</th>
          <th>Paso</th>
          <th>Estado</th>
          <th>Precio</th>
          <th>Pagado</th>
          <th>Últ. actividad</th>
        </tr>
      </thead>
      <tbody>
        ${myClients.map(c => `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:28px;height:28px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0">${c.initials}</div>
                <div>
                  <div class="cell-name">${c.firstName} ${c.lastName}</div>
                  <div class="cell-sub">${c.country} · ${c.email}</div>
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
            <td><span class="badge badge-${c.statusColor}">${c.statusLabel}</span></td>
            <td><span class="cell-price">${c.price}</span></td>
            <td>
              <div class="cell-price" style="color:var(--green-txt)">${c.paid}</div>
              <div class="cell-sub">${c.paidPct}%</div>
            </td>
            <td><span style="font-size:11px;color:var(--muted)">${c.lastAction}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Info banner -->
  <div style="margin-top:16px;padding:12px 16px;border-radius:8px;background:var(--bg-card);border:1px solid var(--border);font-size:11px;color:var(--sub)">
    ⚠ Solo puedes ver los clientes que tú has referido a Duna. Para agregar un nuevo cliente, contacta a tu ejecutivo de cuenta.
  </div>

</div>`;
}

export function init() {}
