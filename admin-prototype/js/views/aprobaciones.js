export const meta = { title: 'Aprobaciones', breadcrumb: 'Equipo · Verificación documental y contractual' };

export function render(data) {
  const { approvals } = data;

  const counts = {
    all:     approvals.length,
    kyc:     approvals.filter(a => a.type === 'KYC').length,
    promesa: approvals.filter(a => a.type === 'Promesa').length,
    contrato:approvals.filter(a => a.type === 'Contrato').length,
    broker:  approvals.filter(a => a.clientType === 'broker').length,
  };

  const clientTypeCls = { cliente: 'blue', broker: 'orange' };

  const priorityLabel = { high: 'Alta', medium: 'Media', low: 'Baja' };
  const priorityColor = { high: 'var(--red)', medium: 'var(--orange)', low: 'var(--muted)' };

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Aprobaciones</h1>
    <span style="font-size:11px;color:var(--sub)">${approvals.length} pendientes de revisión</span>
    <div class="view-actions">
      <button class="btn btn-ghost btn-sm" onclick="openExportModal('Aprobaciones')">🔒 Exportar</button>
    </div>
  </div>

  <div style="background:var(--bg-card);border:1px solid var(--border);border-left:3px solid var(--blue);border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:12px;color:var(--sub);line-height:1.5">
    Cola de verificación documental y contractual — revisa cada elemento antes de aprobar o rechazar. Haz clic en <strong style="color:var(--cream-dim)">Revisar documento →</strong> para ver el contenido completo.
  </div>

  <div class="filter-bar">
    <span class="filter-pill active" data-type="all">Todos <span class="count">${counts.all}</span></span>
    <span class="filter-pill" data-type="KYC">KYC <span class="count">${counts.kyc}</span></span>
    <span class="filter-pill" data-type="Promesa">Promesas <span class="count">${counts.promesa}</span></span>
    <span class="filter-pill" data-type="Contrato">Contratos <span class="count">${counts.contrato}</span></span>
    <span class="filter-pill" data-type="broker">Brokers <span class="count">${counts.broker}</span></span>
  </div>

  <div class="panel" id="approvals-list">
    ${approvals.map(a => `
      <div class="approval-row" data-type="${a.type}" data-clienttype="${a.clientType}" data-id="${a.id}"
        style="padding:16px 20px;border-bottom:1px solid var(--border2);display:flex;align-items:flex-start;gap:14px">

        <!-- Priority indicator -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0;padding-top:2px">
          <div style="width:8px;height:8px;border-radius:50%;background:${priorityColor[a.priority]}"></div>
          <span style="font-size:8px;color:${priorityColor[a.priority]};letter-spacing:.04em;writing-mode:initial">${priorityLabel[a.priority]}</span>
        </div>

        <!-- Content -->
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:5px">
            <span style="font-size:13px;font-weight:500;color:var(--cream-dim)">${a.client}</span>
            <span class="badge badge-${clientTypeCls[a.clientType]}" style="font-size:10px">${a.clientType === 'broker' ? 'Broker' : 'Cliente'}</span>
            <span class="badge badge-${a.typeColor}" style="font-size:10px">${a.type}</span>
            ${a.unit ? `<span style="font-size:10px;color:var(--muted)">· ${a.unit}</span>` : ''}
          </div>
          <div style="font-size:12px;color:var(--sub);line-height:1.5;margin-bottom:6px">${a.description}</div>
          <div style="font-size:10px;color:var(--muted)">${a.date} · Solicitado por ${a.requestedBy}</div>
        </div>

        <!-- Actions -->
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:7px;flex-shrink:0">
          <button class="btn btn-primary btn-sm" style="font-size:11px;white-space:nowrap"
            onclick="openAprobacionModal(${a.id})">
            Revisar documento →
          </button>
          <div style="display:flex;gap:5px">
            <button class="btn-approve" style="font-size:10px;padding:3px 10px" onclick="handleApproval(${a.id},'approve')">✓ Rápido</button>
            <button class="btn-reject"  style="font-size:10px;padding:3px 10px" onclick="handleApproval(${a.id},'reject')">✗</button>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>`;
}

/* ── Modal builders ─────────────────────────── */
function buildModal(approval, data) {
  const client = data.clients?.find(c => `${c.firstName} ${c.lastName}` === approval.client);

  switch (approval.type) {
    case 'KYC':           return buildKYCModal(approval, client);
    case 'Promesa':       return buildPromesaModal(approval, client);
    case 'Contrato':      return buildContratoModal(approval, client);
    case 'Contrato Broker':
    case 'Renovación':    return buildBrokerModal(approval);
    default:              return buildGenericModal(approval, client);
  }
}

function docRow(icon, label, filename, status) {
  const colors = { ok: 'var(--green-txt)', warn: 'var(--orange)', missing: 'var(--red)' };
  const icons  = { ok: '✓', warn: '⚠', missing: '✗' };
  return `
  <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg-surface);border-radius:8px;margin-bottom:6px">
    <span style="font-size:16px;flex-shrink:0">${icon}</span>
    <div style="flex:1;min-width:0">
      <div style="font-size:12px;font-weight:500;color:var(--cream-dim)">${label}</div>
      ${filename ? `<div style="font-size:10px;color:var(--muted)">${filename}</div>` : '<div style="font-size:10px;color:var(--red)">Sin adjuntar</div>'}
    </div>
    <div style="display:flex;align-items:center;gap:6px">
      ${filename ? `<button class="btn btn-ghost btn-sm" style="font-size:10px;padding:3px 8px" onclick="showToast('📄 Abriendo ${filename}…','var(--blue)')">Ver ↗</button>` : `<button class="btn btn-ghost btn-sm" style="font-size:10px;padding:3px 8px" onclick="showToast('Solicitud enviada al cliente','var(--orange)')">Solicitar</button>`}
      <span style="font-size:13px;color:${colors[status]};font-weight:600">${icons[status]}</span>
    </div>
  </div>`;
}

function termRow(label, val, highlight) {
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04)">
    <span style="font-size:11px;color:var(--sub)">${label}</span>
    <span style="font-size:12px;font-weight:${highlight?'600':'400'};color:${highlight?'var(--cream)':'var(--cream-dim)'}">${val}</span>
  </div>`;
}

function modalFooter(approveLabel, approveAction, rejectLabel, rejectAction, approvalId) {
  return `
  <div class="modal-footer" style="justify-content:space-between;align-items:center">
    <div style="flex:1;margin-right:16px">
      <input type="text" id="aprobacion-nota" placeholder="Nota para el expediente (opcional)…"
        style="width:100%;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:7px 10px;font-size:11px;color:var(--cream);outline:none;font-family:'Inter',sans-serif">
    </div>
    <div style="display:flex;gap:8px;flex-shrink:0">
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">${rejectLabel}</button>
      <button class="btn btn-ghost btn-sm" style="color:#d06060;border-color:rgba(184,64,64,.3)" onclick="${rejectAction};closeModal()">✗ Rechazar</button>
      <button class="btn btn-primary btn-sm" onclick="${approveAction};closeModal()">${approveLabel}</button>
    </div>
  </div>`;
}

function buildKYCModal(approval, client) {
  const id = approval.id;
  const isUpdate = approval.description.includes('Actualización');

  // doc states: id 1 = Carlos (2/3 OK), id 6 = Sophie (doc vencido)
  const docs = id === 1
    ? [
        { icon: '🪪', label: 'Pasaporte / Cédula',       file: 'pasaporte_mendez.pdf',   status: 'ok' },
        { icon: '💼', label: 'Comprobante de ingresos',   file: 'ingresos_mendez_2026.pdf', status: 'ok' },
        { icon: '🏦', label: 'Referencias bancarias',     file: null,                     status: 'missing' },
      ]
    : [
        { icon: '🪪', label: 'Pasaporte / Cédula',       file: 'passeport_martin_vencido.pdf', status: 'warn' },
        { icon: '💼', label: 'Comprobante de ingresos',   file: 'revenus_martin_2026.pdf', status: 'ok' },
        { icon: '🏦', label: 'Referencias bancarias',     file: 'references_banc_martin.pdf', status: 'ok' },
      ];

  const docsOk = docs.filter(d => d.status === 'ok').length;

  return `
  <div class="modal modal-lg">
    <div class="modal-header">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="badge badge-orange" style="font-size:11px">${isUpdate ? 'Actualización KYC' : 'Revisión KYC'}</span>
        <span class="modal-title">${approval.client}</span>
      </div>
      <div class="modal-close" onclick="closeModal()">✕</div>
    </div>
    <div class="modal-body">

      ${client ? `
      <!-- Client info -->
      <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--bg-card2);border-radius:10px;margin-bottom:20px">
        <div style="width:40px;height:40px;border-radius:50%;background:#c97c40;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#fff;flex-shrink:0">${client.initials}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:var(--cream);margin-bottom:2px">${client.firstName} ${client.lastName}</div>
          <div style="font-size:11px;color:var(--sub)">${client.email} &nbsp;·&nbsp; ${client.phone} &nbsp;·&nbsp; ${client.country}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:11px;color:var(--muted);margin-bottom:2px">${approval.unit}</div>
          <div style="font-size:11px;font-weight:500;color:var(--orange)">KYC ${isUpdate ? 'en actualización' : 'pendiente'}</div>
        </div>
      </div>` : ''}

      <!-- Documents checklist -->
      <div style="font-size:10px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between">
        <span>Documentos enviados</span>
        <span style="color:${docsOk < docs.length ? 'var(--orange)' : 'var(--green-txt)'}">${docsOk}/${docs.length} recibidos</span>
      </div>
      ${docs.map(d => docRow(d.icon, d.label, d.file, d.status)).join('')}

      ${docsOk < docs.length ? `
      <div style="margin-top:14px;padding:10px 14px;background:rgba(201,124,64,.1);border:1px solid rgba(201,124,64,.2);border-radius:8px;font-size:11px;color:var(--orange)">
        ⚠ KYC incompleto — faltan ${docs.length - docsOk} documento(s). Puedes solicitar los faltantes o rechazar para que el cliente corrija.
      </div>` : `
      <div style="margin-top:14px;padding:10px 14px;background:rgba(74,94,63,.15);border:1px solid rgba(130,184,112,.2);border-radius:8px;font-size:11px;color:var(--green-txt)">
        ✓ Todos los documentos recibidos — listo para aprobar KYC.
      </div>`}

      ${isUpdate ? `
      <div style="margin-top:14px;padding:10px 14px;background:rgba(201,124,64,.1);border:1px solid rgba(201,124,64,.2);border-radius:8px;font-size:11px;color:var(--orange)">
        ⚠ El pasaporte subido puede estar vencido. Verifica la fecha de expiración antes de aprobar.
      </div>` : ''}

    </div>
    ${modalFooter('✓ Aprobar KYC', `handleApproval(${approval.id},'approve')`, 'Cancelar', `handleApproval(${approval.id},'reject')`, approval.id)}
  </div>`;
}

function buildPromesaModal(approval, client) {
  const price = client?.price || '$389,000';
  const priceNum = parseInt((price || '').replace(/[^0-9]/g, '')) || 389000;
  const reserva  = Math.round(priceNum * 0.05).toLocaleString('en-US');
  const mensual  = Math.round(priceNum * 0.15 / 24).toLocaleString('en-US');
  const entrega  = Math.round(priceNum * 0.80).toLocaleString('en-US');

  return `
  <div class="modal modal-lg">
    <div class="modal-header">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="badge badge-red" style="font-size:11px">Promesa de Compraventa</span>
        <span class="modal-title">${approval.client}</span>
      </div>
      <div class="modal-close" onclick="closeModal()">✕</div>
    </div>
    <div class="modal-body">

      <!-- Document preview -->
      <div style="background:var(--bg-card2);border:1px solid var(--border);border-radius:10px;padding:20px 22px;margin-bottom:18px">
        <div style="font-size:9px;letter-spacing:.18em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:10px">Duna Development Group · Cap Cana, Rep. Dominicana</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:500;color:var(--cream);margin-bottom:14px;letter-spacing:.04em">PROMESA DE COMPRAVENTA</div>

        ${termRow('Vendedor', 'Duna Development Group S.R.L.')}
        ${termRow('Comprador', approval.client + (client ? ` · ${client.country}` : ''), true)}
        ${termRow('Propiedad', approval.unit || '—', true)}
        ${termRow('Precio de venta', price + ' USD', true)}
        ${termRow('Reserva (5%)', '$' + reserva + ' USD — <span style="color:var(--green-txt)">Recibido</span>')}
        ${termRow('Plan de pagos (15%)', '24 cuotas × $' + mensual + '/mes')}
        ${termRow('Pago entrega (80%)', '$' + entrega + ' USD · contra escritura')}
        ${termRow('Entrega estimada', 'Q4 2026')}
        ${termRow('Notaría', 'Duna Legal Partners · Cap Cana')}
        ${termRow('Condición', 'KYC aprobado ✓')}
      </div>

      <!-- Clauses -->
      <div style="font-size:10px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Cláusulas clave</div>
      <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:16px">
        ${['Penalidad por incumplimiento del comprador: 10% del precio',
           'Penalidad por incumplimiento del vendedor: devolución + 10%',
           'Arbitraje: Cámara de Comercio RD (CCRD)',
           'Jurisdicción: Tribunales de Santo Domingo, RD',
           'Vigencia de la oferta: 5 días hábiles'].map(c => `
          <div style="display:flex;align-items:flex-start;gap:8px;font-size:11px;color:var(--sub)">
            <span style="color:var(--muted);flex-shrink:0">•</span>${c}
          </div>`).join('')}
      </div>

      <!-- Document file -->
      <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border);border-radius:8px">
        <span style="font-size:20px">📄</span>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:500;color:var(--cream-dim)">promesa_compraventa_${approval.client.split(' ')[1]?.toLowerCase()}.pdf</div>
          <div style="font-size:10px;color:var(--muted)">Generado automáticamente · ${approval.date}</div>
        </div>
        <button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="showToast('📄 Descargando PDF…','var(--blue)')">Descargar ↓</button>
        <button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="showToast('📄 Abriendo vista previa…','var(--blue)')">Vista previa ↗</button>
      </div>

    </div>
    ${modalFooter('Enviar a firma →', `handleApproval(${approval.id},'approve')`, 'Cancelar', `handleApproval(${approval.id},'reject')`, approval.id)}
  </div>`;
}

function buildContratoModal(approval, client) {
  const isAddendum = approval.description.includes('Addendum');
  const price = client?.price || '$415,000';

  return `
  <div class="modal modal-lg">
    <div class="modal-header">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="badge badge-blue" style="font-size:11px">${isAddendum ? 'Addendum' : 'Contrato de Compraventa'}</span>
        <span class="modal-title">${approval.client}</span>
      </div>
      <div class="modal-close" onclick="closeModal()">✕</div>
    </div>
    <div class="modal-body">

      <div style="background:var(--bg-card2);border:1px solid var(--border);border-radius:10px;padding:20px 22px;margin-bottom:18px">
        <div style="font-size:9px;letter-spacing:.18em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:10px">Duna Development Group · Documento legal</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:500;color:var(--cream);margin-bottom:14px;letter-spacing:.04em">
          ${isAddendum ? 'ADDENDUM — PLAN DE PAGOS' : 'CONTRATO DE COMPRAVENTA'}
        </div>

        ${termRow('Comprador', approval.client + (client ? ` · ${client.country}` : ''), true)}
        ${termRow('Propiedad', approval.unit || '—', true)}
        ${termRow('Precio pactado', price + ' USD')}
        ${isAddendum
          ? termRow('Modificación', 'Ajuste de cuotas mensuales — plan extendido')
          : termRow('Pagado a la fecha', client?.paid || '—')}
        ${termRow('Estado promesa', 'Firmada ✓')}
        ${termRow('Revisión legal', 'Pendiente de aprobación')}
        ${termRow('Notarización', isAddendum ? 'No requiere' : 'Notaría Duna Legal Partners')}
        ${termRow('Entrega estimada', 'Q4 2026')}
      </div>

      <div style="font-size:10px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Documentos adjuntos</div>
      ${docRow('📄', isAddendum ? 'Addendum firmado' : 'Contrato de compraventa', `contrato_${approval.client.split(' ')[1]?.toLowerCase()}.pdf`, 'ok')}
      ${!isAddendum ? docRow('📋', 'Promesa de compraventa (referencia)', `promesa_${approval.client.split(' ')[1]?.toLowerCase()}.pdf`, 'ok') : ''}
      ${docRow('🪪', 'KYC verificado del comprador', 'kyc_verificado.pdf', 'ok')}

    </div>
    ${modalFooter(
      isAddendum ? 'Aprobar addendum →' : '✓ Aprobar y enviar a firma',
      `handleApproval(${approval.id},'approve')`,
      'Cancelar',
      `handleApproval(${approval.id},'reject')`,
      approval.id
    )}
  </div>`;
}

function buildBrokerModal(approval) {
  const isRenovacion = approval.type === 'Renovación';

  return `
  <div class="modal modal-lg">
    <div class="modal-header">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="badge badge-orange" style="font-size:11px">${isRenovacion ? 'Renovación de Contrato' : 'Contrato de Colaboración'}</span>
        <span class="modal-title">${approval.client}</span>
      </div>
      <div class="modal-close" onclick="closeModal()">✕</div>
    </div>
    <div class="modal-body">

      <!-- Broker profile -->
      <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--bg-card2);border-radius:10px;margin-bottom:20px">
        <div style="width:40px;height:40px;border-radius:10px;background:rgba(58,122,189,.3);display:flex;align-items:center;justify-content:center;font-size:18px">🤝</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:var(--cream);margin-bottom:2px">${approval.client}</div>
          <div style="font-size:11px;color:var(--sub)">${isRenovacion ? 'Renovación anual' : 'Nuevo contrato de colaboración'} · ${approval.date}</div>
        </div>
        <span class="badge badge-orange" style="font-size:11px">${isRenovacion ? 'Renovación' : 'Nuevo broker'}</span>
      </div>

      <!-- Contract terms -->
      <div style="background:var(--bg-card2);border:1px solid var(--border);border-radius:10px;padding:20px 22px;margin-bottom:18px">
        <div style="font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--cream);margin-bottom:14px">
          ${isRenovacion ? 'RENOVACIÓN DE ACUERDO DE COLABORACIÓN' : 'ACUERDO DE COLABORACIÓN COMERCIAL'}
        </div>
        ${termRow('Broker / Agencia', approval.client, true)}
        ${termRow('Comisión', '2% sobre ventas cerradas', true)}
        ${termRow('Proyectos asignados', 'Makai Residences')}
        ${termRow('Territorio', 'Cap Cana · Punta Cana · Internacional')}
        ${termRow('Vigencia', isRenovacion ? '1 año — Jun 2026 a Jun 2027' : '1 año desde activación')}
        ${termRow('Pago de comisiones', '15 días hábiles tras escritura')}
        ${termRow('Cláusula exclusividad', 'No exclusivo')}
        ${isRenovacion ? termRow('Contrato anterior', 'Jun 2025 – Jun 2026 · Sin incidencias ✓') : ''}
      </div>

      <!-- Documents -->
      <div style="font-size:10px;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Documentos</div>
      ${docRow('📄', isRenovacion ? 'Contrato de renovación' : 'Contrato de colaboración', `contrato_broker_${approval.client.split(' ')[0]?.toLowerCase()}.pdf`, 'ok')}
      ${docRow('🪪', 'Documento de identidad del representante', isRenovacion ? 'id_jimenez_2026.pdf' : null, isRenovacion ? 'ok' : 'missing')}
      ${isRenovacion ? docRow('📋', 'Historial de comisiones', 'historial_comisiones_jimenez.pdf', 'ok') : ''}

    </div>
    ${modalFooter(
      isRenovacion ? 'Renovar contrato →' : 'Activar broker →',
      `handleApproval(${approval.id},'approve')`,
      'Cancelar',
      `handleApproval(${approval.id},'reject')`,
      approval.id
    )}
  </div>`;
}

function buildGenericModal(approval, client) {
  return `
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title">${approval.type} — ${approval.client}</span>
      <div class="modal-close" onclick="closeModal()">✕</div>
    </div>
    <div class="modal-body">
      <p style="font-size:12px;color:var(--sub);line-height:1.6">${approval.description}</p>
      <div style="margin-top:14px;font-size:11px;color:var(--muted)">${approval.unit || ''} · ${approval.date} · ${approval.requestedBy}</div>
    </div>
    ${modalFooter('✓ Aprobar', `handleApproval(${approval.id},'approve')`, 'Cancelar', `handleApproval(${approval.id},'reject')`, approval.id)}
  </div>`;
}

export function init(data) {
  // Filters
  document.querySelectorAll('.filter-pill[data-type]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const t = pill.dataset.type;
      document.querySelectorAll('.approval-row').forEach(row => {
        if (t === 'all')    { row.style.display = ''; return; }
        if (t === 'broker') { row.style.display = row.dataset.clienttype === 'broker' ? '' : 'none'; return; }
        row.style.display = row.dataset.type === t ? '' : 'none';
      });
    });
  });

  // Quick approve/reject (row-level)
  window.handleApproval = (id, action) => {
    const nota  = document.getElementById('aprobacion-nota')?.value || '';
    const row   = document.querySelector(`.approval-row[data-id="${id}"]`);
    if (row) {
      row.style.opacity = '.3';
      row.style.pointerEvents = 'none';
      row.style.transition = 'opacity .3s';
    }
    const msg   = action === 'approve' ? '✓ Aprobación registrada' : '✗ Rechazado — notificación enviada';
    const color = action === 'approve' ? 'var(--green-txt)' : '#d06060';
    showToast(msg + (nota ? ` · "${nota}"` : ''), color);
  };

  // Open review modal
  window.openAprobacionModal = (id) => {
    const approval = data.approvals.find(a => a.id === id);
    if (!approval) return;
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;
    overlay.innerHTML = buildModal(approval, data);
    overlay.style.display = 'flex';
  };
}

function showToast(msg, color) {
  const existing = document.getElementById('duna-toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.id = 'duna-toast';
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;font-size:12px;font-weight:500;color:${color};box-shadow:var(--shadow)`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
