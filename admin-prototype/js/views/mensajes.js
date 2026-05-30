import { getRole } from '../role.js';

export const meta = { title: 'Mensajes', breadcrumb: 'Comunicación · Mensajes' };

/* ── Mock chat threads keyed by clientId ─────────── */
const THREADS = {
  1: { unread: 2, priority: 'urgent', messages: [
    { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: '¡Buenos días Carlos! Tu reserva ha sido procesada. El siguiente paso es completar el KYC.', time: '09:15', date: 'Ayer' },
    { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: 'Hola Ana, entendido. ¿Qué documentos necesito presentar?', time: '10:03', date: 'Ayer' },
    { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: 'Necesitas: 1. Pasaporte vigente. 2. Comprobante de ingresos (últimos 3 meses). 3. Referencias bancarias. Te envié el checklist completo al correo.', time: '10:30', date: 'Ayer' },
    { from: 'system', text: '📎 Checklist KYC enviado por correo · 10:31' },
    { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: '¿Cuánto tiempo tengo para enviar los documentos?', time: '14:22', date: 'Hoy', unread: true },
    { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: 'Hola Ana, sigo esperando respuesta. ¿Todo bien?', time: '15:41', date: 'Hoy', unread: true },
  ]},
  2: { unread: 1, priority: 'urgent', messages: [
    { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'Hola Ana, la promesa de compraventa está lista. Necesitamos tu firma antes del viernes.', time: '08:45', date: 'Ayer' },
    { from: 'client', sender: 'Ana García', initials: 'AG', color: '#b84040', text: '¿Puedo revisarla con mi abogado antes de firmar?', time: '11:20', date: 'Ayer' },
    { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'Por supuesto, tienes hasta el jueves. El documento está disponible en tu portal.', time: '11:45', date: 'Ayer' },
    { from: 'client', sender: 'Ana García', initials: 'AG', color: '#b84040', text: 'Perfecto, lo reviso hoy mismo. ¿Me pueden confirmar el precio final con los ajustes?', time: '09:11', date: 'Hoy', unread: true },
  ]},
  3: { unread: 0, priority: 'normal', messages: [
    { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: 'Hola Luis, tu documentación está en revisión. Recibirás respuesta en 48–72h.', time: '10:00', date: 'hace 3 días' },
    { from: 'client', sender: 'Luis Pérez', initials: 'LP', color: '#2a7a6a', text: 'Entendido, gracias Ana. Quedo atento.', time: '10:45', date: 'hace 3 días' },
    { from: 'system', text: '📋 Documentos enviados a revisión legal' },
  ]},
  4: { unread: 0, priority: 'low', messages: [
    { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'María, confirmamos la recepción de tu cuota de mayo. ¡Todo al día!', time: '09:00', date: 'hace 3h' },
    { from: 'client', sender: 'María López', initials: 'ML', color: '#6b5b8a', text: 'Excelente, gracias. ¿Cuándo está disponible el avance de obra actualizado?', time: '09:22', date: 'hace 3h' },
    { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'El reporte de mayo sale el próximo viernes.', time: '09:35', date: 'hace 3h' },
  ]},
  5: { unread: 1, priority: 'urgent', messages: [
    { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: 'Roberto, tu cuota de mayo vence este viernes. ¿Necesitas más información?', time: '08:00', date: 'hace 5 días' },
    { from: 'client', sender: 'Roberto Silva', initials: 'RS', color: '#8a5c2a', text: 'Estoy organizando el pago. ¿Pueden darme hasta el lunes?', time: '14:30', date: 'hace 5 días' },
    { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: 'Lo consulto con el equipo y te confirmo, Roberto.', time: '15:00', date: 'hace 5 días' },
    { from: 'system', text: '⚠ Cuota vencida — sin confirmación de pago' },
    { from: 'client', sender: 'Roberto Silva', initials: 'RS', color: '#8a5c2a', text: '¿Me pueden confirmar el monto exacto con los intereses de mora?', time: '09:15', date: 'Hoy', unread: true },
  ]},
  6: { unread: 0, priority: 'normal', messages: [
    { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'Bonjour Sophie! Bienvenue chez Makai Residences. Je suis Carlos, votre conseiller.', time: '10:00', date: 'hace 1 día' },
    { from: 'client', sender: 'Sophie Martin', initials: 'SM', color: '#4A5E3F', text: 'Bonjour Carlos! Merci. Quand puis-je envoyer les documents KYC?', time: '14:22', date: 'hace 1 día' },
    { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'Vous pouvez les uploader via votre portail. Je vous envoie le lien par email.', time: '14:45', date: 'hace 1 día' },
  ]},
  7: { unread: 0, priority: 'low', messages: [
    { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: 'James, congratulations! Your unit is now officially yours. Looking forward to the delivery.', time: '10:00', date: 'hace 5 días' },
    { from: 'client', sender: 'James Wilson', initials: 'JW', color: '#6b5b8a', text: "Thank you Ana! Can't wait. What happens next regarding the keys?", time: '11:30', date: 'hace 5 días' },
    { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: "We'll notify you 60 days before delivery. You'll receive all documents for the final signing.", time: '12:00', date: 'hace 5 días' },
    { from: 'system', text: '✓ Proceso completado — Unidad 401 transferida' },
  ]},
  'broker-1': { unread: 0, priority: 'normal', clientId: null, name: 'José Rodríguez', initials: 'JR', color: '#3a7abd', project: 'JR Real Estate', unit: 'Broker', phase: 'Activo', phaseStep: 0, agent: 'Admin Duna', type: 'broker', messages: [
    { from: 'admin', sender: 'Admin Duna', initials: 'A', color: '#4A5E3F', text: 'José, tienes 2 clientes con promesas listas para firma. Por favor, coordina con ellos esta semana.', time: '08:30', date: 'Ayer' },
    { from: 'broker', sender: 'José Rodríguez', initials: 'JR', color: '#3a7abd', text: 'Entendido, me pongo en contacto con ellos hoy mismo.', time: '09:15', date: 'Ayer' },
    { from: 'broker', sender: 'José Rodríguez', initials: 'JR', color: '#3a7abd', text: '¿Cuándo se acredita la comisión del cierre de Méndez? Ya pasaron 15 días.', time: '10:00', date: 'Hoy' },
  ]},
};

const PHASE_LABELS = { 1: 'Reserva', 2: 'KYC', 3: 'Promesa', 4: 'Plan Pago', 5: 'Doc. Pago', 6: 'Contrato' };
const PHASE_COLORS = { 1: 'orange', 2: 'orange', 3: 'red', 4: 'blue', 5: 'blue', 6: 'green', 0: 'gray' };

function avatarColor(id) {
  const c = ['#4A5E3F','#3a7abd','#c97c40','#b84040','#6b5b8a','#2a7a6a','#8a5c2a'];
  return c[id % c.length];
}

export function render(data) {
  const role = getRole();
  const isAdmin = role === 'admin';
  const isSA    = role === 'senior_agent';

  const myAgent = isSA ? 'Ana Rodríguez' : null;

  // Build conversation list
  let convs = data.clients
    .filter(c => !isSA || c.agent === myAgent)
    .map(c => ({
      id: String(c.id),
      type: 'buyer',
      clientId: c.id,
      name: `${c.firstName} ${c.lastName}`,
      initials: c.initials,
      color: avatarColor(c.id),
      project: c.project,
      unit: c.unit,
      phase: PHASE_LABELS[c.step] || 'Reserva',
      phaseStep: c.step,
      agent: c.agent,
      unread: THREADS[c.id]?.unread || 0,
      priority: THREADS[c.id]?.priority || 'normal',
      lastMsg: (THREADS[c.id]?.messages || []).filter(m => m.from !== 'system').slice(-1)[0]?.text || '—',
      lastTime: c.lastAction,
    }));

  if (isAdmin) {
    convs.push({
      id: 'broker-1',
      type: 'broker',
      clientId: null,
      name: 'José Rodríguez',
      initials: 'JR',
      color: '#3a7abd',
      project: 'JR Real Estate',
      unit: 'Broker',
      phase: 'Activo',
      phaseStep: 0,
      agent: 'Admin Duna',
      unread: THREADS['broker-1'].unread,
      priority: 'normal',
      lastMsg: THREADS['broker-1'].messages.slice(-1)[0].text,
      lastTime: 'hace 1h',
    });
  }

  const totalUnread = convs.reduce((s, c) => s + c.unread, 0);
  const urgentCount = convs.filter(c => c.priority === 'urgent').length;

  const adminFilters = [
    { key: 'all',     label: 'Todos' },
    { key: 'unread',  label: `Sin leer${totalUnread > 0 ? ` (${totalUnread})` : ''}` },
    { key: 'urgent',  label: `Urgentes${urgentCount > 0 ? ` (${urgentCount})` : ''}` },
    { key: 'buyer',   label: 'Compradores' },
    { key: 'broker',  label: 'Brokers' },
  ];
  const saFilters = [
    { key: 'all',    label: 'Todos' },
    { key: 'unread', label: `Sin leer${totalUnread > 0 ? ` (${totalUnread})` : ''}` },
    { key: 'urgent', label: 'Urgentes' },
  ];
  const filters = isAdmin ? adminFilters : saFilters;

  return `
<div style="height:100%;display:flex;overflow:hidden;background:var(--bg-surface)">

  <!-- ── Conversation list ──────────────────── -->
  <div class="chat-sidebar">

    <!-- Header -->
    <div style="padding:14px 14px 10px;border-bottom:1px solid var(--border);flex-shrink:0">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600;color:var(--cream)">Mensajes</div>
        <div style="display:flex;align-items:center;gap:6px">
          ${totalUnread > 0 ? `<span style="background:var(--orange);color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:2px 7px">${totalUnread}</span>` : ''}
          ${isAdmin ? `<span style="font-size:10px;color:var(--muted)">${convs.length} conv.</span>` : ''}
        </div>
      </div>
      <div style="position:relative">
        <span style="position:absolute;left:9px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--muted);pointer-events:none">⌕</span>
        <input id="chat-search-input" placeholder="Buscar…" style="width:100%;box-sizing:border-box;background:var(--bg-surface);border:1px solid var(--border);border-radius:7px;padding:6px 10px 6px 26px;font-size:11px;color:var(--cream);outline:none;font-family:'Inter',sans-serif">
      </div>
    </div>

    <!-- Filters -->
    <div style="padding:7px 12px;border-bottom:1px solid var(--border);display:flex;gap:4px;flex-wrap:wrap;flex-shrink:0">
      ${filters.map((f, i) => `<button class="chat-filter-pill${i===0?' active':''}" data-filter="${f.key}">${f.label}</button>`).join('')}
    </div>

    ${isAdmin ? `
    <!-- Phase quick-filter -->
    <div style="padding:6px 12px;border-bottom:1px solid var(--border);display:flex;gap:3px;flex-wrap:wrap;flex-shrink:0">
      <span style="font-size:9px;color:var(--muted);align-self:center;margin-right:2px">Fase:</span>
      ${['KYC','Promesa','Plan Pago','Contrato'].map(f => `<button class="chat-filter-pill" data-phase="${f}" style="font-size:9px;padding:2px 7px">${f}</button>`).join('')}
    </div>` : ''}

    <!-- List -->
    <div class="chat-conv-list" id="chat-conv-list">
      ${convs.map(conv => `
      <div class="chat-item${conv.unread > 0 ? ' unread' : ''}" data-conv-id="${conv.id}" data-type="${conv.type}" data-priority="${conv.priority}" data-unread="${conv.unread > 0 ? '1' : '0'}" data-phase="${conv.phase}">
        <div style="position:relative;flex-shrink:0">
          <div style="width:36px;height:36px;border-radius:50%;background:${conv.color};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff">
            ${conv.initials}
          </div>
          ${conv.priority === 'urgent' ? `<span style="position:absolute;bottom:-1px;right:-1px;width:10px;height:10px;border-radius:50%;background:var(--red);border:1.5px solid var(--bg-card)"></span>` : ''}
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
            <span class="chat-item-name" style="font-size:12px;color:${conv.unread > 0 ? 'var(--cream)' : 'var(--cream-dim)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px">${conv.name}</span>
            <span style="font-size:9px;color:var(--muted);white-space:nowrap">${conv.lastTime}</span>
          </div>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px">
            <span class="badge badge-${PHASE_COLORS[conv.phaseStep] || 'gray'}" style="font-size:9px;padding:1px 6px">${conv.phase}</span>
            ${conv.type === 'broker' ? `<span class="badge badge-blue" style="font-size:9px;padding:1px 6px">Broker</span>` : ''}
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:155px">${conv.lastMsg}</span>
            ${conv.unread > 0 ? `<span style="background:var(--orange);color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px;flex-shrink:0">${conv.unread}</span>` : ''}
          </div>
        </div>
      </div>
      `).join('')}
    </div>

  </div>

  <!-- ── Conversation area ──────────────────── -->
  <div class="chat-main" id="chat-main">
    <div class="chat-empty-state">
      <div style="font-size:36px;opacity:.15">💬</div>
      <div style="font-size:13px;color:var(--sub)">Selecciona una conversación</div>
      <div style="font-size:11px;color:var(--muted)">${totalUnread} mensajes sin leer</div>
    </div>
  </div>

</div>`;
}

/* ── Build conversation panel HTML ─────────────── */
function buildPanel(conv, thread, isAdmin) {
  const msgs  = thread.messages || [];
  const isOut = (m) => m.from === 'agent' || m.from === 'admin';

  let lastDate = null;
  const bubbles = msgs.map(m => {
    if (m.from === 'system') {
      return `<div class="chat-system-msg">${m.text}</div>`;
    }
    let dateLine = '';
    if (m.date && m.date !== lastDate) {
      lastDate = m.date;
      dateLine = `<div class="chat-date-label">${m.date}</div>`;
    }
    const out = isOut(m);
    return `${dateLine}
    <div class="chat-msg-row${out ? ' out' : ''}">
      <div style="width:26px;height:26px;border-radius:50%;background:${m.color || '#555'};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:#fff;flex-shrink:0">${m.initials}</div>
      <div>
        <div style="font-size:9px;color:var(--muted);margin-bottom:3px;${out?'text-align:right':''}">${m.sender} &nbsp;${m.time || ''}</div>
        <div class="chat-bubble ${out ? 'out' : 'in'}">${m.text}</div>
      </div>
    </div>`;
  }).join('');

  const isBroker = conv.type === 'broker';

  return `
  <!-- Conv header -->
  <div style="padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;background:var(--bg-card);flex-shrink:0">
    <div style="width:38px;height:38px;border-radius:50%;background:${conv.color};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#fff;flex-shrink:0">${conv.initials}</div>
    <div style="flex:1;min-width:0">
      <div style="font-size:13px;font-weight:600;color:var(--cream);margin-bottom:3px">${conv.name}</div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span class="badge badge-${PHASE_COLORS[conv.phaseStep] || 'gray'}" style="font-size:9px">${conv.phase}</span>
        <span style="font-size:10px;color:var(--muted)">${conv.project}</span>
        ${conv.unit !== 'Broker' ? `<span style="font-size:10px;color:var(--muted)">· ${conv.unit}</span>` : ''}
        <span style="font-size:10px;color:var(--muted)">· Asesor: ${conv.agent}</span>
      </div>
    </div>
    <div style="display:flex;gap:6px;flex-shrink:0">
      ${isAdmin ? `
        <button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="window._chatTransfer('${conv.id}')">Transferir</button>
        <button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="window._chatAddAgent('${conv.id}')">+ Agente</button>
        ${!isBroker ? `<button class="btn btn-primary btn-sm" style="font-size:10px" onclick="window.location.hash='expediente/${conv.clientId}'">Ver expediente →</button>` : ''}
      ` : `
        <button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="window._chatAddAgent('${conv.id}')">+ Añadir colega</button>
        <button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="window._chatTransfer('${conv.id}')">Transferir</button>
      `}
    </div>
  </div>

  ${isAdmin && conv.priority === 'urgent' ? `
  <div style="background:rgba(184,64,64,.1);border-bottom:1px solid rgba(184,64,64,.2);padding:8px 20px;display:flex;align-items:center;gap:8px;font-size:11px;color:#e07070;flex-shrink:0">
    <span>⚠</span>
    <span>Conversación marcada como urgente · ${conv.unread > 0 ? `${conv.unread} mensajes sin leer` : 'Sin mensajes pendientes'}</span>
    ${conv.unread > 0 ? `<button class="btn btn-ghost btn-sm" style="font-size:9px;margin-left:auto;border-color:rgba(184,64,64,.3);color:#e07070" onclick="window._markRead('${conv.id}')">Marcar leído</button>` : ''}
  </div>` : ''}

  <!-- Messages -->
  <div class="chat-messages" id="chat-messages">
    ${bubbles}
  </div>

  <!-- Quick templates -->
  <div style="padding:6px 14px 0;background:var(--bg-card);border-top:1px solid var(--border);display:flex;gap:5px;flex-wrap:wrap;flex-shrink:0">
    <span style="font-size:9px;color:var(--muted);align-self:center">Rápidos:</span>
    ${['Cuota próxima', 'Docs pendientes', 'Confirmación pago', 'Actualización obra'].map(t => `
      <button class="chat-filter-pill" style="font-size:9px;padding:2px 8px" onclick="document.getElementById('chat-input').value='${t} — ';document.getElementById('chat-input').focus()">${t}</button>
    `).join('')}
  </div>

  <!-- Input bar -->
  <div class="chat-input-bar">
    <textarea id="chat-input" class="chat-input" placeholder="Escribe un mensaje… (Enter para enviar)" rows="1"></textarea>
    <button id="chat-send-btn" class="btn btn-primary btn-sm" style="padding:8px 14px;flex-shrink:0">Enviar →</button>
  </div>`;
}

export function init(data) {
  const role    = getRole();
  const isAdmin = role === 'admin';
  const isSA    = role === 'senior_agent';
  const myAgent = isSA ? 'Ana Rodríguez' : null;

  const myName     = isAdmin ? 'Admin Duna' : 'Ana Rodríguez';
  const myInitials = isAdmin ? 'A' : 'AR';
  const myColor    = '#4A5E3F';

  // Build convs map
  let convs = data.clients
    .filter(c => !isSA || c.agent === myAgent)
    .map(c => ({
      id: String(c.id),
      type: 'buyer',
      clientId: c.id,
      name: `${c.firstName} ${c.lastName}`,
      initials: c.initials,
      color: avatarColor(c.id),
      project: c.project,
      unit: c.unit,
      phase: PHASE_LABELS[c.step] || 'Reserva',
      phaseStep: c.step,
      agent: c.agent,
      unread: THREADS[c.id]?.unread || 0,
      priority: THREADS[c.id]?.priority || 'normal',
      lastMsg: (THREADS[c.id]?.messages || []).filter(m => m.from !== 'system').slice(-1)[0]?.text || '—',
    }));

  if (isAdmin) {
    convs.push({ id: 'broker-1', type: 'broker', clientId: null, name: 'José Rodríguez', initials: 'JR', color: '#3a7abd', project: 'JR Real Estate', unit: 'Broker', phase: 'Activo', phaseStep: 0, agent: 'Admin Duna', unread: 0, priority: 'normal' });
  }

  const convMap = Object.fromEntries(convs.map(c => [c.id, c]));

  function showConversation(convId) {
    const conv = convMap[convId];
    if (!conv) return;
    const thread = THREADS[convId] || { messages: [] };
    const mainEl = document.getElementById('chat-main');
    if (!mainEl) return;
    mainEl.innerHTML = buildPanel(conv, thread, isAdmin);

    // scroll to bottom
    const msgs = document.getElementById('chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;

    // mark item as read visually
    document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
    const item = document.querySelector(`.chat-item[data-conv-id="${convId}"]`);
    if (item) {
      item.classList.add('active');
      item.classList.remove('unread');
      item.querySelector('.chat-item-name')?.style && (item.querySelector('.chat-item-name').style.fontWeight = '400');
      item.querySelectorAll('[style*="badge"][style*="orange"]').forEach(b => b.remove());
    }

    // attach send handler
    document.getElementById('chat-send-btn')?.addEventListener('click', () => sendMsg(conv, thread));
    document.getElementById('chat-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(conv, thread); }
    });
  }

  function sendMsg(conv, thread) {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = '';
    const msgEl = document.getElementById('chat-messages');
    if (!msgEl) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-msg-row out';
    bubble.innerHTML = `
      <div style="width:26px;height:26px;border-radius:50%;background:${myColor};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:#fff;flex-shrink:0">${myInitials}</div>
      <div>
        <div style="font-size:9px;color:var(--muted);margin-bottom:3px;text-align:right">${myName} &nbsp;${new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'})}</div>
        <div class="chat-bubble out">${text}</div>
      </div>`;
    msgEl.appendChild(bubble);
    msgEl.scrollTop = msgEl.scrollHeight;
    // persist in thread mock
    thread.messages.push({ from: 'agent', sender: myName, initials: myInitials, color: myColor, text, time: new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'}), date: 'Hoy' });
  }

  // Global action handlers
  window._chatTransfer = (convId) => {
    const conv = convMap[convId];
    const agents = ['Ana Rodríguez', 'Carlos Ruiz', 'Admin Duna'];
    const choice = agents.find(a => a !== conv?.agent) || agents[0];
    window.showToast?.(`✓ Conversación transferida a ${choice}`, 'var(--green-txt)');
  };
  window._chatAddAgent = (convId) => {
    window.showToast?.('✓ Agente senior añadido a la conversación', 'var(--green-txt)');
  };
  window._markRead = (convId) => {
    const item = document.querySelector(`.chat-item[data-conv-id="${convId}"]`);
    if (item) { item.classList.remove('unread'); item.querySelectorAll('[style*="background:var(--orange)"]').forEach(b => b.remove()); }
    document.querySelector('[data-conv-id="' + convId + '"] + * .urgent-bar')?.remove();
    window.showToast?.('✓ Marcado como leído', 'var(--green-txt)');
  };

  // Conversation item click
  document.getElementById('chat-conv-list')?.addEventListener('click', e => {
    const item = e.target.closest('.chat-item');
    if (item) showConversation(item.dataset.convId);
  });

  // Filter pills
  document.querySelectorAll('.chat-filter-pill[data-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.chat-filter-pill[data-filter]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;
      document.querySelectorAll('.chat-item').forEach(item => {
        const show =
          f === 'all'    ? true :
          f === 'unread' ? item.dataset.unread === '1' :
          f === 'urgent' ? item.dataset.priority === 'urgent' :
          f === 'buyer'  ? item.dataset.type === 'buyer' :
          f === 'broker' ? item.dataset.type === 'broker' : true;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  // Phase filter pills
  document.querySelectorAll('.chat-filter-pill[data-phase]').forEach(pill => {
    pill.addEventListener('click', () => {
      const isActive = pill.classList.contains('active');
      document.querySelectorAll('.chat-filter-pill[data-phase]').forEach(p => p.classList.remove('active'));
      if (!isActive) {
        pill.classList.add('active');
        const phase = pill.dataset.phase;
        document.querySelectorAll('.chat-item').forEach(item => {
          item.style.display = item.dataset.phase === phase ? '' : 'none';
        });
      } else {
        document.querySelectorAll('.chat-item').forEach(item => item.style.display = '');
      }
    });
  });

  // Search
  document.getElementById('chat-search-input')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.chat-item').forEach(item => {
      const name = item.querySelector('.chat-item-name')?.textContent.toLowerCase() || '';
      item.style.display = name.includes(q) ? '' : 'none';
    });
  });

  // Auto-select first unread or first item
  const firstUnread = document.querySelector('.chat-item.unread');
  const firstItem   = document.querySelector('.chat-item');
  const target = firstUnread || firstItem;
  if (target) showConversation(target.dataset.convId);
}
