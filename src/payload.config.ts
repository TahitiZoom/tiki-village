import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Bookings } from './collections/Bookings'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Testimonials } from './collections/Testimonials'
import { Promotions } from './collections/Promotions'
import { ContactSubmissions } from './collections/ContactSubmissions'

// Globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Tiki Village Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  collections: [
    Users,
    Products,
    Categories,
    Bookings,
    Orders,
    Pages,
    Media,
    Testimonials,
    Promotions,
    ContactSubmissions,
  ],
  globals: [
    Header,
    Footer,
    SiteSettings,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_KEY || 'your-secret-key',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: process.env.BLOB_READ_WRITE_TOKEN ? true : false,
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      collections: {
        media: true,
      },
    }),
  ],
  localization: {
    locales: [
      {
        code: 'fr',
        label: 'Français',
      },
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'ja',
        label: '日本語',
      },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
})