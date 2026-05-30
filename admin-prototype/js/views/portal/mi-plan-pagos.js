export const meta = { title: 'Plan de Pagos', breadcrumb: 'Mi Propiedad · Plan de Pagos' };

// Payment schedule for Carlos Méndez — Unidad 111 — $431,000
// Structure: 5% reservation, 15% during construction (24 monthly), 80% at delivery
const SCHEDULE = [
  // Paid
  { num: 0,   label: 'Reserva (5%)',         amount: '$21,550',  date: '15 Mar 2026',  status: 'paid',     concept: 'Cuota inicial de reserva' },
  // Upcoming construction payments (monthly, ~$2,693 each for 15% = $64,650 / 24)
  { num: 1,   label: 'Cuota 1/24',           amount: '$2,694',   date: '15 Abr 2026',  status: 'upcoming', concept: 'Plan construcción — cuota mensual' },
  { num: 2,   label: 'Cuota 2/24',           amount: '$2,694',   date: '15 May 2026',  status: 'next',     concept: 'Plan construcción — cuota mensual' },
  { num: 3,   label: 'Cuota 3/24',           amount: '$2,694',   date: '15 Jun 2026',  status: 'pending',  concept: 'Plan construcción — cuota mensual' },
  { num: 4,   label: 'Cuota 4/24',           amount: '$2,694',   date: '15 Jul 2026',  status: 'pending',  concept: 'Plan construcción — cuota mensual' },
  { num: 5,   label: 'Cuota 5/24',           amount: '$2,694',   date: '15 Ago 2026',  status: 'pending',  concept: 'Plan construcción — cuota mensual' },
  { num: 6,   label: 'Cuotas 6–24',          amount: '$2,694 c/u', date: 'Sep 2026 – Mar 2028', status: 'future', concept: '19 cuotas mensuales restantes' },
  // Final payment
  { num: 25,  label: 'Pago final (80%)',      amount: '$344,800', date: 'Q4 2026 (entrega)', status: 'future', concept: 'Balance total contra entrega de llaves' },
];

export function render(data) {
  const client = data.clients.find(c => c.id === 1);
  const txs    = data.transactions.filter(t => t.client === 'Carlos Méndez');

  const totalPrice = 431000;
  const paid       = 21550;
  const paidPct    = Math.round((paid / totalPrice) * 100);
  const remaining  = totalPrice - paid;

  return `
<div class="view-container" style="max-width:780px">

  <!-- Financial summary -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
    ${[
      { label: 'Precio total',     val: '$431,000', color: 'var(--cream-dim)' },
      { label: 'Total pagado',     val: '$21,550',  color: 'var(--green-txt)' },
      { label: 'Por pagar',        val: '$409,450', color: 'var(--orange)'    },
      { label: '% completado',     val: `${paidPct}%`,  color: 'var(--green-txt)' },
    ].map(s => `
      <div class="panel" style="padding:14px 16px">
        <div style="font-size:10px;color:var(--sub);margin-bottom:4px">${s.label}</div>
        <div style="font-size:20px;font-weight:600;color:${s.color};font-family:'Inter',sans-serif">${s.val}</div>
      </div>
    `).join('')}
  </div>

  <!-- Progress bar -->
  <div class="panel" style="padding:16px 20px;margin-bottom:20px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">Progreso del pago</div>
      <div style="font-size:12px;color:var(--sub)">${paidPct}% pagado de 100%</div>
    </div>
    <div style="background:var(--border);border-radius:6px;height:10px;overflow:hidden;margin-bottom:8px">
      <div style="background:var(--green-txt);height:100%;width:${paidPct}%;border-radius:6px;transition:width .4s"></div>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted)">
      <span>$0</span>
      <span>Construcción (15%)</span>
      <span>Entrega (80%)</span>
      <span>$431,000</span>
    </div>
  </div>

  <!-- Payment schedule -->
  <div class="panel" style="margin-bottom:20px">
    <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">Calendario de pagos</div>
      <button class="btn btn-ghost btn-sm">⬇ Descargar PDF</button>
    </div>
    ${SCHEDULE.map((p, i) => {
      const isPaid    = p.status === 'paid';
      const isNext    = p.status === 'next';
      const isUpcoming= p.status === 'upcoming';
      const isFuture  = p.status === 'future' || p.status === 'pending';
      const rowBg     = isNext ? 'rgba(61,110,42,.05)' : 'transparent';
      const dotColor  = isPaid ? 'var(--green-txt)' : isNext ? 'var(--orange)' : isUpcoming ? 'var(--blue)' : 'var(--border)';
      return `
      <div style="display:flex;align-items:center;gap:16px;padding:12px 16px;${i < SCHEDULE.length-1?'border-bottom:1px solid var(--border)':''};background:${rowBg}">
        <div style="width:10px;height:10px;border-radius:50%;background:${dotColor};flex-shrink:0"></div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:12px;font-weight:${isNext?'700':'500'};color:${isPaid?'var(--sub)':isNext?'var(--cream-dim)':'var(--sub)'}">${p.label}</span>
            ${isNext ? `<span class="badge badge-orange" style="font-size:9px">Próximo</span>` : ''}
            ${isPaid ? `<span class="badge badge-green" style="font-size:9px">Pagado ✓</span>` : ''}
          </div>
          <div style="font-size:11px;color:var(--muted);margin-top:1px">${p.concept}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:13px;font-weight:600;color:${isPaid?'var(--green-txt)':isNext?'var(--orange)':'var(--muted)'};font-family:'Inter',sans-serif">${p.amount}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:1px">${p.date}</div>
        </div>
      </div>`;
    }).join('')}
  </div>

  <!-- Transaction history -->
  <div class="panel">
    <div style="padding:14px 16px;border-bottom:1px solid var(--border)">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">Historial de pagos confirmados</div>
    </div>
    ${txs.length === 0 ? `
      <div style="padding:40px;text-align:center;color:var(--muted);font-size:12px">Sin pagos registrados aún</div>
    ` : txs.map((t, i) => `
      <div style="display:flex;align-items:center;gap:16px;padding:12px 16px;${i < txs.length-1?'border-bottom:1px solid var(--border)':''}">
        <div style="width:36px;height:36px;border-radius:8px;background:var(--green-lite);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🏦</div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:500;color:var(--cream-dim)">${t.concept}</div>
          <div style="font-size:11px;color:var(--sub);margin-top:1px">${t.date} · ${t.method}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:13px;font-weight:600;color:var(--green-txt)">${t.amount}</div>
          <span class="badge badge-green" style="font-size:9px">Confirmado</span>
        </div>
      </div>
    `).join('')}
  </div>

</div>`;
}

export function init() {}
