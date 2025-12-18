import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  shortDescription?: string
  image?: {
    url: string
    alt: string
  }
  bookable?: boolean
  category?: string
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  shortDescription,
  image,
  bookable = false,
  category,
}: ProductCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-PF', {
      style: 'currency',
      currency: 'XPF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="card hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 bg-gradient-to-br from-accent/20 to-accent/40 overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              🗿
            </div>
          )}
          
          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-primary">
              {category}
            </div>
          )}

          {/* Bookable Badge */}
          {bookable && (
            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
              📅 Réservable
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-serif mb-3 text-primary group-hover:text-accent transition-colors">
            {name}
          </h3>
          
          {shortDescription && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
              {shortDescription}
            </p>
          )}

          {/* Price and CTA */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div>
              <div className="text-xs text-gray-500 mb-1">À partir de</div>
              <div className="text-2xl font-bold text-accent">
                {formatPrice(price)}
              </div>
            </div>
            <div className="text-accent group-hover:translate-x-1 transition-transform">
              En savoir plus →
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
