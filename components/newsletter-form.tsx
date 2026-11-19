'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function NewsletterForm() {
  const [done, setDone] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: connect to the newsletter provider.
    setDone(true)
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="flex max-w-sm gap-2">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="h-11 min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-3.5 text-sm text-white placeholder:text-white/55 focus-visible:border-white focus-visible:outline-2 focus-visible:outline-white"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-footer transition-colors hover:bg-grad-to hover:text-on-brand focus-visible:outline-white"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-white/75">
        {done ? 'Thanks for subscribing!' : ''}
      </p>
    </form>
  )
}
