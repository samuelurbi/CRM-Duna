export const meta = { title: 'Mensajes', breadcrumb: 'Mi portal · Mensajes' };

const CHATS = [
  {
    id: 'duna',
    name: 'Equipo Duna',
    initials: 'D',
    color: '#4A5E3F',
    role: 'Duna Development Group',
    unread: 1,
    lastMsg: '¿Cuándo se acredita la comisión de Méndez?',
    lastTime: 'hace 1h',
    messages: [
      { from: 'duna', sender: 'Admin Duna', initials: 'A', color: '#4A5E3F', text: 'José, tienes 2 clientes con promesas listas para firma. Coordina con ellos esta semana.', time: '08:30', date: 'Ayer' },
      { from: 'self', sender: 'José Rodríguez', initials: 'JR', color: '#3a7abd', text: 'Entendido, me pongo en contacto hoy mismo.', time: '09:15', date: 'Ayer' },
      { from: 'self', sender: 'José Rodríguez', initials: 'JR', color: '#3a7abd', text: '¿Cuándo se acredita la comisión del cierre de Méndez? Ya pasaron 15 días.', time: '10:00', date: 'Hoy', unread: true },
    ],
  },
  {
    id: 'carlos',
    name: 'Carlos Ruiz',
    initials: 'CR',
    color: '#3a7abd',
    role: 'Agente Senior · Duna',
    unread: 0,
    lastMsg: 'El cliente García firmará el jueves.',
    lastTime: 'hace 3h',
    messages: [
      { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'José, Ana García confirmó que firmará la promesa el jueves.', time: '09:00', date: 'Hoy' },
      { from: 'self', sender: 'José Rodríguez', initials: 'JR', color: '#3a7abd', text: 'Perfecto, le informo. ¿Hay algo más que deba coordinar?', time: '09:20', date: 'Hoy' },
      { from: 'agent', sender: 'Carlos Ruiz', initials: 'CR', color: '#3a7abd', text: 'Por ahora no, todo en orden. ¡Gracias José!', time: '09:35', date: 'Hoy' },
    ],
  },
];

export function render() {
  let activeChat = CHATS[0];

  function buildBubbles(msgs) {
    let lastDate = null;
    return msgs.map(m => {
      if (m.from === 'system') return `<div class="chat-system-msg">${m.text}</div>`;
      let dateLine = '';
      if (m.date && m.date !== lastDate) {
        lastDate = m.date;
        dateLine = `<div class="chat-date-label">${m.date}</div>`;
      }
      const isOut = m.from === 'self';
      return `${dateLine}
      <div class="chat-msg-row${isOut ? ' out' : ''}">
        <div style="width:28px;height:28px;border-radius:50%;background:${m.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;flex-shrink:0">${m.initials}</div>
        <div>
          <div style="font-size:9px;color:var(--muted);margin-bottom:3px;${isOut?'text-align:right':''}">${m.sender} &nbsp;${m.time}</div>
          <div class="chat-bubble ${isOut ? 'out' : 'in'}">${m.text}</div>
        </div>
      </div>`;
    }).join('');
  }

  return `
<div style="height:100%;display:flex;overflow:hidden;background:var(--bg-surface)">

  <!-- List -->
  <div class="chat-sidebar">
    <div style="padding:14px 14px 10px;border-bottom:1px solid var(--border);flex-shrink:0">
      <div style="font-size:13px;font-weight:600;color:var(--cream);margin-bottom:10px">Mensajes</div>
    </div>
    <div class="chat-conv-list">
      ${CHATS.map((c, i) => `
      <div class="chat-item${c.unread>0?' unread':''}${i===0?' active':''}" data-broker-chat="${c.id}">
        <div style="width:36px;height:36px;border-radius:50%;background:${c.color};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;flex-shrink:0">${c.initials}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
            <span class="chat-item-name" style="font-size:12px;color:${c.unread>0?'var(--cream)':'var(--cream-dim)'}">${c.name}</span>
            <span style="font-size:9px;color:var(--muted)">${c.lastTime}</span>
          </div>
          <div style="font-size:10px;color:var(--muted);margin-bottom:2px">${c.role}</div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">${c.lastMsg}</span>
            ${c.unread>0?`<span style="background:var(--orange);color:#fff;border-radius:10px;font-size:9px;font-weight:700;padding:1px 6px">${c.unread}</span>`:''}
          </div>
        </div>
      </div>
      `).join('')}
    </div>
  </div>

  <!-- Conversation -->
  <div class="chat-main">
    <div style="padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;background:var(--bg-card);flex-shrink:0">
      <div style="width:38px;height:38px;border-radius:50%;background:${activeChat.color};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:#fff">${activeChat.initials}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;color:var(--cream)" id="broker-chat-name">${activeChat.name}</div>
        <div style="font-size:11px;color:var(--muted)">${activeChat.role}</div>
      </div>
    </div>
    <div class="chat-messages" id="broker-chat-msgs">
      ${buildBubbles(activeChat.messages)}
    </div>
    <div class="chat-input-bar">
      <textarea id="broker-chat-input" class="chat-input" placeholder="Escribe un mensaje… (Enter para enviar)" rows="1"></textarea>
      <button id="broker-send-btn" class="btn btn-primary btn-sm" style="padding:8px 14px">Enviar →</button>
    </div>
  </div>
</div>`;
}

export function init() {
  const msgs = document.getElementById('broker-chat-msgs');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;

  function send() {
    const input = document.getElementById('broker-chat-input');
    if (!input?.value.trim()) return;
    const text = input.value.trim();
    input.value = '';
    if (!msgs) return;
    const row = document.createElement('div');
    row.className = 'chat-msg-row out';
    row.innerHTML = `
      <div style="width:28px;height:28px;border-radius:50%;background:#3a7abd;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;flex-shrink:0">JR</div>
      <div>
        <div style="font-size:9px;color:var(--muted);margin-bottom:3px;text-align:right">José Rodríguez &nbsp;${new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'})}</div>
        <div class="chat-bubble out">${text}</div>
      </div>`;
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  document.getElementById('broker-send-btn')?.addEventListener('click', send);
  document.getElementById('broker-chat-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
}
