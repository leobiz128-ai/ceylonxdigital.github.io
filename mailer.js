// Sends booking emails. Configure SMTP in .env (see .env.example).
const nodemailer = require('nodemailer');

const OWNER = process.env.NOTIFY_EMAIL || 'Codexteam7@gmail.com';
const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '465', SMTP_USER, SMTP_PASS } = process.env;
const configured = Boolean(SMTP_USER && SMTP_PASS);

const transporter = configured
  ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
  : null;

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rs = n => 'Rs. ' + Number(n).toLocaleString('en-US');
const FROM = `"CeylonX Digital" <${SMTP_USER}>`;

async function send(opts) {
  if (!configured) throw new Error('Email is not set up. Add SMTP_USER and SMTP_PASS to .env');
  return transporter.sendMail({ from: FROM, ...opts });
}

// New booking: alert to the team inbox (reply goes straight to the customer) + confirmation to the customer (reply goes to the team).
async function notifyNewBooking(b, pkg) {
  const name = pkg ? pkg.name.en : b.packageId;
  const rows = [
    ['Booking reference', b.id], ['Package', `${name}${pkg ? ' (' + rs(pkg.price) + ')' : ''}`],
    ['Call date', b.date], ['Call time', b.time], ['Name', b.name], ['Business', b.business],
    ['Phone', b.phone], ['Email', b.email], ['Message', b.message || '-']
  ];
  const table = rows.map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join('');
  await send({
    to: OWNER, replyTo: b.email,
    subject: `New booking ${b.id}: ${name} – ${b.business}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') + '\n\nReply to this email to answer the customer.',
    html: `<h2>New booking</h2><table>${table}</table><p>Reply to this email to answer the customer directly.</p>`
  });
  await send({
    to: b.email, replyTo: OWNER,
    subject: `We received your booking (${b.id}) – CeylonX Digital`,
    text: `Hi ${b.name},\n\nThanks for booking the ${name} package. Your call is on ${b.date} at ${b.time}.\nBooking reference: ${b.id}\n\nWe will contact you on ${b.phone} to confirm. Reply to this email if you need to change anything.\n\nCeylonX Digital, Kalutara\n076 861 6628 / 078 879 1962`,
    html: `<p>Hi ${esc(b.name)},</p><p>Thanks for booking the <b>${esc(name)}</b> package. Your call is on <b>${esc(b.date)}</b> at <b>${esc(b.time)}</b>.</p><p>Booking reference: <b>${esc(b.id)}</b></p><p>We will contact you on ${esc(b.phone)} to confirm. Reply to this email if you need to change anything.</p><p>CeylonX Digital, Kalutara<br>076 861 6628 / 078 879 1962</p>`
  });
}

// Status change (confirmed / cancelled) → email the customer.
async function notifyStatus(b, pkg) {
  const name = pkg ? pkg.name.en : b.packageId;
  const msg = b.status === 'confirmed'
    ? `Your call is confirmed for ${b.date} at ${b.time}.`
    : `Your booking for ${b.date} at ${b.time} was cancelled. Reply to this email to pick a new time.`;
  await send({
    to: b.email, replyTo: OWNER,
    subject: `Booking ${b.id} ${b.status} – CeylonX Digital`,
    text: `Hi ${b.name},\n\n${msg}\nPackage: ${name}\n\nCeylonX Digital`,
    html: `<p>Hi ${esc(b.name)},</p><p>${esc(msg)}</p><p>Package: <b>${esc(name)}</b></p><p>CeylonX Digital</p>`
  });
}

module.exports = { configured, OWNER, send, notifyNewBooking, notifyStatus };
