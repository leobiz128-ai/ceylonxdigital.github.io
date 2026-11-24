require('dotenv').config();
const express = require('express');
const mailer = require('./mailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme';
const DATA = path.join(__dirname, 'data');
const BOOKINGS = path.join(DATA, 'bookings.json');
const SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const read = (f, fallback) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return fallback; } };
const write = (f, d) => fs.writeFileSync(f, JSON.stringify(d, null, 2));
const packages = () => read(path.join(DATA, 'packages.json'), []);
const bookings = () => read(BOOKINGS, []);
const clean = (s, n = 500) => String(s || '').trim().slice(0, n);

app.get('/api/packages', (req, res) => res.json(packages()));

// Available time slots for a date (YYYY-MM-DD). Weekends closed.
app.get('/api/slots', (req, res) => {
  const date = clean(req.query.date, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: 'Choose a valid date.' });
  const day = new Date(date + 'T00:00:00').getDay();
  if (day === 0) return res.json({ date, slots: [], note: 'We are closed on Sundays. Pick Monday to Saturday.' });
  const taken = bookings().filter(b => b.date === date && b.status !== 'cancelled').map(b => b.time);
  const now = new Date();
  const slots = SLOTS.filter(t => !taken.includes(t) && new Date(`${date}T${t}:00`) > now);
  res.json({ date, slots });
});

app.post('/api/bookings', (req, res) => {
  const b = req.body || {};
  const data = {
    packageId: clean(b.packageId, 30), date: clean(b.date, 10), time: clean(b.time, 5),
    name: clean(b.name, 80), phone: clean(b.phone, 20), email: clean(b.email, 120), business: clean(b.business, 120), message: clean(b.message, 800)
  };
  if (!packages().some(p => p.id === data.packageId)) return res.status(400).json({ error: 'Choose a package.' });
  if (!data.name || !data.business) return res.status(400).json({ error: 'Enter your name and business name.' });
  if (!/^[0-9+ ()-]{9,20}$/.test(data.phone)) return res.status(400).json({ error: 'Enter a valid phone number.' });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (!SLOTS.includes(data.time) || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) return res.status(400).json({ error: 'Choose a date and time.' });
  const all = bookings();
  if (all.some(x => x.date === data.date && x.time === data.time && x.status !== 'cancelled'))
    return res.status(409).json({ error: 'That time was just booked. Pick another slot.' });
  const booking = { id: 'BK' + Date.now().toString(36).toUpperCase(), ...data, status: 'pending', createdAt: new Date().toISOString() };
  all.push(booking);
  write(BOOKINGS, all);
  res.status(201).json({ id: booking.id, name: booking.name, packageId: booking.packageId, date: booking.date, time: booking.time });
  const pkg = packages().find(p => p.id === booking.packageId);
  mailer.notifyNewBooking(booking, pkg)
    .then(() => setEmail(booking.id, 'sent'))
    .catch(err => { console.error('Booking email failed:', err.message); setEmail(booking.id, 'failed: ' + err.message); });
});

function setEmail(id, status) {
  const all = bookings(); const b = all.find(x => x.id === id);
  if (b) { b.emailStatus = status; write(BOOKINGS, all); }
}

const auth = (req, res, next) =>
  req.get('x-admin-token') === ADMIN_TOKEN ? next() : res.status(401).json({ error: 'Wrong admin token.' });

app.get('/api/admin/bookings', auth, (req, res) =>
  res.json(bookings().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))));

app.patch('/api/admin/bookings/:id', auth, (req, res) => {
  const status = clean(req.body.status, 20);
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) return res.status(400).json({ error: 'Invalid status.' });
  const all = bookings();
  const item = all.find(x => x.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Booking not found.' });
  item.status = status;
  write(BOOKINGS, all);
  res.json(item);
  if (status !== 'pending') {
    mailer.notifyStatus(item, packages().find(p => p.id === item.packageId))
      .catch(err => console.error('Status email failed:', err.message));
  }
});

// Admin: send a test email to the team inbox to check the setup.
app.post('/api/admin/test-email', auth, async (req, res) => {
  try {
    await mailer.send({ to: mailer.OWNER, subject: 'CeylonX test email', text: 'Email setup works. Booking alerts will arrive here.' });
    res.json({ ok: true, to: mailer.OWNER });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, () => {
  console.log(`CeylonX Digital running at http://localhost:${PORT}`);
  console.log(mailer.configured ? `Booking emails go to ${mailer.OWNER}` : 'WARNING: email not set up. Copy .env.example to .env and add SMTP_PASS.');
});
