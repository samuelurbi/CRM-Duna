export const meta = { title: 'Configuración', breadcrumb: 'Sistema · Configuración global' };

export function render(data) {
  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Configuración</h1>
    <div class="view-actions">
      <button class="btn btn-primary btn-sm" onclick="saveConfig()">Guardar cambios</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:200px 1fr;gap:20px;align-items:start">

    <!-- Sidebar nav -->
    <div class="panel" style="position:sticky;top:20px">
      ${[
        { id: 'general',        label: 'General',            icon: '⚙' },
        { id: 'notificaciones', label: 'Notificaciones',     icon: '🔔' },
        { id: 'equipo',         label: 'Equipo y roles',     icon: '👥' },
        { id: 'comisiones',     label: 'Comisiones',         icon: '💰' },
        { id: 'integraciones',  label: 'Integraciones',      icon: '🔗' },
        { id: 'seguridad',      label: 'Seguridad',          icon: '🔒' },
      ].map((s, i) => `
        <div class="config-nav-item ${i === 0 ? 'active' : ''}" data-section="${s.id}"
          onclick="showSection('${s.id}')"
          style="padding:10px 16px;display:flex;align-items:center;gap:8px;cursor:pointer;border-radius:6px;${i === 0 ? 'background:var(--green-lite);color:var(--green-txt)' : 'color:var(--sub)'}">
          <span style="font-size:14px">${s.icon}</span>
          <span style="font-size:12px;font-weight:${i === 0 ? '500' : '400'}">${s.label}</span>
        </div>
      `).join('')}
    </div>

    <!-- Content panels -->
    <div>

      <!-- General -->
      <div id="section-general" class="panel config-section">
        <div class="panel-header"><span class="panel-title">⚙ General</span></div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:18px">
          ${configField('Nombre de la empresa', 'Duna Development Group', 'text')}
          ${configField('Dominio de emails',    'dunacapecana.com',       'text')}
          ${configField('Moneda principal',     'USD',                    'text')}
          ${configField('Zona horaria',         'America/Santo_Domingo (UTC-4)', 'text')}
          ${configField('Idioma del sistema',   'Español',                'text')}
        </div>
      </div>

      <!-- Notificaciones -->
      <div id="section-notificaciones" class="panel config-section" style="display:none">
        <div class="panel-header"><span class="panel-title">🔔 Notificaciones</span></div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
          ${configToggle('Alertas de aprobaciones urgentes', true)}
          ${configToggle('Recordatorios de pagos vencidos', true)}
          ${configToggle('Notificación de nuevo expediente', true)}
          ${configToggle('Resumen diario por email', false)}
          ${configToggle('Alertas de documentos vencidos', true)}
          ${configToggle('Notificaciones de avance de obra', false)}
          <div style="margin-top:8px">${configField('Email de alertas críticas', 'admin@dunacapecana.com', 'email')}</div>
        </div>
      </div>

      <!-- Equipo y roles -->
      <div id="section-equipo" class="panel config-section" style="display:none">
        <div class="panel-header"><span class="panel-title">👥 Equipo y roles</span></div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
          ${configToggle('Requiere aprobación para nuevos usuarios', true)}
          ${configToggle('Agente Senior puede aprobar descuentos <2%', true)}
          ${configToggle('Compradores pueden descargar documentos firmados', true)}
          ${configToggle('Brokers ven comisiones en tiempo real', false)}
          <div style="margin-top:8px">${configField('Límite de descuento sin aprobación', '2%', 'text')}</div>
          <div>${configField('Tiempo máximo para KYC (días)', '15', 'number')}</div>
        </div>
      </div>

      <!-- Comisiones -->
      <div id="section-comisiones" class="panel config-section" style="display:none">
        <div class="panel-header"><span class="panel-title">💰 Comisiones</span></div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
          ${configField('Comisión estándar brokers',          '4%',     'text')}
          ${configField('Comisión brokers internacionales',   '5%',     'text')}
          ${configField('Retención DGII aplicada',            '10%',    'text')}
          ${configField('Días para liquidación de comisión',  '30',     'number')}
          ${configToggle('Calcular comisión sobre precio neto (sin descuento)', false)}
          ${configToggle('Enviar reporte mensual de comisiones a brokers', true)}
        </div>
      </div>

      <!-- Integraciones -->
      <div id="section-integraciones" class="panel config-section" style="display:none">
        <div class="panel-header"><span class="panel-title">🔗 Integraciones</span></div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg-surface);border-radius:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:18px">📧</span>
              <div><div style="font-size:12px;font-weight:500;color:var(--cream-dim)">SMTP / Email</div><div style="font-size:11px;color:var(--sub)">No configurado</div></div>
            </div>
            <button class="btn btn-ghost btn-sm">Configurar</button>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg-surface);border-radius:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:18px">💬</span>
              <div><div style="font-size:12px;font-weight:500;color:var(--cream-dim)">WhatsApp Business API</div><div style="font-size:11px;color:var(--sub)">No configurado</div></div>
            </div>
            <button class="btn btn-ghost btn-sm">Configurar</button>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg-surface);border-radius:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:18px">✍</span>
              <div><div style="font-size:12px;font-weight:500;color:var(--cream-dim)">DocuSign</div><div style="font-size:11px;color:var(--sub)">No configurado</div></div>
            </div>
            <button class="btn btn-ghost btn-sm">Configurar</button>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg-surface);border-radius:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:18px">💳</span>
              <div><div style="font-size:12px;font-weight:500;color:var(--cream-dim)">Stripe</div><div style="font-size:11px;color:var(--sub)">No configurado</div></div>
            </div>
            <button class="btn btn-ghost btn-sm">Configurar</button>
          </div>
        </div>
      </div>

      <!-- Seguridad -->
      <div id="section-seguridad" class="panel config-section" style="display:none">
        <div class="panel-header"><span class="panel-title">🔒 Seguridad</span></div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
          ${configToggle('Autenticación de dos factores (2FA)', false)}
          ${configToggle('Sesión expira tras inactividad (30 min)', true)}
          ${configToggle('Registro de auditoría de acciones admin', true)}
          ${configToggle('Bloqueo tras 5 intentos fallidos', true)}
          <div style="margin-top:8px">${configField('IPs permitidas (whitelist)', 'Todas las IPs', 'text')}</div>
          <div>
            <button class="btn btn-ghost btn-sm" style="color:var(--orange)">Ver log de auditoría</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>`;
}

function configField(label, value, type) {
  return `
  <div>
    <label style="display:block;font-size:11px;font-weight:500;color:var(--sub);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">${label}</label>
    <input type="${type}" value="${value}"
      style="width:100%;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:8px 12px;font-size:12px;color:var(--cream-dim);outline:none;box-sizing:border-box"
      onfocus="this.style.borderColor='var(--green)'" onblur="this.style.borderColor='var(--border)'">
  </div>`;
}

function configToggle(label, active) {
  return `
  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border2)">
    <span style="font-size:12px;color:var(--cream-dim)">${label}</span>
    <div onclick="this.classList.toggle('tog-on');this.style.background=this.classList.contains('tog-on')?'var(--green)':'var(--bg-surface)'"
      style="width:36px;height:20px;border-radius:10px;background:${active ? 'var(--green)' : 'var(--bg-surface)'};border:1px solid var(--border);cursor:pointer;position:relative;transition:background .2s;${active ? 'class="tog-on"' : ''}">
      <div style="position:absolute;top:2px;${active ? 'right:2px' : 'left:2px'};width:14px;height:14px;border-radius:50%;background:${active ? 'var(--cream)' : 'var(--sub)'};transition:all .2s"></div>
    </div>
  </div>`;
}

export function init() {
  window.showSection = (id) => {
    document.querySelectorAll('.config-section').forEach(s => s.style.display = 'none');
    document.getElementById(`section-${id}`).style.display = '';
    document.querySelectorAll('.config-nav-item').forEach(item => {
      const active = item.dataset.section === id;
      item.style.background = active ? 'var(--green-lite)' : 'transparent';
      item.style.color = active ? 'var(--green-txt)' : 'var(--sub)';
      item.querySelector('span:last-child').style.fontWeight = active ? '500' : '400';
    });
  };

  window.saveConfig = () => showToast('✓ Configuración guardada', 'var(--green-txt)');
}

function showToast(msg, color) {
  const e = document.getElementById('duna-toast');
  if (e) e.remove();
  const t = document.createElement('div');
  t.id = 'duna-toast';
  t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;font-size:12px;font-weight:500;color:${color};box-shadow:var(--shadow)`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
