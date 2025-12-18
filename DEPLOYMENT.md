# Deployment Guide - Tiki Village

This guide will help you deploy the Tiki Village e-commerce platform to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient for development)
- MongoDB Atlas account (or other MongoDB hosting)
- PayZen/OSB account for payment processing

## Step 1: Database Setup

### MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier is fine for development)
3. Configure network access:
   - Click "Network Access" in the left sidebar
   - Add IP Address: `0.0.0.0/0` (allow from anywhere - Vercel has dynamic IPs)
4. Create a database user:
   - Click "Database Access" in the left sidebar
   - Add New Database User
   - Choose "Password" authentication
   - Save the username and password
5. Get connection string:
   - Click "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tiki-village?retryWrites=true&w=majority
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
vercel env add MONGODB_URI
vercel env add DATABASE_URI
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
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tiki-village
DATABASE_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tiki-village
PAYLOAD_SECRET=your-very-secure-random-string-here
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

Configure automated backups in MongoDB Atlas:
1. Go to your cluster
2. Click "Backup" tab
3. Enable Cloud Backup

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
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure network access is configured

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
- [ ] Restrict MongoDB network access if possible
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
- MongoDB: https://www.mongodb.com/support

For application-specific issues, contact the development team.
