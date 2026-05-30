export const meta = { title: 'Mi Contrato', breadcrumb: 'Portal Broker · Mi Contrato' };

export function render(data) {
  const broker = data.brokers.find(b => b.id === 1);

  const terms = [
    { label: 'Tasa de comisión',     val: '2% sobre pagos confirmados' },
    { label: 'Frecuencia de pago',   val: 'Mensual (días 15 de cada mes)' },
    { label: 'Proyectos incluidos',  val: 'Makai Residences, Naviva Residences' },
    { label: 'Exclusividad',         val: 'No exclusivo · mercado internacional' },
    { label: 'Materiales de venta',  val: 'Acceso a brochures y renders' },
    { label: 'NDA',                  val: 'Firmado el 2026-01-10' },
  ];

  const contractDocs = [
    { name: 'Contrato de colaboración v2.1', type: 'Contrato', date: '2026-01-15', status: 'signed',   size: '2.8 MB' },
    { name: 'Anexo A — Escala de comisiones', type: 'Anexo',   date: '2026-01-15', status: 'signed',   size: '340 KB' },
    { name: 'NDA — Acuerdo de confidencialidad', type: 'Legal', date: '2026-01-10', status: 'signed',  size: '1.1 MB' },
    { name: 'Addendum — Naviva Residences',  type: 'Anexo',   date: '2026-03-01', status: 'pending',  size: '210 KB' },
  ];

  const daysUntilExpiry = Math.round(
    (new Date(broker.contractExpiry) - new Date('2026-05-08')) / (1000 * 60 * 60 * 24)
  );

  return `
<div class="view-container" style="max-width:820px">

  <!-- Contract hero -->
  <div class="panel" style="padding:24px;margin-bottom:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:20px">
      <div>
        <div style="font-size:11px;color:var(--sub);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Contrato de colaboración</div>
        <div style="font-size:20px;font-weight:600;color:var(--cream-dim)">JR Real Estate × Duna Development Group</div>
        <div style="font-size:12px;color:var(--sub);margin-top:4px">Contrato #BR-2026-001 · Firmado el 15 Ene 2026</div>
      </div>
      <span class="badge badge-green" style="font-size:12px;padding:6px 12px">Contrato activo</span>
    </div>

    <!-- Key dates + commission bar -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px">
      ${[
        { label: 'Fecha inicio',    val: '15 Ene 2026' },
        { label: 'Vencimiento',     val: broker.contractExpiry,                                           alert: true },
        { label: 'Días restantes',  val: `${daysUntilExpiry} días`,                                       color: daysUntilExpiry < 60 ? 'var(--orange)' : 'var(--green-txt)' },
      ].map(d => `
        <div style="background:var(--bg-surface, var(--border));border:1px solid var(--border);border-radius:8px;padding:12px 16px">
          <div style="font-size:10px;color:var(--muted);margin-bottom:4px">${d.label}</div>
          <div style="font-size:16px;font-weight:600;color:${d.color || 'var(--cream-dim)'}">${d.val}</div>
        </div>
      `).join('')}
    </div>

    ${daysUntilExpiry < 60 ? `
    <div style="padding:10px 14px;background:rgba(201,124,64,.08);border:1px solid rgba(201,124,64,.2);border-radius:8px;display:flex;align-items:center;gap:10px;margin-bottom:20px">
      <span style="font-size:14px">⚠</span>
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--orange)">Tu contrato vence pronto</div>
        <div style="font-size:11px;color:var(--sub)">Quedan ${daysUntilExpiry} días. Contacta a tu ejecutivo de cuenta para gestionar la renovación.</div>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-left:auto;border-color:var(--orange);color:var(--orange)">Solicitar renovación</button>
    </div>` : ''}

    <!-- Terms grid -->
    <div style="font-size:12px;font-weight:600;color:var(--cream-dim);margin-bottom:12px">Términos del contrato</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--border);border-radius:8px;overflow:hidden">
      ${terms.map((t, i) => `
        <div style="padding:10px 14px;border-bottom:${i < terms.length - 2 ? '1px solid var(--border)' : 'none'};${i % 2 === 0 ? 'border-right:1px solid var(--border)' : ''}">
          <div style="font-size:10px;color:var(--muted);margin-bottom:2px">${t.label}</div>
          <div style="font-size:12px;color:var(--cream-dim);font-weight:500">${t.val}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Contract documents -->
  <div class="panel">
    <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">Documentos del contrato</div>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>Documento</th>
          <th>Tipo</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Tamaño</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${contractDocs.map(d => `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:30px;height:30px;border-radius:6px;background:var(--green-lite);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0">📄</div>
                <div class="cell-name">${d.name}</div>
              </div>
            </td>
            <td><span style="font-size:11px;color:var(--sub)">${d.type}</span></td>
            <td><span style="font-size:11px;color:var(--sub)">${d.date}</span></td>
            <td><span class="badge badge-${d.status === 'signed' ? 'green' : 'orange'}">${d.status === 'signed' ? 'Firmado' : 'Por firmar'}</span></td>
            <td><span style="font-size:11px;color:var(--muted)">${d.size}</span></td>
            <td>
              <div style="display:flex;gap:8px">
                <span class="cell-link">⬇ Descargar</span>
                ${d.status === 'pending' ? `<span class="cell-link" style="color:var(--orange)">✍ Firmar</span>` : ''}
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Contact for renewals -->
  <div style="margin-top:16px;padding:14px 16px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
    <div>
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">¿Preguntas sobre tu contrato?</div>
      <div style="font-size:11px;color:var(--sub);margin-top:2px">Contacta a tu ejecutivo de cuenta en Duna Development Group</div>
    </div>
    <div style="display:flex;gap:8px">
      <a href="https://wa.me/18095550000" target="_blank" rel="noopener"
         style="display:flex;align-items:center;gap:6px;background:#25d366;color:#fff;padding:8px 14px;border-radius:6px;text-decoration:none;font-size:11px;font-weight:600">
        💬 WhatsApp
      </a>
      <a href="mailto:brokers@dunacapecana.com"
         style="display:flex;align-items:center;gap:6px;background:var(--green);color:#fff;padding:8px 14px;border-radius:6px;text-decoration:none;font-size:11px;font-weight:600">
        ✉ Email
      </a>
    </div>
  </div>

</div>`;
}

export function init() {}
