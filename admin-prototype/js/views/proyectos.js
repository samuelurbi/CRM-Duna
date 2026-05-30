export const meta = { title: 'Proyectos', breadcrumb: 'Proyectos · Gestión de proyectos' };

export function render(data) {
  const { projects, clients, units } = data;

  return `
<div class="view-container">
  <div class="view-header">
    <h1 class="view-title">Proyectos</h1>
    <span style="font-size:11px;color:var(--sub)">${projects.length} proyectos · ${projects.filter(p => p.status === 'active').length} activo</span>
    <div class="view-actions">
      <button class="btn btn-ghost btn-sm" onclick="openExportModal('Proyectos')">🔒 Exportar</button>
      <button class="btn btn-primary btn-sm">+ Nuevo proyecto</button>
    </div>
  </div>

  <!-- Project cards -->
  <div style="display:flex;flex-direction:column;gap:16px">
    ${projects.map(p => {
      const projectClients = clients.filter(c => c.projectSlug === p.slug);
      const projectUnits   = units ? units.filter(u => u.status === 'available') : [];

      if (p.status === 'active') {
        return `
        <div class="panel" style="overflow:hidden">
          <!-- Header de color -->
          <div style="background:linear-gradient(135deg,${p.color}22,${p.color}08);border-bottom:1px solid var(--border);padding:20px 24px;display:flex;align-items:center;gap:16px">
            <div style="width:44px;height:44px;border-radius:10px;background:${p.color};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#fff;flex-shrink:0">${p.logo}</div>
            <div style="flex:1">
              <div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:500;color:var(--cream)">${p.name}</div>
              <div style="font-size:11px;color:var(--sub);margin-top:2px">📍 ${p.location}</div>
            </div>
            <span class="badge badge-green" style="font-size:11px">${p.statusLabel}</span>
            <button class="btn btn-primary btn-sm" onclick="window.location.hash='proyecto/${p.id}'">Ficha completa →</button>
            <span class="cell-link" onclick="window.location.hash='unidades'" style="font-size:12px">Ver unidades</span>
          </div>

          <!-- Stats grid -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:0;border-bottom:1px solid var(--border)">
            ${[
              { label: 'Unidades totales',   val: p.total,                              color: 'var(--cream)' },
              { label: 'Vendidas',           val: p.sold,                               color: 'var(--green-txt)' },
              { label: 'Reservadas',         val: projectClients.length - (p.sold||0) > 0 ? clients.filter(c=>c.projectSlug===p.slug&&c.status!=='completed').length : 0, color: 'var(--orange)' },
              { label: 'Disponibles',        val: p.available,                          color: 'var(--blue)' },
              { label: 'Valor total',        val: p.totalValue,                         color: 'var(--cream)' },
            ].map(s => `
              <div style="padding:16px 20px;border-right:1px solid var(--border)">
                <div style="font-size:18px;font-weight:600;color:${s.color}">${s.val}</div>
                <div style="font-size:11px;color:var(--sub);margin-top:3px">${s.label}</div>
              </div>
            `).join('')}
          </div>

          <!-- Progress + clientes recientes -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
            <div style="padding:20px 24px;border-right:1px solid var(--border)">
              <div style="font-size:11px;color:var(--sub);margin-bottom:10px;font-weight:500;text-transform:uppercase;letter-spacing:.04em">Progreso de ventas</div>
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                <div style="flex:1;height:8px;background:var(--bg-surface);border-radius:4px;overflow:hidden">
                  <div style="width:${p.salesProgress}%;height:100%;background:${p.color};border-radius:4px"></div>
                </div>
                <span style="font-size:13px;font-weight:600;color:var(--cream-dim)">${p.salesProgress}%</span>
              </div>
              <div style="font-size:11px;color:var(--sub);margin-bottom:10px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;margin-top:20px">Avance de obra</div>
              <div style="display:flex;align-items:center;gap:12px">
                <div style="flex:1;height:8px;background:var(--bg-surface);border-radius:4px;overflow:hidden">
                  <div style="width:52%;height:100%;background:var(--blue);border-radius:4px"></div>
                </div>
                <span style="font-size:13px;font-weight:600;color:var(--cream-dim)">52%</span>
              </div>
              <div style="font-size:11px;color:var(--muted);margin-top:6px">Mampostería en progreso · Entrega Q4 2026</div>
            </div>
            <div style="padding:20px 24px">
              <div style="font-size:11px;color:var(--sub);margin-bottom:10px;font-weight:500;text-transform:uppercase;letter-spacing:.04em">Clientes activos (${projectClients.length})</div>
              ${projectClients.slice(0, 4).map(c => `
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <div style="width:24px;height:24px;border-radius:50%;background:${avatarColor(c.id)};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:#fff;flex-shrink:0">${c.initials}</div>
                  <div style="flex:1;min-width:0">
                    <div style="font-size:12px;color:var(--cream-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.firstName} ${c.lastName}</div>
                    <div style="font-size:10px;color:var(--muted)">${c.unit}</div>
                  </div>
                  <span class="badge badge-${c.statusColor === 'green' ? 'green' : c.statusColor === 'red' ? 'red' : 'orange'}" style="font-size:10px">${c.statusLabel}</span>
                </div>
              `).join('')}
              ${projectClients.length > 4 ? `<div style="font-size:11px;color:var(--muted);margin-top:4px">+${projectClients.length - 4} más · <span class="cell-link" onclick="window.location.hash='expedientes'">Ver todos →</span></div>` : ''}
            </div>
          </div>
        </div>`;
      } else {
        return `
        <div class="panel" style="overflow:hidden">
          <div style="background:linear-gradient(135deg,${p.color}18,${p.color}05);border-bottom:1px solid var(--border);padding:20px 24px;display:flex;align-items:center;gap:16px">
            <div style="width:44px;height:44px;border-radius:10px;background:${p.color}33;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:${p.color};flex-shrink:0">${p.logo}</div>
            <div style="flex:1">
              <div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:500;color:var(--cream-dim)">${p.name}</div>
              <div style="font-size:11px;color:var(--sub);margin-top:2px">📍 ${p.location}</div>
            </div>
            <span class="badge badge-gray">${p.statusLabel}</span>
          </div>
          <div style="padding:24px;display:flex;align-items:center;gap:16px">
            <div style="width:40px;height:40px;border-radius:50%;background:var(--bg-surface);display:flex;align-items:center;justify-content:center;font-size:20px;opacity:.4">🏗</div>
            <div>
              <div style="font-size:13px;color:var(--sub)">Proyecto en preparación</div>
              <div style="font-size:11px;color:var(--muted);margin-top:4px">Unidades, precios y fechas de lanzamiento por definir.</div>
            </div>
            <button class="btn btn-ghost btn-sm" style="margin-left:auto">Configurar →</button>
          </div>
        </div>`;
      }
    }).join('')}
  </div>
</div>`;
}

function avatarColor(id) {
  const c = ['#4A5E3F','#3a7abd','#c97c40','#b84040','#6b5b8a','#2a7a6a','#8a5c2a'];
  return c[id % c.length];
}
