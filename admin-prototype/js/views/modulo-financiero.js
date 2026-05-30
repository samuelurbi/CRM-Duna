export const meta = { title: 'Módulo Financiero', breadcrumb: 'Unidades · Módulo financiero' };

export function render(data) {
  const cliente   = { name: 'Giuseppe Gangemi', email: 'giuseppe@gmail.com', phone: '+39 333 123 4567', nationality: 'Italiana' };
  const unidadId  = 516;

  // ── Financial config ──────────────────────────────────────────────
  const precioLista = 326000;
  const descuento   = 20000;
  const gastos      = 500;
  const reserva     = 2000;
  const precioVenta = precioLista - descuento;        // 306 000
  const dpPct       = 30;
  const constrPct   = 35;
  const cePct       = 100 - dpPct - constrPct;        // 35
  const dpAmt       = precioVenta * dpPct / 100;      // 91 800
  const constrAmt   = precioVenta * constrPct / 100;  // 107 100
  const ceAmt       = precioVenta * cePct / 100;      // 107 100
  const dpSaldo     = dpAmt - reserva - gastos;       // 89 300
  const numCuotas   = 13;
  const cuotaAmt    = constrAmt / numCuotas;          // 8 238.46…

  const fmt  = n => '$' + (+n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtN = n => (+n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // ── Quarterly installment dates ───────────────────────────────────
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sept','oct','nov','dic'];
  const cuotaRows = Array.from({ length: numCuotas }, (_, i) => {
    const d = new Date(2026, 5, 23);
    d.setMonth(d.getMonth() + (i + 1) * 3);
    return { num: i + 1, fecha: `${d.getDate()} ${meses[d.getMonth()]} de ${d.getFullYear()}` };
  });

  // ── Global functions ──────────────────────────────────────────────
  window.mfSwitchTab = (tabId, btn) => {
    document.querySelectorAll('[data-mf-tab]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.mf-tab-btn').forEach(b => {
      b.style.color = 'var(--sub)';
      b.style.borderBottomColor = 'transparent';
    });
    const el = document.querySelector(`[data-mf-tab="${tabId}"]`);
    if (el) el.style.display = '';
    if (btn) { btn.style.color = 'var(--cream)'; btn.style.borderBottomColor = 'var(--green-txt)'; }
  };

  window.mfCalc = () => {
    const lista  = parseFloat(document.getElementById('mf-lista')?.value)    || 0;
    const desc   = parseFloat(document.getElementById('mf-desc')?.value)     || 0;
    const dp     = parseFloat(document.getElementById('mf-dp-pct')?.value)   || 0;
    const co     = parseFloat(document.getElementById('mf-co-pct')?.value)   || 0;
    const venta  = lista - desc;
    const ce     = 100 - dp - co;
    const fmtI   = n => (+n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const s = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    const sv = (id, v) => { const e = document.getElementById(id); if (e) e.value = v; };
    sv('mf-venta-val', fmtI(venta));
    sv('mf-ce-pct', ce + '%');
    s('mf-desc-pct', (lista ? (desc / lista * 100).toFixed(1) : '0') + '% del precio de lista');
    s('mf-dp-amt',   '$' + fmtI(venta * dp / 100));
    s('mf-co-amt',   '$' + fmtI(venta * co / 100));
    s('mf-ce-amt',   '$' + fmtI(venta * ce / 100));
    const ok = Math.abs(dp + co + ce - 100) < 0.01;
    const el = document.getElementById('mf-verif');
    if (el) { el.textContent = ok ? `✓ Verificación: ${dp}% + ${co}% + ${ce}% = 100%` : `⚠ Error: ${dp}% + ${co}% + ${ce}% ≠ 100%`; el.style.color = ok ? 'var(--green-txt)' : 'var(--orange)'; }
  };

  let mfFracN = 2;
  window.mfAddFrac = () => {
    mfFracN++;
    const container = document.getElementById('mf-fracs');
    if (!container) return;
    const div = document.createElement('div');
    div.style.cssText = 'background:var(--bg-card2);border:1px solid var(--border);border-radius:8px;padding:16px;';
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="width:22px;height:22px;border-radius:50%;background:var(--bg-surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--muted);flex-shrink:0">${mfFracN}</div>
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          <div>
            <div style="font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--sub);margin-bottom:5px">Monto (USD)</div>
            <div style="display:flex;align-items:center;gap:4px;background:var(--bg-surface);border:1px solid var(--border);border-radius:5px;padding:7px 10px">
              <span style="color:var(--sub);font-size:12px">$</span>
              <input type="number" style="background:none;border:none;outline:none;color:var(--cream);font-size:13px;font-family:var(--font-ui);width:100%" placeholder="0.00">
            </div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--sub);margin-bottom:5px">Fecha de pago</div>
            <input type="date" class="field-input" style="font-size:12px;padding:7px 10px">
          </div>
          <div>
            <div style="font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--sub);margin-bottom:5px">Estado</div>
            <select class="field-select" style="font-size:12px;padding:7px 10px">
              <option>○ Futuro</option><option>⏱ Pendiente</option><option>✓ Pagado</option>
            </select>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:16px;flex-shrink:0;padding:2px 6px">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <div style="font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--sub);margin-bottom:5px">Comisión bancaria</div>
          <div style="display:flex;align-items:center;gap:4px;background:var(--bg-surface);border:1px solid var(--border);border-radius:5px;padding:7px 10px">
            <span style="color:var(--sub);font-size:12px">$</span>
            <input type="number" value="0" style="background:none;border:none;outline:none;color:var(--cream);font-size:13px;font-family:var(--font-ui);width:100%">
          </div>
        </div>
        <div>
          <div style="font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--sub);margin-bottom:5px">Justificante de pago</div>
          <div onclick="this.classList.toggle('mf-slot-up')" style="background:var(--bg-surface);border:1.5px dashed rgba(255,255,255,.1);border-radius:6px;padding:9px 12px;display:flex;align-items:center;gap:8px;cursor:pointer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--sub)" stroke-width="2" stroke-linecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            <span style="font-size:11px;color:var(--sub)">Subir comprobante — PDF, JPG o PNG</span>
          </div>
        </div>
      </div>`;
    container.appendChild(div);
  };

  window.mfCheckItem = el => {
    const done = el.dataset.done === '1';
    el.dataset.done = done ? '0' : '1';
    const icon = el.querySelector('.mf-chk');
    if (icon) { icon.style.background = done ? 'transparent' : 'var(--green-txt)'; icon.style.borderColor = done ? 'var(--border)' : 'var(--green-txt)'; }
    el.querySelector('.mf-chk-lbl').style.color = done ? 'var(--text)' : 'var(--sub)';
    const allDone = [...document.querySelectorAll('.mf-check-item')].every(i => i.dataset.done === '1');
    const btn = document.getElementById('mf-iniciar-btn');
    if (btn) { btn.disabled = !allDone; btn.style.opacity = allDone ? '1' : '.45'; btn.style.cursor = allDone ? 'pointer' : 'not-allowed'; }
  };

  // ── Upload slot helper HTML ───────────────────────────────────────
  const uploadSlot = (label, sub, key) => `
    <div onclick="this.dataset.up=this.dataset.up==='1'?'0':'1';this.style.borderColor=this.dataset.up==='1'?'rgba(130,184,112,.35)':'rgba(255,255,255,.1)';this.style.background=this.dataset.up==='1'?'rgba(74,94,63,.08)':'var(--bg-surface)'"
      style="background:var(--bg-surface);border:1.5px dashed rgba(255,255,255,.1);border-radius:7px;padding:12px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:all .12s">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sub)" stroke-width="2" stroke-linecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      <div><div style="font-size:12px;font-weight:500;color:var(--cream-dim)">${label}</div><div style="font-size:10px;color:var(--muted)">${sub}</div></div>
    </div>`;

  const moneyInput = (id, val, readonly = false) => `
    <div style="display:flex;align-items:center;gap:4px;background:${readonly ? 'var(--bg-card2)' : 'var(--bg-surface)'};border:1px solid ${readonly ? 'var(--border2)' : 'var(--border)'};border-radius:6px;padding:8px 11px">
      <span style="color:var(--sub);font-size:12px">$</span>
      <input type="${readonly ? 'text' : 'number'}" ${id ? `id="${id}"` : ''} value="${val}" ${readonly ? 'readonly' : `oninput="mfCalc()"`}
        style="background:none;border:none;outline:none;color:${readonly ? 'var(--cream-dim)' : 'var(--cream)'};font-size:13px;font-family:var(--font-ui);width:100%">
    </div>`;

  const lbl = text => `<span style="display:block;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--sub);margin-bottom:6px">${text}</span>`;

  const statusBadge = (type, text) => {
    const map = { pendiente: 'var(--orange-lite),var(--orange)', futuro: 'var(--blue-lite),var(--blue)', pagado: 'var(--green-lite),var(--green-txt)' };
    const [bg, color] = (map[type] || map.futuro).split(',');
    return `<span style="display:inline-flex;align-items:center;padding:3px 9px;border-radius:4px;font-size:10px;font-weight:600;background:${bg};color:${color};white-space:nowrap">${text}</span>`;
  };

  const infoBar = (text, accent = 'var(--blue)') => `
    <div style="background:var(--bg-surface);border:1px solid var(--border2);border-radius:7px;padding:11px 14px;font-size:11px;color:var(--sub);line-height:1.6;display:flex;gap:10px;align-items:flex-start">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span style="color:${accent === 'var(--orange)' ? 'var(--orange)' : 'inherit'}">${text}</span>
    </div>`;

  const fraccionRow = (num, monto, fecha, estado, statusKey, note = '') => `
    <div style="background:var(--bg-card2);border:1px solid var(--border);border-radius:8px;padding:16px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="width:22px;height:22px;border-radius:50%;background:var(--bg-surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--muted);flex-shrink:0">${num}</div>
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          <div>
            ${lbl('Monto (USD)')}
            ${moneyInput('', fmtN(monto).replace(/,/g, ''))}
            ${note ? `<div style="font-size:10px;color:var(--sub);margin-top:3px">${note}</div>` : ''}
          </div>
          <div>
            ${lbl('Fecha de pago')}
            <input type="date" class="field-input" value="${fecha}" style="font-size:12px;padding:8px 10px">
          </div>
          <div>
            ${lbl('Estado')}
            <select class="field-select" style="font-size:12px;padding:8px 10px">
              <option ${statusKey === 'pendiente' ? 'selected' : ''}>⏱ Pendiente</option>
              <option ${statusKey === 'futuro' ? 'selected' : ''}>○ Futuro</option>
              <option ${statusKey === 'pagado' ? 'selected' : ''}>✓ Pagado</option>
            </select>
          </div>
        </div>
        ${statusBadge(statusKey, estado)}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          ${lbl('Comisión bancaria · Paga: <span style="color:var(--blue);text-transform:none;letter-spacing:0;font-weight:500">👤 Cliente</span>')}
          ${moneyInput('', '0')}
        </div>
        <div>
          ${lbl('Justificante de pago')}
          ${uploadSlot('Subir comprobante', 'PDF, JPG o PNG', 'frac' + num)}
        </div>
      </div>
    </div>`;

  // ── Resumen rows helper ───────────────────────────────────────────
  const resumRow = (label, val, opts = {}) => `
    <div style="display:flex;justify-content:space-between;align-items:center;${opts.sep ? 'border-top:1px solid var(--border2);margin-top:8px;padding-top:8px;' : 'margin-bottom:8px;'}">
      <span style="font-size:12px;color:var(--sub)">${label}</span>
      <span style="font-size:${opts.bold ? '14px' : '12px'};font-weight:${opts.bold ? '700' : '500'};color:${opts.color || 'var(--cream-dim)'}">${val}</span>
    </div>`;

  return `
<style>
  .mf-tab-btn:hover { color:var(--cream-dim) !important; }
  .mf-block { background:var(--bg-card);border:1px solid var(--border);border-radius:10px;margin-bottom:14px;overflow:hidden; }
  .mf-block-hd { padding:16px 20px;border-bottom:1px solid var(--border2);display:flex;align-items:flex-start;justify-content:space-between;gap:16px; }
  .mf-title { font-size:14px;font-weight:600;color:var(--cream);margin-bottom:2px; }
  .mf-sub { font-size:11px;color:var(--sub); }
  .mf-cuota-row { display:grid;grid-template-columns:28px 1fr 110px 100px 80px 110px 120px;align-items:center;gap:8px;padding:8px 14px;border-bottom:1px solid var(--border2);font-size:12px; }
  .mf-cuota-row:last-child { border-bottom:none; }
  .mf-cuota-row:hover { background:var(--bg-row-h); }
  .mf-kpi { background:var(--bg-surface);border:1px solid var(--border2);border-radius:8px;padding:14px 16px;text-align:center; }
  .mf-kpi .v { font-size:22px;font-weight:700;color:var(--cream);line-height:1;margin-bottom:4px; }
  .mf-kpi .l { font-size:10px;color:var(--sub); }
  .mf-check-item { display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border2);cursor:pointer;user-select:none; }
  .mf-check-item:last-child { border-bottom:none; }
  .mf-chk { width:15px;height:15px;border-radius:3px;border:1.5px solid var(--border);flex-shrink:0;transition:all .12s; }
  .mf-doc-row { display:flex;align-items:center;justify-content:space-between;background:var(--bg-surface);border:1px solid var(--border2);border-radius:7px;padding:11px 14px; }
  .mf-pack-card { background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:18px 20px;display:flex;align-items:flex-start;gap:14px;margin-bottom:12px; }
</style>

<div class="view-container">

  <!-- ── Header ────────────────────────────────────────────────────── -->
  <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding-bottom:16px;border-bottom:1px solid var(--border);margin-bottom:0">
    <div>
      <div style="font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Módulo Financiero</div>
      <div style="font-size:18px;font-weight:600;color:var(--cream)">
        Unidad #${unidadId}
        <span style="color:var(--border);font-weight:300"> · </span>
        <span style="font-family:var(--font-display);font-size:19px;font-weight:500;color:var(--cream-dim)">${cliente.name}</span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
      <span style="font-size:11px;color:var(--sub)">Precio venta: <strong style="color:var(--cream)">${fmt(precioVenta)}</strong></span>
      <span style="display:inline-block;padding:3px 9px;border-radius:4px;font-size:10px;font-weight:600;background:var(--orange-lite);color:var(--orange)">0% cobrado</span>
      <button class="btn btn-primary btn-sm" onclick="showToast('Guardado correctamente','var(--green-txt)')">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="margin-right:4px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        Guardar
      </button>
      <button class="btn btn-ghost btn-sm" onclick="alert('Exportar…')">Exportar ▾</button>
      <button class="btn btn-sm" style="background:var(--green);color:#fff;border:1px solid transparent;border-radius:6px;padding:6px 12px;font-size:12px;font-weight:500;font-family:var(--font-ui);cursor:pointer" onclick="alert('Enviando al cliente…')">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="margin-right:4px"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Enviar al cliente
      </button>
    </div>
  </div>

  <!-- ── Tabs ───────────────────────────────────────────────────────── -->
  <div style="display:flex;border-bottom:1px solid var(--border);margin-bottom:22px">
    <button class="mf-tab-btn" onclick="mfSwitchTab('plan',this)"
      style="padding:11px 20px;font-size:12px;font-weight:500;border:none;border-bottom:2px solid var(--green-txt);margin-bottom:-1px;background:none;cursor:pointer;color:var(--cream);font-family:var(--font-ui)">
      💳 Plan de pagos
    </button>
    <button class="mf-tab-btn" onclick="mfSwitchTab('titulares',this)"
      style="padding:11px 20px;font-size:12px;font-weight:500;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;background:none;cursor:pointer;color:var(--sub);font-family:var(--font-ui)">
      👤 Titulares <span style="background:var(--blue-lite);color:var(--blue);font-size:9px;padding:1px 5px;border-radius:3px;margin-left:3px;font-weight:700">1</span>
    </button>
    <button class="mf-tab-btn" onclick="mfSwitchTab('pack',this)"
      style="padding:11px 20px;font-size:12px;font-weight:500;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;background:none;cursor:pointer;color:var(--sub);font-family:var(--font-ui)">
      📋 Pack bienvenida <span style="background:var(--orange-lite);color:var(--orange);font-size:9px;padding:1px 5px;border-radius:3px;margin-left:3px;font-weight:700">3</span>
    </button>
    <button class="mf-tab-btn" onclick="mfSwitchTab('resumen',this)"
      style="padding:11px 20px;font-size:12px;font-weight:500;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;background:none;cursor:pointer;color:var(--sub);font-family:var(--font-ui)">
      🔍 Resumen global
    </button>
  </div>

  <!-- ══════════════════════════════════════════════════════════════ -->
  <!-- TAB: Plan de pagos                                            -->
  <!-- ══════════════════════════════════════════════════════════════ -->
  <div data-mf-tab="plan">

    <!-- Configuración base -->
    <div class="mf-block">
      <div class="mf-block-hd">
        <div><div class="mf-title">Configuración base del contrato</div><div class="mf-sub">Precio, descuento y estructura de pagos</div></div>
      </div>
      <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
          <div>
            ${lbl('Precio de lista (USD)')}
            ${moneyInput('mf-lista', precioLista)}
          </div>
          <div>
            ${lbl('Descuento (USD)')}
            ${moneyInput('mf-desc', descuento)}
            <div style="font-size:10px;color:var(--sub);margin-top:4px" id="mf-desc-pct">${(descuento/precioLista*100).toFixed(1)}% del precio de lista</div>
          </div>
          <div>
            ${lbl('Precio de venta')}
            ${moneyInput('', fmtN(precioVenta), true).replace('id=""', 'id="mf-venta-val"')}
          </div>
          <div>
            ${lbl('Gastos legales (USD)')}
            ${moneyInput('', gastos)}
            <div style="font-size:10px;color:var(--sub);margin-top:4px">Se cobran junto con la reserva</div>
          </div>
        </div>

        <div style="background:var(--bg-card2);border:1px solid var(--border2);border-radius:8px;padding:14px 16px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
          <div>
            ${lbl('Downpayment %')}
            <div style="display:flex;align-items:center;gap:8px">
              <div style="flex:1;display:flex;align-items:center;gap:4px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:8px 10px">
                <input type="number" id="mf-dp-pct" value="${dpPct}" min="0" max="100" oninput="mfCalc()" style="background:none;border:none;outline:none;color:var(--cream);font-size:13px;font-family:var(--font-ui);width:100%">
                <span style="color:var(--sub);font-size:12px">%</span>
              </div>
              <span style="color:var(--sub);font-size:12px">=</span>
              <span style="font-size:13px;color:var(--cream-dim)" id="mf-dp-amt">${fmt(dpAmt)}</span>
            </div>
          </div>
          <div>
            ${lbl('Durante construcción %')}
            <div style="display:flex;align-items:center;gap:8px">
              <div style="flex:1;display:flex;align-items:center;gap:4px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:8px 10px">
                <input type="number" id="mf-co-pct" value="${constrPct}" min="0" max="100" oninput="mfCalc()" style="background:none;border:none;outline:none;color:var(--cream);font-size:13px;font-family:var(--font-ui);width:100%">
                <span style="color:var(--sub);font-size:12px">%</span>
              </div>
              <span style="color:var(--sub);font-size:12px">=</span>
              <span style="font-size:13px;color:var(--cream-dim)" id="mf-co-amt">${fmt(constrAmt)}</span>
            </div>
          </div>
          <div>
            ${lbl('Contra entrega % (auto)')}
            <div style="display:flex;align-items:center;gap:8px">
              <div style="flex:1;display:flex;align-items:center;gap:4px;background:rgba(74,94,63,.1);border:1px solid rgba(130,184,112,.25);border-radius:6px;padding:8px 10px">
                <input type="text" id="mf-ce-pct" value="${cePct}%" readonly style="background:none;border:none;outline:none;color:var(--green-txt);font-size:13px;font-family:var(--font-ui);font-weight:600;width:100%">
              </div>
              <span style="color:var(--sub);font-size:12px">=</span>
              <span style="font-size:13px;color:var(--cream-dim)" id="mf-ce-amt">${fmt(ceAmt)}</span>
            </div>
          </div>
        </div>

        <div style="font-size:11px;color:var(--green-txt)" id="mf-verif">✓ Verificación: ${dpPct}% + ${constrPct}% + ${cePct}% = 100%</div>
      </div>
    </div>

    <!-- Bloque 1: Reserva -->
    <div class="mf-block" style="border-left:3px solid var(--orange)">
      <div class="mf-block-hd">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:3px">
            <div class="mf-title">Bloque 1 — Reserva + Gastos legales</div>
            ${statusBadge('pendiente', '⏱ Pendiente')}
          </div>
          <div class="mf-sub">Primer pago — Trigger del proceso de compra</div>
        </div>
      </div>
      <div style="padding:18px 20px;display:flex;flex-direction:column;gap:14px">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
          <div>${lbl('Monto reserva (USD)')}${moneyInput('', reserva)}</div>
          <div>${lbl('Gastos legales (USD)')}${moneyInput('', gastos)}</div>
          <div>
            ${lbl('Comisión bancaria')}
            ${moneyInput('', 0)}
            <div style="font-size:10px;color:var(--sub);margin-top:4px">Total a transferir: <strong style="color:var(--cream-dim)">${fmt(reserva + gastos)}</strong></div>
          </div>
          <div>${lbl('Fecha de pago')}<input type="date" class="field-input" value="2026-05-01"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          ${uploadSlot('Justificante de pago de la reserva <span style="color:var(--orange)">*</span>', 'Imprescindible para iniciar el proceso', 'res')}
          <div>
            ${lbl('Estado del pago')}
            <select class="field-select" style="font-size:12px">
              <option>⏱ Pendiente</option><option>✓ Pagado</option><option>○ Futuro</option>
            </select>
          </div>
        </div>
        ${infoBar('La reserva desbloquea el pack de bienvenida (KYC + Promesa de Compraventa + Plan de Pagos). El proceso no avanza hasta confirmar este pago y tener el justificante subido.', 'var(--orange)')}
      </div>
    </div>

    <!-- Bloque 2: Downpayment -->
    <div class="mf-block" style="border-left:3px solid var(--orange)">
      <div class="mf-block-hd">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:3px">
            <div class="mf-title">Bloque 2 — Downpayment (${dpPct}%)</div>
            <span style="font-size:12px;font-weight:600;color:var(--orange)">$0.00 de ${fmt(dpSaldo)}</span>
          </div>
          <div class="mf-sub">Monto total: ${fmt(dpAmt)} | (−) Reserva: ${fmt(reserva)} | (−) Gastos legales: ${fmt(gastos)} | Saldo a fraccionar: ${fmt(dpSaldo)}</div>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="mfAddFrac()" style="flex-shrink:0">+ Añadir fracción</button>
      </div>
      <div style="padding:16px 20px">
        ${infoBar('Primera fracción: debe pagarse en los 30 días posteriores a la firma de reserva. Las fracciones adicionales tienen sus propias fechas acordadas con el cliente.')}
        <div id="mf-fracs" style="display:flex;flex-direction:column;gap:10px;margin-top:12px;margin-bottom:10px">
          ${fraccionRow(1, dpSaldo / 2, '2026-05-31', '⏱ Pendiente', 'pendiente', '30 días desde firma de reserva')}
          ${fraccionRow(2, dpSaldo / 2, '2026-06-15', '○ Futuro',    'futuro')}
        </div>
        <button onclick="mfAddFrac()"
          onmouseover="this.style.borderColor='rgba(130,184,112,.3)';this.style.color='var(--cream-dim)'"
          onmouseout="this.style.borderColor='rgba(255,255,255,.1)';this.style.color='var(--sub)'"
          style="width:100%;padding:11px;background:transparent;border:1.5px dashed rgba(255,255,255,.1);border-radius:7px;color:var(--sub);font-size:12px;cursor:pointer;font-family:var(--font-ui);transition:all .12s">
          + Añadir fracción del downpayment
        </button>
      </div>
    </div>

    <!-- Bloque 3: Construcción -->
    <div class="mf-block" style="border-left:3px solid var(--blue)">
      <div class="mf-block-hd">
        <div>
          <div class="mf-title">Bloque 3 — Durante construcción (${constrPct}%)</div>
          <div class="mf-sub">Total: ${fmt(constrAmt)} | ${numCuotas} cuotas trimestrales de ${fmt(cuotaAmt)} c/u</div>
        </div>
      </div>
      <div style="padding:18px 20px">
        <div style="background:var(--bg-card2);border:1px solid var(--border2);border-radius:8px;padding:14px 16px;display:grid;grid-template-columns:1fr 110px 1fr auto;gap:14px;align-items:start;margin-bottom:16px">
          <div>
            ${lbl('Frecuencia de cuotas')}
            <select class="field-select" style="font-size:12px;padding:8px 10px">
              <option selected>Trimestral</option><option>Mensual</option><option>Semestral</option><option>Anual</option>
            </select>
          </div>
          <div>
            ${lbl('N° de cuotas')}
            <div style="display:flex;align-items:center;gap:4px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:8px 10px">
              <input type="number" value="${numCuotas}" style="background:none;border:none;outline:none;color:var(--cream);font-size:13px;font-weight:600;font-family:var(--font-ui);width:100%;text-align:center">
              <span style="color:var(--sub);font-size:10px;white-space:nowrap">cuotas</span>
            </div>
          </div>
          <div>
            ${lbl('Fecha primera cuota')}
            <input type="date" class="field-input" value="2026-06-23" style="font-size:12px;padding:8px 10px">
            <div style="font-size:10px;color:var(--muted);margin-top:3px">Las fechas siguientes se calculan automáticamente</div>
          </div>
          <div style="background:rgba(74,94,63,.1);border:1px solid rgba(130,184,112,.2);border-radius:8px;padding:12px 18px;text-align:center;min-width:140px">
            <div style="font-size:9px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--sub);margin-bottom:4px">Cuota trimestral</div>
            <div style="font-size:20px;font-weight:700;color:var(--green-txt);line-height:1.1">${fmt(cuotaAmt)}</div>
            <div style="font-size:10px;color:var(--sub);margin-top:2px">por cuota</div>
          </div>
        </div>

        <div style="background:var(--bg-card2);border:1px solid var(--border);border-radius:8px;overflow:hidden">
          <div class="mf-cuota-row" style="background:var(--bg-surface)">
            ${['#','Fecha','Monto','Com. bancaria','Justificante','Total','Estado'].map(h => `<span style="font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase">${h}</span>`).join('')}
          </div>
          ${cuotaRows.map(c => `
          <div class="mf-cuota-row">
            <span style="font-size:11px;color:var(--muted)">${c.num}</span>
            <span style="color:var(--text)">${c.fecha}</span>
            <span style="color:var(--cream-dim);font-weight:500">${fmt(cuotaAmt)}</span>
            <div style="background:var(--bg-surface);border:1px solid var(--border2);border-radius:5px;padding:4px 8px;font-size:11px;color:var(--sub)">$0</div>
            <button class="btn btn-ghost btn-sm" style="font-size:10px;padding:3px 8px;display:flex;align-items:center;gap:3px" onclick="alert('Subir comprobante cuota ${c.num}…')">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              Subir
            </button>
            <span style="color:var(--cream-dim);font-weight:500">${fmt(cuotaAmt)}</span>
            <select class="field-select" style="font-size:10px;padding:3px 6px">
              <option>○ Futuro</option><option>⏱ Pendiente</option><option>✓ Pagado</option>
            </select>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Bloque 4: Contra entrega -->
    <div class="mf-block" style="border-left:3px solid var(--blue)">
      <div class="mf-block-hd">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:3px">
            <div class="mf-title">Bloque 4 — Contra entrega (${cePct}%)</div>
            ${statusBadge('futuro', '○ Pago futuro')}
          </div>
          <div class="mf-sub">Pago único al recibir las llaves | ${fmt(ceAmt)} | Estimado: Q3 2027</div>
        </div>
      </div>
      <div style="padding:18px 20px;display:flex;flex-direction:column;gap:14px">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
          <div>
            ${lbl('Monto contra entrega')}
            ${moneyInput('', fmtN(ceAmt), true)}
          </div>
          <div>
            ${lbl('Comisión bancaria')}
            ${moneyInput('', 0)}
            <div style="font-size:10px;color:var(--sub);margin-top:4px">Total a transferir: <strong style="color:var(--cream-dim)">${fmt(ceAmt)}</strong></div>
          </div>
          <div>${lbl('Fecha estimada de entrega')}<input type="date" class="field-input" value="2027-09-30"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          ${uploadSlot('Justificante del pago contra entrega', 'Clic para subir archivo (PDF, JPG, PNG)', 'ce')}
          <div>
            ${lbl('Estado')}
            <select class="field-select" style="font-size:12px">
              <option>○ Futuro</option><option>⏱ Pendiente</option><option>✓ Pagado</option>
            </select>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- ══════════════════════════════════════════════════════════════ -->
  <!-- TAB: Titulares                                                -->
  <!-- ══════════════════════════════════════════════════════════════ -->
  <div data-mf-tab="titulares" style="display:none">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
      <div>
        <h2 style="font-size:17px;font-weight:600;color:var(--cream);margin-bottom:3px">Titulares de la unidad</h2>
        <p style="font-size:12px;color:var(--sub)">Todos los titulares deben firmar el pack de bienvenida y aportar 2 documentos legales cada uno.</p>
      </div>
      <button class="btn btn-primary btn-sm" onclick="alert('Añadir titular…')">+ Añadir titular</button>
    </div>

    ${infoBar('Por cada titular: Documento 1 (Pasaporte o Cédula) + Documento 2 (documento legal alternativo). Ambos son obligatorios y quedan alojados en la ficha del cliente. Todos deben firmar digitalmente el KYC, la Promesa de Compraventa y el Plan de Pagos.')}

    <div style="height:14px"></div>

    <div class="mf-block">
      <div class="mf-block-hd"><div class="mf-title">Titular 1 (Principal)</div></div>
      <div style="padding:18px 20px;display:flex;flex-direction:column;gap:12px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>${lbl('Nombre completo <span style="color:var(--orange)">*</span>')}<input class="field-input" value="${cliente.name}"></div>
          <div>${lbl('Correo electrónico <span style="color:var(--orange)">*</span>')}<input class="field-input" type="email" value="${cliente.email}"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>${lbl('Teléfono / WhatsApp')}<input class="field-input" value="${cliente.phone}"></div>
          <div>${lbl('Nacionalidad')}<input class="field-input" value="${cliente.nationality}"></div>
        </div>

        <div style="background:rgba(74,94,63,.08);border:1.5px solid rgba(130,184,112,.3);border-radius:7px;padding:12px 14px;display:flex;align-items:center;gap:10px">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green-txt)" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:500;color:var(--cream)">Documento 1 — Pasaporte o Cédula <span style="color:var(--orange)">*</span></div>
            <div style="font-size:10px;color:var(--green-txt)">Archivo subido · Clic para reemplazar</div>
          </div>
          <button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="alert('Ver documento…')">Ver</button>
        </div>

        ${uploadSlot('Documento 2 — Documento legal alternativo <span style="color:var(--orange)">*</span>', 'Clic para subir archivo (PDF, JPG, PNG)', 'doc2')}

        <div class="mf-doc-row">
          <span style="font-size:12px;color:var(--cream-dim)">Firma digital del pack de bienvenida</span>
          ${statusBadge('pendiente', '⏱ Pendiente')}
        </div>
      </div>
    </div>

    <div class="mf-block">
      <div class="mf-block-hd"><div class="mf-title">Estado documental consolidado</div></div>
      <div style="padding:16px 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        <div class="mf-kpi"><div class="v">1</div><div class="l">Titulares registrados</div></div>
        <div class="mf-kpi"><div class="v" style="color:var(--green-txt)">1/1</div><div class="l">Doc 1 subido</div></div>
        <div class="mf-kpi"><div class="v" style="color:var(--orange)">0/1</div><div class="l">Doc 2 subido</div></div>
        <div class="mf-kpi"><div class="v" style="color:var(--orange)">0/1</div><div class="l">Firmas completadas</div></div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════ -->
  <!-- TAB: Pack bienvenida                                          -->
  <!-- ══════════════════════════════════════════════════════════════ -->
  <div data-mf-tab="pack" style="display:none">
    <div style="margin-bottom:20px">
      <h2 style="font-size:17px;font-weight:600;color:var(--cream);margin-bottom:4px">Pack de bienvenida</h2>
      <p style="font-size:12px;color:var(--sub)">Documentos que el cliente debe firmar digitalmente para iniciar el proceso de compra.</p>
    </div>

    ${[
      { icon: '👤', title: 'KYC — Conoce Tu Cliente',
        desc: 'El cliente completa el formulario online. El sistema genera el PDF para firma digital de todos los titulares.',
        trigger: 'Disponible tras confirmación de reserva' },
      { icon: '📋', title: 'Promesa de Compraventa',
        desc: 'Contrato de promesa generado automáticamente con los datos del cliente, unidad y condiciones pactadas. Firma de todos los titulares.',
        trigger: 'Disponible tras KYC completado' },
      { icon: '💰', title: 'Plan de Pagos',
        desc: 'El plan de pagos configurado en este módulo se genera como PDF para firma y aceptación del cliente.',
        trigger: 'Disponible tras KYC completado' },
    ].map(doc => `
    <div class="mf-pack-card">
      <div style="width:42px;height:42px;border-radius:9px;background:var(--bg-surface);display:flex;align-items:center;justify-content:center;font-size:21px;flex-shrink:0">${doc.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:var(--cream);margin-bottom:4px">${doc.title}</div>
        <div style="font-size:11px;color:var(--sub);line-height:1.6;margin-bottom:10px">${doc.desc}</div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          ${statusBadge('pendiente', '⏱ Pendiente')}
          <div style="display:flex;align-items:center;gap:6px;background:var(--bg-card2);border:1px solid var(--border2);border-radius:5px;padding:4px 10px;flex:1;min-width:0">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style="font-size:10px;color:var(--muted)">Trigger: ${doc.trigger}</span>
          </div>
          <span style="display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:4px;font-size:10px;background:var(--bg-surface);border:1px solid var(--border2);color:var(--sub);white-space:nowrap">⏱ ${cliente.name}</span>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" style="flex-shrink:0;white-space:nowrap" onclick="alert('Enviando ${doc.title} para firma…')">Enviar para firma</button>
    </div>`).join('')}

    <div class="mf-block" style="margin-top:8px">
      <div class="mf-block-hd">
        <div>
          <div class="mf-title">Checklist para iniciar el proceso</div>
          <div class="mf-sub">Todos los puntos deben estar completados para marcar el proceso como 'Iniciado'</div>
        </div>
      </div>
      <div style="padding:4px 20px 8px">
        ${['Reserva pagada y justificante subido','KYC completado y firmado por todos los titulares','Promesa de Compraventa firmada','Plan de pagos firmado','2 documentos por titular subidos'].map(item => `
          <div class="mf-check-item" data-done="0" onclick="mfCheckItem(this)">
            <div class="mf-chk"></div>
            <span class="mf-chk-lbl" style="font-size:12px;color:var(--text)">${item}</span>
          </div>`).join('')}
      </div>
      <div style="padding:12px 20px;border-top:1px solid var(--border)">
        <button id="mf-iniciar-btn" disabled style="opacity:.45;cursor:not-allowed;background:var(--green);color:#fff;border:none;border-radius:6px;padding:10px 20px;font-size:13px;font-weight:500;font-family:var(--font-ui);display:inline-flex;align-items:center;gap:7px;transition:opacity .12s"
          onclick="if(!this.disabled)alert('Marcando proceso como INICIADO…')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Marcar proceso como INICIADO
        </button>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════ -->
  <!-- TAB: Resumen global                                           -->
  <!-- ══════════════════════════════════════════════════════════════ -->
  <div data-mf-tab="resumen" style="display:none">
    <h2 style="font-size:17px;font-weight:600;color:var(--cream);margin-bottom:18px">Resumen financiero global</h2>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">

      <div class="mf-block">
        <div class="mf-block-hd"><div class="mf-title">Estructura del plan de pagos</div></div>
        <div style="padding:16px 20px">
          ${resumRow('Precio de lista',              fmt(precioLista))}
          ${resumRow(`Descuento (${(descuento/precioLista*100).toFixed(1)}%)`, `−${fmt(descuento)}`, { color: 'var(--red)' })}
          ${resumRow('Precio de venta',              fmt(precioVenta), { bold: true, color: 'var(--cream)', sep: true })}
          ${resumRow('Bloque 1 — Reserva',           fmt(reserva),     { color: 'var(--orange)' })}
          ${resumRow('+ Gastos legales',             fmt(gastos),      { color: 'var(--orange)' })}
          ${resumRow(`Bloque 2 — Downpayment ${dpPct}%`,  fmt(dpAmt))}
          ${resumRow(`Bloque 3 — Construcción ${constrPct}%`, fmt(constrAmt))}
          ${resumRow(`Bloque 4 — Entrega ${cePct}%`,    fmt(ceAmt))}
          ${resumRow('TOTAL DEL CONTRATO',           fmt(precioVenta + gastos), { bold: true, color: 'var(--cream)', sep: true })}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="mf-block" style="flex:1">
          <div class="mf-block-hd"><div class="mf-title">Estado de cobro</div></div>
          <div style="padding:14px 20px">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px">
              <span style="font-size:12px;color:var(--sub)">Cobrado</span>
              <span style="font-size:12px;color:var(--muted)">$0.00 (0%)</span>
            </div>
            <div style="height:5px;background:var(--border);border-radius:3px;overflow:hidden;margin-bottom:14px">
              <div style="width:0%;height:100%;background:var(--green-txt);border-radius:3px"></div>
            </div>
            ${resumRow('Reserva + legales',    'Pendiente',             { color: 'var(--orange)' })}
            ${resumRow('Downpayment cobrado',  '$0.00')}
            ${resumRow(`Cuotas construcción`,  `0/${numCuotas} pagadas`)}
            ${resumRow('Pago contra entrega',  'Pendiente',             { color: 'var(--orange)' })}
            ${resumRow('Pendiente total',      fmt(precioVenta + gastos), { bold: true, color: 'var(--cream)', sep: true })}
          </div>
        </div>

        <div class="mf-block" style="background:rgba(201,124,64,.05);border-color:rgba(201,124,64,.2)">
          <div style="padding:14px 20px">
            <div style="font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--orange);margin-bottom:6px">Próximo pago</div>
            <div style="font-size:26px;font-weight:700;color:var(--cream);margin-bottom:3px">${fmt(dpSaldo / 2)}</div>
            <div style="font-size:11px;color:var(--sub)">Fracción downpayment · 31 may de 2026</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mf-block">
      <div class="mf-block-hd">
        <div>
          <div class="mf-title">Comisiones bancarias registradas</div>
          <div class="mf-sub">Cargo al cliente por defecto, salvo negociación expresa</div>
        </div>
      </div>
      <div style="padding:14px 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
        ${['Reserva','Downpayment (total)','Construcción (total estimado)','Contra entrega'].map(label => `
          <div style="background:var(--bg-surface);border:1px solid var(--border2);border-radius:8px;padding:12px 14px">
            <div style="font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--muted);margin-bottom:6px">${label}</div>
            <div style="font-size:20px;font-weight:700;color:var(--cream);margin-bottom:3px">$0.00</div>
            <div style="font-size:10px;color:var(--sub)">Paga: 👤 cliente</div>
          </div>`).join('')}
      </div>
    </div>
  </div>

</div>`;
}
