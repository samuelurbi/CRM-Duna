export const meta = { title: 'Mis Documentos', breadcrumb: 'Mi Propiedad · Documentos' };

const REQUIRED_DOCS = [
  { key: 'id',      label: 'Documento de identidad',  hint: 'Cédula o pasaporte vigente (ambas caras)',    status: 'pending' },
  { key: 'income',  label: 'Comprobante de ingresos',  hint: 'Últimos 3 estados de cuenta o carta laboral', status: 'pending' },
  { key: 'reserva', label: 'Acuerdo de reserva',        hint: 'Firmado y enviado por Duna',                  status: 'signed'  },
];

export function render(data) {
  const myDocs = data.documents.filter(d => d.client === 'Carlos Méndez');

  const statusIcon  = { pending: '⏳', approved: '✓', signed: '✓', expired: '✗', signature: '✍' };
  const statusColor = { pending: 'var(--orange)', approved: 'var(--green-txt)', signed: 'var(--green-txt)', expired: 'var(--red)', signature: 'var(--red)' };

  return `
<div class="view-container" style="max-width:780px">

  <!-- Header banner -->
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
    <div>
      <div style="font-size:13px;font-weight:600;color:var(--cream-dim);margin-bottom:4px">Documentos de tu expediente</div>
      <div style="font-size:12px;color:var(--sub)">Necesitamos verificar tu identidad e ingresos para continuar con el proceso de compra. Todos los archivos se tratan con máxima confidencialidad.</div>
    </div>
    <label class="btn btn-primary btn-sm" style="cursor:pointer">
      ⬆ Subir documento
      <input type="file" style="display:none" onchange="handleDocUpload(event)">
    </label>
  </div>

  <!-- Checklist de documentos requeridos -->
  <div class="panel" style="margin-bottom:20px">
    <div style="padding:14px 16px;border-bottom:1px solid var(--border)">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">Documentos requeridos</div>
      <div style="font-size:11px;color:var(--sub);margin-top:2px">Completa estos documentos para avanzar tu expediente</div>
    </div>
    ${REQUIRED_DOCS.map((req, i) => {
      const uploaded = myDocs.find(d => d.name.toLowerCase().includes(req.key) || (req.key === 'reserva' && d.type === 'Reserva'));
      const st = uploaded ? uploaded.status : 'missing';
      const icon  = uploaded ? (statusIcon[st]  || '?') : '○';
      const color = uploaded ? (statusColor[st] || 'var(--muted)') : 'var(--muted)';
      return `
      <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;${i < REQUIRED_DOCS.length - 1 ? 'border-bottom:1px solid var(--border)' : ''}">
        <div style="width:28px;height:28px;border-radius:50%;background:${uploaded?'var(--green-lite)':'rgba(0,0,0,.04)'};border:1px solid ${uploaded?'var(--green-txt)':'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:12px;color:${color};font-weight:700;flex-shrink:0">${icon}</div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">${req.label}</div>
          <div style="font-size:11px;color:var(--sub);margin-top:1px">${req.hint}</div>
        </div>
        <div style="text-align:right">
          ${uploaded
            ? `<span class="badge badge-${st === 'approved' || st === 'signed' ? 'green' : st === 'expired' ? 'red' : 'orange'}">${st === 'approved' || st === 'signed' ? 'Completado' : st === 'expired' ? 'Vencido' : 'En revisión'}</span>`
            : `<label class="btn btn-ghost btn-sm" style="cursor:pointer;font-size:10px">
                ⬆ Subir
                <input type="file" style="display:none">
              </label>`}
        </div>
      </div>`;
    }).join('')}
  </div>

  <!-- Documentos subidos -->
  <div class="panel">
    <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:12px;font-weight:600;color:var(--cream-dim)">Documentos subidos</div>
      <span style="font-size:11px;color:var(--sub)">${myDocs.length} archivo${myDocs.length !== 1 ? 's' : ''}</span>
    </div>
    ${myDocs.length === 0 ? `
      <div style="padding:40px;text-align:center;color:var(--muted)">
        <div style="font-size:24px;margin-bottom:8px;opacity:.4">📄</div>
        <div style="font-size:12px">Aún no has subido documentos</div>
      </div>
    ` : `
      <table class="data-table">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Tamaño</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${myDocs.map(d => `
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="width:32px;height:32px;border-radius:6px;background:var(--green-lite);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">📄</div>
                  <div class="cell-name">${d.name}</div>
                </div>
              </td>
              <td><span style="font-size:11px;color:var(--sub)">${d.type}</span></td>
              <td><span class="badge badge-${d.statusCls}">${d.statusLabel}</span></td>
              <td><span style="font-size:11px;color:var(--sub)">${d.uploaded}</span></td>
              <td><span style="font-size:11px;color:var(--muted)">${d.size}</span></td>
              <td>
                <div style="display:flex;gap:8px">
                  <span class="cell-link">⬇ Descargar</span>
                  ${d.status === 'signature' ? `<span class="cell-link" style="color:var(--orange)">✍ Firmar</span>` : ''}
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `}
  </div>

  <!-- Info footer -->
  <div style="margin-top:16px;padding:12px 16px;border-radius:8px;background:rgba(61,110,42,.06);border:1px solid rgba(61,110,42,.12);display:flex;gap:10px;align-items:flex-start">
    <span style="font-size:14px">🔒</span>
    <div style="font-size:11px;color:var(--sub)">Tus documentos están protegidos con cifrado de extremo a extremo. Solo el equipo legal de Duna Development Group tiene acceso a tus archivos. <span style="color:var(--green-txt);cursor:pointer">¿Tienes preguntas? Contáctanos →</span></div>
  </div>

</div>`;
}

export function init() {
  window.handleDocUpload = (e) => {
    if (e.target.files.length) {
      const name = e.target.files[0].name;
      const toast = document.createElement('div');
      toast.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;background:#fff;border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:10px 16px;font-size:12px;font-weight:500;color:var(--green-txt);box-shadow:0 4px 20px rgba(0,0,0,.1)`;
      toast.textContent = `✓ "${name}" subido correctamente`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };
}
