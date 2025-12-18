# Tiki Village - E-commerce Platform

Migration from WordPress/WooCommerce to Payload CMS e-commerce platform hosted on Vercel.

## 🌺 About

Tiki Village is a Polynesian Cultural Center in French Polynesia offering cultural workshops, dinner shows, and traditional Polynesian wedding ceremonies. This project is a complete e-commerce solution built with:

- **Payload CMS 3.x** - Headless CMS with powerful admin panel
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **PayZen/OSB** - Payment gateway for French Polynesia
- **Vercel** - Serverless hosting platform

## 🚀 Features

### E-commerce
- ✅ Product catalog with 8 services (workshops, shows, weddings)
- ✅ Booking system with calendar availability
- ✅ Participant selection (adults/children)
- ✅ Extra options (transfers, packages)
- ✅ Shopping cart and checkout
- ✅ Order management
- ✅ Promotional codes and discounts

### Payment Integration
- ✅ PayZen/OSB payment gateway integration
- ✅ Credit card payments (Visa/Mastercard)
- ✅ 3DS support
- ✅ XPF currency (Franc Pacifique)
- ✅ Payment webhooks (standard and REST API)

### Multi-language
- ✅ French (default)
- ✅ English
- ✅ Japanese (日本語)

### Content Management
- ✅ Dynamic pages with blocks
- ✅ Rich text editor (Lexical)
- ✅ Media library with image optimization
- ✅ Testimonials management
- ✅ Contact form submissions

### Features
- ✅ User authentication (login/register)
- ✅ GDPR compliance
- ✅ Cookie consent
- ✅ SEO optimization
- ✅ Responsive design
- ✅ Admin panel

## 📁 Project Structure

```
tiki-village/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (frontend)/        # Frontend routes
│   │   ├── (admin)/           # Admin panel routes
│   │   ├── api/               # API routes
│   │   │   ├── [[...slug]]/  # Payload API
│   │   │   └── payzen/       # PayZen webhooks
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── collections/           # Payload Collections
│   │   ├── Users.ts
│   │   ├── Products.ts
│   │   ├── Categories.ts
│   │   ├── Bookings.ts
│   │   ├── Orders.ts
│   │   ├── Pages.ts
│   │   ├── Media.ts
│   │   ├── Testimonials.ts
│   │   ├── Promotions.ts
│   │   └── ContactSubmissions.ts
│   ├── globals/              # Payload Globals
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── SiteSettings.ts
│   ├── lib/                  # Utility functions
│   │   └── payzen.ts        # PayZen integration
│   └── payload.config.ts    # Payload configuration
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── vercel.json
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or Atlas)
- PayZen/OSB account (for payment processing)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/TahitiZoom/tiki-village.git
cd tiki-village
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `MONGODB_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - Random secret key for Payload
- `NEXT_PUBLIC_SERVER_URL` - Your site URL
- `PAYZEN_*` - PayZen credentials (contact OSB for details)

4. **Run development server**
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/admin`

5. **Create your first admin user**

Visit `http://localhost:3000/admin` and create your admin account.

## 📦 Collections

### Products
Complete product catalog with:
- Basic info (name, description, price)
- Images gallery
- Booking settings (calendar, participants)
- Extra options (transfers, packages)
- Wedding-specific options
- SEO fields

### Orders
Order management with:
- Order items and totals
- Payment status tracking
- PayZen transaction details
- Billing information
- Customer notes

### Bookings
Reservation system with:
- Date selection
- Participant count (adults/children)
- Extra options selection
- Customer information
- Status tracking

### Users
Customer accounts with:
- Authentication (email/password)
- Profile information
- Address management
- Order history
- GDPR consent

## 💳 PayZen Integration

This project integrates with PayZen/OSB (Lyra Network) for payment processing in French Polynesia.

### Configuration

Set up PayZen credentials in `.env`:

```env
PAYZEN_SHOP_ID=your_shop_id
PAYZEN_MODE=TEST # or PRODUCTION
PAYZEN_TEST_KEY=your_test_key
PAYZEN_PROD_KEY=your_prod_key
PAYZEN_HMAC_TEST_KEY=your_hmac_test_key
PAYZEN_HMAC_PROD_KEY=your_hmac_prod_key
PAYZEN_PUBLIC_TEST_KEY=your_public_test_key
PAYZEN_PUBLIC_PROD_KEY=your_public_prod_key
```

### Webhooks

Configure these webhook URLs in your PayZen dashboard:

- Standard: `https://your-domain.com/api/payzen/notify`
- REST API: `https://your-domain.com/api/payzen/notify-rest`

### Currency

All prices are in **XPF (Franc Pacifique)**. The system uses 0 decimal places as per XPF standard.

## 🌍 Internationalization

The site supports three languages:
- **French (fr)** - Default
- **English (en)**
- **Japanese (ja)**

Content is localized through Payload's built-in i18n system. Translatable fields are marked with `localized: true`.

## 🎨 Design System

### Colors
```css
--primary: #1C2B4D    /* Bleu foncé */
--secondary: #E63946   /* Rouge corail */
--accent: #4ECDC4      /* Teal */
--sand: #FDF8F3        /* Fond sable/crème */
```

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Open Sans (sans-serif)

### Components
Custom Tailwind classes:
- `btn-primary` - Accent button
- `btn-secondary` - Secondary button
- `card` - Card component
- `polynesian-pattern` - Decorative pattern

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
```bash
npm i -g vercel
vercel
```

2. **Set environment variables**

Add all environment variables from `.env` to your Vercel project settings.

3. **Configure database**

Use MongoDB Atlas or another hosted MongoDB service. Update `DATABASE_URI` in Vercel.

4. **Configure Vercel Blob Storage**

Enable Vercel Blob Storage for media files and add `BLOB_READ_WRITE_TOKEN` to environment variables.

5. **Deploy**
```bash
vercel --prod
```

### Database Setup

For production, use MongoDB Atlas:
1. Create a cluster at https://www.mongodb.com/cloud/atlas
2. Configure network access (allow Vercel IPs)
3. Create database user
4. Get connection string and add to `DATABASE_URI`

## 📚 API Documentation

### REST API

Payload automatically generates REST API endpoints:

- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order
- etc.

Full API documentation: `http://localhost:3000/api/docs`

### GraphQL API

GraphQL endpoint available at: `http://localhost:3000/api/graphql`

## 🔒 Security

- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection protection
- ✅ XSS prevention
- ✅ HTTPS required in production
- ✅ Secure payment processing
- ✅ GDPR compliant

## 📄 License

Copyright © 2024 Tiki Village. All rights reserved.

## 🤝 Support

For support, contact:
- Email: contact@tikivillage.pf
- Phone: +689 XX XX XX XX

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced reporting dashboard
- [ ] Email marketing integration
- [ ] Gift vouchers
- [ ] Loyalty program
- [ ] Multi-vendor marketplace
- [ ] Real-time chat support
