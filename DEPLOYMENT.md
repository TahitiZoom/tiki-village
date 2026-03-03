# Deployment Guide - Tiki Village

This guide will help you deploy the Tiki Village e-commerce platform to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient for development)
- PostgreSQL database (Vercel Postgres, Neon, Supabase, or local)
- PayZen/OSB account for payment processing

## Step 1: Database Setup

### PostgreSQL (Neon / Supabase / Vercel Postgres)

**Option A: Neon (recommended, free tier available)**

1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project and database
3. In the connection settings, copy the connection string (pooled)
4. Use this as your `DATABASE_URL`

Example connection string:
```
postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/tiki_village?sslmode=require
```

**Option B: Supabase**

1. Go to [Supabase](https://supabase.com) and create a project
2. Go to Project Settings → Database
3. Copy the "Connection string" (URI format)
4. Use this as your `DATABASE_URL`

**Option C: Vercel Postgres**

1. In your Vercel dashboard, go to Storage
2. Create a new Postgres store
3. Connect it to your project — Vercel will inject `POSTGRES_URL` automatically
4. The application also reads `POSTGRES_URL` as a fallback for `DATABASE_URL`

**Option D: Local PostgreSQL (development)**

```bash
# Using Docker (easiest)
docker compose up -d

# Or install PostgreSQL and create a database
createdb tiki_village
```

## Step 2: Vercel Blob Storage

1. Go to your Vercel dashboard
2. Select your project (or create one)
3. Go to "Storage" tab
4. Create a new Blob store
5. Copy the `BLOB_READ_WRITE_TOKEN` from the environment variables

## Step 3: PayZen Configuration

Contact OSB (Lyra Network Polynésie) to get your credentials:

Required credentials:
- `PAYZEN_SHOP_ID` - Your shop identifier
- `PAYZEN_TEST_KEY` - Test API key
- `PAYZEN_PROD_KEY` - Production API key
- `PAYZEN_HMAC_TEST_KEY` - Test HMAC key
- `PAYZEN_HMAC_PROD_KEY` - Production HMAC key
- `PAYZEN_PUBLIC_TEST_KEY` - Test public key
- `PAYZEN_PUBLIC_PROD_KEY` - Production public key

## Step 4: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link your project:
```bash
vercel link
```

4. Set environment variables:
```bash
vercel env add DATABASE_URL
vercel env add PAYLOAD_SECRET
vercel env add NEXT_PUBLIC_SERVER_URL
vercel env add PAYZEN_SHOP_ID
vercel env add PAYZEN_MODE
vercel env add PAYZEN_PROD_KEY
vercel env add PAYZEN_HMAC_PROD_KEY
vercel env add PAYZEN_PUBLIC_PROD_KEY
vercel env add BLOB_READ_WRITE_TOKEN
```

5. Deploy:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. Add Environment Variables:

**Production Variables:**
```
DATABASE_URL=postgresql://username:password@host:5432/tiki_village?sslmode=require
PAYLOAD_SECRET=your-very-secure-random-string-minimum-32-characters
NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app
PAYZEN_SHOP_ID=your-shop-id
PAYZEN_MODE=PRODUCTION
PAYZEN_PROD_KEY=your-prod-key
PAYZEN_HMAC_PROD_KEY=your-hmac-prod-key
PAYZEN_PUBLIC_PROD_KEY=your-public-prod-key
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx
```

6. Click "Deploy"

## Step 5: Post-Deployment Setup

### 1. Create Admin User

After first deployment, visit:
```
https://your-domain.vercel.app/admin
```

Create your admin account:
- Email: admin@tikivillage.pf
- Password: [Choose a strong password]
- Role: Admin

### 2. Configure PayZen Webhooks

In your PayZen dashboard, configure webhook URLs:

**Standard Webhook:**
```
https://your-domain.vercel.app/api/payzen/notify
```

**REST API Webhook:**
```
https://your-domain.vercel.app/api/payzen/notify-rest
```

### 3. Seed Initial Data

1. Log into admin panel
2. Create Categories:
   - Ateliers (slug: ateliers)
   - Soirées (slug: soirees)
   - Mariages (slug: mariages)

3. Create Products (see example in README.md)

4. Configure Globals:
   - Header: Logo, navigation
   - Footer: Links, social media
   - Site Settings: Contact info, currency

## Step 6: Domain Configuration (Optional)

### Using Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., www.tikivillage.pf)
4. Follow Vercel's instructions to configure DNS

**DNS Configuration:**
Add CNAME record:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. Update environment variable:
```
NEXT_PUBLIC_SERVER_URL=https://www.tikivillage.pf
```

## Step 7: Monitoring & Maintenance

### Vercel Analytics

Enable Vercel Analytics in your project settings for:
- Page views
- Performance metrics
- Error tracking

### Database Backups

Configure automated backups in your PostgreSQL provider:
- **Neon**: Backups are automatic; use the Neon console to manage branches and restore points
- **Supabase**: Enable Point-in-Time Recovery in Project Settings → Database
- **Vercel Postgres**: Managed backups are available in the Vercel Storage dashboard

### Regular Updates

1. Keep dependencies updated:
```bash
npm update
npm audit fix
```

2. Monitor Payload CMS updates
3. Check PayZen API changes

## Troubleshooting

### Build Errors

**Error: Cannot find module '@payloadcms/...'**
- Solution: Run `npm install` and redeploy

**Error: Database connection failed**
- Verify `DATABASE_URL` (or `POSTGRES_URL`) is set correctly in your environment
- Check that your PostgreSQL provider allows connections from Vercel IPs
- For Neon/Supabase, ensure SSL mode is enabled (`?sslmode=require`)
- Test the connection string locally first

### Runtime Errors

**PayZen webhook not working**
- Verify webhook URL in PayZen dashboard
- Check environment variables
- Review Vercel function logs

**Images not loading**
- Verify Vercel Blob Storage is configured
- Check `BLOB_READ_WRITE_TOKEN` environment variable

## Security Checklist

- [ ] Use strong `PAYLOAD_SECRET` (32+ characters)
- [ ] Enable 2FA on Vercel account
- [ ] Restrict PostgreSQL access to Vercel IP ranges if possible
- [ ] Use production PayZen credentials only in production
- [ ] Enable HTTPS redirect in Vercel
- [ ] Configure CSP headers
- [ ] Regular security audits with `npm audit`

## Performance Optimization

1. Enable Vercel Edge Functions for API routes
2. Configure image optimization in `next.config.js`
3. Use Vercel Edge Caching for static assets
4. Monitor Core Web Vitals in Vercel Analytics

## Support

For deployment issues:
- Vercel: https://vercel.com/support
- Payload CMS: https://payloadcms.com/docs
- Neon: https://neon.tech/docs
- Supabase: https://supabase.com/docs

For application-specific issues, contact the development team.
