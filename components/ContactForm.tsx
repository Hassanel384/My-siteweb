'use client'

import { useState } from 'react'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Locale } from '@/types'

interface ContactFormProps {
  lang: Locale
  dict: any
}

export default function ContactForm({ lang, dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage(dict.contact.form.success)
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setMessage(dict.contact.form.error)
      }
    } catch (error) {
      setStatus('error')
      setMessage(dict.contact.form.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder={dict.contact.form.name}
        required
        disabled={status === 'loading'}
        className="input-field"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={dict.contact.form.email}
          required
          disabled={status === 'loading'}
          className="input-field"
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder={dict.contact.form.phone}
          disabled={status === 'loading'}
          className="input-field"
        />
      </div>

      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder={dict.contact.form.message}
        rows={6}
        required
        disabled={status === 'loading'}
        className="input-field resize-none"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full flex items-center justify-center space-x-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{dict.common.loading}</span>
          </>
        ) : (
          <span>{dict.contact.form.send}</span>
        )}
      </button>

      {status === 'success' && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-2 text-red-600">
          <XCircle className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}
    </form>
  )
}
