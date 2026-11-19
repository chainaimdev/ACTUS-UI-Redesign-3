'use client'

import { useState } from 'react'
import { CheckCircle2, MapPin, Send } from 'lucide-react'
import { Section } from '@/components/section'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { contactSection, foundationInfo } from '@/data/home'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: wire to a backend (API route / email service) to deliver the message
    // and handle the newsletter opt-in.
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <Section id="contact" {...contactSection}>
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-2">
          <div className="card-brand p-7">
            <span className="bg-brand-gradient inline-flex size-12 items-center justify-center rounded-xl text-on-brand" aria-hidden="true">
              <MapPin className="size-6" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-xl">{foundationInfo.name}</h3>
            <p className="mt-2 text-ink-muted">{foundationInfo.location}</p>
            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              Prefer to get involved directly? Explore membership and work groups to collaborate with the
              community shaping the standard.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-brand grid gap-5 p-7 md:p-9 lg:col-span-3" noValidate={false}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" name="name" autoComplete="name" required className="h-11 bg-elevated" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" name="email" type="email" autoComplete="email" required className="h-11 bg-elevated" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" name="message" required rows={5} className="min-h-32 bg-elevated" />
          </div>
          <Label className="flex cursor-pointer items-start gap-3 font-normal text-ink-muted">
            <Checkbox name="newsletter" className="mt-0.5" />
            <span>Subscribe to the ACTUS newsletter for news, events and standard updates.</span>
          </Label>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button type="submit" className="btn-base btn-gradient w-full sm:w-fit">
              Send message
              <Send className="size-4" aria-hidden="true" />
            </button>
            <p role="status" aria-live="polite" className="text-sm text-ink-muted">
              {submitted && (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-brand" aria-hidden="true" />
                  Thank you — your message has been received.
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </Section>
  )
}
