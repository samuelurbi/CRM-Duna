export const meta = { title: 'Mi Propiedad', breadcrumb: 'Makai Residences · Unidad 111' };

export function render(data) {
  const client = data.clients.find(c => c.id === 1); // Carlos Méndez
  const unit   = data.units.find(u => u.id === 111);
  const proj   = data.projects.find(p => p.id === 1);
  const constr = data.construction.makai;

  const steps  = ['Reserva', 'KYC', 'Promesa', 'Plan Pago', 'Doc. Pago', 'Contrato'];
  const paidPct = client.paidPct;

  return `
<div class="view-container" style="max-width:860px">

  <!-- Hero card -->
  <div style="background:var(--green);border-radius:16px;padding:32px 36px;margin-bottom:24px;position:relative;overflow:hidden">
    <div style="position:absolute;top:-30px;right:-30px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.04)"></div>
    <div style="position:absolute;bottom:-50px;right:60px;width:240px;height:240px;border-radius:50%;background:rgba(255,255,255,.03)"></div>
    <div style="position:relative">
      <div style="font-size:11px;color:rgba(255,255,255,.55);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Tu propiedad</div>
      <h1 style="font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:400;color:#fff;margin:0 0 4px">Unidad 111</h1>
      <div style="font-size:14px;color:rgba(255,255,255,.7);margin-bottom:24px">Makai Residences · Cap Cana, Punta Cana</div>

      <div style="display:flex;gap:32px;flex-wrap:wrap">
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:2px">Precio total</div>
          <div style="font-size:22px;font-weight:600;color:#fff;font-family:'Inter',sans-serif">${client.price}</div>
        </div>
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:2px">Pagado</div>
          <div style="font-size:22px;font-weight:600;color:#a8d494;font-family:'Inter',sans-serif">${client.paid}</div>
        </div>
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:2px">Avance compra</div>
          <div style="font-size:22px;font-weight:600;color:#fff;font-family:'Inter',sans-serif">${paidPct}%</div>
        </div>
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,.5);margin-bottom:2px">Tipo</div>
          <div style="font-size:16px;font-weight:500;color:rgba(255,255,255,.85)">${unit.bed} Bed · ${unit.bath} Ba</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Pipeline de proceso -->
  <div class="panel" style="margin-bottom:20px;padding:20px 24px">
    <div style="font-size:12px;font-weight:600;color:var(--cream-dim);margin-bottom:16px">Estado de tu expediente</div>
    <div style="display:flex;align-items:center;gap:0">
      ${steps.map((s, i) => {
        const idx  = i + 1;
        const done = idx < client.step;
        const curr = idx === client.step;
        const bg   = done ? 'var(--green-txt)' : curr ? 'var(--orange)' : 'var(--border)';
        const txt  = done ? '#fff' : curr ? '#fff' : 'var(--muted)';
        const lbl  = done ? '#3d6e2a' : curr ? 'var(--orange)' : 'var(--muted)';
        return `
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;position:relative">
          ${i > 0 ? `<div style="position:absolute;top:11px;left:-50%;width:100%;height:2px;background:${done||curr?'var(--green-txt)':'var(--border)'};z-index:0"></div>` : ''}
          <div style="width:22px;height:22px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:${txt};position:relative;z-index:1">${done ? '✓' : idx}</div>
          <div style="font-size:9px;color:${lbl};margin-top:5px;text-align:center;font-weight:${curr?'600':'400'}">${s}</div>
        </div>`;
      }).join('')}
    </div>
    ${client.status === 'kyc_pending' ? `
    <div style="margin-top:16px;padding:10px 14px;background:rgba(201,124,64,.08);border:1px solid rgba(201,124,64,.2);border-radius:8px;display:flex;align-items:center;gap:10px">
      <span style="font-size:14px">⚠</span>
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--orange)">Acción requerida: KYC</div>
        <div style="font-size:11px;color:var(--sub);margin-top:1px">Necesitamos verificar tus documentos de identidad para continuar con tu expediente.</div>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-left:auto;border-color:var(--orange);color:var(--orange)" onclick="window.location.hash='mis-documentos-comprador'">Ver documentos →</button>
    </div>` : ''}
  </div>

  <!-- Grid: detalles + avance obra -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">

    <!-- Detalles de la unidad -->
    <div class="panel" style="padding:20px">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim);margin-bottom:14px">Detalles de tu unidad</div>
      ${[
        ['Unidad',        'U-111'],
        ['Piso',          'Planta 1'],
        ['Tipo',          '1 Bed + Family Room'],
        ['Interior',      `${unit.sqft.toLocaleString()} sqft`],
        ['Terraza',       `${unit.sqftTer} sqft`],
        ['Vista',         unit.view],
        ['Proyecto',      'Makai Residences'],
        ['Ubicación',     'Cap Cana, Punta Cana · RD'],
      ].map(([k, v]) => `
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:11px;color:var(--sub)">${k}</span>
          <span style="font-size:11px;color:var(--cream-dim);font-weight:500">${v}</span>
        </div>
      `).join('')}
    </div>

    <!-- Avance de obra -->
    <div class="panel" style="padding:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">Avance de construcción</div>
        <span style="font-size:13px;font-weight:700;color:var(--green-txt)">${constr.overall}%</span>
      </div>
      <div style="background:var(--border);border-radius:4px;height:6px;margin-bottom:16px;overflow:hidden">
        <div style="background:var(--green-txt);height:100%;width:${constr.overall}%;border-radius:4px"></div>
      </div>
      ${constr.phases.map(ph => `
        <div style="display:flex;align-items:center;gap:8px;padding:5px 0">
          <div style="width:6px;height:6px;border-radius:50%;flex-shrink:0;background:${ph.status==='done'?'var(--green-txt)':ph.status==='active'?'var(--orange)':'var(--border)'}"></div>
          <span style="font-size:11px;color:${ph.status==='done'?'var(--cream-dim)':ph.status==='active'?'var(--orange)':'var(--muted)'};flex:1">${ph.name}</span>
          <span style="font-size:10px;color:var(--muted)">${ph.date}</span>
          ${ph.status !== 'pending' ? `<span style="font-size:10px;color:${ph.status==='done'?'var(--green-txt)':'var(--orange)'};font-weight:600">${ph.pct}%</span>` : ''}
        </div>
      `).join('')}
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        <button class="btn btn-ghost btn-sm" style="width:100%" onclick="window.location.hash='avance-obra'">Ver reportes completos →</button>
      </div>
    </div>
  </div>

  <!-- Accesos rápidos -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
    ${[
      { icon: '📄', label: 'Mis Documentos', sub: 'Sube y gestiona tus docs', route: 'mis-documentos-comprador', urgent: true },
      { icon: '💳', label: 'Plan de Pagos',  sub: 'Consulta tus cuotas',      route: 'mi-plan-pagos',            urgent: false },
      { icon: '👤', label: 'Mi Asesor',      sub: 'Contacta a Ana Rodríguez', route: 'mi-asesor',                urgent: false },
    ].map(a => `
      <div class="panel" style="padding:16px;cursor:pointer;transition:border-color .15s" onclick="window.location.hash='${a.route}'" onmouseover="this.style.borderColor='var(--green-txt)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="font-size:22px;margin-bottom:8px">${a.icon}</div>
        <div style="font-size:12px;font-weight:600;color:var(--cream-dim);margin-bottom:2px">${a.label}</div>
        <div style="font-size:11px;color:var(--sub)">${a.sub}</div>
        ${a.urgent ? `<div style="margin-top:8px"><span class="badge badge-orange" style="font-size:9px">Acción requerida</span></div>` : ''}
      </div>
    `).join('')}
  </div>

</div>`;
}

export function init() {}
