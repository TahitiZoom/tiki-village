'use client'

import { useState } from 'react'

interface BookingCalendarProps {
  availableDays?: string[] // e.g., ['tuesday', 'friday']
  onDateSelect: (date: Date) => void
  selectedDate?: Date | null
}

export default function BookingCalendar({
  availableDays = ['tuesday', 'friday'],
  onDateSelect,
  selectedDate = null,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  const dayNamesEn = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Check if date is in the past
    if (date < today) return false
    
    // Check if day of week is available
    const dayName = dayNamesEn[date.getDay()]
    return availableDays.includes(dayName)
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (isDateAvailable(date)) {
      onDateSelect(date)
    }
  }

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  // Create calendar grid
  const calendarDays = []
  
  // Add empty cells for days before first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(
      <div key={`empty-${i}`} className="aspect-square"></div>
    )
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const available = isDateAvailable(date)
    const selected = isDateSelected(day)

    calendarDays.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        disabled={!available}
        className={`
          aspect-square rounded-lg flex items-center justify-center text-sm font-medium
          transition-all duration-200
          ${available 
            ? selected
              ? 'bg-accent text-white ring-2 ring-accent ring-offset-2'
              : 'bg-white hover:bg-accent/10 hover:text-accent border border-gray-200'
            : 'bg-gray-50 text-gray-300 cursor-not-allowed'
          }
        `}
      >
        {day}
      </button>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Mois précédent"
        >
          ←
        </button>
        
        <div className="font-serif text-xl text-primary font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Mois suivant"
        >
          →
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-semibold text-gray-600"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-accent rounded mr-2"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
            <span>Indisponible</span>
          </div>
        </div>
        <p className="mt-2 text-xs">
          Disponibilité : {availableDays.map(day => {
            const dayIndex = dayNamesEn.indexOf(day)
            return dayNames[dayIndex]
          }).join(', ')}
        </p>
      </div>
    </div>
  )
}
