'use client'

import { useState } from 'react'
import Alert from '../ui/Alert'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    acceptedPrivacy: false,
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        acceptedPrivacy: false,
      })

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-md">
      <h2 className="text-3xl font-serif text-primary mb-6">
        <span className="polynesian-pattern">Contactez-nous</span>
      </h2>

      {status === 'success' && (
        <Alert
          type="success"
          title="Message envoyé !"
          message="Nous vous répondrons dans les plus brefs délais."
          onClose={() => setStatus('idle')}
        />
      )}

      {status === 'error' && (
        <Alert
          type="error"
          title="Erreur"
          message={errorMessage}
          onClose={() => setStatus('idle')}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="Jean Dupont"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="jean.dupont@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="+689 XX XX XX XX"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-2">
            Sujet *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="information">Demande d'information</option>
            <option value="reservation">Réservation</option>
            <option value="mariage">Mariage</option>
            <option value="group">Groupe</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
            placeholder="Votre message..."
          />
        </div>

        {/* Privacy Checkbox */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="acceptedPrivacy"
            name="acceptedPrivacy"
            checked={formData.acceptedPrivacy}
            onChange={handleChange}
            required
            className="mt-1 w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <label htmlFor="acceptedPrivacy" className="ml-3 text-sm text-gray-600">
            J'accepte que mes données soient utilisées pour traiter ma demande conformément à la{' '}
            <a href="/legal/privacy" className="text-accent hover:underline">
              politique de confidentialité
            </a>
            . *
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Envoi en cours...
            </>
          ) : (
            'Envoyer le message'
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4">
        * Champs obligatoires
      </p>
    </div>
  )
}
