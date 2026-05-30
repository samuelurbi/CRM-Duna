/* ═══════════════════════════════════════════════
   Vista: Expediente Detail
   Página interna con tabs — se accede via
   window.location.hash = 'expediente/1'
═══════════════════════════════════════════════ */

import { getRouteParam } from '../router.js';

export const meta = { title: 'Expediente', breadcrumb: 'Gestión · Expedientes · Detalle' };

const STEPS = ['—', 'Reserva', 'KYC', 'Promesa', 'Plan de Pago', 'Doc. Pago', 'Contrato'];

export function render(data) {
  const id     = parseInt(getRouteParam()) || 1;
  const client = data.clients.find(c => c.id === id) || data.clients[0];
  const docs   = data.documents.filter(d => d.client === `${client.firstName} ${client.lastName}`);
  const txs    = data.transactions.filter(t => t.client === `${client.firstName} ${client.lastName}`);
  const contract = data.contracts.find(c => c.client === `${client.firstName} ${client.lastName}`);

  const statusMap = {
    kyc_pending:        { label: 'KYC Pendiente',    cls: 'orange' },
    signature_required: { label: 'Firma requerida',  cls: 'red'    },
    in_review:          { label: 'En revisión',       cls: 'blue'   },
    completed:          { label: 'Al día',            cls: 'green'  },
    payment_overdue:    { label: 'Pago vencido',      cls: 'red'    },
  };
  const st = statusMap[client.status] || { label: client.status, cls: 'gray' };

  return `
<div class="view-container">

  <!-- Back -->
  <div style="margin-bottom:16px">
    <span class="cell-link" onclick="window.location.hash='expedientes'" style="font-size:12px;display:inline-flex;align-items:center;gap:4px">
      ← Volver a Expedientes
    </span>
  </div>

  <!-- Header del cliente -->
  <div class="panel" style="margin-bottom:16px;overflow:hidden">
    <div style="background:var(--bg-card2);padding:22px 24px;display:flex;align-items:center;gap:18px;border-bottom:1px solid var(--border)">
      <div style="width:52px;height:52px;border-radius:50%;background:${avatarColor(client.id)};display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#fff;flex-shrink:0">
        ${client.initials}
      </div>
      <div style="flex:1">
        <div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500;color:var(--cream)">
          ${client.firstName} ${client.lastName}
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:4px;flex-wrap:wrap">
          <span style="font-size:12px;color:var(--sub)">${client.country}</span>
          <span style="color:var(--border)">·</span>
          <span style="font-size:12px;color:var(--sub)">${client.email}</span>
          <span style="color:var(--border)">·</span>
          <span style="font-size:12px;color:var(--sub)">${client.phone}</span>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <span class="badge badge-${st.cls}" style="font-size:12px">${st.label}</span>
        <div style="font-size:11px;color:var(--muted);margin-top:6px">Asesor: ${client.agent}</div>
      </div>
    </div>

    <!-- Quick stats -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0">
      ${[
        { label: 'Unidad',       val: client.unit,                               },
        { label: 'Proyecto',     val: client.project,                            },
        { label: 'Precio total', val: client.price,       color: 'var(--cream)'  },
        { label: 'Pagado',       val: `${client.paid} (${client.paidPct}%)`, color: 'var(--green-txt)' },
      ].map(s => `
        <div style="padding:14px 20px;border-right:1px solid var(--border)">
          <div style="font-size:10px;color:var(--sub);margin-bottom:4px;text-transform:uppercase;letter-spacing:.04em">${s.label}</div>
          <div style="font-size:13px;font-weight:500;color:${s.color || 'var(--cream-dim)'};">${s.val}</div>
        </div>
      `).join('')}
    </div>

    <!-- Pipeline steps -->
    <div style="padding:16px 24px;display:flex;align-items:center;gap:0">
      ${STEPS.slice(1).map((step, i) => {
        const n = i + 1;
        const done    = n < client.step;
        const current = n === client.step;
        return `
        <div style="display:flex;align-items:center;flex:1">
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;min-width:60px">
            <div style="width:28px;height:28px;border-radius:50%;
              background:${done ? 'var(--green)' : current ? 'var(--orange)' : 'var(--bg-surface)'};
              border:1px solid ${done ? 'var(--green)' : current ? 'var(--orange)' : 'var(--border)'};
              display:flex;align-items:center;justify-content:center;
              font-size:11px;font-weight:600;
              color:${done ? '#fff' : current ? '#fff' : 'var(--muted)'}">
              ${done ? '✓' : n}
            </div>
            <span style="font-size:9px;color:${current ? 'var(--orange)' : done ? 'var(--green-txt)' : 'var(--muted)'};white-space:nowrap;font-weight:${current ? '600' : '400'}">${step}</span>
          </div>
          ${i < 5 ? `<div style="flex:1;height:1px;background:${done ? 'var(--green)' : 'var(--border)'};margin:0 2px;margin-bottom:18px"></div>` : ''}
        </div>`;
      }).join('')}
    </div>
  </div>

  <!-- Tabs -->
  <div style="display:flex;gap:0;border-bottom:1px solid var(--border);margin-bottom:16px" id="exp-tabs">
    ${['Resumen', 'Documentos', 'Plan de Pagos', 'Historial', 'Comunicaciones'].map((tab, i) => `
      <div class="exp-tab ${i === 0 ? 'active' : ''}" data-tab="${i}"
        style="padding:10px 20px;font-size:12px;font-weight:500;cursor:pointer;
               color:${i === 0 ? 'var(--cream-dim)' : 'var(--sub)'};
               border-bottom:2px solid ${i === 0 ? 'var(--green-txt)' : 'transparent'};
               white-space:nowrap">
        ${tab}
      </div>
    `).join('')}
  </div>

  <!-- Tab panels -->
  <div id="tab-0">${renderResumen(client, contract)}</div>
  <div id="tab-1" style="display:none">${renderDocumentos(docs)}</div>
  <div id="tab-2" style="display:none">${renderPlanPagos(client, txs)}</div>
  <div id="tab-3" style="display:none">${renderHistorial(client)}</div>
  <div id="tab-4" style="display:none">${renderComunicaciones(client)}</div>

</div>`;
}

/* ── Tab: Resumen ─────────────────────────────── */
function renderResumen(client, contract) {
  return `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

    <div class="panel">
      <div class="panel-header"><span class="panel-title">Datos de contacto</span></div>
      <div style="padding:16px 20px;display:flex;flex-direction:column;gap:10px">
        ${[
          ['Nombre completo', `${client.firstName} ${client.lastName}`],
          ['Email',           client.email],
          ['Teléfono',        client.phone],
          ['País / Origen',   client.country],
          ['Fecha de registro', client.createdAt],
          ['Última actividad',  client.lastAction],
        ].map(([k,v]) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--border2);font-size:12px">
            <span style="color:var(--sub)">${k}</span>
            <span style="color:var(--cream-dim);font-weight:500">${v}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><span class="panel-title">Contrato activo</span></div>
      <div style="padding:16px 20px">
        ${contract ? `
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              ['Tipo',        `<span class="badge badge-${contract.typeCls}">${contract.type}</span>`],
              ['Unidad',      contract.unit],
              ['Total',       contract.total],
              ['Pagado',      contract.paid],
              ['Estado',      `<span class="badge badge-${contract.statusCls}">${contract.statusLabel}</span>`],
              ['Firma',       contract.signed || '—'],
            ].map(([k,v]) => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--border2);font-size:12px">
                <span style="color:var(--sub)">${k}</span>
                <span style="color:var(--cream-dim)">${v}</span>
              </div>
            `).join('')}
          </div>
          <div style="display:flex;gap:8px;margin-top:16px">
            <button class="btn btn-ghost btn-sm">Ver contrato</button>
            ${contract.status === 'pending_signature' ? '<button class="btn btn-primary btn-sm">Enviar a firma</button>' : ''}
          </div>
        ` : '<div class="empty-state"><div class="empty-icon">📝</div><p>Sin contrato activo</p></div>'}
      </div>
    </div>

    <div class="panel" style="grid-column:1/-1">
      <div class="panel-header">
        <span class="panel-title">Notas internas</span>
        <button class="btn btn-ghost btn-sm">+ Añadir nota</button>
      </div>
      <div style="padding:16px 20px">
        <div style="background:var(--bg-surface);border-radius:8px;padding:14px;font-size:12px;color:var(--sub);line-height:1.6">
          Sin notas aún. Las notas internas son visibles solo para el equipo admin.
        </div>
      </div>
    </div>
  </div>`;
}

/* ── Tab: Documentos ────────────────────────────── */
function renderDocumentos(docs) {
  const typeIcon = { KYC: '🪪', Contrato: '📝', Promesa: '📋', Reserva: '🔖', 'Plan de Pagos': '📊', Identificación: '🪪' };
  if (!docs.length) return `<div class="panel"><div class="empty-state"><div class="empty-icon">📄</div><p>No hay documentos para este cliente</p></div></div>`;
  return `
  <div class="panel">
    <div class="panel-header">
      <span class="panel-title">Documentos del expediente</span>
      <button class="btn btn-primary btn-sm">+ Subir documento</button>
    </div>
    <table class="data-table">
      <thead><tr><th>Documento</th><th>Tipo</th><th>Estado</th><th>Fecha límite</th><th>Tamaño</th><th></th></tr></thead>
      <tbody>
        ${docs.map(d => `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:16px">${typeIcon[d.type]||'📄'}</span>
                <div>
                  <div class="cell-name">${d.name}</div>
                  <div class="cell-sub">Subido ${d.uploaded}</div>
                </div>
              </div>
            </td>
            <td><span style="font-size:11px;color:var(--sub);background:var(--bg-surface);border-radius:4px;padding:2px 8px">${d.type}</span></td>
            <td><span class="badge badge-${d.statusCls}">${d.statusLabel}</span></td>
            <td><span style="font-size:11px;color:${d.status==='expired'?'var(--red)':'var(--sub)'}">${d.deadline||'—'}</span></td>
            <td><span style="font-size:11px;color:var(--muted)">${d.size}</span></td>
            <td>
              <div style="display:flex;gap:8px">
                <span class="cell-link" onclick="openDocModal(${d.id})">Ver</span>
                ${d.status==='pending'   ? `<span class="cell-link" style="color:var(--green-txt)">Aprobar</span>` : ''}
                ${d.status==='signature' ? `<span class="cell-link" style="color:var(--orange)">Firmar</span>`   : ''}
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>`;
}

/* ── Tab: Plan de Pagos ─────────────────────────── */
function renderPlanPagos(client, txs) {
  const plan = buildSchedule(client, txs);
  window._expPlan   = plan;
  window._expClient = client;
  window._expTxs    = txs;
  return planHTML(plan, client, txs);
}

function buildSchedule(client, txs) {
  const total   = parseFloat(client.price.replace(/[$,]/g, ''));
  const reserva = Math.round(total * 0.05);
  const constr  = Math.round(total * 0.15);
  const entrega = total - reserva - constr;
  const monthly = Math.round(constr / 24);

  const paidTotal = txs
    .filter(t => t.status === 'confirmed')
    .reduce((s, t) => s + parseFloat(t.amount.replace(/[$,]/g, '')), 0);

  const rows = [];
  let balance = paidTotal;

  // Reserva
  const resPaid = Math.min(balance, reserva);
  balance -= resPaid;
  rows.push({ id: 'reserva', label: 'Reserva (5%)', scheduled: reserva, paid: resPaid,
    status: resPaid >= reserva ? 'paid' : 'overdue', date: client.createdAt, concept: 'Pago inicial de reserva' });

  // Monthly construction (24 installments)
  let nextFound = false;
  const [sy, sm, sd] = client.createdAt.split('-').map(Number);
  for (let i = 1; i <= 24; i++) {
    let nm = sm + i, ny = sy + Math.floor((nm - 1) / 12);
    nm = ((nm - 1) % 12) + 1;
    const MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const dueDate = `${sd} ${MONTHS[nm-1]} ${ny}`;

    let paidAmt = 0, status;
    if (balance >= monthly) {
      paidAmt = monthly; balance -= monthly; status = 'paid';
    } else if (!nextFound) {
      paidAmt = balance; balance = 0; status = 'next'; nextFound = true;
    } else {
      status = 'pending';
    }
    rows.push({ id: `m${i}`, label: `Cuota ${i}/24`, scheduled: monthly, paid: paidAmt,
      status, date: dueDate, concept: `Construcción — cuota ${i} de 24` });
  }

  // Entrega
  rows.push({ id: 'entrega', label: 'Pago de entrega (80%)', scheduled: entrega, paid: 0,
    status: 'future', date: 'Q4 2026 (entrega)', concept: 'Balance final contra entrega de llaves' });

  const totalPaid      = rows.reduce((s, r) => s + r.paid, 0);
  const totalRemaining = total - totalPaid;
  const paidPct        = Math.round((totalPaid / total) * 100);
  const nextRow        = rows.find(r => r.status === 'next');
  const overdueRows    = rows.filter(r => r.status === 'overdue');

  return { rows, total, reserva, constr, entrega, monthly, totalPaid, totalRemaining, paidPct, nextRow, overdueRows };
}

function planHTML(plan, client, txs) {
  const fmt = n => '$' + Math.round(n).toLocaleString('en-US');

  const statusDot = {
    paid:    `<div style="width:8px;height:8px;border-radius:50%;background:var(--green-txt)"></div>`,
    next:    `<div style="width:8px;height:8px;border-radius:50%;background:var(--orange);box-shadow:0 0 0 3px rgba(201,124,64,.2)"></div>`,
    pending: `<div style="width:8px;height:8px;border-radius:50%;border:1px solid var(--border)"></div>`,
    overdue: `<div style="width:8px;height:8px;border-radius:50%;background:var(--red)"></div>`,
    future:  `<div style="width:8px;height:8px;border-radius:50%;border:1px dashed var(--muted)"></div>`,
  };

  // Collapse pending rows 3+ into a summary
  const visibleRows = [];
  let pendingCollapsed = 0;
  let pendingTotal = 0;
  let firstPendingIdx = -1;

  plan.rows.forEach((r, i) => {
    if (r.status === 'pending' && pendingCollapsed >= 2) {
      pendingCollapsed++;
      pendingTotal += r.scheduled;
    } else if (r.status === 'pending') {
      if (firstPendingIdx === -1) firstPendingIdx = visibleRows.length;
      visibleRows.push(r);
      pendingCollapsed++;
      pendingTotal += r.scheduled;
    } else {
      visibleRows.push(r);
    }
  });

  return `
  <div id="plan-pagos-container">

    <!-- KPI Cards -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px">
      ${[
        { label: 'Precio total',    val: fmt(plan.total),         color: 'var(--cream-dim)' },
        { label: 'Total pagado',    val: fmt(plan.totalPaid),     color: 'var(--green-txt)' },
        { label: 'Balance pendiente', val: fmt(plan.totalRemaining), color: plan.paidPct < 20 ? 'var(--orange)' : 'var(--cream-dim)' },
        { label: 'Próxima cuota',   val: plan.nextRow ? fmt(plan.nextRow.scheduled) : '—', color: 'var(--orange)' },
      ].map(s => `
        <div class="panel" style="padding:14px 16px">
          <div style="font-size:10px;color:var(--sub);margin-bottom:4px">${s.label}</div>
          <div style="font-size:18px;font-weight:600;color:${s.color};font-family:'Inter',sans-serif">${s.val}</div>
        </div>
      `).join('')}
    </div>

    <!-- Progress bar con hitos -->
    <div class="panel" style="padding:16px 20px;margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-size:12px;font-weight:600;color:var(--cream-dim)">Progreso del plan de pagos</span>
        <span style="font-size:13px;font-weight:700;color:var(--green-txt)">${plan.paidPct}%</span>
      </div>
      <div style="background:var(--bg-surface);border-radius:6px;height:10px;overflow:hidden;margin-bottom:8px;position:relative">
        <!-- Hito reserva (5%) -->
        <div style="position:absolute;top:0;left:5%;height:100%;width:1px;background:var(--border);z-index:1"></div>
        <!-- Hito fin construcción (20%) -->
        <div style="position:absolute;top:0;left:20%;height:100%;width:1px;background:var(--border);z-index:1"></div>
        <div id="plan-progress-bar" style="height:100%;width:${plan.paidPct}%;background:var(--green-txt);border-radius:6px;transition:width .4s"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted)">
        <span>0%</span>
        <span>5% Reserva</span>
        <span>20% Fin construcción</span>
        <span>100% Entrega</span>
      </div>
    </div>

    ${plan.overdueRows.length ? `
    <div style="padding:10px 14px;background:rgba(184,64,64,.08);border:1px solid rgba(184,64,64,.2);border-radius:8px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
      <span style="font-size:14px">⚠</span>
      <div style="font-size:12px;color:var(--red);font-weight:500">${plan.overdueRows.length} cuota${plan.overdueRows.length>1?'s':''} vencida${plan.overdueRows.length>1?'s':''} — Total: ${fmt(plan.overdueRows.reduce((s,r)=>s+r.scheduled-r.paid,0))}</div>
    </div>` : ''}

    <!-- Calendario de pagos -->
    <div class="panel" style="margin-bottom:16px">
      <div class="panel-header" style="height:44px">
        <span class="panel-title">Calendario de pagos</span>
        <div style="display:flex;gap:8px;align-items:center">
          <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--sub)">
            <div style="width:6px;height:6px;border-radius:50%;background:var(--green-txt)"></div> Pagado
            <div style="width:6px;height:6px;border-radius:50%;background:var(--orange);margin-left:6px"></div> Próximo
            <div style="width:6px;height:6px;border-radius:50%;background:var(--red);margin-left:6px"></div> Vencido
          </div>
          <button class="btn btn-primary btn-sm" onclick="openRegPagoModal()">+ Registrar pago</button>
        </div>
      </div>
      <table class="data-table" id="plan-table">
        <thead>
          <tr>
            <th style="width:30px"></th>
            <th>Concepto</th>
            <th>Fecha</th>
            <th>Monto programado</th>
            <th>Pagado</th>
            <th>Saldo</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="plan-tbody">
          ${visibleRows.map(r => planRow(r, fmt, statusDot)).join('')}
          ${pendingCollapsed > 2 ? `
          <tr style="background:rgba(255,255,255,.02)">
            <td colspan="8" style="padding:10px 16px;text-align:center">
              <span style="font-size:11px;color:var(--muted)">+ ${pendingCollapsed - 2} cuotas pendientes restantes · Total: ${fmt(pendingTotal - plan.rows.filter((r,i) => r.status==='pending').slice(0,2).reduce((s,r)=>s+r.scheduled,0))}</span>
              <span class="cell-link" style="margin-left:8px;font-size:11px" onclick="expandPlan()">Ver todo →</span>
            </td>
          </tr>` : ''}
        </tbody>
      </table>
    </div>

    <!-- Historial de transacciones confirmadas -->
    <div class="panel">
      <div class="panel-header" style="height:42px">
        <span class="panel-title">Pagos confirmados</span>
        <span style="font-size:11px;color:var(--sub)">${txs.filter(t=>t.status==='confirmed').length} transacciones</span>
      </div>
      ${txs.filter(t=>t.status==='confirmed').length ? `
        <table class="data-table">
          <thead><tr><th>Concepto</th><th>Monto</th><th>Fecha</th><th>Método</th><th>Comprobante</th></tr></thead>
          <tbody>
            ${txs.filter(t=>t.status==='confirmed').map(t => `
              <tr>
                <td style="font-size:12px;color:var(--cream-dim)">${t.concept}</td>
                <td class="cell-price">${t.amount}</td>
                <td style="font-size:11px;color:var(--sub)">${t.date}</td>
                <td style="font-size:11px;color:var(--muted)">${t.method}</td>
                <td>
                  ${t.comprobante
                    ? `<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;color:var(--blue);cursor:pointer" onclick="showToast('📎 ${t.comprobante}','var(--blue)')">
                        📎 <span style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.comprobante}</span>
                      </span>`
                    : `<span style="font-size:11px;color:var(--muted)">—</span>`}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : `<div class="empty-state"><div class="empty-icon">💳</div><p>Sin pagos registrados</p></div>`}
    </div>

    <!-- Link to full financial module -->
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px">
      <div style="display:flex;align-items:center;gap:10px">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke="var(--green-txt)" stroke-width="1.4"/><rect x="9" y="1" width="6" height="6" rx="1" stroke="var(--green-txt)" stroke-width="1.4"/><rect x="1" y="9" width="6" height="6" rx="1" stroke="var(--green-txt)" stroke-width="1.4"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="var(--sub)" stroke-width="1.4" stroke-dasharray="2 1.5"/></svg>
        <div>
          <div style="font-size:12px;font-weight:500;color:var(--cream-dim)">Módulo financiero completo</div>
          <div style="font-size:11px;color:var(--sub)">Plan de pagos · Titulares · Pack bienvenida · Resumen global</div>
        </div>
      </div>
      <a href="#modulo-financiero" style="font-size:11px;color:var(--green-txt);text-decoration:none;white-space:nowrap;display:flex;align-items:center;gap:4px">Ver módulo financiero →</a>
    </div>

  </div>`;
}

function planRow(r, fmt, statusDot) {
  const balance  = r.scheduled - r.paid;
  const isFuture = r.status === 'future';
  const isNext   = r.status === 'next';
  const isPaid   = r.status === 'paid';
  const rowStyle = isNext ? 'background:rgba(201,124,64,.05)' : '';

  const statusLabel = { paid: '<span class="badge badge-green">Pagado ✓</span>', next: '<span class="badge badge-orange">Próximo</span>',
    pending: '<span style="font-size:11px;color:var(--muted)">Pendiente</span>', overdue: '<span class="badge badge-red">Vencido</span>',
    future: '<span style="font-size:11px;color:var(--muted)">Futuro</span>' };

  return `
  <tr data-plan-id="${r.id}" data-status="${r.status}" style="${rowStyle}">
    <td style="padding-left:16px">${statusDot[r.status]}</td>
    <td>
      <div style="font-size:12px;font-weight:${isNext?'600':'400'};color:${isNext?'var(--cream-dim)':isPaid?'var(--sub)':'var(--cream-dim)'}">${r.label}</div>
      <div style="font-size:10px;color:var(--muted)">${r.concept}</div>
    </td>
    <td style="font-size:11px;color:${isNext?'var(--orange)':'var(--sub)'}">${r.date}</td>
    <td style="font-size:12px;color:var(--cream-dim);font-family:'Inter',sans-serif">${isFuture ? '<span style="color:var(--muted)">'+fmt(r.scheduled)+'</span>' : fmt(r.scheduled)}</td>
    <td style="font-size:12px;font-weight:600;color:var(--green-txt);font-family:'Inter',sans-serif">${r.paid > 0 ? fmt(r.paid) : '<span style="color:var(--muted)">—</span>'}</td>
    <td style="font-size:12px;color:${balance>0&&!isFuture?'var(--orange)':'var(--muted)'};font-family:'Inter',sans-serif">${isFuture ? '<span style="color:var(--muted)">'+fmt(balance)+'</span>' : balance > 0 ? fmt(balance) : '<span style="color:var(--green-txt)">✓</span>'}</td>
    <td>${statusLabel[r.status] || ''}</td>
    <td>${isNext ? `<button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="openRegPagoModal()">Pagar</button>` : ''}</td>
  </tr>`;
}

/* ── Tab: Historial ─────────────────────────────── */
function renderHistorial(client) {
  const events = [
    { dot: 'green',  text: `Expediente creado — Reserva Unidad ${client.unit.split(' ')[1]}`,  time: client.createdAt },
    { dot: 'orange', text: 'KYC solicitado al cliente',                                          time: 'hace 45 días' },
    { dot: 'blue',   text: `Documentos KYC recibidos — ${client.firstName}`,                    time: 'hace 30 días' },
    { dot: 'orange', text: 'Promesa de compraventa generada',                                     time: 'hace 20 días' },
    { dot: 'green',  text: `Pago inicial confirmado — ${client.paid}`,                           time: 'hace 15 días' },
    { dot: 'gray',   text: `Última actividad: ${client.lastAction}`,                             time: client.lastAction },
  ];
  return `
  <div class="panel">
    <div class="panel-header"><span class="panel-title">Historial de actividad</span></div>
    <div style="padding:16px 20px">
      <div class="activity-list">
        ${events.map((e, i) => `
          <div class="act-item">
            <div class="act-dot-col">
              <div class="act-dot" style="background:${dotColor(e.dot)}"></div>
              ${i < events.length-1 ? '<div class="act-line"></div>' : ''}
            </div>
            <div class="act-info">
              <div class="act-text">${e.text}</div>
              <div class="act-time">${e.time}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}

/* ── Tab: Comunicaciones ───────────────────────── */
function renderComunicaciones(client) {
  const THREADS = {
    1: [
      { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: '¡Buenos días Carlos! Tu reserva ha sido procesada. El siguiente paso es completar el KYC.', time: '09:15', date: 'Ayer' },
      { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: 'Hola Ana, entendido. ¿Qué documentos necesito presentar?', time: '10:03', date: 'Ayer' },
      { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: 'Necesitas: 1. Pasaporte vigente. 2. Comprobante de ingresos. 3. Referencias bancarias. Te envié el checklist al correo.', time: '10:30', date: 'Ayer' },
      { from: 'system', text: '📎 Checklist KYC enviado por correo' },
      { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: '¿Cuánto tiempo tengo para enviar los documentos?', time: '14:22', date: 'Hoy', unread: true },
      { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: 'Hola Ana, sigo esperando respuesta.', time: '15:41', date: 'Hoy', unread: true },
    ],
    2: [
      { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'Hola Ana, la promesa de compraventa está lista para tu revisión.', time: '08:45', date: 'Ayer' },
      { from: 'client', sender: 'Ana García', initials: 'AG', color: '#b84040', text: '¿Puedo revisarla con mi abogado antes de firmar?', time: '11:20', date: 'Ayer' },
      { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'Por supuesto, tienes hasta el jueves.', time: '11:45', date: 'Ayer' },
      { from: 'client', sender: 'Ana García', initials: 'AG', color: '#b84040', text: '¿Me pueden confirmar el precio final con los ajustes?', time: '09:11', date: 'Hoy', unread: true },
    ],
    5: [
      { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: 'Roberto, tu cuota de mayo vence este viernes. ¿Necesitas más información?', time: '08:00', date: 'hace 5 días' },
      { from: 'client', sender: 'Roberto Silva', initials: 'RS', color: '#8a5c2a', text: 'Estoy organizando el pago. ¿Pueden darme hasta el lunes?', time: '14:30', date: 'hace 5 días' },
      { from: 'system', text: '⚠ Cuota vencida — sin confirmación de pago' },
      { from: 'client', sender: 'Roberto Silva', initials: 'RS', color: '#8a5c2a', text: '¿Me pueden confirmar el monto exacto con intereses?', time: '09:15', date: 'Hoy', unread: true },
    ],
  };

  const defaultThread = [
    { from: 'system', text: `Conversación con ${client.firstName} ${client.lastName} iniciada` },
    { from: 'agent', sender: client.agent, initials: client.agent.split(' ').map(w=>w[0]).join(''), color: '#4A5E3F', text: `Hola ${client.firstName}, soy ${client.agent}, tu asesor en Duna. Estoy aquí para acompañarte en todo el proceso.`, time: '10:00', date: 'hace 1 semana' },
  ];

  const msgs = THREADS[client.id] || defaultThread;
  let lastDate = null;

  const bubbles = msgs.map(m => {
    if (m.from === 'system') return `<div class="chat-system-msg" style="margin:8px 0">${m.text}</div>`;
    let dateLine = '';
    if (m.date && m.date !== lastDate) { lastDate = m.date; dateLine = `<div class="chat-date-label">${m.date}</div>`; }
    const isOut = m.from === 'agent';
    return `${dateLine}
    <div class="chat-msg-row${isOut?' out':''}">
      <div style="width:26px;height:26px;border-radius:50%;background:${m.color};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:#fff;flex-shrink:0">${m.initials}</div>
      <div>
        <div style="font-size:9px;color:var(--muted);margin-bottom:3px;${isOut?'text-align:right':''}">${m.sender} &nbsp;${m.time||''}</div>
        <div class="chat-bubble ${isOut?'out':'in'}">${m.text}</div>
      </div>
    </div>`;
  }).join('');

  const unread = msgs.filter(m => m.unread).length;

  return `
  <div style="display:grid;grid-template-columns:1fr 340px;gap:16px;height:520px">

    <!-- Chat thread -->
    <div class="panel" style="display:flex;flex-direction:column;overflow:hidden">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;flex-shrink:0">
        <div style="width:32px;height:32px;border-radius:50%;background:${avatarColor(client.id)};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff">${client.initials}</div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:var(--cream)">${client.firstName} ${client.lastName}</div>
          <div style="font-size:10px;color:var(--muted)">Asesor: ${client.agent} ${unread>0?`· <span style="color:var(--orange);font-weight:600">${unread} sin leer</span>`:''}</div>
        </div>
        <button class="btn btn-primary btn-sm" style="font-size:10px" onclick="window.location.hash='mensajes'">Ver en Mensajes →</button>
      </div>
      <div class="chat-messages" id="exp-chat-msgs" style="flex:1;overflow-y:auto;padding:16px 18px">
        ${bubbles}
      </div>
      <div style="padding:6px 14px 0;border-top:1px solid var(--border);display:flex;gap:4px;flex-wrap:wrap;flex-shrink:0">
        <span style="font-size:9px;color:var(--muted);align-self:center">Rápidos:</span>
        ${['Cuota próxima','Docs pendientes','Actualización obra'].map(t=>`
          <button class="chat-filter-pill" style="font-size:9px;padding:2px 7px" onclick="document.getElementById('exp-chat-input').value='${t} — ';document.getElementById('exp-chat-input').focus()">${t}</button>
        `).join('')}
      </div>
      <div class="chat-input-bar">
        <textarea id="exp-chat-input" class="chat-input" placeholder="Escribe un mensaje…" rows="1"></textarea>
        <button id="exp-chat-send" class="btn btn-primary btn-sm" style="padding:8px 12px">Enviar</button>
      </div>
    </div>

    <!-- Sidebar: info + email -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="panel">
        <div class="panel-header"><span class="panel-title">Enviar por canal</span></div>
        <div style="padding:14px 16px">
          <div style="display:flex;gap:6px;margin-bottom:14px">
            <button class="btn btn-ghost btn-sm" style="flex:1;font-size:11px" onclick="showToast('Abriendo correo…','var(--blue)')">✉ Email</button>
            <button class="btn btn-ghost btn-sm" style="flex:1;font-size:11px" onclick="showToast('Abriendo WhatsApp…','var(--green-txt)')">💬 WhatsApp</button>
          </div>
          <div class="field-group">
            <label class="field-label">Plantilla rápida</label>
            <select class="field-select" id="exp-template-select">
              <option value="">Seleccionar plantilla…</option>
              <option>Bienvenida — Reserva confirmada</option>
              <option>KYC — Documentos pendientes</option>
              <option>Recordatorio de cuota</option>
              <option>Promesa de compraventa lista</option>
              <option>Avance de obra actualizado</option>
            </select>
          </div>
          <button class="btn btn-primary btn-sm" style="width:100%;font-size:11px" onclick="showToast('✓ Mensaje enviado a ${client.email}','var(--green-txt)')">Enviar por correo →</button>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><span class="panel-title">Actividad reciente</span></div>
        <div style="padding:12px 16px">
          ${[
            { icon: '📎', text: 'Checklist KYC enviado', time: 'hace 1 día' },
            { icon: '💬', text: `Mensaje de ${client.firstName}`, time: 'hace 3h', highlight: true },
            { icon: '✉', text: 'Recordatorio cuota enviado', time: 'hace 5 días' },
          ].map(a=>`
            <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:10px">
              <span style="font-size:13px;flex-shrink:0">${a.icon}</span>
              <div>
                <div style="font-size:11px;color:${a.highlight?'var(--blue)':'var(--cream-dim)'}">${a.text}</div>
                <div style="font-size:9px;color:var(--muted)">${a.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

  </div>`;
}

/* ── Helpers ─────────────────────────────────────── */
function avatarColor(id) {
  const c = ['#4A5E3F','#3a7abd','#c97c40','#b84040','#6b5b8a','#2a7a6a','#8a5c2a'];
  return c[id % c.length];
}
function dotColor(c) {
  return { green:'var(--green-txt)', orange:'var(--orange)', red:'var(--red)', blue:'var(--blue)', gray:'var(--muted)' }[c] || 'var(--muted)';
}

/* ── Init ────────────────────────────────────────── */
export function init(data) {
  // Tab switching
  document.querySelectorAll('.exp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = tab.dataset.tab;
      document.querySelectorAll('.exp-tab').forEach(t => {
        t.classList.remove('active');
        t.style.color       = 'var(--sub)';
        t.style.borderBottom = '2px solid transparent';
      });
      tab.classList.add('active');
      tab.style.color        = 'var(--cream-dim)';
      tab.style.borderBottom = '2px solid var(--green-txt)';
      for (let i = 0; i < 5; i++) {
        const panel = document.getElementById(`tab-${i}`);
        if (panel) panel.style.display = i === parseInt(idx) ? '' : 'none';
      }
    });
  });

  // Chat en tab Comunicaciones
  setTimeout(() => {
    const chatMsgs = document.getElementById('exp-chat-msgs');
    if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
    const sendBtn = document.getElementById('exp-chat-send');
    const chatInput = document.getElementById('exp-chat-input');
    if (sendBtn && chatInput) {
      const doSend = () => {
        if (!chatInput.value.trim()) return;
        const text = chatInput.value.trim();
        chatInput.value = '';
        const row = document.createElement('div');
        row.className = 'chat-msg-row out';
        row.innerHTML = `
          <div style="width:26px;height:26px;border-radius:50%;background:#4A5E3F;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:#fff;flex-shrink:0">AR</div>
          <div>
            <div style="font-size:9px;color:var(--muted);margin-bottom:3px;text-align:right">Ana Rodríguez &nbsp;${new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'})}</div>
            <div class="chat-bubble out">${text}</div>
          </div>`;
        if (chatMsgs) { chatMsgs.appendChild(row); chatMsgs.scrollTop = chatMsgs.scrollHeight; }
      };
      sendBtn.addEventListener('click', doSend);
      chatInput.addEventListener('keydown', e => { if (e.key==='Enter'&&!e.shiftKey) { e.preventDefault(); doSend(); } });
    }
  }, 100);

  // Plan de pagos — abrir modal
  window.openRegPagoModal = () => {
    window.openRegistrarPagoModal(window._expPlan, (amt, concept, method, comprobante) => {
      const today = new Date().toISOString().split('T')[0];
      window._expTxs = [...(window._expTxs || []), {
        status: 'confirmed', statusLabel: 'Confirmado', statusCls: 'green',
        concept, amount: '$' + Math.round(amt).toLocaleString('en-US'), date: today, method, comprobante,
      }];
      const newPlan   = buildSchedule(window._expClient, window._expTxs);
      window._expPlan = newPlan;
      const tab2 = document.getElementById('tab-2');
      if (tab2) tab2.innerHTML = planHTML(newPlan, window._expClient, window._expTxs);
    });
  };

  window.expandPlan = () => {
    const plan = window._expPlan;
    if (!plan) return;
    const fmt = n => '$' + Math.round(n).toLocaleString('en-US');
    const statusDot = {
      paid:    `<div style="width:8px;height:8px;border-radius:50%;background:var(--green-txt)"></div>`,
      next:    `<div style="width:8px;height:8px;border-radius:50%;background:var(--orange);box-shadow:0 0 0 3px rgba(201,124,64,.2)"></div>`,
      pending: `<div style="width:8px;height:8px;border-radius:50%;border:1px solid var(--border)"></div>`,
      overdue: `<div style="width:8px;height:8px;border-radius:50%;background:var(--red)"></div>`,
      future:  `<div style="width:8px;height:8px;border-radius:50%;border:1px dashed var(--muted)"></div>`,
    };
    const tbody = document.getElementById('plan-tbody');
    if (tbody) tbody.innerHTML = plan.rows.map(r => planRow(r, fmt, statusDot)).join('');
  };

}

