import { getRouteParam } from '../router.js';

export const meta = { title: 'Ficha de Proyecto', breadcrumb: 'Proyectos · Ficha completa' };

/* ── Investment assumptions per project ─────────── */
const INVESTMENT = {
  makai: {
    priceFrom:      365000,
    priceAvg:       431000,
    priceMax:       498000,
    deliveryEst:    'Q4 2026',
    deliveryRisk:   'Bajo',
    legalStatus:    'Registrado DGII · Fideicomiso activo',
    rentalPool:     true,
    rentalPoolMgr:  'Duna Hospitality Group',
    occupancyEst:   72,
    nightlyRateEst: 210,
    mgmtFee:        22,
    appreciationPct:5,
    launchDiscount: 20000,
    launchDeadline: 'Jun 2026',
    amenities: ['Beach Club privado','Marina Cap Cana','Golf 18 hoyos','Spa & Wellness','Seguridad 24/7','Concierge'],
    unitTypes: [
      { type: 'Studio+',    units: 18, sqft: '870–900',    priceFrom: 365000, priceAvg: 387000, sold: 4, yield: 15.8 },
      { type: '1 Bed',      units: 24, sqft: '900–980',    priceFrom: 395000, priceAvg: 412000, sold: 6, yield: 14.9 },
      { type: '1 Bed + FR', units: 20, sqft: '950–1,050',  priceFrom: 415000, priceAvg: 431000, sold: 5, yield: 14.2 },
      { type: '2 Bed',      units: 28, sqft: '1,050–1,200',priceFrom: 431000, priceAvg: 447000, sold: 5, yield: 13.6 },
      { type: '3 Bed',      units: 10, sqft: '1,380–1,500',priceFrom: 445000, priceAvg: 470000, sold: 2, yield: 12.8 },
      { type: 'Penthouse',  units:  2, sqft: '1,500+',     priceFrom: 480000, priceAvg: 490000, sold: 0, yield: 11.5 },
    ],
  },
};

export function render(data) {
  const id      = parseInt(getRouteParam()) || 1;
  const project = data.projects.find(p => p.id === id) || data.projects[0];
  const constr  = data.construction[project.slug] || data.construction.makai;
  const inv     = INVESTMENT[project.slug] || INVESTMENT.makai;

  // ── Computed financials ──────────────────────────
  const grossMonthlyRental = Math.round(inv.nightlyRateEst * 365 * (inv.occupancyEst / 100) / 12);
  const netMonthlyRental   = Math.round(grossMonthlyRental * (1 - inv.mgmtFee / 100));
  const netAnnualRental    = netMonthlyRental * 12;
  const netYield           = ((netAnnualRental / inv.priceAvg) * 100).toFixed(1);
  const totalROI           = (parseFloat(netYield) + inv.appreciationPct).toFixed(1);
  const paybackYears       = (inv.priceAvg / netAnnualRental).toFixed(1);

  const totalValue = inv.unitTypes.reduce((s, t) => s + t.units * t.priceAvg, 0);
  const soldValue  = inv.unitTypes.reduce((s, t) => s + t.sold * t.priceAvg, 0);
  const soldUnits  = inv.unitTypes.reduce((s, t) => s + t.sold, 0);
  const totalUnits = project.total || 102;
  const pendUnits  = project.pending || 4;
  const availUnits = totalUnits - soldUnits - pendUnits;
  const soldPct    = Math.round((soldUnits / totalUnits) * 100);
  const pendPct    = Math.round((pendUnits / totalUnits) * 100);
  const availPct   = 100 - soldPct - pendPct;

  const fmt  = n => '$' + Math.round(n).toLocaleString('en-US');
  const fmtM = n => '$' + (n / 1e6).toFixed(2) + 'M';

  return `
<div style="background:var(--bg-surface);min-height:100vh;padding-bottom:56px">

  <!-- ══ HERO ═══════════════════════════════════════════ -->
  <div style="background:linear-gradient(150deg,#1c2d17 0%,#111f0e 45%,#0c0c0b 100%);padding:44px 48px 36px;position:relative;overflow:hidden">
    <!-- decorative rings -->
    <div style="position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;border:1px solid rgba(130,184,112,.05);pointer-events:none"></div>
    <div style="position:absolute;top:-30px;right:-30px;width:220px;height:220px;border-radius:50%;border:1px solid rgba(130,184,112,.08);pointer-events:none"></div>
    <div style="position:absolute;bottom:-40px;left:60px;width:180px;height:180px;border-radius:50%;border:1px solid rgba(130,184,112,.04);pointer-events:none"></div>

    <div style="position:relative;max-width:1280px;margin:0 auto">
      <!-- top row: back + badge -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <button class="btn btn-ghost btn-sm" onclick="history.back()" style="font-size:11px;opacity:.7">← Volver a Proyectos</button>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:10px;color:rgba(255,255,255,.25)">Actualizado: 1 may 2026</span>
          <span style="display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:600;color:var(--green-txt);background:rgba(74,94,63,.25);border:1px solid rgba(130,184,112,.22);border-radius:20px;padding:4px 12px">
            <span style="width:5px;height:5px;border-radius:50%;background:var(--green-txt)"></span>
            FASE ACTIVA
          </span>
        </div>
      </div>

      <!-- title block -->
      <div style="margin-bottom:28px">
        <div style="font-size:9px;letter-spacing:.22em;color:rgba(130,184,112,.55);text-transform:uppercase;margin-bottom:8px;font-weight:500">Duna Development Group</div>
        <h1 style="font-family:'Cormorant Garamond',serif;font-size:52px;font-weight:400;color:#f1ede3;letter-spacing:.03em;line-height:.95;margin:0 0 10px">
          ${project.name.toUpperCase()}
        </h1>
        <div style="font-size:13px;color:rgba(255,255,255,.38);letter-spacing:.05em">📍 ${project.location}</div>
      </div>

      <!-- hero stat strip -->
      <div style="display:flex;gap:0;border:1px solid rgba(255,255,255,.08);border-radius:10px;overflow:hidden;width:fit-content">
        ${[
          { label: 'Precio desde',   val: fmt(inv.priceFrom) + ' USD' },
          { label: 'Entrega est.',   val: inv.deliveryEst },
          { label: 'Unidades',       val: totalUnits + ' totales' },
          { label: 'Disponibles',    val: availUnits + ' unidades' },
          { label: 'Estado legal',   val: 'Fideicomiso activo' },
        ].map((s, i) => `
          <div style="padding:12px 22px;${i > 0 ? 'border-left:1px solid rgba(255,255,255,.08);' : ''}background:rgba(255,255,255,.04)">
            <div style="font-size:8px;letter-spacing:.12em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:4px">${s.label}</div>
            <div style="font-size:12px;font-weight:600;color:#f1ede3">${s.val}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- ══ BODY ═══════════════════════════════════════════ -->
  <div style="max-width:1280px;margin:0 auto;padding:32px 48px 0">

    <!-- ── INVENTORY BAR ──────────────────────────────── -->
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px 28px;margin-bottom:20px">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px">Inventario · ${totalUnits} unidades totales</div>
          <div style="font-size:28px;font-weight:700;color:#f1ede3;line-height:1">
            ${soldUnits} <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,.35)">vendidas</span>
            &nbsp;
            <span style="color:var(--green-txt)">${availUnits}</span> <span style="font-size:14px;font-weight:400;color:rgba(255,255,255,.35)">disponibles</span>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px">Valor total del proyecto</div>
          <div style="font-size:24px;font-weight:700;color:var(--orange)">${fmtM(totalValue)} USD</div>
          <div style="font-size:10px;color:rgba(255,255,255,.25);margin-top:2px">${fmtM(soldValue)} en ventas cerradas</div>
        </div>
      </div>
      <div style="height:12px;border-radius:6px;overflow:hidden;display:flex;margin-bottom:12px;gap:2px">
        <div style="width:${soldPct}%;background:var(--green-txt);border-radius:4px 0 0 4px;transition:width .5s"></div>
        <div style="width:${pendPct}%;background:var(--orange)"></div>
        <div style="width:${availPct}%;background:rgba(255,255,255,.07);border-radius:0 4px 4px 0"></div>
      </div>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        ${[
          { color: 'var(--green-txt)', label: `${soldUnits} vendidas (${soldPct}%) · ${fmtM(soldValue)}` },
          { color: 'var(--orange)',    label: `${pendUnits} reservadas (${pendPct}%)` },
          { color: 'rgba(255,255,255,.15)', label: `${availUnits} disponibles (${availPct}%) · ${fmtM(totalValue - soldValue)}` },
        ].map(l => `
          <div style="display:flex;align-items:center;gap:7px;font-size:11px;color:rgba(255,255,255,.45)">
            <div style="width:10px;height:10px;border-radius:3px;background:${l.color};flex-shrink:0"></div>
            ${l.label}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ── 4 KPI CARDS ─────────────────────────────────── -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px">
      ${[
        { label: 'VENTAS CERRADAS',       val: fmtM(soldValue),         color: 'var(--orange)',    note: `${soldUnits} unidades · prom. ${fmt(soldValue/Math.max(soldUnits,1))}`, accent: 'var(--orange)' },
        { label: 'ROI TOTAL ANUAL EST.',  val: totalROI + '%',          color: 'var(--green-txt)', note: `${netYield}% renta neta + ${inv.appreciationPct}% apreciación`,        accent: 'var(--green-txt)' },
        { label: 'RENTA MENSUAL NETA',    val: fmt(netMonthlyRental),   color: '#f1ede3',          note: `Tras ${inv.mgmtFee}% gestión · ${inv.occupancyEst}% ocup. estimada`,    accent: 'var(--blue)' },
        { label: 'PAYBACK PERIOD',        val: '~' + paybackYears + 'a', color: 'var(--cream-dim)', note: `Retorno completo de capital invertido`,                                accent: 'rgba(255,255,255,.12)' },
      ].map(k => `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;overflow:hidden">
          <div style="height:3px;background:${k.accent}"></div>
          <div style="padding:18px 20px">
            <div style="font-size:8px;letter-spacing:.14em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:10px">${k.label}</div>
            <div style="font-size:30px;font-weight:700;color:${k.color};font-family:'Inter',sans-serif;line-height:1;margin-bottom:8px">${k.val}</div>
            <div style="font-size:10px;color:rgba(255,255,255,.28);line-height:1.4">${k.note}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- ── 3-COL: OBRA · INVERSIÓN · CTA ──────────────── -->
    <div style="display:grid;grid-template-columns:1fr 1fr 320px;gap:14px;margin-bottom:20px">

      <!-- Avance de obra -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:22px 24px">
        <div style="font-size:8px;letter-spacing:.14em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:18px">Avance de obra</div>
        ${constr.phases.map(ph => `
          <div style="margin-bottom:14px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
              <div style="display:flex;align-items:center;gap:7px">
                <span style="font-size:11px;color:${ph.status==='done'?'var(--green-txt)':ph.status==='active'?'var(--orange)':'rgba(255,255,255,.2)'}">${ph.status==='done'?'✓':ph.status==='active'?'●':'○'}</span>
                <span style="font-size:11px;color:${ph.status==='done'?'rgba(255,255,255,.55)':ph.status==='active'?'#f1ede3':'rgba(255,255,255,.22)'};font-weight:${ph.status==='active'?'600':'400'}">${ph.name}</span>
              </div>
              <span style="font-size:10px;color:rgba(255,255,255,.25)">${ph.date}</span>
            </div>
            ${ph.pct > 0 ? `
            <div style="height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden">
              <div style="width:${ph.pct}%;height:100%;background:${ph.status==='done'?'var(--green-txt)':'var(--orange)'}"></div>
            </div>` : ''}
          </div>
        `).join('')}
        <div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:9px;letter-spacing:.1em;color:rgba(255,255,255,.28);text-transform:uppercase;margin-bottom:2px">Avance general</div>
            <div style="font-size:10px;color:rgba(255,255,255,.22)">Entrega estimada ${inv.deliveryEst}</div>
          </div>
          <span style="font-size:28px;font-weight:700;color:var(--green-txt);font-family:'Inter',sans-serif">${constr.overall}%</span>
        </div>
      </div>

      <!-- Caso de inversión -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:22px 24px">
        <div style="font-size:8px;letter-spacing:.14em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:18px">Caso de inversión</div>
        ${[
          { label: 'Precio desde',              val: fmt(inv.priceFrom) + ' USD' },
          { label: 'Precio promedio',            val: fmt(inv.priceAvg) + ' USD' },
          { label: 'Tarifa noche estimada',      val: '$' + inv.nightlyRateEst + ' USD' },
          { label: 'Ocupación estimada',         val: inv.occupancyEst + '%' },
          { label: 'Alquiler bruto mensual',     val: fmt(grossMonthlyRental) + '/mes' },
          { label: 'Alquiler neto (tras fees)',  val: fmt(netMonthlyRental) + '/mes' },
          { label: 'Retorno neto anual',         val: netYield + '%' },
          { label: 'Apreciación capital/año',    val: inv.appreciationPct + '%' },
          { label: 'ROI total anual',            val: totalROI + '%', highlight: true },
        ].map(r => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04)">
            <span style="font-size:11px;color:rgba(255,255,255,.38)">${r.label}</span>
            <span style="font-size:11px;font-weight:${r.highlight?'700':'500'};color:${r.highlight?'var(--green-txt)':'rgba(255,255,255,.65)'}">${r.val}</span>
          </div>
        `).join('')}
        <div style="margin-top:10px;font-size:9px;color:rgba(255,255,255,.18);line-height:1.5">* Proyecciones basadas en datos históricos de Cap Cana. No constituyen garantía de rendimiento.</div>
      </div>

      <!-- Descuento + Momentum -->
      <div style="display:flex;flex-direction:column;gap:14px">
        <div style="background:linear-gradient(135deg,rgba(74,94,63,.4),rgba(74,94,63,.18));border:1px solid rgba(130,184,112,.22);border-radius:10px;padding:22px 22px;flex:1">
          <div style="font-size:8px;letter-spacing:.14em;color:rgba(130,184,112,.6);text-transform:uppercase;margin-bottom:12px">Descuento de lanzamiento</div>
          <div style="font-size:38px;font-weight:700;color:var(--green-txt);font-family:'Inter',sans-serif;line-height:1;margin-bottom:4px">${fmt(inv.launchDiscount)}</div>
          <div style="font-size:11px;color:rgba(255,255,255,.35);margin-bottom:18px">Ahorro en precio de compra<br>Válido hasta ${inv.launchDeadline}</div>
          <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;padding:10px 0" onclick="showToast('✓ Solicitud enviada al equipo','var(--green-txt)')">Reservar ahora →</button>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:18px 20px">
          <div style="font-size:8px;letter-spacing:.14em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:12px">Señales del proyecto</div>
          ${[
            { dot: 'var(--green-txt)', text: `${soldUnits} unidades cerradas desde lanzamiento` },
            { dot: 'var(--orange)',    text: `Descuento activo · plazo limitado` },
            { dot: 'var(--blue)',      text: `Sin desviaciones de entrega` },
            { dot: 'var(--green-txt)', text: `Fideicomiso activo · DGII registrado` },
          ].map(m => `
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:9px;font-size:11px;color:rgba(255,255,255,.42)">
              <span style="width:6px;height:6px;border-radius:50%;background:${m.dot};flex-shrink:0"></span>
              ${m.text}
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- ── TIPOLOGÍAS ──────────────────────────────────── -->
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;margin-bottom:20px;overflow:hidden">
      <div style="padding:16px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:8px;letter-spacing:.14em;color:rgba(255,255,255,.3);text-transform:uppercase">Inventario por tipología</div>
        <button class="btn btn-ghost btn-sm" onclick="window.location.hash='unidades'" style="font-size:10px">Ver unidades →</button>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:rgba(255,255,255,.02)">
            ${['Tipología','Unidades','Superficie','Precio desde','Precio prom.','Vendidas','Disponibles','Yield est.'].map(h => `
              <th style="padding:10px 18px;font-size:9px;font-weight:500;letter-spacing:.08em;color:rgba(255,255,255,.28);text-transform:uppercase;text-align:left;border-bottom:1px solid rgba(255,255,255,.05)">${h}</th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${inv.unitTypes.map((t, i) => {
            const avail    = t.units - t.sold;
            const soldPctT = Math.round((t.sold / t.units) * 100);
            const isEven   = i % 2 === 1;
            return `
            <tr style="border-bottom:1px solid rgba(255,255,255,.04);${isEven?'background:rgba(255,255,255,.01)':''}">
              <td style="padding:13px 18px;font-size:12px;font-weight:600;color:#f1ede3">${t.type}</td>
              <td style="padding:13px 18px;font-size:12px;color:rgba(255,255,255,.55)">${t.units}</td>
              <td style="padding:13px 18px;font-size:11px;color:rgba(255,255,255,.38)">${t.sqft} sqft</td>
              <td style="padding:13px 18px;font-size:11px;color:rgba(255,255,255,.5)">${fmt(t.priceFrom)}</td>
              <td style="padding:13px 18px;font-size:12px;font-weight:500;color:var(--orange)">${fmt(t.priceAvg)}</td>
              <td style="padding:13px 18px">
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="width:44px;height:4px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden">
                    <div style="width:${soldPctT}%;height:100%;background:var(--green-txt)"></div>
                  </div>
                  <span style="font-size:11px;color:var(--green-txt);font-weight:600">${t.sold}</span>
                </div>
              </td>
              <td style="padding:13px 18px;font-size:12px;color:${avail>0?'rgba(255,255,255,.6)':'rgba(255,255,255,.2)'}">
                ${avail > 0 ? avail : '<span style="color:rgba(255,255,255,.2);font-size:10px">Agotado</span>'}
              </td>
              <td style="padding:13px 18px">
                <span style="font-size:12px;font-weight:700;color:var(--green-txt)">${t.yield}%</span>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- ── PLAN DE PAGOS + UBICACIÓN ──────────────────── -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px">

      <!-- Plan de pagos -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:22px 24px">
        <div style="font-size:8px;letter-spacing:.14em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:18px">Estructura del plan de pagos</div>
        ${[
          { pct: 5,  label: 'Reserva',             desc: 'Al firmar el acuerdo de reserva',       color: 'var(--green-txt)', amt: fmt(inv.priceAvg * 0.05) + ' USD' },
          { pct: 15, label: 'Durante construcción', desc: '24 cuotas mensuales hasta entrega',     color: 'var(--orange)',    amt: fmt(inv.priceAvg * 0.15 / 24) + ' USD / mes' },
          { pct: 80, label: 'Entrega de llaves',    desc: `Contra escritura pública · ${inv.deliveryEst}`, color: 'var(--blue)', amt: fmt(inv.priceAvg * 0.80) + ' USD' },
        ].map(p => `
          <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:18px">
            <div style="width:48px;height:48px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <span style="font-size:15px;font-weight:700;color:${p.color}">${p.pct}%</span>
            </div>
            <div style="flex:1;padding-top:2px">
              <div style="font-size:12px;font-weight:600;color:#f1ede3;margin-bottom:2px">${p.label}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.32);margin-bottom:5px">${p.desc}</div>
              <div style="font-size:11px;font-weight:600;color:${p.color}">${p.amt}</div>
            </div>
          </div>
        `).join('')}
        <div style="padding:12px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:10px;color:rgba(255,255,255,.28);line-height:1.6">
          Financiamiento bancario disponible para el 80% restante a través de bancos locales e internacionales colaboradores.
        </div>
      </div>

      <!-- Ubicación & Amenidades -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:22px 24px">
        <div style="font-size:8px;letter-spacing:.14em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:18px">Ubicación y amenidades</div>
        <div style="font-size:15px;font-weight:600;color:#f1ede3;margin-bottom:3px">Cap Cana, Punta Cana</div>
        <div style="font-size:11px;color:rgba(255,255,255,.32);margin-bottom:18px;line-height:1.5">República Dominicana · Zona de lujo en la región del Caribe más demandada por inversores internacionales</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:20px">
          ${inv.amenities.map(a => `
            <div style="display:flex;align-items:center;gap:7px;font-size:11px;color:rgba(255,255,255,.48)">
              <span style="width:5px;height:5px;border-radius:50%;background:var(--green-txt);flex-shrink:0"></span>
              ${a}
            </div>
          `).join('')}
        </div>
        <div style="padding-top:16px;border-top:1px solid var(--border)">
          <div style="font-size:8px;letter-spacing:.1em;color:rgba(255,255,255,.25);text-transform:uppercase;margin-bottom:10px">Pool de renta gestionado</div>
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:36px;height:36px;border-radius:8px;background:rgba(74,94,63,.3);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🏨</div>
            <div>
              <div style="font-size:12px;color:#f1ede3;font-weight:500;margin-bottom:2px">${inv.rentalPoolMgr}</div>
              <div style="font-size:10px;color:rgba(255,255,255,.28)">Gestión profesional · ${inv.occupancyEst}% ocupación estimada</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── GARANTÍAS / LEGAL ───────────────────────────── -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      ${[
        { icon: '⚖️', label: 'Estado legal',   val: 'Fideicomiso activo',   sub: 'Registrado ante DGII' },
        { icon: '🏗',  label: 'Riesgo entrega', val: inv.deliveryRisk,       sub: '0 proyectos con retrasos' },
        { icon: '💰', label: 'Financiamiento',  val: 'Disponible',           sub: 'Bancos locales e internac.' },
        { icon: '📋', label: 'Gestor de renta', val: inv.rentalPool?'Sí':'No', sub: inv.rentalPoolMgr },
      ].map(t => `
        <div style="background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:10px;padding:18px 20px;display:flex;gap:14px;align-items:flex-start">
          <span style="font-size:20px;opacity:.65;flex-shrink:0;margin-top:1px">${t.icon}</span>
          <div>
            <div style="font-size:9px;letter-spacing:.08em;color:rgba(255,255,255,.22);text-transform:uppercase;margin-bottom:4px">${t.label}</div>
            <div style="font-size:13px;font-weight:600;color:#f1ede3;margin-bottom:3px">${t.val}</div>
            <div style="font-size:10px;color:rgba(255,255,255,.28)">${t.sub}</div>
          </div>
        </div>
      `).join('')}
    </div>

  </div>
</div>`;
}

export function init() {
  window.showToast = window.showToast || ((msg, color) => {
    const e = document.getElementById('duna-toast');
    if (e) e.remove();
    const t = document.createElement('div');
    t.id = 'duna-toast';
    t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;font-size:12px;font-weight:500;color:${color};box-shadow:var(--shadow)`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  });
}
