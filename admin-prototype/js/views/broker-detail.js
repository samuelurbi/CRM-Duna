import { getRouteParam } from '../router.js';

export const meta = { title: 'Broker', breadcrumb: 'Equipo · Detalle de broker' };

export function render(data) {
  const id     = parseInt(getRouteParam()) || 1;
  const broker = data.brokers.find(b => b.id === id) || data.brokers[0];

  const myClients = data.clients.slice(0, broker.clients);
  const myTxs     = data.transactions.filter(t =>
    myClients.some(c => `${c.firstName} ${c.lastName}` === t.client)
  );

  const contractBadge = { active:'green', expiring:'orange', pending:'gray' };
  const contractLabel = { active:'Contrato vigente', expiring:'Por vencer', pending:'Sin contrato' };
  const countryFlag   = { RD:'🇩🇴', USA:'🇺🇸', España:'🇪🇸', México:'🇲🇽', Colombia:'🇨🇴' };
  const initials = broker.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  const daysUntilExpiry = broker.contractExpiry
    ? Math.ceil((new Date(broker.contractExpiry) - new Date('2026-05-08')) / 86400000)
    : null;
  const expiryUrgent = daysUntilExpiry !== null && daysUntilExpiry < 60;

  return `
<div style="background:var(--bg-surface);min-height:100vh;padding-bottom:56px">

  <!-- ── Hero ───────────────────────────────── -->
  <div style="background:var(--bg-card);border-bottom:1px solid var(--border);padding:28px 48px 0">

    <div style="margin-bottom:18px">
      <span class="cell-link" onclick="history.back()" style="font-size:12px">← Volver a Brokers</span>
    </div>

    ${expiryUrgent ? `
    <div style="background:rgba(201,124,64,.1);border:1px solid rgba(201,124,64,.28);border-radius:8px;padding:10px 16px;margin-bottom:20px;display:flex;align-items:center;gap:10px">
      <span style="font-size:14px">⚠</span>
      <span style="font-size:12px;color:var(--orange);font-weight:500">Contrato por vencer en ${daysUntilExpiry} días</span>
      <span style="font-size:11px;color:var(--sub)">— vence el ${broker.contractExpiry}</span>
      <button class="btn btn-ghost btn-sm" style="margin-left:auto;color:var(--orange);border-color:rgba(201,124,64,.4);font-size:11px" onclick="showToast('📋 Renovación iniciada','var(--green-txt)')">Renovar ahora →</button>
    </div>` : ''}

    <!-- Identity + actions -->
    <div style="display:flex;align-items:flex-start;gap:22px">
      <div style="width:72px;height:72px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:#fff;flex-shrink:0;border:3px solid rgba(130,184,112,.18)">${initials}</div>

      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:5px">
          <h1 style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;color:var(--cream);line-height:1;margin:0">${broker.name}</h1>
          <span class="badge badge-${broker.status === 'active' ? 'green' : 'gray'}">${broker.status === 'active' ? 'Activo' : 'Pendiente'}</span>
          <span class="badge badge-${contractBadge[broker.contract]}">${contractLabel[broker.contract]}</span>
        </div>
        <div style="font-size:13px;color:var(--sub);margin-bottom:5px">${broker.agency} · ${countryFlag[broker.country] || '🌍'} ${broker.country}</div>
        <a href="mailto:${broker.email}" style="font-size:12px;color:var(--muted);text-decoration:none">✉ ${broker.email}</a>
      </div>

      <div style="display:flex;gap:8px;flex-shrink:0;align-items:center;flex-wrap:wrap">
        ${broker.status === 'pending' ? `<button class="btn btn-primary btn-sm" onclick="showToast('✓ Broker activado','var(--green-txt)')">✓ Activar</button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="window.openEditarBrokerModal(${broker.id})">✏ Editar</button>
        <button class="btn btn-ghost btn-sm" onclick="showToast('Correo enviado','var(--blue)')">✉ Email</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--red);border-color:rgba(184,64,64,.35)" onclick="showToast('Broker suspendido','var(--orange)')">Suspender</button>
      </div>
    </div>

    <!-- KPI strip -->
    <div style="display:flex;margin-top:24px;border-top:1px solid var(--border)">
      ${[
        { label:'Clientes referidos',  val: broker.clients,              hi: true  },
        { label:'Comisión acumulada',  val: broker.commission,           hi: false },
        { label:'Tasa de comisión',    val: '4%',                        hi: false },
        { label:'Vencimiento',         val: broker.contractExpiry || '—', warn: expiryUrgent },
        { label:'Incorporación',       val: 'Ene 2026',                  hi: false },
      ].map((k, i) => `
        <div style="flex:1;padding:14px 0 14px ${i === 0 ? '0' : '24px'};${i > 0 ? 'border-left:1px solid var(--border);' : ''}">
          <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">${k.label}</div>
          <div style="font-size:${k.hi ? '22px' : '17px'};font-weight:700;color:${k.warn ? 'var(--orange)' : k.hi ? 'var(--green-txt)' : 'var(--cream-dim)'}">${k.val}</div>
        </div>
      `).join('')}
    </div>

    <!-- Tab bar -->
    <div style="display:flex;gap:0;margin-top:0" id="bd-tab-bar">
      ${[
        ['perfil',         'Perfil'],
        ['clientes',       `Clientes (${broker.clients})`],
        ['contrato',       'Contrato'],
        ['transacciones',  'Transacciones'],
      ].map(([t, l], i) => `
        <div class="bd-tab" data-tab="${t}" onclick="switchBdTab('${t}')"
          style="padding:12px 18px;font-size:12px;font-weight:500;cursor:pointer;border-bottom:2px solid ${i === 0 ? 'var(--green-txt)' : 'transparent'};color:${i === 0 ? 'var(--green-txt)' : 'var(--sub)'};user-select:none;white-space:nowrap;transition:color .15s">
          ${l}
        </div>
      `).join('')}
    </div>
  </div><!-- /hero -->

  <!-- ── Tab content ─────────────────────────── -->
  <div style="padding:28px 48px 0">

    <!-- Perfil -->
    <div id="bdtab-perfil">
      <div style="display:grid;grid-template-columns:1fr 1fr 280px;gap:18px">

        <div class="panel">
          <div class="panel-header" style="height:40px">
            <span style="font-size:11px;font-weight:600;color:var(--cream-dim)">Datos de contacto</span>
          </div>
          <div style="padding:4px 16px 8px">
            ${kv('Nombre',        broker.name)}
            ${kv('Agencia',       broker.agency)}
            ${kv('Email',         `<a href="mailto:${broker.email}" style="color:var(--blue);text-decoration:none">${broker.email}</a>`)}
            ${kv('País',          `${countryFlag[broker.country] || '🌍'} ${broker.country}`)}
            ${kv('Estado',        `<span class="badge badge-${broker.status === 'active' ? 'green' : 'gray'}">${broker.status === 'active' ? 'Activo' : 'Pendiente'}</span>`)}
            ${kv('Contrato',      `<span class="badge badge-${contractBadge[broker.contract]}">${contractLabel[broker.contract]}</span>`)}
            ${kv('Incorporación', 'Enero 2026')}
          </div>
        </div>

        <div class="panel">
          <div class="panel-header" style="height:40px">
            <span style="font-size:11px;font-weight:600;color:var(--cream-dim)">Rendimiento</span>
          </div>
          <div style="padding:4px 16px 8px">
            ${kv('Clientes referidos',    `<strong style="color:var(--green-txt)">${broker.clients}</strong>`)}
            ${kv('Comisión acumulada',    `<strong style="color:var(--cream-dim)">${broker.commission}</strong>`)}
            ${kv('Tasa de comisión',      '4% sobre precio neto')}
            ${kv('Proyectos activos',     'Makai Residences')}
            ${kv('Último cierre',         myClients.length ? `${myClients[0].firstName} ${myClients[0].lastName}` : '—')}
            ${kv('Vencimiento contrato',  broker.contractExpiry
              ? `<span style="color:${expiryUrgent ? 'var(--orange)' : 'var(--cream-dim)'}">${broker.contractExpiry}</span>`
              : '—')}
          </div>
        </div>

        <div class="panel" style="display:flex;flex-direction:column">
          <div class="panel-header" style="height:40px">
            <span style="font-size:11px;font-weight:600;color:var(--cream-dim)">Notas internas</span>
            <span class="cell-link" style="font-size:10px" onclick="window.openEditarBrokerModal(${broker.id})">Editar</span>
          </div>
          <div style="padding:14px 16px;flex:1;font-size:12px;color:var(--sub);line-height:1.75">
            Broker con buen historial de referencias internacionales. Canal principal: compradores de EE.UU. y Europa.
            <br><br>
            <span style="color:var(--muted)">Preferencia por comunicación vía email. Responde en horario EST.</span>
          </div>
          ${expiryUrgent ? `
          <div style="margin:0 14px 14px;padding:10px 12px;background:rgba(201,124,64,.1);border:1px solid rgba(201,124,64,.25);border-radius:6px">
            <div style="font-size:11px;color:var(--orange);font-weight:600;margin-bottom:4px">⚠ Renovación pendiente</div>
            <div style="font-size:11px;color:var(--sub)">Vence en ${daysUntilExpiry} días</div>
          </div>` : ''}
        </div>

      </div>
    </div>

    <!-- Clientes -->
    <div id="bdtab-clientes" style="display:none">
      ${myClients.length === 0
        ? `<div class="panel" style="padding:48px;text-align:center;font-size:13px;color:var(--muted)">Sin clientes referidos aún</div>`
        : `<div class="panel">
          <div class="panel-header" style="height:42px">
            <span style="font-size:11px;font-weight:600;color:var(--cream-dim)">Clientes referidos por ${broker.name}</span>
            <span style="font-size:11px;color:var(--sub)">${broker.clients} clientes</span>
          </div>
          <table class="data-table">
            <thead>
              <tr><th>Cliente</th><th>Unidad</th><th>Proyecto</th><th>Estado</th><th>Comisión est.</th><th></th></tr>
            </thead>
            <tbody>
              ${myClients.map(c => {
                const price = data.units?.find(u => u.num === c.unit)?.price || 389000;
                const comm  = '$' + Math.round(price * 0.04).toLocaleString('en-US');
                return `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px">
                      <div style="width:28px;height:28px;border-radius:50%;background:var(--green-lite);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:var(--green-txt);flex-shrink:0">${c.initials}</div>
                      <span class="cell-name">${c.firstName} ${c.lastName}</span>
                    </div>
                  </td>
                  <td><span style="font-size:12px;color:var(--sub)">${c.unit}</span></td>
                  <td><span style="font-size:12px;color:var(--sub)">${c.project}</span></td>
                  <td><span class="badge badge-${c.statusColor}">${c.statusLabel}</span></td>
                  <td><span style="font-size:12px;font-weight:600;color:var(--green-txt)">${comm}</span></td>
                  <td><span class="cell-link" style="font-size:11px" onclick="window.location.hash='expedientes'">Ver expediente →</span></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`}
    </div>

    <!-- Contrato -->
    <div id="bdtab-contrato" style="display:none">
      <div style="display:grid;grid-template-columns:1fr 300px;gap:18px">

        <div class="panel">
          <div class="panel-header" style="height:42px">
            <span style="font-size:11px;font-weight:600;color:var(--cream-dim)">Contrato de Comisiones</span>
            <span class="badge badge-${contractBadge[broker.contract]}">${contractLabel[broker.contract]}</span>
          </div>
          <div style="padding:16px">
            <div style="font-family:'Cormorant Garamond',serif;font-size:17px;color:var(--cream);margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border)">
              Contrato de Intermediación — ${broker.agency}
            </div>
            ${[
              ['Partes',              `Duna Development Group &amp; ${broker.agency}`],
              ['Tasa de comisión',    '4% sobre precio de venta neto'],
              ['Proyectos cubiertos', 'Makai Residences, Naviva (cuando aplique)'],
              ['Forma de pago',       'Transferencia bancaria a los 30 días del cierre'],
              ['Vigencia',            broker.contractExpiry ? `Hasta el ${broker.contractExpiry}` : 'Pendiente de firma'],
              ['Exclusividad',        'No exclusivo — múltiples canales permitidos'],
              ['Renovación',          'Automática salvo aviso con 60 días de anticipación'],
              ['Jurisdicción',        'República Dominicana'],
            ].map(([k, v]) => `
              <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--border);font-size:12px;gap:16px">
                <span style="color:var(--sub);flex-shrink:0">${k}</span>
                <span style="color:var(--cream-dim);font-weight:500;text-align:right">${v}</span>
              </div>
            `).join('')}
            <div style="margin-top:14px;padding:12px;background:var(--bg-surface);border-radius:6px;font-size:11px;color:var(--muted);line-height:1.7">
              <strong style="color:var(--sub)">Cláusulas clave — </strong>
              El broker se compromete a referir clientes con capacidad financiera verificable. Las comisiones no aplican sobre descuentos superiores al 3% negociados directamente por la desarrolladora. Toda disputa se resolverá bajo legislación dominicana.
            </div>
          </div>
          <div style="padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:8px">
            <button class="btn btn-ghost btn-sm" onclick="showToast('Descargando PDF…','var(--blue)')">⬇ Descargar PDF</button>
            ${broker.contract === 'expiring' ? `<button class="btn btn-primary btn-sm" onclick="showToast('📋 Renovación iniciada','var(--green-txt)')">🔄 Renovar contrato</button>` : ''}
            ${broker.contract === 'pending'  ? `<button class="btn btn-primary btn-sm" onclick="showToast('✉ Contrato enviado a firma','var(--blue)')">✍ Enviar a firma</button>` : ''}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="panel">
            <div class="panel-header" style="height:40px">
              <span style="font-size:11px;font-weight:600;color:var(--cream-dim)">Documentos</span>
            </div>
            ${[
              { icon:'📄', name:'Contrato firmado',        ok: broker.contract !== 'pending' },
              { icon:'🪪', name:'Identificación oficial',  ok: broker.contract !== 'pending' },
              { icon:'🏦', name:'Datos bancarios',         ok: broker.status === 'active'    },
            ].map(d => `
              <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border)">
                <span style="font-size:15px">${d.icon}</span>
                <div style="flex:1;font-size:11px;color:var(--cream-dim)">${d.name}</div>
                <span style="font-size:10px;font-weight:500;color:${d.ok ? 'var(--green-txt)' : 'var(--muted)'}">${d.ok ? '✓ OK' : 'Pendiente'}</span>
              </div>
            `).join('')}
          </div>

          ${expiryUrgent ? `
          <div style="background:rgba(201,124,64,.1);border:1px solid rgba(201,124,64,.28);border-radius:8px;padding:16px">
            <div style="font-size:12px;font-weight:600;color:var(--orange);margin-bottom:6px">⚠ Renovación urgente</div>
            <div style="font-size:11px;color:var(--sub);line-height:1.65;margin-bottom:12px">
              Vence en <strong style="color:var(--orange)">${daysUntilExpiry} días</strong>.<br>
              Se recomienda iniciar el proceso antes del ${broker.contractExpiry}.
            </div>
            <button class="btn btn-ghost btn-sm" style="color:var(--orange);border-color:rgba(201,124,64,.4);width:100%;justify-content:center" onclick="showToast('📋 Renovación iniciada','var(--green-txt)')">Renovar ahora →</button>
          </div>` : ''}
        </div>

      </div>
    </div>

    <!-- Transacciones -->
    <div id="bdtab-transacciones" style="display:none">
      <div class="panel">
        <div class="panel-header" style="height:42px">
          <span style="font-size:11px;font-weight:600;color:var(--cream-dim)">Historial de transacciones</span>
          <span style="font-size:11px;color:var(--sub)">${myTxs.length} movimientos</span>
        </div>
        ${myTxs.length === 0
          ? `<div style="padding:32px;text-align:center;font-size:12px;color:var(--muted)">Sin transacciones registradas</div>`
          : `<table class="data-table">
              <thead>
                <tr><th>Cliente</th><th>Concepto</th><th>Monto transacción</th><th>Comisión (4%)</th><th>Método</th><th>Fecha</th><th>Estado</th></tr>
              </thead>
              <tbody>
                ${myTxs.map(t => {
                  const raw  = parseFloat(t.amount.replace(/[$,]/g, ''));
                  const comm = isNaN(raw) ? '—' : '$' + Math.round(raw * 0.04).toLocaleString('en-US');
                  return `
                  <tr>
                    <td><span class="cell-name">${t.client}</span></td>
                    <td><span style="font-size:11px;color:var(--sub)">${t.concept}</span></td>
                    <td><span style="font-size:12px;font-weight:600;color:var(--cream-dim)">${t.amount}</span></td>
                    <td><span style="font-size:12px;font-weight:600;color:var(--green-txt)">${comm}</span></td>
                    <td><span style="font-size:11px;color:var(--muted)">${t.method}</span></td>
                    <td><span style="font-size:11px;color:var(--muted)">${t.date}</span></td>
                    <td><span class="badge badge-${t.statusCls}">${t.statusLabel}</span></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>`}
      </div>
    </div>

  </div><!-- /content -->
</div>`;
}

export function init() {
  window.switchBdTab = (tab) => {
    ['perfil', 'clientes', 'contrato', 'transacciones'].forEach(t => {
      const el = document.getElementById(`bdtab-${t}`);
      if (el) el.style.display = t === tab ? '' : 'none';
    });
    document.querySelectorAll('#bd-tab-bar .bd-tab').forEach(btn => {
      const active = btn.dataset.tab === tab;
      btn.style.borderBottomColor = active ? 'var(--green-txt)' : 'transparent';
      btn.style.color = active ? 'var(--green-txt)' : 'var(--sub)';
    });
  };
}

function kv(label, val) {
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border);font-size:12px;gap:12px">
    <span style="color:var(--sub);flex-shrink:0">${label}</span>
    <span style="color:var(--cream-dim);font-weight:500;text-align:right">${val}</span>
  </div>`;
}
