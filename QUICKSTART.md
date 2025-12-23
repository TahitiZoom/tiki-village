# Quick Start Guide - Tiki Village

Get up and running with Tiki Village in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
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
MONGODB_URI=mongodb://localhost:27017/tiki-village
PAYLOAD_KEY=your-secret-key-minimum-32-characters
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Option A: Local MongoDB

Install MongoDB locally:
```bash
# macOS
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB
mongod
```

### Option B: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 3. Start Development Server

```bash
npm run dev
```

The application will be available at:
- 🌐 Frontend: http://localhost:3000
- 🔐 Admin Panel: http://localhost:3000/admin

## 4. Create Admin User

1. Visit http://localhost:3000/admin
2. Fill in admin account details:
   - Email: admin@tikivillage.pf
   - Password: [Choose strong password]
3. Click "Create"

## 5. Add Initial Data

### Create Categories

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
└── package.json
```

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connection refused`

**Solution:**
- Check MongoDB is running: `mongosh`
- Verify `MONGODB_URI` in `.env`
- Try `mongodb://127.0.0.1:27017/tiki-village` instead

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

1. ✅ Application running locally
2. ✅ Admin account created
3. ✅ Initial data added

**Now you can:**
- 📝 Add more products
- 🎨 Customize styling
- 🧪 Test booking flow
- 📱 Test responsive design
- 🚀 Deploy to Vercel (see DEPLOYMENT.md)

## Resources

- 📖 [Full Documentation](README.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- 📊 [Seed Data Guide](SEED_DATA.md)
- 🔗 [Payload CMS Docs](https://payloadcms.com/docs)
- 🔗 [Next.js Docs](https://nextjs.org/docs)

## Need Help?

- Check existing GitHub issues
- Read documentation
- Contact development team

---

**Happy coding! 🌺**
