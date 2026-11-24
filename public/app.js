const $ = s => document.querySelector(s);
const T = {
 en:{nav_services:'Services',nav_packages:'Packages',nav_process:'How it works',nav_contact:'Contact',nav_book:'Book a call',
  h1:'Grow your business',lead:'Videos, graphic posts, social media ads and Google Ads for businesses in Sri Lanka.',cta1:'Book a free call',cta2:'See packages',from:'Packages from',
  s_title:'What we make',s1:'Videos',s1d:'Promotion videos that show your business at its best.',s2:'Graphic posts',s2d:'Clean, on-brand designs for your feed every week.',
  s3:'Social media ads',s3d:'Ad sets on Facebook and Instagram aimed at the right people.',s4:'Influencer marketing',s4d:'Local influencers who bring your brand to new customers.',s5:'Google Ads',s5d:'Be seen when people search for what you sell.',
  p_title:'Digital marketing packages',p_sub:'Choose a package, then book a free call to plan it.',choose:'Choose',
  h_title:'How it works',h1t:'Book a call',h1d:'Pick a package and a time. It takes two minutes.',h2t:'We plan with you',h2d:'We learn your business and agree the content and ads.',h3t:'Launch and grow',h3d:'We publish, run the ads and keep improving.',
  b_title:'Book your free call',b_text:'30 minutes with our team. Open Monday to Saturday.',b1:'1. Choose a package',b2:'2. Pick a date and time',b3:'3. Your details',
  b_date:'Date',b_pick:'Pick a date to see open times.',b_name:'Your name',b_phone:'Phone number',b_email:'Email',b_biz:'Business name',b_msg:'What do you want to achieve? (optional)',b_submit:'Confirm booking',
  f_loc:'Location: Kalutara, Sri Lanka',f_call:'Call us',f_web:'Find us online',
  e_pkg:'Choose a package.',e_dt:'Pick a date and a time.',e_net:'Could not reach the server. Check your connection and try again.',e_slots:'Could not load times. Try again.',none:'No times left that day. Try another date.',
  ok:'You are booked',okp:'Call on',okt:'at',okr:'Booking reference',oke:'We will contact you to confirm.',mo:'/ month'},
 si:{nav_services:'සේවා',nav_packages:'පැකේජ',nav_process:'ක්‍රියාවලිය',nav_contact:'අමතන්න',nav_book:'ඇමතුමක් වෙන්කරන්න',
  h1:'ඔබේ ව්‍යාපාරය දියුණු කරගන්න',lead:'ශ්‍රී ලංකාවේ ව්‍යාපාර සඳහා වීඩියෝ, ග්‍රැෆික් පෝස්ට්, සමාජ මාධ්‍ය දැන්වීම් සහ ගුගල් දැන්වීම්.',cta1:'නොමිලේ ඇමතුමක් වෙන්කරන්න',cta2:'පැකේජ බලන්න',from:'පැකේජ ආරම්භය',
  s_title:'අපි නිපදවන දේ',s1:'වීඩියෝ',s1d:'ඔබේ ව්‍යාපාරය හොඳම ආකාරයෙන් පෙන්වන ප්‍රවර්ධන වීඩියෝ.',s2:'ග්‍රැෆික් පෝස්ට්',s2d:'ඔබේ සන්නාමයට ගැළපෙන පිරිසිදු නිර්මාණ.',
  s3:'සමාජ මාධ්‍ය දැන්වීම්',s3d:'නිවැරදි පිරිස වෙත ළඟාවන ෆේස්බුක් සහ ඉන්ස්ටාග්‍රෑම් දැන්වීම්.',s4:'බලපෑම්කාරී අලෙවිකරණය',s4d:'ඔබේ සන්නාමය නව ගනුදෙනුකරුවන් වෙත ගෙන යන දේශීය බලපෑම්කරුවන්.',s5:'ගුගල් දැන්වීම්',s5d:'ඔබ විකුණන දේ සොයන විට ඔබව පෙනෙන්න සලස්වන්න.',
  p_title:'ඩිජිටල් අලෙවිකරණ පැකේජ',p_sub:'පැකේජයක් තෝරා, සැලසුම් කිරීමට නොමිලේ ඇමතුමක් වෙන්කරන්න.',choose:'තෝරන්න',
  h_title:'ක්‍රියාවලිය',h1t:'ඇමතුමක් වෙන්කරන්න',h1d:'පැකේජයක් සහ වේලාවක් තෝරන්න. විනාඩි දෙකක් පමණයි.',h2t:'අපි එකට සැලසුම් කරමු',h2d:'ඔබේ ව්‍යාපාරය අවබෝධ කර, අන්තර්ගතය සහ දැන්වීම් එකඟ වෙමු.',h3t:'දියත් කර වර්ධනය කරන්න',h3d:'අපි පළ කර, දැන්වීම් ධාවනය කර, දිගටම දියුණු කරමු.',
  b_title:'නොමිලේ ඇමතුමක් වෙන්කරන්න',b_text:'අපගේ කණ්ඩායම සමඟ මිනිත්තු 30ක්. සඳුදා සිට සෙනසුරාදා දක්වා.',b1:'1. පැකේජය තෝරන්න',b2:'2. දිනය සහ වේලාව තෝරන්න',b3:'3. ඔබේ විස්තර',
  b_date:'දිනය',b_pick:'ලබාගත හැකි වේලාවන් බැලීමට දිනයක් තෝරන්න.',b_name:'ඔබේ නම',b_phone:'දුරකථන අංකය',b_email:'විද්‍යුත් තැපෑල',b_biz:'ව්‍යාපාරයේ නම',b_msg:'ඔබට ළඟාකරගැනීමට අවශ්‍ය දේ? (අවශ්‍ය නම්)',b_submit:'වෙන්කිරීම තහවුරු කරන්න',
  f_loc:'ස්ථානය: කළුතර, ශ්‍රී ලංකාව',f_call:'අමතන්න',f_web:'අපව සොයාගන්න',
  e_pkg:'පැකේජයක් තෝරන්න.',e_dt:'දිනයක් සහ වේලාවක් තෝරන්න.',e_net:'සේවාදායකයට සම්බන්ධ විය නොහැක. නැවත උත්සාහ කරන්න.',e_slots:'වේලාවන් පූරණය කළ නොහැක. නැවත උත්සාහ කරන්න.',none:'එදින වේලාවන් නැත. වෙනත් දිනයක් තෝරන්න.',
  ok:'ඔබේ වෙන්කිරීම සම්පූර්ණයි',okp:'ඇමතුම',okt:'වේලාව',okr:'වෙන්කිරීමේ අංකය',oke:'තහවුරු කිරීමට අපි ඔබව අමතන්නෙමු.',mo:'/ මාසය'}
};
let lang = 'en';
try { lang = localStorage.getItem('lang') || 'en'; } catch {}
const state = { packages: [], packageId: '', time: '', booking: null };
const t = k => T[lang][k] || T.en[k];
const rs = n => 'Rs. ' + n.toLocaleString('en-US');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#yr').textContent = new Date().getFullYear();

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  $('#lang').textContent = lang === 'en' ? 'සිං' : 'EN';
  renderPackages(); renderSuccess();
}
$('#lang').onclick = () => { lang = lang === 'en' ? 'si' : 'en'; try { localStorage.setItem('lang', lang); } catch {} applyLang(); };

function renderPackages() {
  if (!state.packages.length) return;
  $('#packageList').innerHTML = state.packages.map(p => `
    <article class="pkg ${p.accent}">
      <h3>${esc(p.name[lang])}</h3>
      <div class="price">${rs(p.price)}<small>${t('mo')}</small></div>
      <ul>${p.features.map(f => `<li>${esc(f[lang])}</li>`).join('')}</ul>
      <a class="btn" href="#book" data-pick="${p.id}">${t('choose')}</a>
    </article>`).join('');
  const prev = state.packageId;
  $('#pkgChoice').innerHTML = state.packages.map(p => `
    <label><input type="radio" name="pkg" value="${p.id}" ${p.id === prev ? 'checked' : ''}><span>${esc(p.name[lang])}<small>${rs(p.price)}</small></span></label>`).join('');
}
async function loadPackages() {
  try { state.packages = await (await fetch('/api/packages')).json(); renderPackages(); }
  catch { $('#packageList').textContent = t('e_net'); }
}
document.addEventListener('click', e => {
  const pick = e.target.closest('[data-pick]');
  if (pick) { state.packageId = pick.dataset.pick; const r = document.querySelector(`input[name=pkg][value="${state.packageId}"]`); if (r) r.checked = true; }
  const slot = e.target.closest('.slot');
  if (slot) { state.time = slot.dataset.time; document.querySelectorAll('.slot').forEach(s => s.setAttribute('aria-pressed', s === slot)); }
});
document.addEventListener('change', e => { if (e.target.name === 'pkg') state.packageId = e.target.value; });

const dateInput = $('#date');
const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
dateInput.min = now.toISOString().slice(0, 10);

async function loadSlots() {
  state.time = '';
  if (!dateInput.value) return;
  $('#slots').innerHTML = '<p class="hint">…</p>';
  try {
    const r = await (await fetch('/api/slots?date=' + dateInput.value)).json();
    $('#slots').innerHTML = r.slots?.length
      ? r.slots.map(x => `<button type="button" class="slot" data-time="${x}" aria-pressed="false">${x}</button>`).join('')
      : `<p class="hint">${esc(r.note || t('none'))}</p>`;
  } catch { $('#slots').innerHTML = `<p class="hint">${t('e_slots')}</p>`; }
}
dateInput.addEventListener('change', loadSlots);

function renderSuccess() {
  const b = state.booking; if (!b) return;
  const p = state.packages.find(x => x.id === b.packageId);
  const s = $('#success'); s.hidden = false;
  s.innerHTML = `<h3>${t('ok')}, ${esc(b.name.split(' ')[0])}.</h3>
   <p>${esc(p.name[lang])} · ${t('okp')} <b>${esc(b.date)}</b> ${t('okt')} <b>${esc(b.time)}</b></p>
   <p>${t('okr')}: <b>${esc(b.id)}</b></p><p>${t('oke')}</p>`;
}

$('#bookForm').addEventListener('submit', async e => {
  e.preventDefault();
  const err = $('#formError'); err.textContent = '';
  const body = { packageId: state.packageId, date: dateInput.value, time: state.time, name: $('#name').value, phone: $('#phone').value,
    email: $('#email').value, business: $('#business').value, message: $('#message').value };
  if (!body.packageId) return err.textContent = t('e_pkg');
  if (!body.date || !body.time) return err.textContent = t('e_dt');
  const btn = $('#submitBtn'); btn.disabled = true;
  try {
    const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) { err.textContent = data.error; if (res.status === 409) loadSlots(); return; }
    state.booking = data; $('#bookForm').hidden = true; renderSuccess(); $('#success').focus();
  } catch { err.textContent = t('e_net'); }
  finally { btn.disabled = false; }
});

applyLang(); loadPackages();
