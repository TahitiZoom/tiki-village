import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  rating: number
  comment: string
  location?: string
  avatar?: {
    url: string
    alt: string
  }
  date?: string
}

export default function TestimonialCard({
  name,
  rating,
  comment,
  location,
  avatar,
  date,
}: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ))
  }

  return (
    <div className="card p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-4">
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent/20 flex-shrink-0">
          {avatar ? (
            <Image
              src={avatar.url}
              alt={avatar.alt || name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl">
              👤
            </div>
          )}
        </div>

        {/* Name and Rating */}
        <div className="ml-4">
          <div className="font-semibold text-primary">{name}</div>
          <div className="flex items-center text-sm">
            {renderStars(rating)}
          </div>
          {location && (
            <div className="text-xs text-gray-500 mt-1">📍 {location}</div>
          )}
        </div>
      </div>

      {/* Comment */}
      <blockquote className="text-gray-600 italic flex-grow">
        "{comment}"
      </blockquote>

      {/* Date */}
      {date && (
        <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
          {new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      )}
    </div>
  )
}
