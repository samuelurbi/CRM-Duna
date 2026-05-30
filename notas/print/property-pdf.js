/* ── DEMO DATA (used by property-pdf-demo.html) ── */
const UNIT_DATA = {
  project:           'Makai Residences',
  unitId:            'A-101',
  name:              'Unit A-101',
  floor:             '1er Piso',
  orientation:       'SE',
  view:              'Vista al lago',
  price:             450000,
  priceSqft:         450,
  roi:               10.3,
  reserve:           5000,
  beds:              1,
  baths:             2,
  parking:           2,
  areaInt:           124,
  areaTer:           32,
  delivery:          'Q4 2026',
  location:          'Cap Cana, República Dominicana',
  clientName:        'Giuseppe Gangemi',
  clientFlag:        '<svg width="14" height="14" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-left:5px;flex-shrink:0"><defs><clipPath id="it-flag"><circle cx="15" cy="15" r="15"/></clipPath></defs><g clip-path="url(#it-flag)"><rect width="10" height="30" fill="#009246"/><rect x="10" width="10" height="30" fill="#fff"/><rect x="20" width="10" height="30" fill="#CE2B37"/></g></svg>',
  ref:               'MGN4-A101-2605',
  plusvalia:         '+18% año 1',
  availability:      '3 unidades',
  paymentPlan: [
    { pct: '1.1%', label: 'Reserva',      amount: '$5,000',   timing: 'A la firma' },
    { pct: '29%',  label: 'Inicial',       amount: '$130,000', timing: '60 días · Promesa' },
    { pct: '35%',  label: 'Construcción',  amount: '$157,500', timing: '18 meses' },
    { pct: '35%',  label: 'Contraentrega', amount: '$157,500', timing: 'Q4 2026' },
  ],
  advisor: {
    initials: 'CR',
    name:     'Carlos Ramírez Méndez',
    title:    'Senior Sales Advisor · Makai Residences',
    email:    'carlos.ramirez@dunadevelopment.com',
    website:  'dunadevelopment.com',
    location: 'Cap Cana, R.D.',
    phone:    '+1 (809) 710-9044',
    wa:       'https://wa.me/18097109044',
  },
  airbnb: {
    dailyRate: '$240',
    occupancy: '72%',
    expenses:  '-$22K',
    netAnnual: '$41K USD',
  },
  distances: [
    { label: 'Playa Juanillo',    time: '3 min' },
    { label: 'Aeropuerto PUJ',    time: '15 min' },
    { label: 'Punta Espada Golf', time: '5 min' },
    { label: 'Supermercado',      time: '7 min' },
  ],
  monthlyCosts: [
    { label: 'Cuota de mantenimiento (HOA)', value: '$310' },
    { label: 'Servicios públicos promedio',  value: '$180' },
    { label: 'Seguro de la propiedad',       value: '$95'  },
  ],
  monthlyCostsTotal: '$585 USD',
};

/* ── Helpers ── */
function usd(n) {
  return '$' + n.toLocaleString('en-US');
}

function fullDate(d) {
  const datePart = d.toLocaleDateString('es-DO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const h    = d.getHours();
  const m    = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12  = (h % 12 || 12).toString().padStart(2, '0');
  return datePart + ' · ' + h12 + ':' + m + ' ' + ampm;
}

/* ── Makai isotipo SVG ── */
const ISOTIPO = '<svg width="36" height="36" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0059 0.0013547C14.6387 0.033645 16.2677 0.14237 17.7823 0.984754C19.3859 1.87658 21.1601 2.46715 22.4737 3.84023C23.5872 5.00445 24.5129 6.27753 24.8878 7.90078C25.0939 8.79262 25.3705 9.66749 25.6231 10.5482C26.1061 12.2319 26.1466 13.9195 25.6173 15.5951C24.8887 17.9025 23.9908 20.134 22.4913 22.059C22.1932 22.4413 21.8654 22.8213 21.4835 23.1098C18.9619 25.0146 16.1586 26.1918 13.0049 25.9233L12.6993 25.891C8.39582 25.3986 4.98925 23.2512 2.57227 19.5981C0.692888 16.7581 0.0606659 14.7492 0 11.4262C0.026272 9.06032 0.957295 6.65859 3.13282 4.76894C4.51092 3.57252 5.81499 2.29381 7.49416 1.516C9.25034 0.703847 11.0466 -0.0359743 13.0059 0.0013547ZM13.4756 1.28261C11.8518 1.19584 10.3781 1.40237 9.00686 2.29726C7.67919 3.16485 6.32954 3.99786 5.0049 4.8705C2.68687 6.39819 1.4176 8.50598 1.40039 11.3129V11.5863C1.45494 12.2016 1.44589 12.831 1.57715 13.4291C2.08036 15.7172 3.06068 17.7858 4.6006 19.5453C7.43592 22.7848 10.8099 24.9212 15.2862 24.3139C18.666 23.8559 21.386 22.2665 22.921 19.0121C23.2473 18.319 23.5948 17.6325 23.8868 16.9242C24.6143 15.1607 25.0521 13.3547 24.5196 11.4389C24.2458 10.4542 23.9357 9.47847 23.7012 8.48476C23.2798 6.70213 22.3051 5.29229 20.8956 4.19667C18.71 2.49776 16.2947 1.43194 13.4756 1.28261ZM12.9112 2.71327C16.3558 2.38336 18.8802 4.07514 20.9102 6.52675C22.4258 8.35685 22.8962 10.6416 22.6143 13.0316C22.4597 14.3432 22.2661 15.6532 22.0196 16.9506C21.9064 17.5467 21.7297 18.181 21.4004 18.6742C19.5493 21.4456 16.8494 22.889 13.6534 23.349C11.8953 23.6025 10.3225 22.9523 8.96975 21.8568L8.70119 21.6313C7.56645 20.6425 6.45232 19.6158 5.42873 18.5121C4.89532 17.9371 4.50118 17.1916 4.17384 16.4633C2.9623 13.7655 2.96629 11.1529 4.55372 8.52675C5.6854 6.65533 7.24775 5.25308 8.83108 3.85683C9.98793 2.83695 11.4744 2.7012 12.9112 2.71327ZM15.1514 3.85878C14.0663 3.55828 12.8479 3.64442 11.7002 3.72108C10.9484 3.77153 10.1023 3.9509 9.49905 4.36757C7.82288 5.52669 6.31574 6.88566 5.43263 8.82753C4.8213 10.1744 4.0415 11.5337 4.34767 13.0248C4.63868 14.4423 5.05451 15.9669 5.87599 17.1049C6.97636 18.6302 8.4405 19.9245 9.89749 21.1371C11.0179 22.0692 12.4587 22.6223 13.9297 22.2211C15.4828 21.7964 17.0395 21.2435 18.4551 20.4828C20.0223 19.6404 21.1549 18.2831 21.4278 16.4027C21.6329 14.9903 21.7737 13.5664 21.9434 12.1478C22.0242 10.5136 21.4918 9.00431 20.6563 7.72109C19.3639 5.7366 17.3946 4.48026 15.1514 3.85878ZM11.4151 5.37831C13.2854 5.20478 15.1159 5.44551 16.9014 6.06093C19.1344 6.8297 20.8553 8.2492 20.6573 11.767C20.7098 13.7989 20.0962 15.9842 19.209 18.1049C19.112 18.3369 18.9906 18.5962 18.8057 18.7465C17.8398 19.5303 16.8779 20.3293 15.8575 21.0365C14.644 21.8769 13.3285 21.5591 12.0928 21.0961C10.1821 20.381 8.61998 19.1999 7.54885 17.4389L7.33986 17.0785C7.04388 16.5379 6.7183 16.0134 6.4092 15.4809C5.49993 13.9141 5.7254 12.2439 5.90627 10.5531C6.14583 8.30958 7.42948 6.84018 9.27444 5.83437C9.8917 5.49848 10.6897 5.44589 11.4151 5.37831ZM17.4034 7.33242C14.8712 6.25089 12.2592 5.8851 9.57034 6.89296C8.95857 7.12246 8.50533 7.46721 8.10647 7.92617L7.93752 8.13027C6.99985 9.32579 6.78499 10.7131 6.84865 12.2748C6.61022 13.2927 7.01708 14.2306 7.61721 15.1244C7.98495 15.6721 8.32033 16.2424 8.6719 16.8002C9.58533 18.2479 10.8598 19.2952 12.3643 20.0307C13.3444 20.5099 14.3968 20.618 15.4073 20.0268C16.1184 19.6092 16.8293 19.1901 17.5284 18.7514C18.2377 18.3075 18.7485 17.6802 18.9405 16.8549C19.286 15.3649 19.6838 13.8768 19.8829 12.3646C20.2325 9.70825 19.5294 8.24042 17.4034 7.33242ZM11.6534 7.45253C13.7915 7.19022 15.7547 7.58806 17.5655 8.81484C18.3405 9.34046 18.7935 9.97087 18.7217 10.9232C18.6237 12.2207 18.5443 13.5205 18.3907 14.8119C18.1499 16.8376 16.3957 18.1771 14.6797 18.6908L14.336 18.7826C13.0245 19.0932 12.0006 18.485 11.167 17.5912C9.76051 16.0819 8.8703 14.3221 8.92385 12.1439C9.08451 11.2016 9.19165 10.2459 9.41799 9.31972C9.68283 8.23438 10.5683 7.58571 11.6534 7.45253ZM17.126 9.85586C15.765 8.88434 14.2686 8.3256 12.5498 8.53945C11.9618 8.61309 11.3565 8.55118 10.5664 8.55117C10.3702 8.79068 10.2087 9.39371 10.0821 10.3598L10.0293 10.7943C9.76264 13.2347 10.4639 15.3051 12.3311 16.9223C12.8999 17.4155 13.565 17.7571 14.3116 17.5102C15.8423 17.0037 17.0216 16.0849 17.2793 14.3559C17.4521 13.1977 17.5746 12.0261 17.6221 10.8568C17.6363 10.5229 17.3978 10.0506 17.126 9.85586ZM11.1533 10.1908C11.1695 9.56026 11.4837 9.20301 12.1729 9.30996C12.4002 9.34521 12.6368 9.31582 12.8692 9.31582C14.0816 9.22506 15.2035 9.45603 15.8057 10.6293C16.0875 11.1771 16.1961 11.8837 16.1729 12.5102C16.1415 13.3292 15.7965 14.1393 15.7803 14.9574C15.7594 16.0338 14.5793 16.5516 13.6368 16.1059L13.4532 16.0033C12.1113 15.1488 11.5225 13.826 11.2325 12.35C11.0951 11.6521 11.1341 10.9109 11.1533 10.1908ZM11.711 9.99355C11.7777 10.5928 11.7994 11.1179 11.8994 11.6264C12.144 12.8621 12.8268 13.8472 13.7442 14.6684C13.9139 14.8207 14.1916 14.8492 14.42 14.935C14.4887 14.7433 14.5847 14.5564 14.6231 14.3598C14.7584 13.6739 14.8322 12.973 15.0069 12.2982C15.2373 11.4114 14.7898 10.496 13.8936 10.2982C13.557 10.2241 13.2153 10.1751 12.8555 10.1312L11.711 9.99355Z" fill="white"/></svg>';

/* ── Build PDF HTML ── */
function buildPdfHTML(u) {
  var now     = new Date();
  var dateStr = fullDate(now);
  var adv     = u.advisor || {};
  var ab      = u.airbnb  || {};

  var paymentCards = (u.paymentPlan || []).map(function(p) {
    return '<div class="payment-card">'
      + '<div class="payment-pct">' + p.pct + '</div>'
      + '<div class="payment-label">' + p.label + '</div>'
      + '<div class="payment-amount">' + p.amount + '</div>'
      + '<div class="payment-timing">' + p.timing + '</div>'
      + '</div>';
  }).join('');

  var costRows = (u.monthlyCosts || []).map(function(c) {
    return '<div class="costs-row">'
      + '<span class="costs-dk">' + c.label + '</span>'
      + '<span class="costs-dv">' + c.value + '</span>'
      + '</div>';
  }).join('');

  var distRows = (u.distances || []).map(function(d) {
    return '<div class="dist-row">'
      + '<span class="dist-label">' + d.label + '</span>'
      + '<span class="dist-time">' + d.time + '</span>'
      + '</div>';
  }).join('');

  var forStrip = u.clientName
    ? '<div class="hdr-for-strip">Preparado para · ' + u.clientName + (u.clientFlag || '') + '</div>'
    : '';

  var refLine = u.ref
    ? '<div class="hdr-ref">REF ' + u.ref + '</div>'
    : '';

  var footerDisc = u.clientName && u.ref
    ? 'Documento referencial preparado para ' + u.clientName.replace(/\s*\p{Emoji_Presentation}+$/u, '') + '. Validez 30 días naturales. Ref: ' + u.ref
    : 'Documento referencial. Precios y disponibilidad sujetos a cambio sin previo aviso.';

  return '<!DOCTYPE html>\n'
    + '<html lang="es">\n'
    + '<head>\n'
    + '<meta charset="UTF-8">\n'
    + '<title>Makai · ' + u.name + ' · Ficha de Propiedad</title>\n'
    + '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n'
    + '<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>\n'
    + '<style>\n'
    + '@page{margin:0;size:A4 portrait;}'
    + '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}'
    + 'body{font-family:"Inter",sans-serif;background:#fff;color:#111827;-webkit-font-smoothing:antialiased;width:210mm;margin:0 auto;}'

    + '.hdr{background:#0b1c0a;padding:14px 36px;display:flex;align-items:center;justify-content:space-between;}'
    + '.hdr-logo{display:flex;align-items:center;gap:14px;}'
    + '.hdr-wordmark{display:flex;flex-direction:column;gap:2px;}'
    + '.hdr-name{font-size:18px;font-weight:700;color:#F1EDE3;letter-spacing:.18em;line-height:1;}'
    + '.hdr-dev{font-size:8.5px;color:rgba(241,237,227,.42);letter-spacing:.16em;text-transform:uppercase;}'
    + '.hdr-right{text-align:right;}'
    + '.hdr-doctype{font-size:8.5px;font-weight:600;color:rgba(241,237,227,.4);letter-spacing:.14em;text-transform:uppercase;}'
    + '.hdr-date{font-size:10.5px;color:rgba(241,237,227,.68);margin-top:5px;}'
    + '.hdr-ref{font-size:8px;font-weight:700;color:#82b870;letter-spacing:.1em;margin-top:3px;}'

    + '.hdr-for-strip{background:#0f2b0d;padding:6px 36px;border-top:1px solid rgba(130,184,112,.15);border-bottom:1px solid rgba(130,184,112,.15);font-size:8px;font-weight:600;color:#82b870;letter-spacing:.1em;text-transform:uppercase;}'

    + '.hero{background:linear-gradient(140deg,#132012 0%,#0b1c0a 55%,#163020 100%);padding:24px 36px;display:flex;gap:26px;align-items:center;position:relative;}'
    + '.hero-img{width:220px;height:176px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:10px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:rgba(255,255,255,.12);}'
    + '.hero-img-label{font-size:28px;font-weight:700;letter-spacing:.06em;}'
    + '.hero-img-sub{font-size:7px;letter-spacing:.12em;text-transform:uppercase;}'
    + '.hero-info{flex:1;}'
    + '.hero-name{font-size:26px;font-weight:600;color:#F1EDE3;line-height:1.05;margin-bottom:3px;letter-spacing:-.02em;}'
    + '.hero-sub{font-size:11px;color:rgba(241,237,227,.45);margin-bottom:14px;letter-spacing:.02em;}'
    + '.hero-price-row{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;}'
    + '.hero-price{font-size:26px;font-weight:700;color:#F1EDE3;letter-spacing:-.01em;}'
    + '.hero-price-cur{font-size:14px;font-weight:500;color:rgba(241,237,227,.6);margin-left:3px;}'
    + '.hero-price-sub{font-size:10px;color:rgba(241,237,227,.38);margin-bottom:12px;}'
    + '.hero-roi{display:inline-flex;align-items:center;gap:5px;background:rgba(130,184,112,.12);border:1px solid rgba(130,184,112,.2);color:#82b870;font-size:10px;font-weight:600;padding:4px 12px;border-radius:100px;}'
    + '.hero-roi svg{width:11px;height:11px;}'
    + '.hero-reserve{position:absolute;top:24px;right:36px;text-align:right;}'
    + '.reserve-lbl{font-size:7.5px;color:rgba(201,124,64,.48);font-weight:600;text-transform:uppercase;letter-spacing:.14em;margin-bottom:1px;}'
    + '.reserve-amt{font-size:19px;font-weight:700;color:#c97c40;line-height:1;letter-spacing:-.02em;}'
    + '.reserve-cur{font-size:10px;font-weight:500;color:rgba(201,124,64,.5);margin-left:1px;}'

    + '.validity{background:#FFFBEB;border-top:1px solid #FDE68A;border-bottom:1px solid #FDE68A;padding:7px 36px;display:flex;align-items:center;gap:8px;font-size:9.5px;color:#92400E;line-height:1.4;}'
    + '.validity svg{flex-shrink:0;width:13px;height:13px;}'

    + '.section{padding:18px 36px 0;}'
    + '.section-last{padding-bottom:80px;}'
    + '.sec-title{font-size:8px;font-weight:600;color:#9CA3AF;letter-spacing:.12em;text-transform:uppercase;padding-bottom:7px;border-bottom:1px solid #F3F4F6;margin-bottom:12px;}'

    + '.specs-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:#F3F4F6;border:1px solid #F3F4F6;border-radius:8px;overflow:hidden;margin-bottom:18px;}'
    + '.spec-item{background:#fff;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:3px;}'
    + '.spec-ico{width:19px;height:19px;color:#6B7280;margin-bottom:2px;}'
    + '.spec-val{font-size:15px;font-weight:700;color:#111827;line-height:1;}'
    + '.spec-lbl{font-size:7.5px;color:#9CA3AF;text-transform:uppercase;letter-spacing:.06em;font-weight:500;}'

    + '.payment-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:18px;}'
    + '.payment-card{border:1px solid #F3F4F6;border-radius:7px;padding:12px;background:#FAFAFA;}'
    + '.payment-pct{font-size:20px;font-weight:700;color:#c97c40;line-height:1;margin-bottom:3px;}'
    + '.payment-label{font-size:11px;font-weight:600;color:#111827;margin-bottom:2px;}'
    + '.payment-amount{font-size:12px;font-weight:700;color:#374151;margin-bottom:4px;}'
    + '.payment-timing{font-size:7.5px;color:#9CA3AF;text-transform:uppercase;letter-spacing:.07em;font-weight:600;}'

    + '.metrics-row{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:18px;}'
    + '.metric-card{border:1px solid #F3F4F6;border-radius:7px;padding:12px 14px;}'
    + '.metric-card-lbl{font-size:7.5px;font-weight:600;color:#9CA3AF;letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px;}'
    + '.metric-card-val{font-size:24px;font-weight:700;color:#c97c40;line-height:1;margin-bottom:3px;}'
    + '.metric-card-val.green{color:#059669;}'
    + '.metric-card-val.blue{color:#2563EB;}'
    + '.metric-card-sub{font-size:9px;color:#6B7280;}'

    + '.advisor-row{display:flex;align-items:center;border:1px solid #F3F4F6;border-radius:8px;padding:14px 16px;gap:14px;}'
    + '.advisor-avatar{width:44px;height:44px;background:#c97c40;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:#fff;flex-shrink:0;}'
    + '.advisor-info{flex:1;}'
    + '.advisor-lbl{font-size:7px;color:#9CA3AF;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:2px;}'
    + '.advisor-name{font-size:15px;font-weight:600;color:#111827;line-height:1.2;margin-bottom:1px;}'
    + '.advisor-contact{font-size:9px;color:#6B7280;line-height:1.6;}'
    + '.advisor-cta{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;}'
    + '.advisor-wa{background:#25D366;color:#fff;border-radius:5px;padding:7px 14px;font-size:8.5px;font-weight:700;letter-spacing:.04em;white-space:nowrap;display:flex;align-items:center;gap:5px;}'
    + '.advisor-wa svg{width:12px;height:12px;}'
    + '.advisor-phone{font-size:8.5px;color:#6B7280;text-align:right;}'

    + '.page-break{page-break-before:always;}'

    + '.p2-hdr{padding:28px 36px 20px;border-bottom:3px solid #0b1c0a;display:flex;align-items:flex-end;justify-content:space-between;}'
    + '.p2-hdr-sub{font-size:9px;color:#9CA3AF;font-weight:600;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px;}'
    + '.p2-hdr-title{font-size:26px;font-weight:700;color:#111827;letter-spacing:-.02em;line-height:1;}'
    + '.p2-hdr-right{text-align:right;}'
    + '.p2-hdr-unit{font-size:9px;color:#6B7280;letter-spacing:.06em;margin-bottom:3px;}'
    + '.p2-hdr-ref{font-size:8px;color:#82b870;font-weight:700;letter-spacing:.1em;margin-top:2px;}'

    + '.two-col{display:grid;grid-template-columns:1fr 1fr;gap:16px;}'

    + '.confotur-card{background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:14px;margin-bottom:10px;}'
    + '.confotur-header{display:flex;align-items:center;gap:9px;margin-bottom:7px;}'
    + '.confotur-icon{width:28px;height:28px;background:#059669;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}'
    + '.confotur-icon svg{width:16px;height:16px;color:#fff;}'
    + '.confotur-title{font-size:12px;font-weight:700;color:#065F46;}'
    + '.confotur-text{font-size:9.5px;color:#047857;line-height:1.55;margin-bottom:10px;}'
    + '.confotur-badges{display:flex;gap:6px;}'
    + '.confotur-badge{flex:1;background:#fff;border:1px solid #BBF7D0;border-radius:5px;padding:7px 6px;text-align:center;}'
    + '.confotur-badge-title{font-size:9px;font-weight:700;color:#065F46;margin-bottom:2px;}'
    + '.confotur-badge-sub{font-size:8px;color:#047857;}'

    + '.airbnb-block{border:1px solid #F3F4F6;border-radius:8px;overflow:hidden;margin-bottom:10px;}'
    + '.airbnb-header{background:#F9FAFB;padding:8px 14px;display:flex;align-items:center;gap:7px;}'
    + '.airbnb-header-ico{width:14px;height:14px;color:#374151;}'
    + '.airbnb-header-lbl{font-size:7.5px;font-weight:700;color:#374151;letter-spacing:.1em;text-transform:uppercase;}'
    + '.airbnb-row{display:flex;justify-content:space-between;align-items:center;padding:8px 14px;border-top:1px solid #F3F4F6;font-size:10.5px;}'
    + '.airbnb-dk{color:#6B7280;}'
    + '.airbnb-dv{font-weight:600;color:#111827;}'
    + '.airbnb-dv.green{color:#059669;}'
    + '.airbnb-dv.red{color:#DC2626;}'
    + '.airbnb-total{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#111827;font-size:11px;font-weight:700;}'
    + '.airbnb-total-lbl{color:rgba(255,255,255,.7);}'
    + '.airbnb-total-val{color:#82b870;font-size:14px;}'

    + '.location-placeholder{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border:1px solid #A5D6A7;border-radius:7px;height:72px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#2E7D32;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px;}'
    + '.distances-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;}'
    + '.dist-row{display:flex;justify-content:space-between;align-items:center;background:#F9FAFB;border:1px solid #F3F4F6;border-radius:5px;padding:6px 10px;font-size:9.5px;}'
    + '.dist-label{color:#374151;}'
    + '.dist-time{font-weight:700;color:#111827;font-size:10px;}'

    + '.costs-block{border:1px solid #F3F4F6;border-radius:8px;overflow:hidden;}'
    + '.costs-row{display:flex;justify-content:space-between;align-items:center;padding:8px 14px;border-bottom:1px solid #F9FAFB;font-size:10.5px;}'
    + '.costs-dk{color:#6B7280;}'
    + '.costs-dv{font-weight:500;color:#111827;}'
    + '.costs-total{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#F9FAFB;font-size:12px;font-weight:700;color:#111827;}'

    + '.amenities-list{display:grid;grid-template-columns:1fr 1fr;gap:5px;}'
    + '.amenity-item{display:flex;align-items:center;gap:9px;background:#F9FAFB;border:1px solid #F3F4F6;border-radius:6px;padding:8px 12px;font-size:10px;color:#374151;}'
    + '.amenity-item svg{width:16px;height:16px;color:#6B7280;flex-shrink:0;}'

    + '.details-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid #F3F4F6;border-radius:8px;overflow:hidden;margin-bottom:18px;}'
    + '.details-col:first-child{border-right:1px solid #F3F4F6;}'
    + '.detail-row{display:flex;justify-content:space-between;align-items:center;padding:7px 14px;border-bottom:1px solid #F9FAFB;font-size:10.5px;}'
    + '.detail-row:last-child{border-bottom:none;}'
    + '.dk{color:#6B7280;}'
    + '.dv{color:#111827;font-weight:500;}'

    + '.footer{position:fixed;bottom:0;left:0;right:0;background:#F9FAFB;border-top:1px solid #E5E7EB;padding:10px 36px;display:flex;align-items:center;justify-content:space-between;}'
    + '.footer-brand{font-size:9px;font-weight:700;color:#374151;letter-spacing:.06em;}'
    + '.footer-contact{font-size:9px;color:#6B7280;text-align:center;line-height:1.55;}'
    + '.footer-disc{font-size:7.5px;color:#9CA3AF;text-align:right;max-width:190px;line-height:1.45;}'

    + '.cta-duo{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}'
    + '.cta-box{padding:16px 18px;display:flex;flex-direction:column;}'
    + '.cta-reserve{background:#0b1c0a;border-top:2px solid #c97c40;}'
    + '.cta-visit{background:#F9FAFB;border:1px solid #E9EAEC;border-top:2px solid #0b1c0a;}'
    + '.cta-label{font-size:7px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;margin-bottom:8px;}'
    + '.cta-reserve .cta-label{color:rgba(241,237,227,.28);}'
    + '.cta-visit .cta-label{color:#9CA3AF;}'
    + '.cta-amount{font-size:26px;font-weight:700;color:#c97c40;line-height:1;margin-bottom:12px;letter-spacing:-.02em;}'
    + '.cta-amount-cur{font-size:12px;font-weight:400;color:rgba(201,124,64,.45);margin-left:2px;}'
    + '.cta-modes{font-size:15px;font-weight:600;color:#111827;line-height:1.2;margin-bottom:12px;letter-spacing:-.01em;}'
    + '.cta-rule{border:none;border-top:1px solid;margin:0 0 10px;}'
    + '.cta-reserve .cta-rule{border-color:rgba(255,255,255,.07);}'
    + '.cta-visit .cta-rule{border-color:#E9EAEC;}'
    + '.cta-desc{font-size:8.5px;line-height:1.6;flex:1;margin-bottom:14px;}'
    + '.cta-reserve .cta-desc{color:rgba(241,237,227,.42);}'
    + '.cta-visit .cta-desc{color:#6B7280;}'
    + '.cta-link{font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;display:inline-block;}'
    + '.cta-reserve .cta-link{color:#c97c40;}'
    + '.cta-visit .cta-link{color:#111827;}'

    + '.qr-section{display:flex;align-items:center;justify-content:center;gap:64px;padding:22px 0 14px;}'
    + '.qr-divider{width:1px;height:120px;background:#E5E7EB;}'
    + '.qr-item{display:flex;flex-direction:column;align-items:center;gap:12px;}'
    + '.qr-canvas{display:inline-flex;padding:14px;border-radius:10px;background:#fff;border:1px solid #E5E7EB;line-height:0;}'
    + '.qr-canvas canvas{display:block!important;}'
    + '.qr-canvas img{display:none!important;}'
    + '.qr-text{display:flex;flex-direction:column;align-items:center;gap:3px;}'
    + '.qr-label{font-size:13px;font-weight:700;color:#111827;}'
    + '.qr-sub{font-size:10px;color:#9CA3AF;}'

    + '@media print{body{width:210mm;}.footer{position:fixed;bottom:0;}@page{margin:0;}}'
    + '</style>\n'
    + '</head>\n'
    + '<body>\n'

    /* ── PAGE 1 ── */
    + '<div class="hdr">'
    +   '<div class="hdr-logo">'
    +     ISOTIPO
    +     '<div class="hdr-wordmark">'
    +       '<div class="hdr-name">MAKAI</div>'
    +       '<div class="hdr-dev">Duna Development Group</div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="hdr-right">'
    +     '<div class="hdr-doctype">Ficha de Propiedad · ' + u.name + '</div>'
    +     '<div class="hdr-date">' + dateStr + '</div>'
    +     refLine
    +   '</div>'
    + '</div>'

    + forStrip

    + '<div class="hero">'
    +   '<div class="hero-img">'
    +     '<div class="hero-img-label">' + u.unitId + '</div>'
    +     '<div class="hero-img-sub">Render referencial · ' + u.name + '</div>'
    +   '</div>'
    +   '<div class="hero-info">'
    +     '<div class="hero-name">' + u.name + '</div>'
    +     '<div class="hero-sub">' + u.floor + ' · Orientación ' + u.orientation + ' · ' + u.view + '</div>'
    +     '<div class="hero-price-row">'
    +       '<span class="hero-price">' + usd(u.price) + '</span>'
    +       '<span class="hero-price-cur">USD</span>'
    +     '</div>'
    +     '<div class="hero-price-sub">' + usd(u.priceSqft) + ' / m² interior · Entrega ' + u.delivery + '</div>'
    +     '<div class="hero-roi">'
    +       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'
    +         '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'
    +       '</svg>'
    +       u.roi + '% ROI proyectado anual'
    +     '</div>'
    +   '</div>'
    +   '<div class="hero-reserve">'
    +     '<div class="reserve-lbl">Reserva desde</div>'
    +     '<div class="reserve-amt">' + usd(u.reserve) + ' <span class="reserve-cur">USD</span></div>'
    +   '</div>'
    + '</div>'

    + '<div class="validity">'
    +   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">'
    +     '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
    +   '</svg>'
    +   'Precios vigentes al <strong style="margin:0 4px">' + dateStr + '</strong>. Los valores están sujetos a cambio sin previo aviso.'
    + '</div>'

    /* specs */
    + '<div class="section">'
    +   '<div class="sec-title">Especificaciones de la unidad</div>'
    +   '<div class="specs-grid">'
    +     '<div class="spec-item">'
    +       '<svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +         '<rect x="2" y="7" width="20" height="13" rx="2"/><path d="M2 12h20"/>'
    +         '<rect x="5" y="8.5" width="5" height="3" rx="1"/><rect x="14" y="8.5" width="5" height="3" rx="1"/>'
    +         '<line x1="6" y1="7" x2="6" y2="5"/><line x1="18" y1="7" x2="18" y2="5"/>'
    +       '</svg>'
    +       '<div class="spec-val">' + u.beds + '</div><div class="spec-lbl">Dormitorio</div>'
    +     '</div>'
    +     '<div class="spec-item">'
    +       '<svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +         '<path d="M4 12V6a2 2 0 0 1 4 0v6"/>'
    +         '<path d="M2 12h20v3a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-3z"/>'
    +         '<line x1="7" y1="20" x2="7" y2="22"/><line x1="17" y1="20" x2="17" y2="22"/>'
    +       '</svg>'
    +       '<div class="spec-val">' + u.baths + '</div><div class="spec-lbl">Baños</div>'
    +     '</div>'
    +     '<div class="spec-item">'
    +       '<svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +         '<rect x="3" y="3" width="18" height="18" rx="2"/>'
    +         '<path d="M9 17V7h5a3 3 0 0 1 0 6H9"/>'
    +       '</svg>'
    +       '<div class="spec-val">' + u.parking + '</div><div class="spec-lbl">Parking</div>'
    +     '</div>'
    +     '<div class="spec-item">'
    +       '<svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +         '<path d="M13 3h8v8"/><path d="M21 3l-8 8"/>'
    +         '<path d="M11 21H3v-8"/><path d="M3 21l8-8"/>'
    +       '</svg>'
    +       '<div class="spec-val">' + u.areaInt + ' m²</div><div class="spec-lbl">Interior</div>'
    +     '</div>'
    +     '<div class="spec-item">'
    +       '<svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +         '<path d="M5 15V10a7 7 0 0 1 14 0v5"/>'
    +         '<path d="M3 15h18"/><path d="M3 21h18"/>'
    +         '<line x1="7" y1="15" x2="7" y2="21"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="17" y1="15" x2="17" y2="21"/>'
    +       '</svg>'
    +       '<div class="spec-val">' + u.areaTer + ' m²</div><div class="spec-lbl">Terraza</div>'
    +     '</div>'
    +   '</div>'
    + '</div>'

    /* payment plan */
    + '<div class="section">'
    +   '<div class="sec-title">Plan de pagos · Total ' + usd(u.price) + ' USD</div>'
    +   '<div class="payment-grid">' + paymentCards + '</div>'
    + '</div>'

    /* metrics */
    + '<div class="section">'
    +   '<div class="metrics-row">'
    +     '<div class="metric-card">'
    +       '<div class="metric-card-lbl">ROI Anual Estimado</div>'
    +       '<div class="metric-card-val">' + u.roi + '%</div>'
    +       '<div class="metric-card-sub">Mercado Cap Cana actual</div>'
    +     '</div>'
    +     '<div class="metric-card">'
    +       '<div class="metric-card-lbl">Plusvalía Proyectada</div>'
    +       '<div class="metric-card-val green">' + (u.plusvalia || '+18% año 1') + '</div>'
    +       '<div class="metric-card-sub">A la entrega vs precio actual</div>'
    +     '</div>'
    +     '<div class="metric-card">'
    +       '<div class="metric-card-lbl">Disponibilidad</div>'
    +       '<div class="metric-card-val blue">' + (u.availability || '3 unidades') + '</div>'
    +       '<div class="metric-card-sub">Tipología similar disponible</div>'
    +     '</div>'
    +   '</div>'
    + '</div>'

    /* cta boxes */
    + '<div class="section">'
    +   '<div class="cta-duo">'
    +     '<div class="cta-box cta-reserve">'
    +       '<div class="cta-label">Asegura tu unidad</div>'
    +       '<div class="cta-amount">' + usd(u.reserve) + '<span class="cta-amount-cur"> USD</span></div>'
    +       '<hr class="cta-rule">'
    +       '<div class="cta-desc">Bloquea el precio actual. Reserva totalmente reembolsable en los primeros 30 días.</div>'
    +       '<a class="cta-link" href="https://api.whatsapp.com/send?phone=18097109044&text=Hi,%20I%20was%20visiting%20https://makai-capcana.com%20and%20I%20want%20to%20reserve%20a%20unit%E2%80%A6">Iniciar reserva →</a>'
    +     '</div>'
    +     '<div class="cta-box cta-visit">'
    +       '<div class="cta-label">Agenda tu visita</div>'
    +       '<div class="cta-modes">Presencial · Tour 360°</div>'
    +       '<hr class="cta-rule">'
    +       '<div class="cta-desc">Recorre Makai Residences desde donde estés o visítanos en Cap Cana.</div>'
    +       '<a class="cta-link" href="https://makai-capcana.com/">Agendar →</a>'
    +     '</div>'
    +   '</div>'
    + '</div>'

    /* advisor */
    + '<div class="section section-last">'
    +   '<div class="sec-title">Tu asesor personal</div>'
    +   '<div class="advisor-row">'
    +     '<div class="advisor-avatar">' + (adv.initials || '') + '</div>'
    +     '<div class="advisor-info">'
    +       '<div class="advisor-lbl">' + (adv.title || '') + '</div>'
    +       '<div class="advisor-name">' + (adv.name || '') + '</div>'
    +       '<div class="advisor-contact">'
    +         (adv.email || '') + '<br>'
    +         (adv.website || '') + ' · ' + (adv.location || '')
    +       '</div>'
    +     '</div>'
    +     '<div class="advisor-cta">'
    +       '<a class="advisor-wa" href="' + (adv.wa || '#') + '" style="text-decoration:none;">'
    +         '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
    +           '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>'
    +         '</svg>'
    +         'WhatsApp directo'
    +       '</a>'
    +       '<div class="advisor-phone">' + (adv.phone || '') + '</div>'
    +     '</div>'
    +   '</div>'
    + '</div>'

    /* ── PAGE 2 ── */
    + '<div class="page-break"></div>'

    + '<div class="p2-hdr">'
    +   '<div>'
    +     '<div class="p2-hdr-sub">Makai Residences · Cap Cana</div>'
    +     '<div class="p2-hdr-title">Detalles del Proyecto</div>'
    +   '</div>'
    +   '<div class="p2-hdr-right">'
    +     '<div class="p2-hdr-unit">' + u.name + ' · Página 2 / 2</div>'
    +     (u.ref ? '<div class="p2-hdr-ref">REF ' + u.ref + '</div>' : '')
    +   '</div>'
    + '</div>'

    + '<div class="section" style="padding-top:20px">'
    +   '<div class="two-col">'

    /* left col */
    +     '<div>'
    +       '<div class="sec-title">Beneficios fiscales y legales</div>'
    +       '<div class="confotur-card">'
    +         '<div class="confotur-header">'
    +           '<div class="confotur-icon">'
    +             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +               '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
    +               '<polyline points="9 12 11 14 15 10"/>'
    +             '</svg>'
    +           '</div>'
    +           '<div class="confotur-title">Proyecto acogido a CONFOTUR</div>'
    +         '</div>'
    +         '<div class="confotur-text">Exención del impuesto de transferencia (3%) al momento de la compra y exoneración total del Impuesto al Patrimonio Inmobiliario (IPI 1% anual) durante 15 años. Aplica para inversores nacionales y extranjeros.</div>'
    +         '<div class="confotur-badges">'
    +           '<div class="confotur-badge"><div class="confotur-badge-title">CONFOTUR</div><div class="confotur-badge-sub">Exención fiscal</div></div>'
    +           '<div class="confotur-badge"><div class="confotur-badge-title">Ley 189-11</div><div class="confotur-badge-sub">Fideicomiso bancario</div></div>'
    +           '<div class="confotur-badge"><div class="confotur-badge-title">RNI Registrado</div><div class="confotur-badge-sub">Catastro nacional</div></div>'
    +         '</div>'
    +       '</div>'
    +       '<div class="sec-title" style="margin-top:14px">Costos mensuales estimados</div>'
    +       '<div class="costs-block">'
    +         costRows
    +         '<div class="costs-total">'
    +           '<span>Total mensual estimado</span>'
    +           '<span>' + (u.monthlyCostsTotal || '') + '</span>'
    +         '</div>'
    +       '</div>'
    +     '</div>'

    /* right col */
    +     '<div>'
    +       '<div class="sec-title">Rentabilidad Airbnb estimada</div>'
    +       '<div class="airbnb-block">'
    +         '<div class="airbnb-header">'
    +           '<svg class="airbnb-header-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    +             '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
    +           '</svg>'
    +           '<span class="airbnb-header-lbl">Proyección Renta Vacacional</span>'
    +         '</div>'
    +         '<div class="airbnb-row"><span class="airbnb-dk">Tarifa diaria promedio</span><span class="airbnb-dv green">' + (ab.dailyRate || '') + '</span></div>'
    +         '<div class="airbnb-row"><span class="airbnb-dk">Ocupación anual estimada</span><span class="airbnb-dv">' + (ab.occupancy || '') + '</span></div>'
    +         '<div class="airbnb-row"><span class="airbnb-dk">Gastos operativos (35%)</span><span class="airbnb-dv red">' + (ab.expenses || '') + '</span></div>'
    +         '<div class="airbnb-total"><span class="airbnb-total-lbl">Ingreso neto anual</span><span class="airbnb-total-val">' + (ab.netAnnual || '') + '</span></div>'
    +       '</div>'
    +       '<div class="sec-title" style="margin-top:14px">Ubicación y entorno</div>'
    +       '<div class="location-placeholder">Cap Cana · Punta Cana · República Dominicana</div>'
    +       '<div class="distances-grid">' + distRows + '</div>'
    +     '</div>'

    +   '</div>'
    + '</div>'

    /* amenidades */
    + '<div class="section" style="margin-top:14px">'
    +   '<div class="sec-title">Amenidades incluidas</div>'
    +   '<div class="amenities-list">'
    +     '<div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/><path d="M2 12c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/><path d="M2 18c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/></svg>Piscina infinita</div>'
    +     '<div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="12" x2="16" y2="12"/><line x1="5" y1="8" x2="5" y2="16"/><line x1="19" y1="8" x2="19" y2="16"/><rect x="3" y="7" width="4" height="2" rx="1"/><rect x="3" y="15" width="4" height="2" rx="1"/><rect x="17" y="7" width="4" height="2" rx="1"/><rect x="17" y="15" width="4" height="2" rx="1"/></svg>Gimnasio premium</div>'
    +     '<div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="2" x2="8" y2="22"/><path d="M6 2v5a2 2 0 0 0 4 0V2"/><path d="M18 2v4a4 4 0 0 1-2 3.46V22"/></svg>Restaurante</div>'
    +     '<div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><line x1="12" y1="2" x2="12" y2="3"/><line x1="17" y1="4.5" x2="16.3" y2="5.2"/><line x1="7" y1="4.5" x2="7.7" y2="5.2"/><path d="M2 16c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/><path d="M2 20c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/></svg>Beach Club</div>'
    +     '<div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>Seguridad 24/7</div>'
    +     '<div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>Consejería</div>'
    +     '<div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3a1 1 0 0 1-1-1V9l3-6h14l3 6v7a1 1 0 0 1-1 1h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 9h14"/></svg>Parking cubierto</div>'
    +     '<div class="amenity-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>Jardines tropicales</div>'
    +   '</div>'
    + '</div>'

    /* details table */
    + '<div class="section" style="margin-top:14px">'
    +   '<div class="sec-title">Ficha completa de la unidad</div>'
    +   '<div class="details-grid">'
    +     '<div class="details-col">'
    +       '<div class="detail-row"><span class="dk">Proyecto</span><span class="dv">' + u.project + '</span></div>'
    +       '<div class="detail-row"><span class="dk">Unidad</span><span class="dv">' + u.unitId + '</span></div>'
    +       '<div class="detail-row"><span class="dk">Piso</span><span class="dv">' + u.floor + '</span></div>'
    +       '<div class="detail-row"><span class="dk">Orientación</span><span class="dv">' + u.orientation + '</span></div>'
    +       '<div class="detail-row"><span class="dk">Vista</span><span class="dv">' + u.view + '</span></div>'
    +     '</div>'
    +     '<div class="details-col">'
    +       '<div class="detail-row"><span class="dk">Precio USD</span><span class="dv">' + usd(u.price) + '</span></div>'
    +       '<div class="detail-row"><span class="dk">Precio / m²</span><span class="dv">' + usd(u.priceSqft) + '</span></div>'
    +       '<div class="detail-row"><span class="dk">ROI estimado</span><span class="dv">' + u.roi + '% anual</span></div>'
    +       '<div class="detail-row"><span class="dk">Entrega estimada</span><span class="dv">' + u.delivery + '</span></div>'
    +       '<div class="detail-row"><span class="dk">Reserva mínima</span><span class="dv">' + usd(u.reserve) + ' USD</span></div>'
    +     '</div>'
    +   '</div>'
    + '</div>'

    /* qr codes */
    + '<div class="section section-last" style="margin-top:14px">'
    +   '<div class="sec-title">Canales directos de contacto</div>'
    +   '<div class="qr-section">'
    +     '<div class="qr-item"><div id="qr-whatsapp" class="qr-canvas"></div><div class="qr-text"><div class="qr-label">WhatsApp Directo</div><div class="qr-sub">Habla con tu asesor ahora</div></div></div>'
    +     '<div class="qr-divider"></div>'
    +     '<div class="qr-item"><div id="qr-project" class="qr-canvas"></div><div class="qr-text"><div class="qr-label">Visitar Proyecto</div><div class="qr-sub">makai-capcana.com</div></div></div>'
    +   '</div>'
    + '</div>'

    /* footer */
    + '<div class="footer">'
    +   '<div class="footer-brand">MAKAI · DUNA DEVELOPMENT GROUP</div>'
    +   '<div class="footer-contact">+1 (809) 710-9044 · info@dunadevelopment.com<br>Cap Cana, Punta Cana · República Dominicana</div>'
    +   '<div class="footer-disc">' + footerDisc + '</div>'
    + '</div>'

    + '<script>window.addEventListener("load",function(){'
    +   'new QRCode(document.getElementById("qr-whatsapp"),{text:"https://api.whatsapp.com/send?phone=18097109044&text=Hi,%20I%20was%20visiting%20https://makai-capcana.com%20and%20I%20want%20more%20information%E2%80%A6",width:130,height:130,colorDark:"#111827",colorLight:"#fff",correctLevel:QRCode.CorrectLevel.M});'
    +   'new QRCode(document.getElementById("qr-project"),{text:"https://makai-capcana.com/",width:130,height:130,colorDark:"#111827",colorLight:"#fff",correctLevel:QRCode.CorrectLevel.M});'
    +   'setTimeout(function(){window.print();},800);'
    + '});<\/script>\n'
    + '</body>\n</html>';
}

/* ── Trigger ── */
function shareProperty(unit) {
  var html = buildPdfHTML(unit);
  var blob = new Blob([html], { type: 'text/html; charset=utf-8' });
  var url  = URL.createObjectURL(blob);
  var win  = window.open(url, '_blank', 'width=920,height=720');
  if (win) {
    win.addEventListener('afterprint', function() {
      win.close();
      URL.revokeObjectURL(url);
    });
  }
}
