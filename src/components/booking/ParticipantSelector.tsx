'use client'

interface ParticipantSelectorProps {
  adults: number
  childrenCount: number
  onAdultsChange: (count: number) => void
  onChildrenChange: (count: number) => void
  childrenAllowed?: boolean
  maxParticipants?: number
  adultPrice?: number
  childPrice?: number
}

export default function ParticipantSelector({
  adults,
  childrenCount,
  onAdultsChange,
  onChildrenChange,
  childrenAllowed = true,
  maxParticipants,
  adultPrice,
  childPrice,
}: ParticipantSelectorProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-PF', {
      style: 'currency',
      currency: 'XPF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const totalParticipants = adults + childrenCount
  const canAddMore = !maxParticipants || totalParticipants < maxParticipants

  const handleIncrement = (type: 'adults' | 'children') => {
    if (!canAddMore) return
    
    if (type === 'adults') {
      onAdultsChange(adults + 1)
    } else {
      onChildrenChange(childrenCount + 1)
    }
  }

  const handleDecrement = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults > 1) {
      onAdultsChange(adults - 1)
    } else if (type === 'children' && childrenCount > 0) {
      onChildrenChange(childrenCount - 1)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
      <h3 className="font-serif text-xl text-primary mb-4">Participants</h3>

      {/* Adults */}
      <div className="flex items-center justify-between">
        <div className="flex-grow">
          <div className="font-semibold text-primary">Adultes</div>
          {adultPrice && (
            <div className="text-sm text-gray-600">
              {formatPrice(adultPrice)} / personne
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleDecrement('adults')}
            disabled={adults <= 1}
            className="w-10 h-10 rounded-full border-2 border-accent text-accent disabled:border-gray-300 disabled:text-gray-300 hover:bg-accent hover:text-white transition-colors disabled:hover:bg-transparent disabled:hover:text-gray-300 font-bold text-lg"
          >
            −
          </button>
          
          <span className="w-12 text-center font-bold text-lg text-primary">
            {adults}
          </span>
          
          <button
            onClick={() => handleIncrement('adults')}
            disabled={!canAddMore}
            className="w-10 h-10 rounded-full border-2 border-accent text-accent disabled:border-gray-300 disabled:text-gray-300 hover:bg-accent hover:text-white transition-colors disabled:hover:bg-transparent disabled:hover:text-gray-300 font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Children */}
      {childrenAllowed && (
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <div className="font-semibold text-primary">Enfants (- 12 ans)</div>
            {childPrice && (
              <div className="text-sm text-gray-600">
                {formatPrice(childPrice)} / enfant
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleDecrement('children')}
              disabled={childrenCount <= 0}
              className="w-10 h-10 rounded-full border-2 border-accent text-accent disabled:border-gray-300 disabled:text-gray-300 hover:bg-accent hover:text-white transition-colors disabled:hover:bg-transparent disabled:hover:text-gray-300 font-bold text-lg"
            >
              −
            </button>
            
            <span className="w-12 text-center font-bold text-lg text-primary">
              {childrenCount}
            </span>
            
            <button
              onClick={() => handleIncrement('children')}
              disabled={!canAddMore}
              className="w-10 h-10 rounded-full border-2 border-accent text-accent disabled:border-gray-300 disabled:text-gray-300 hover:bg-accent hover:text-white transition-colors disabled:hover:bg-transparent disabled:hover:text-gray-300 font-bold text-lg"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Info */}
      {maxParticipants && (
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Total : {totalParticipants} / {maxParticipants} participants
          </div>
        </div>
      )}
    </div>
  )
}
