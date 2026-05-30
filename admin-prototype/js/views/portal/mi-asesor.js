export const meta = { title: 'Mi Asesor', breadcrumb: 'Mi Propiedad · Mi Asesor' };

export function render(data) {
  const client = data.clients.find(c => c.id === 1);

  return `
<div class="view-container" style="max-width:680px">

  <!-- Asesor card -->
  <div class="panel" style="padding:32px;margin-bottom:20px;text-align:center">
    <div style="width:72px;height:72px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:600;color:#fff;margin:0 auto 14px;font-family:'Inter',sans-serif">AR</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:var(--cream-dim);margin-bottom:4px">Ana Rodríguez</div>
    <div style="font-size:12px;color:var(--sub);margin-bottom:6px">Asesora de Ventas · Duna Development Group</div>
    <div style="display:flex;justify-content:center;gap:8px;margin-bottom:24px">
      <span class="badge badge-green">Activa</span>
      <span style="font-size:11px;color:var(--muted);padding:2px 8px">Responde en menos de 1h</span>
    </div>

    <!-- Contact buttons -->
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://wa.me/18095550001?text=Hola%20Ana%2C%20soy%20Carlos%20Méndez%2C%20comprador%20de%20Unidad%20111%20en%20Makai%20Residences"
         target="_blank" rel="noopener"
         style="display:flex;align-items:center;gap:8px;background:#25d366;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600">
        <span style="font-size:16px">💬</span> WhatsApp
      </a>
      <a href="mailto:ana.rodriguez@dunacapecana.com?subject=Consulta%20Unidad%20111%20-%20Makai%20Residences"
         style="display:flex;align-items:center;gap:8px;background:var(--green);color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600">
        <span style="font-size:16px">✉</span> Enviar email
      </a>
      <button class="btn btn-ghost btn-sm" style="display:flex;align-items:center;gap:8px" onclick="showScheduleModal()">
        <span style="font-size:14px">📅</span> Agendar llamada
      </button>
    </div>
  </div>

  <!-- Horarios y disponibilidad -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
    <div class="panel" style="padding:20px">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim);margin-bottom:12px">Disponibilidad</div>
      ${[
        ['Lunes – Viernes', '9:00 AM – 6:00 PM'],
        ['Sábados',         '10:00 AM – 2:00 PM'],
        ['Domingos',        'No disponible'],
      ].map(([day, hours]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:11px;color:var(--sub)">${day}</span>
          <span style="font-size:11px;color:${day === 'Domingos' ? 'var(--muted)' : 'var(--cream-dim)'};font-weight:500">${hours}</span>
        </div>
      `).join('')}
      <div style="margin-top:10px">
        <div style="font-size:10px;color:var(--muted)">Zona horaria: AST (UTC-4) · Santo Domingo</div>
      </div>
    </div>

    <div class="panel" style="padding:20px">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim);margin-bottom:12px">Canales de contacto</div>
      ${[
        { icon: '💬', label: 'WhatsApp',    val: '+1 809-555-0001', primary: true  },
        { icon: '✉',  label: 'Email',       val: 'ana.rodriguez@dunacapecana.com', primary: false },
        { icon: '📞', label: 'Teléfono',    val: '+1 809-555-0001', primary: false },
      ].map(c => `
        <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:14px;width:20px;text-align:center">${c.icon}</span>
          <div style="flex:1">
            <div style="font-size:10px;color:var(--muted)">${c.label}</div>
            <div style="font-size:11px;color:var(--cream-dim);font-weight:${c.primary?'600':'400'}">${c.val}</div>
          </div>
          ${c.primary ? `<span class="badge badge-green" style="font-size:9px">Principal</span>` : ''}
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Duna info -->
  <div class="panel" style="padding:20px">
    <div style="font-size:12px;font-weight:600;color:var(--cream-dim);margin-bottom:14px">Duna Development Group</div>
    <div style="display:flex;align-items:start;gap:16px">
      <div style="width:44px;height:44px;border-radius:8px;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;font-family:'Inter',sans-serif">D</div>
      <div>
        <div style="font-size:12px;color:var(--cream-dim);margin-bottom:4px">Desarrolladora de proyectos residenciales de lujo en Cap Cana, Punta Cana, República Dominicana.</div>
        <div style="font-size:11px;color:var(--sub)">Makai Residences · Naviva Residences · LIV at Cap Cana</div>
        <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap">
          ${[
            { icon: '🌐', label: 'dunacapecana.com' },
            { icon: '📍', label: 'Cap Cana, Punta Cana RD' },
            { icon: '✉',  label: 'info@dunacapecana.com' },
          ].map(i => `
            <div style="display:flex;align-items:center;gap:5px">
              <span style="font-size:11px">${i.icon}</span>
              <span style="font-size:11px;color:var(--sub)">${i.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- Schedule modal placeholder -->
  <div id="schedule-modal-placeholder"></div>

</div>`;
}

export function init() {
  window.showScheduleModal = () => {
    if (typeof openModal === 'function') {
      openModal(`
        <div class="modal">
          <div class="modal-header">
            <span style="font-size:13px;font-weight:600;color:var(--cream-dim)">Agendar llamada con Ana</span>
            <button class="modal-close" onclick="closeModal()">✕</button>
          </div>
          <div class="modal-body" style="padding:24px;text-align:center">
            <div style="font-size:28px;margin-bottom:12px">📅</div>
            <div style="font-size:13px;font-weight:500;color:var(--cream-dim);margin-bottom:8px">Selecciona una fecha y hora</div>
            <div style="font-size:12px;color:var(--sub);margin-bottom:20px">Ana te confirmará la llamada por WhatsApp</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
              ${['Lun 12 May · 10am', 'Lun 12 May · 2pm', 'Mar 13 May · 10am', 'Mar 13 May · 3pm',
                 'Mié 14 May · 11am', 'Jue 15 May · 4pm'].map(slot => `
                <button onclick="this.closest('.modal').querySelectorAll('button[data-slot]').forEach(b=>b.style.background='');this.style.background='var(--green-lite)';this.dataset.slot='selected'"
                  data-slot="${slot}"
                  style="padding:8px 12px;border-radius:8px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:11px;color:var(--cream-dim);transition:background .15s">${slot}</button>
              `).join('')}
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-primary btn-sm" onclick="closeModal();showToast('✓ Solicitud enviada a Ana Rodríguez','var(--green-txt)')">Solicitar llamada</button>
          </div>
        </div>
      `);
    }
  };
}
