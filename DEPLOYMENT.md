# Deployment Guide - Tiki Village

This guide explains how to deploy the Tiki Village platform to Vercel with a Neon PostgreSQL database.

## Prerequisites

- GitHub account with the repository pushed
- [Vercel account](https://vercel.com) (free Hobby tier is sufficient)
- [Neon account](https://neon.tech) (free tier is sufficient for development)

---

## Step 1: Neon Database Setup

1. Go to [https://console.neon.tech](https://console.neon.tech) and create a free account.
2. Click **"New Project"** and give it a name (e.g. `tiki-village`).
3. Choose a region close to your Vercel deployment (e.g. `AWS us-east-1`).
4. Once created, open the **Connection Details** panel and copy the **Pooled connection string**:

```
postgresql://user:password@ep-xxx-yyy.region.aws.neon.tech/neondb?sslmode=require
```

> **Important:** Use the **pooled** connection string (port 5432 via the Neon pooler) in production to avoid exhausting PostgreSQL connections in a serverless environment.

5. Save this value — you will use it as `DATABASE_URL` in Vercel.

---

## Step 2: Vercel Project Setup

### Option A: Import from GitHub (recommended)

1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Click **"Import Git Repository"** and select your `tiki-village` repository.
3. Vercel will detect **Next.js** automatically.
4. Leave the default build settings (they match `vercel.json`):
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm ci`

5. Add the following **Environment Variables** before deploying:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon pooled connection string |
| `PAYLOAD_SECRET` | A random string of 32+ characters |
| `NEXT_PUBLIC_SERVER_URL` | `https://your-app.vercel.app` (update after first deploy) |
| `BLOB_READ_WRITE_TOKEN` | Your Vercel Blob token (see Step 3) |

6. Click **"Deploy"**.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel env add DATABASE_URL
vercel env add PAYLOAD_SECRET
vercel env add NEXT_PUBLIC_SERVER_URL
vercel env add BLOB_READ_WRITE_TOKEN
vercel --prod
```

---

## Step 3: Vercel Blob Storage (for media uploads)

1. In your Vercel project, go to the **Storage** tab.
2. Click **"Create Database"** → select **Blob**.
3. Once created, Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` environment variable to your project.
4. Redeploy the project so the variable is picked up.

---

## Step 4: Automatic Deployment via GitHub Actions

The repository includes `.github/workflows/deploy.yml` which automatically deploys to Vercel on every push to `main` and creates preview deployments for pull requests.

### Required GitHub Secrets

Add these secrets in your GitHub repository under **Settings → Secrets and variables → Actions**:

| Secret | How to get it |
|---|---|
| `VERCEL_TOKEN` | Vercel dashboard → Account Settings → Tokens → Create |
| `VERCEL_ORG_ID` | Vercel project → Settings → General → `OrgID` (shown in URL or settings) |
| `VERCEL_PROJECT_ID` | Vercel project → Settings → General → `Project ID` |

Once the secrets are set, every push to `main` will trigger a production deployment automatically.

---

## Step 5: Post-Deployment Setup

### Create the first admin user

Visit `https://your-app.vercel.app/admin` and create your admin account:
- **Email:** admin@tikivillage.pf
- **Password:** (choose a strong password)

Payload CMS will run the database migrations automatically on first boot.

### Configure PayZen Webhooks (optional)

In your PayZen/Lyra dashboard, set the following webhook URLs:

```
https://your-app.vercel.app/api/payzen/notify
https://your-app.vercel.app/api/payzen/notify-rest
```

### Seed initial data

1. Log into the admin panel.
2. Create Categories: Ateliers, Soirées, Mariages.
3. Configure Globals: Header, Footer, Site Settings.

---

## Step 6: Custom Domain (optional)

1. In Vercel, go to your project → **Settings → Domains**.
2. Add your domain (e.g. `www.tikivillage.pf`).
3. Configure the DNS CNAME record:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Update the environment variable:
```
NEXT_PUBLIC_SERVER_URL=https://www.tikivillage.pf
```

---

## Troubleshooting

### Build errors

**`Error: Cannot connect to database`**
- Verify `DATABASE_URL` is set and uses the Neon pooled endpoint.
- Ensure `?sslmode=require` is appended to the connection string.

**`Error: PAYLOAD_SECRET is missing`**
- Add a 32+ character random string as `PAYLOAD_SECRET` in Vercel environment variables.

### Runtime errors

**Images not loading**
- Verify `BLOB_READ_WRITE_TOKEN` is configured (see Step 3).

**Too many database connections**
- Use the Neon **pooled** connection string (not the direct connection string).

---

## Security Checklist

- [ ] Use a strong `PAYLOAD_SECRET` (32+ random characters)
- [ ] Use the Neon **pooled** connection string in production
- [ ] Enable 2FA on Vercel and Neon accounts
- [ ] Use production PayZen credentials only in production
- [ ] Never commit `.env` files to the repository

---

## Support

- Vercel: https://vercel.com/docs
- Neon: https://neon.tech/docs
- Payload CMS: https://payloadcms.com/docs
