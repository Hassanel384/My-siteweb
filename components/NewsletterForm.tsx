'use client'

import { useState } from 'react'
import { Mail, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Locale } from '@/types'

interface NewsletterFormProps {
  lang: Locale
  dict: any
}

export default function NewsletterForm({ lang, dict }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage(dict.home.newsletter.success)
        setEmail('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setMessage(dict.home.newsletter.error)
      }
    } catch (error) {
      setStatus('error')
      setMessage(dict.home.newsletter.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.home.newsletter.placeholder}
            required
            disabled={status === 'loading'}
            className="input-field pl-10 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary flex items-center justify-center space-x-2 whitespace-nowrap"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{dict.common.loading}</span>
            </>
          ) : (
            <span>{dict.home.newsletter.button}</span>
          )}
        </button>
      </div>

      {status === 'success' && (
        <div className="mt-4 flex items-center space-x-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 flex items-center space-x-2 text-red-600">
          <XCircle className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}
    </form>
  )
}
