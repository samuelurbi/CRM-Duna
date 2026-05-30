export const meta = { title: 'Plantillas y Automatizaciones', breadcrumb: 'Comunicación · Plantillas y flujos de automatización' };

const AUTOMATIONS = [
  {
    id: 1, name: 'Onboarding post-reserva', trigger: 'Reserva confirmada', triggerColor: 'green', status: 'active',
    audience: 'Compradores nuevos',
    steps: [
      { delay: 'Inmediato',  channel: 'Email + WhatsApp', template: 'Bienvenida — Reserva confirmada',   icon: '✉' },
      { delay: '+24 horas',  channel: 'Email',            template: 'KYC — Documentos pendientes',        icon: '✉' },
      { delay: '+3 días',    channel: 'WhatsApp',         template: 'Solicitud documentos faltantes',     icon: '💬' },
    ],
  },
  {
    id: 2, name: 'Recordatorio de cuota', trigger: 'Cuota próxima (5 días)', triggerColor: 'orange', status: 'active',
    audience: 'Compradores con plan activo',
    steps: [
      { delay: 'Inmediato', channel: 'WhatsApp', template: 'Recordatorio de cuota', icon: '💬' },
      { delay: '+3 días',   channel: 'Email',    template: 'Recordatorio de cuota', icon: '✉' },
    ],
  },
  {
    id: 3, name: 'Gestión de mora', trigger: 'Cuota vencida', triggerColor: 'red', status: 'active',
    audience: 'Compradores con pago vencido',
    steps: [
      { delay: 'Inmediato',  channel: 'Email + WhatsApp', template: 'Aviso pago vencido',  icon: '✉' },
      { delay: '+48 horas',  channel: 'WhatsApp',         template: 'Aviso pago vencido',  icon: '💬' },
      { delay: '+5 días',    channel: 'Email',            template: 'Aviso pago vencido',  icon: '✉' },
    ],
  },
  {
    id: 4, name: 'KYC pendiente urgente', trigger: 'KYC incompleto +72h', triggerColor: 'orange', status: 'active',
    audience: 'Compradores con KYC pendiente',
    steps: [
      { delay: 'Inmediato', channel: 'Email',    template: 'KYC — Documentos pendientes',    icon: '✉' },
      { delay: '+24 horas', channel: 'WhatsApp', template: 'Solicitud documentos faltantes', icon: '💬' },
    ],
  },
  {
    id: 5, name: 'Cierre de contrato', trigger: 'Contrato firmado', triggerColor: 'blue', status: 'paused',
    audience: 'Compradores recién firmados',
    steps: [
      { delay: 'Inmediato', channel: 'Email + WhatsApp', template: 'Felicitación cierre de contrato', icon: '✉' },
      { delay: '+7 días',   channel: 'Email',            template: 'Actualización avance de obra',    icon: '✉' },
    ],
  },
];

const TRIGGER_OPTIONS = [
  'Reserva confirmada', 'KYC incompleto +72h', 'Cuota próxima (5 días)', 'Cuota vencida',
  'Contrato firmado', 'Promesa enviada a firma', 'Nuevo broker registrado', 'Broker contrato por vencer',
  'Actualización de avance de obra', 'Documento aprobado', 'Registro nuevo prospecto',
];

const DELAY_OPTIONS = ['Inmediato', '+1 hora', '+6 horas', '+24 horas', '+48 horas', '+3 días', '+5 días', '+7 días', '+14 días', '+30 días'];

const TEMPLATE_CONTENT = {
  'Bienvenida — Reserva confirmada': {
    subject: '¡Tu reserva en Makai Residences ha sido confirmada, {{nombre}}!',
    body: `Hola {{nombre}},\n\nNos complace confirmarte que tu reserva para la {{unidad}} en Makai Residences ha sido registrada exitosamente.\n\nTu agente asignado es {{agente}}, quien estará en contacto contigo en las próximas horas.\n\nPróximos pasos:\n• Completar tu proceso de verificación KYC\n• Subir tu identificación oficial\n• Enviar comprobante de ingresos\n\nAccede a tu portal personal para gestionar todos tus documentos.\n\nBienvenido a la familia Duna.\n\nEquipo Duna Development Group`,
    wa: `¡Hola {{nombre}}! 🏡\n\nTu reserva en Makai Residences ha sido *confirmada*.\n\n📋 Unidad: {{unidad}}\n👤 Agente: {{agente}}\n\nTe contactamos pronto para los siguientes pasos. ¡Bienvenido! 🌴`,
  },
  'KYC — Documentos pendientes': {
    subject: 'Documentos pendientes — {{nombre}}, necesitamos completar tu verificación',
    body: `Hola {{nombre}},\n\nPara avanzar con tu expediente en Makai Residences, necesitamos que completes tu verificación de identidad (KYC).\n\nDocumentos requeridos:\n• Pasaporte o cédula vigente\n• Comprobante de domicilio (menos de 3 meses)\n• Comprobante de ingresos o estado de cuenta\n\nPor favor sube los documentos antes del {{fecha_limite}}.\n\nEquipo Duna Development Group`,
    wa: `Hola {{nombre}} 👋\n\nRecuerda que tienes documentos pendientes para completar tu proceso.\n\n📋 *Documentos requeridos:*\n• Identificación oficial\n• Comprobante de ingresos\n\n⏰ Límite: {{fecha_limite}}\n\nPuedes subirlos aquí → duna.app/documentos`,
  },
  'Recordatorio de cuota': {
    subject: 'Recordatorio: tu cuota #{{num_cuota}} vence en {{dias}} días',
    body: `Hola {{nombre}},\n\nTe recordamos que tu próxima cuota de pago está próxima a vencer.\n\n💳 Cuota #{{num_cuota}} de 24\n📅 Fecha de vencimiento: {{fecha_vencimiento}}\n💰 Monto: {{monto}} USD\n\nRealiza tu transferencia con los datos bancarios registrados.\n\nEquipo Duna Development Group`,
    wa: `Hola {{nombre}} 💳\n\nTu *cuota #{{num_cuota}}* vence en *{{dias}} días*.\n\nMonto: *{{monto}} USD*\nFecha límite: {{fecha_vencimiento}}\n\n¿Necesitas ayuda con el pago? Escríbenos aquí mismo.`,
  },
  'Aviso pago vencido': {
    subject: 'Atención — Tu cuota #{{num_cuota}} está vencida, {{nombre}}',
    body: `Hola {{nombre}},\n\nNos ponemos en contacto porque tu cuota #{{num_cuota}} con fecha de vencimiento {{fecha_vencimiento}} aún no ha sido recibida.\n\n💰 Monto pendiente: {{monto}} USD\n\nTe pedimos regularizar el pago a la brevedad posible para evitar cargos por mora.\n\nEquipo Duna Development Group`,
    wa: `Hola {{nombre}} ⚠️\n\nTu *cuota #{{num_cuota}}* ({{monto}} USD) está *vencida* desde el {{fecha_vencimiento}}.\n\nPor favor realiza el pago a la brevedad. Si tienes alguna dificultad, contáctanos directamente y buscamos una solución juntos.`,
  },
  'Felicitación cierre de contrato': {
    subject: '🎉 ¡Bienvenido propietario, {{nombre}}! Tu contrato ha sido firmado',
    body: `Felicitaciones {{nombre}},\n\nEs un honor darte la bienvenida oficialmente como propietario en Makai Residences.\n\nTu contrato ha sido firmado y registrado. Tu unidad {{unidad}} está en construcción y te mantendremos informado del avance mensualmente.\n\n¡Gracias por confiar en Duna Development Group!\n\nEquipo Duna`,
    wa: `🎉 ¡Felicitaciones {{nombre}}!\n\nYa eres propietario oficial en *Makai Residences*.\n\nTu unidad {{unidad}} está en buenas manos. Te enviaremos actualizaciones mensuales del avance de obra. ¡Bienvenido a la familia Duna! 🌴`,
  },
};

const channelIcon = { 'Email':'✉', 'WhatsApp':'💬', 'Email + WhatsApp':'✉ 💬' };
const categoryColor = { Bienvenida:'var(--green-txt)', Seguimiento:'var(--blue)', Pagos:'var(--orange)', Legal:'var(--cream-dim)', Proyectos:'var(--sub)' };
const triggerColor  = { green:'var(--green-txt)', orange:'var(--orange)', red:'var(--red)', blue:'var(--blue)' };

export function render(data) {
  const { templates } = data;
  const categories = [...new Set(templates.map(t => t.category))];

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Plantillas y Automatizaciones</h1>
    <span style="font-size:11px;color:var(--sub)">${templates.length} plantillas · ${AUTOMATIONS.filter(a => a.status === 'active').length} flujos activos</span>
    <div class="view-actions">
      <button class="btn btn-ghost btn-sm" onclick="showToast('Config. SMTP / WhatsApp','var(--blue)')">Config. canales</button>
      <button class="btn btn-primary btn-sm" id="btn-nueva-plantilla">+ Nueva plantilla</button>
    </div>
  </div>

  <!-- Tabs -->
  <div style="display:flex;gap:0;margin-bottom:20px;border-bottom:1px solid var(--border)">
    <div id="tab-templates" style="padding:10px 20px;font-size:12px;font-weight:500;color:var(--cream-dim);border-bottom:2px solid var(--green-txt);cursor:pointer;user-select:none" onclick="switchPTab('templates')">
      Plantillas <span style="background:var(--bg-surface);color:var(--sub);border-radius:10px;padding:1px 7px;font-size:10px;margin-left:4px">${templates.length}</span>
    </div>
    <div id="tab-automations" style="padding:10px 20px;font-size:12px;font-weight:500;color:var(--sub);border-bottom:2px solid transparent;cursor:pointer;user-select:none" onclick="switchPTab('automations')">
      Automatizaciones <span style="background:var(--green-lite);color:var(--green-txt);border-radius:10px;padding:1px 7px;font-size:10px;margin-left:4px">${AUTOMATIONS.filter(a => a.status === 'active').length}</span>
    </div>
  </div>

  <!-- ── Panel: Plantillas ──────────────────── -->
  <div id="panel-templates">
    <div class="filter-bar">
      <span class="filter-pill active" data-cat="all">Todas <span class="count">${templates.length}</span></span>
      ${categories.map(c => `<span class="filter-pill" data-cat="${c}">${c} <span class="count">${templates.filter(t => t.category === c).length}</span></span>`).join('')}
    </div>

    <div class="panel" id="templates-list">
      ${templates.map(t => `
        <div class="template-row" data-cat="${t.category}" style="padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px">
          <div style="width:38px;height:38px;border-radius:8px;background:var(--bg-surface);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0">
            ${t.channel.includes('WhatsApp') && !t.channel.includes('Email') ? '💬' : '✉'}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:500;color:var(--cream-dim);margin-bottom:4px">${t.name}</div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="font-size:10px;color:${categoryColor[t.category]};background:${categoryColor[t.category]}1a;border-radius:4px;padding:2px 8px">${t.category}</span>
              <span style="font-size:11px;color:var(--muted)">${channelIcon[t.channel]} ${t.channel}</span>
              <span style="font-size:11px;color:var(--muted)">· ${t.uses} usos · Última vez ${t.lastUsed}</span>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0">
            <span class="cell-link" style="font-size:11px" onclick="editarPlantilla(${t.id})">✏ Editar</span>
            <span class="cell-link" style="font-size:11px;color:var(--green-txt)" onclick="showToast('Plantilla aplicada','var(--green-txt)')">Usar →</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- ── Panel: Automatizaciones ───────────── -->
  <div id="panel-automations" style="display:none">

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <span style="font-size:12px;color:var(--sub)">${AUTOMATIONS.length} flujos configurados · ${AUTOMATIONS.filter(a => a.status === 'active').length} activos</span>
      <button class="btn btn-primary btn-sm" id="btn-nuevo-flujo">+ Nuevo flujo</button>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      ${AUTOMATIONS.map(a => `
      <div class="panel" style="overflow:hidden" id="auto-card-${a.id}">

        <!-- Card header -->
        <div style="padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="font-size:13px;font-weight:600;color:var(--cream-dim)">${a.name}</span>
              <span class="badge badge-${a.status === 'active' ? 'green' : 'gray'}">${a.status === 'active' ? 'Activo' : 'Pausado'}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
              <span style="font-size:11px;color:var(--muted)">Trigger:</span>
              <span style="font-size:11px;font-weight:500;color:${triggerColor[a.triggerColor]}">${a.trigger}</span>
              <span style="font-size:10px;color:var(--muted)">·</span>
              <span style="font-size:11px;color:var(--muted)">Audiencia: ${a.audience}</span>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0">
            <button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="editarAutomacion(${a.id})">✏ Editar flujo</button>
            <button class="btn btn-ghost btn-sm" style="font-size:11px;color:${a.status === 'active' ? 'var(--orange)' : 'var(--green-txt)'}" onclick="toggleAutomacion(${a.id})">${a.status === 'active' ? 'Pausar' : 'Activar'}</button>
          </div>
        </div>

        <!-- Flow steps -->
        <div style="padding:14px 20px;display:flex;align-items:center;gap:0;flex-wrap:wrap">
          <!-- Trigger node -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0">
            <div style="background:${triggerColor[a.triggerColor]}1a;border:1px solid ${triggerColor[a.triggerColor]}40;border-radius:8px;padding:7px 12px;font-size:10px;font-weight:600;color:${triggerColor[a.triggerColor]};white-space:nowrap">
              ⚡ ${a.trigger}
            </div>
          </div>

          ${a.steps.map((s, si) => `
            <!-- Arrow -->
            <div style="display:flex;align-items:center;padding:0 4px;flex-shrink:0">
              <div style="height:1px;width:14px;background:var(--border)"></div>
              <div style="font-size:9px;color:var(--muted);background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:2px 6px;white-space:nowrap;font-weight:500">${s.delay}</div>
              <div style="height:1px;width:8px;background:var(--border)"></div>
              <span style="color:var(--muted);font-size:10px">›</span>
            </div>
            <!-- Step node -->
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:8px;padding:7px 12px;flex-shrink:0;max-width:180px">
              <div style="font-size:10px;font-weight:600;color:var(--cream-dim);margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.icon} ${s.template}</div>
              <div style="font-size:9px;color:var(--muted)">${s.channel}</div>
            </div>
          `).join('')}
        </div>

      </div>
      `).join('')}
    </div>

  </div>
</div>`;
}

export function init(data) {
  const { templates } = data;

  document.querySelectorAll('.filter-pill[data-cat]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.cat;
      document.querySelectorAll('.template-row').forEach(row => {
        row.style.display = (cat === 'all' || row.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  window.switchPTab = (tab) => {
    const isTpl = tab === 'templates';
    document.getElementById('panel-templates').style.display   = isTpl ? '' : 'none';
    document.getElementById('panel-automations').style.display = isTpl ? 'none' : '';
    ['templates','automations'].forEach(t => {
      const el = document.getElementById(`tab-${t}`);
      const active = t === tab;
      el.style.color       = active ? 'var(--cream-dim)' : 'var(--sub)';
      el.style.borderBottom = active ? '2px solid var(--green-txt)' : '2px solid transparent';
    });
    document.getElementById('btn-nueva-plantilla').style.display = isTpl ? '' : 'none';
    document.getElementById('btn-nuevo-flujo')?.style && (document.getElementById('btn-nuevo-flujo').style.display = isTpl ? 'none' : '');
  };

  window.editarPlantilla = (id) => {
    const t = templates.find(x => x.id === id);
    if (t) window.openEditarPlantillaModal(t, TEMPLATE_CONTENT[t.name]);
  };

  window.editarAutomacion = (id) => {
    const a = AUTOMATIONS.find(x => x.id === id);
    if (a) window.openEditarAutomacionModal(a, templates, DELAY_OPTIONS, TRIGGER_OPTIONS);
  };

  window.toggleAutomacion = (id) => {
    const a = AUTOMATIONS.find(x => x.id === id);
    if (!a) return;
    a.status = a.status === 'active' ? 'paused' : 'active';
    const badge = document.querySelector(`#auto-card-${id} .badge`);
    if (badge) { badge.className = `badge badge-${a.status === 'active' ? 'green' : 'gray'}`; badge.textContent = a.status === 'active' ? 'Activo' : 'Pausado'; }
    showToast(a.status === 'active' ? '✓ Flujo activado' : 'Flujo pausado', a.status === 'active' ? 'var(--green-txt)' : 'var(--orange)');
  };

  document.getElementById('btn-nueva-plantilla')?.addEventListener('click', () =>
    window.openEditarPlantillaModal({ id: 0, name: 'Nueva plantilla', channel: 'Email', category: 'Bienvenida', uses: 0, lastUsed: '—' }, null)
  );
  document.getElementById('btn-nuevo-flujo')?.addEventListener('click', () =>
    window.openEditarAutomacionModal({ id: 0, name: 'Nuevo flujo', trigger: '', triggerColor: 'blue', status: 'paused', audience: '', steps: [] }, templates, DELAY_OPTIONS, TRIGGER_OPTIONS)
  );
}

function showToast(msg, color) {
  const e = document.getElementById('duna-toast'); if (e) e.remove();
  const t = document.createElement('div'); t.id = 'duna-toast';
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;font-size:12px;font-weight:500;color:${color};box-shadow:var(--shadow)`;
  t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2500);
}
