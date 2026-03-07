import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './src/collections/Users'
import { Products } from './src/collections/Products'
import { Categories } from './src/collections/Categories'
import { Bookings } from './src/collections/Bookings'
import { Orders } from './src/collections/Orders'
import { Pages } from './src/collections/Pages'
import { Media } from './src/collections/Media'
import { Testimonials } from './src/collections/Testimonials'
import { Promotions } from './src/collections/Promotions'
import { ContactSubmissions } from './src/collections/ContactSubmissions'

// Globals
import { Header } from './src/globals/Header'
import { Footer } from './src/globals/Footer'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, 'src/app/admin/importMap.js'),
    },
    meta: {
      titleSuffix: '- Tiki Village Admin',
      icons: [{ url: '/favicon.ico' }],
      openGraph: {
        images: [{ url: '/og-image.jpg' }],
      },
    },
  },
  routes: {
    admin: '/admin',
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
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [],
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
  sharp,
})