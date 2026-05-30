export const meta = { title: 'Mensajes', breadcrumb: 'Mi portal · Mensajes' };

const MY_THREAD = [
  { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: '¡Bienvenido Carlos! Soy Ana, tu asesora en Makai Residences. Estoy aquí para acompañarte en todo el proceso.', time: '10:00', date: 'hace 15 días' },
  { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: 'Hola Ana, gracias. Muy emocionado con esta inversión.', time: '10:30', date: 'hace 15 días' },
  { from: 'system', text: '📎 Checklist de documentos KYC enviado' },
  { from: 'agent', sender: 'Ana Rodríguez', initials: 'AR', color: '#4A5E3F', text: 'Carlos, necesitamos los documentos KYC para continuar. Te envié el checklist por correo. Son 3 documentos: pasaporte, comprobante de ingresos y referencias bancarias.', time: '09:15', date: 'Ayer' },
  { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: 'Estoy preparando los documentos. ¿Cuánto tiempo tengo?', time: '14:22', date: 'Hoy' },
  { from: 'client', sender: 'Carlos Méndez', initials: 'CM', color: '#c97c40', text: 'Hola Ana, sigo esperando respuesta. ¿Todo bien?', time: '15:41', date: 'Hoy' },
];

export function render() {
  let lastDate = null;

  const bubbles = MY_THREAD.map(m => {
    if (m.from === 'system') {
      return `<div class="chat-system-msg">${m.text}</div>`;
    }
    let dateLine = '';
    if (m.date && m.date !== lastDate) {
      lastDate = m.date;
      dateLine = `<div class="chat-date-label">${m.date}</div>`;
    }
    const isOut = m.from === 'client';
    return `${dateLine}
    <div class="chat-msg-row${isOut ? ' out' : ''}">
      <div style="width:28px;height:28px;border-radius:50%;background:${m.color};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;flex-shrink:0">${m.initials}</div>
      <div>
        <div style="font-size:9px;color:var(--muted);margin-bottom:3px;${isOut?'text-align:right':''}">${m.sender} &nbsp;${m.time}</div>
        <div class="chat-bubble ${isOut ? 'out' : 'in'}">${m.text}</div>
      </div>
    </div>`;
  }).join('');

  return `
<div style="height:100%;display:flex;flex-direction:column;overflow:hidden;background:var(--bg-surface)">

  <!-- Agent header -->
  <div style="padding:16px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px;background:var(--bg-card);flex-shrink:0">
    <div style="width:44px;height:44px;border-radius:50%;background:#4A5E3F;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:#fff;flex-shrink:0;position:relative">
      AR
      <span style="position:absolute;bottom:1px;right:1px;width:10px;height:10px;border-radius:50%;background:var(--green-txt);border:1.5px solid var(--bg-card)"></span>
    </div>
    <div style="flex:1">
      <div style="font-size:14px;font-weight:600;color:var(--cream);margin-bottom:2px">Ana Rodríguez</div>
      <div style="font-size:11px;color:var(--sub)">Tu asesora · Makai Residences</div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="showToast('Abriendo WhatsApp…','var(--green-txt)')">💬 WhatsApp</button>
      <button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="showToast('Iniciando llamada…','var(--green-txt)')">📞 Llamar</button>
    </div>
  </div>

  <!-- Messages -->
  <div class="chat-messages" id="buyer-chat-msgs">
    ${bubbles}
  </div>

  <!-- Quick replies -->
  <div style="padding:6px 16px 0;border-top:1px solid var(--border);background:var(--bg-card);display:flex;gap:5px;flex-wrap:wrap;flex-shrink:0">
    <span style="font-size:9px;color:var(--muted);align-self:center">Respuestas rápidas:</span>
    ${['¿Cuándo vence mi próximo pago?', '¿Cómo subo los documentos?', '¿Cuál es el avance de obra?', 'Necesito más información'].map(t => `
      <button class="chat-filter-pill" style="font-size:10px;padding:3px 9px" onclick="document.getElementById('buyer-chat-input').value='${t}';document.getElementById('buyer-chat-input').focus()">${t}</button>
    `).join('')}
  </div>

  <!-- Input -->
  <div class="chat-input-bar">
    <textarea id="buyer-chat-input" class="chat-input" placeholder="Escribe un mensaje a tu asesora… (Enter para enviar)" rows="1"></textarea>
    <button id="buyer-send-btn" class="btn btn-primary btn-sm" style="padding:8px 14px">Enviar →</button>
  </div>

</div>`;
}

export function init() {
  const msgs  = document.getElementById('buyer-chat-msgs');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;

  function send() {
    const input = document.getElementById('buyer-chat-input');
    if (!input?.value.trim()) return;
    const text = input.value.trim();
    input.value = '';
    if (!msgs) return;
    const row = document.createElement('div');
    row.className = 'chat-msg-row out';
    row.innerHTML = `
      <div style="width:28px;height:28px;border-radius:50%;background:#c97c40;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;flex-shrink:0">CM</div>
      <div>
        <div style="font-size:9px;color:var(--muted);margin-bottom:3px;text-align:right">Carlos Méndez &nbsp;${new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'})}</div>
        <div class="chat-bubble out">${text}</div>
      </div>`;
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;

    // Simulated response after 1.5s
    setTimeout(() => {
      const resp = document.createElement('div');
      resp.className = 'chat-msg-row';
      resp.innerHTML = `
        <div style="width:28px;height:28px;border-radius:50%;background:#4A5E3F;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff;flex-shrink:0">AR</div>
        <div>
          <div style="font-size:9px;color:var(--muted);margin-bottom:3px">Ana Rodríguez &nbsp;${new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'})}</div>
          <div class="chat-bubble in">Gracias Carlos, te respondo en breve. 👍</div>
        </div>`;
      msgs.appendChild(resp);
      msgs.scrollTop = msgs.scrollHeight;
    }, 1500);
  }

  document.getElementById('buyer-send-btn')?.addEventListener('click', send);
  document.getElementById('buyer-chat-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
}
