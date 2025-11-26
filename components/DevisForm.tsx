'use client'

import { useState } from 'react'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Locale } from '@/types'

interface DevisFormProps {
  lang: Locale
  dict: any
  productName: string
}

export default function DevisForm({ lang, dict, productName }: DevisFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '1',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, productName, lang }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage(dict.devis.form.success)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          quantity: '1',
          message: '',
        })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setMessage(dict.devis.form.error)
      }
    } catch (error) {
      setStatus('error')
      setMessage(dict.devis.form.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" value={productName} />
      
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={dict.devis.form.name}
          required
          disabled={status === 'loading'}
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={dict.devis.form.email}
          required
          disabled={status === 'loading'}
          className="input-field"
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder={dict.devis.form.phone}
          required
          disabled={status === 'loading'}
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder={dict.devis.form.company}
          disabled={status === 'loading'}
          className="input-field"
        />
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          placeholder={dict.devis.form.quantity}
          min="1"
          required
          disabled={status === 'loading'}
          className="input-field"
        />
      </div>

      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder={dict.devis.form.message}
        rows={4}
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
          <span>{dict.devis.form.submit}</span>
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
