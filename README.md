# Addis Africa Site (Local)

Run locally:

```bash
npm install
cp .env.example .env
# edit .env with real SMTP credentials
npm start
```

Uploads will be stored in `uploads/` and form submissions are POSTed to `/api/contact`.

## Deployment

1. Create a `.env` file from `.env.example`.
2. Add real SMTP credentials.
3. Deploy on a Node-compatible host.

### Heroku

```bash
heroku create
git add .
git commit -m "deploy"
git push heroku main
heroku config:set CONTACT_EMAIL=addisafricacso@gmail.com
heroku config:set SMTP_HOST=smtp.example.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER=you@example.com
heroku config:set SMTP_PASS=yourpassword
heroku config:set SMTP_SECURE=false
```

### Render / Railway

- Ensure `start` script is `npm start`.
- Set environment variables from `.env` in the host dashboard.
- Provide a volume or external storage for uploads if needed.
