# Quick Start Guide - Tiki Village

Get up and running with Tiki Village in 5 minutes!

## Prerequisites

- Node.js 18+ installed (ou Docker)
- Docker & Docker Compose (recommandé)
- Git installed

## 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/TahitiZoom/tiki-village.git
cd tiki-village

# Install dependencies
npm install
```

## 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Minimum required for local development:
DATABASE_URI=postgresql://tikivillage:changeme@localhost:5432/tikivillage
PAYLOAD_SECRET=your-secret-key-minimum-32-characters
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Option A: Docker Compose (recommandé)

```bash
# Lance l'app + PostgreSQL
docker compose up -d
```

### Option B: PostgreSQL local

Installer PostgreSQL localement :
```bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Créer la base de données
createuser tikivillage
createdb -O tikivillage tikivillage
```

## 3. Start Development Server

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## 4. Create Admin User

1. Visit http://localhost:3000/admin
2. Fill in admin account details:
   - Email: admin@tikivillage.pf
   - Password: [Choose strong password]
3. Click "Create"

## 5. Add Initial Data

### Seed Data (automatic)

Use the seed endpoint:
```
GET http://localhost:3000/api/seed-all?token=YOUR_SEED_TOKEN
```

### Or manually:

#### Create Categories

Go to http://localhost:3000/admin/collections/categories and create:

1. **Ateliers**
   - Name: Ateliers Culturels
   - Slug: ateliers

2. **Soirées**
   - Name: Soirées & Spectacles
   - Slug: soirees

3. **Mariages**
   - Name: Mariages Polynésiens
   - Slug: mariages

### Create Products

See `SEED_DATA.md` for complete product details, or create test products:

1. **1 Atelier Culturel**
   - Category: Ateliers
   - Price: 3500
   - Bookable: Yes
   - Available Days: Tuesday, Friday

2. **Dîner-Spectacle**
   - Category: Soirées
   - Price: 10500
   - Bookable: Yes

### Configure Globals

#### Header
- Upload logo
- Add navigation items
- Configure social links

#### Footer
- Add footer links
- Social media links
- Payment methods

#### Site Settings
- Site name: Tiki Village
- Contact information
- Business hours

## 6. Test the Application

### Test Homepage
```
Visit: http://localhost:3000
```

### Test Services Page
```
Visit: http://localhost:3000/services
```

### Test Contact Form
```
Visit: http://localhost:3000/contact
```

### Test Admin Panel
```
Visit: http://localhost:3000/admin
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Payload CMS
npm run payload          # Run Payload CLI commands
npm run generate:types   # Generate TypeScript types

# Code Quality
npm run lint             # Run ESLint
```

## Project Structure

```
tiki-village/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (frontend)/     # Public pages
│   │   ├── (admin)/        # Admin panel
│   │   └── api/            # API routes
│   ├── collections/        # Payload collections
│   ├── globals/           # Payload globals
│   ├── components/        # React components
│   ├── lib/              # Utilities
│   └── payload.config.ts # Payload configuration
├── public/               # Static files
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Troubleshooting

### Erreur de connexion PostgreSQL

**Error:** `connection refused`

**Solution:**
- Vérifiez que PostgreSQL tourne : `pg_isready`
- Vérifiez `DATABASE_URI` dans `.env`
- Avec Docker : `docker compose ps` pour vérifier l'état des containers

### Port 3000 Already in Use

**Solution:**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found Error

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Next Steps

1. Application running locally
2. Admin account created
3. Initial data added

**Now you can:**
- Add more products
- Customize styling
- Test booking flow
- Test responsive design
- Déployer sur Coolify (voir DEPLOYMENT.md)

## Resources

- [Full Documentation](README.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Seed Data Guide](SEED_DATA.md)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

## Need Help?

- Check existing GitHub issues
- Read documentation
- Contact development team
