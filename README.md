# CeylonX Digital – Website with Packages and Booking

Full-stack project: Express (Node.js) backend + vanilla HTML/CSS/JS frontend. No database setup needed; data is stored in JSON files.

## Run
1. Install Node.js 18+
2. `npm install`
3. `npm start`  → open http://localhost:3000
4. Admin bookings: http://localhost:3000/admin.html (default token: `changeme`)

Set your own token: `ADMIN_TOKEN=mysecret npm start`

## Structure
- `server.js` – API: packages, available slots, create booking, admin list/update
- `data/packages.json` – edit packages and prices here
- `data/bookings.json` – created automatically on first booking
- `public/` – website (index.html, styles.css, app.js, admin.html)

## Customize
- Brand name, copy: `public/index.html`
- Colors and fonts: CSS variables at top of `public/styles.css`
- Time slots: `SLOTS` array in `server.js`
- To move to a real database (MongoDB, PostgreSQL), replace the `read`/`write` helpers in `server.js`.

- Language: English / Sinhala toggle. Text lives in the `T` object at the top of `public/app.js`; package text in `data/packages.json`.
- Prices are in LKR. Slots are Monday to Saturday.

## Booking emails (Codexteam7@gmail.com)
Every new booking sends:
1. An alert to **Codexteam7@gmail.com** with all details. Press Reply and the answer goes straight to the customer.
2. A confirmation to the customer. If they reply, it lands in Codexteam7@gmail.com.
Marking a booking confirmed or cancelled in the admin page also emails the customer.

### Set up (5 minutes)
1. Sign in to the Gmail account that will send emails and turn on 2-Step Verification (Google Account > Security).
2. Go to https://myaccount.google.com/apppasswords, create an App Password, copy the 16 characters.
3. Copy `.env.example` to `.env`, paste the password into `SMTP_PASS`, set `ADMIN_TOKEN`.
4. Run `npm install` then `npm start`. Open `/admin.html`, enter the token, press **Send test email**.

If the email fails, the booking is still saved and the admin page shows the error in the Email column.
Other providers (Brevo, SendGrid, Zoho): change `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` in `.env`.
