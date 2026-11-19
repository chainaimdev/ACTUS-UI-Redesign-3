'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Check, Download, ExternalLink, Pin, RefreshCw, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  PULSE_AUDIENCES,
  type PulseAudience,
  type PulseItem,
  type Signal,
  type SignalsResponse,
} from '@/lib/pulse/types'
import { cn } from '@/lib/utils'

type Tab = 'pending' | 'approved'
type Draft = { title: string; summary: string; audience: PulseAudience[]; pinned: boolean }
type Editable = { url: string; title: string; source: string; date?: string; summary?: string; audience?: PulseAudience[]; pinned?: boolean }

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'No date'

const errorText = (e: unknown) => (e instanceof Error ? e.message : String(e))

export function SignalDesk() {
  const [data, setData] = useState<SignalsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null)
  const [tab, setTab] = useState<Tab>('pending')
  const [dismissed, setDismissed] = useState<Set<string>>(() => new Set())
  const [drafts, setDrafts] = useState<Record<string, Draft>>({})
  const [busyUrl, setBusyUrl] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const res = await fetch('/api/pulse/signals', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setData(await res.json())
    } catch (e) {
      setLoadError(errorText(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const approvedUrls = useMemo(() => new Set(data?.approved.map((a) => a.url)), [data])
  const pending = useMemo(
    () => (data?.signals ?? []).filter((s) => !approvedUrls.has(s.url) && !dismissed.has(s.url)),
    [data, approvedUrls, dismissed],
  )
  const approved = data?.approved ?? []

  const draftFor = (item: Editable): Draft =>
    drafts[item.url] ?? {
      title: item.title,
      summary: item.summary ?? '',
      audience: item.audience ?? [],
      pinned: item.pinned ?? false,
    }

  const patch = (item: Editable, change: Partial<Draft>) =>
    setDrafts((d) => ({ ...d, [item.url]: { ...draftFor(item), ...change } }))

  async function save(item: Editable) {
    setBusyUrl(item.url)
    setNotice(null)
    try {
      const res = await fetch('/api/pulse/approved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: item.url, source: item.source, date: item.date, ...draftFor(item) }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`)
      setData((d) => (d ? { ...d, approved: body.items as PulseItem[] } : d))
      setNotice({ ok: true, text: 'Saved. It now appears in ACTUS Pulse.' })
    } catch (e) {
      setNotice({ ok: false, text: `Not saved: ${errorText(e)}` })
    } finally {
      setBusyUrl(null)
    }
  }

  async function unpublish(url: string) {
    setBusyUrl(url)
    setNotice(null)
    try {
      const res = await fetch(`/api/pulse/approved?url=${encodeURIComponent(url)}`, { method: 'DELETE' })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`)
      setData((d) => (d ? { ...d, approved: body.items as PulseItem[] } : d))
      setNotice({ ok: true, text: 'Removed from ACTUS Pulse.' })
    } catch (e) {
      setNotice({ ok: false, text: `Not removed: ${errorText(e)}` })
    } finally {
      setBusyUrl(null)
    }
  }

  return (
    <section aria-labelledby="desk-heading" className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-brand uppercase">Admin</p>
            <h1 id="desk-heading" className="text-3xl md:text-4xl">
              Signal Desk
            </h1>
            <p className="mt-3 max-w-2xl text-ink-muted">
              Live items from the sources, ranked by keyword match. Approve the ones that belong in ACTUS Pulse.
              Only approved items are saved.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="lg" onClick={load} disabled={loading}>
              <RefreshCw className={cn(loading && 'animate-spin')} aria-hidden="true" />
              {loading ? 'Fetching…' : 'Fetch now'}
            </Button>
            <a
              href="/api/pulse/approved?download=1"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-sm font-medium text-ink transition-colors hover:bg-muted"
            >
              <Download className="size-4" aria-hidden="true" />
              Export
            </a>
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 space-y-3" aria-live="polite">
          {data && !data.writable && (
            <Banner tone="warn">
              Read-only here. Approvals can&apos;t be saved on this server. Approve locally with{' '}
              <code>pnpm dev</code>, then commit <code>data/pulse-approved.json</code> and redeploy.
            </Banner>
          )}
          {loadError && <Banner tone="error">Could not fetch: {loadError}</Banner>}
          {data?.errors.map((err) => (
            <Banner key={err.sourceId} tone="warn">
              {err.source}: {err.message}
            </Banner>
          ))}
          {notice && <Banner tone={notice.ok ? 'ok' : 'error'}>{notice.text}</Banner>}
          {data && (
            <p className="text-sm text-ink-muted">
              Last fetched {new Date(data.fetchedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Desk view" className="mt-8 flex gap-2 border-b border-border">
          {(
            [
              ['pending', `Pending (${pending.length})`],
              ['approved', `Approved (${approved.length})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                '-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors',
                tab === id ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Lists */}
        <ul className="mt-6 space-y-4">
          {tab === 'pending' &&
            pending.map((signal) => (
              <DeskCard
                key={signal.url}
                item={signal}
                draft={draftFor(signal)}
                onChange={(c) => patch(signal, c)}
                meta={<SignalMeta signal={signal} />}
                busy={busyUrl === signal.url}
                actions={
                  <>
                    <Button size="lg" onClick={() => save(signal)} disabled={busyUrl !== null}>
                      <Check aria-hidden="true" />
                      Approve
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setDismissed((s) => new Set(s).add(signal.url))}
                      disabled={busyUrl !== null}
                    >
                      <X aria-hidden="true" />
                      Dismiss
                    </Button>
                  </>
                }
              />
            ))}

          {tab === 'approved' &&
            approved.map((item) => (
              <DeskCard
                key={item.url}
                item={item}
                draft={draftFor(item)}
                onChange={(c) => patch(item, c)}
                meta={
                  <span>
                    {item.source} · {formatDate(item.date)} · approved {formatDate(item.approvedAt)}
                  </span>
                }
                busy={busyUrl === item.url}
                actions={
                  <>
                    <Button size="lg" onClick={() => save(item)} disabled={busyUrl !== null}>
                      <Check aria-hidden="true" />
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={() => unpublish(item.url)}
                      disabled={busyUrl !== null}
                    >
                      <Trash2 aria-hidden="true" />
                      Remove
                    </Button>
                  </>
                }
              />
            ))}
        </ul>

        {data && tab === 'pending' && pending.length === 0 && <Empty>No pending items. Try Fetch now.</Empty>}
        {data && tab === 'approved' && approved.length === 0 && <Empty>Nothing approved yet.</Empty>}
        {!data && loading && <Empty>Fetching sources…</Empty>}
      </div>
    </section>
  )
}

function SignalMeta({ signal }: { signal: Signal }) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span>
        {signal.source} · {formatDate(signal.date)}
      </span>
      <span
        className={cn(
          'rounded-full px-2 py-0.5 text-xs font-semibold',
          signal.score > 0 ? 'bg-brand/10 text-brand' : 'bg-muted text-ink-muted',
        )}
        title={signal.matched.join(', ') || 'No keyword matched'}
      >
        Match {signal.score}
      </span>
      {signal.matched.length > 0 && <span className="text-xs">{signal.matched.join(' · ')}</span>}
    </span>
  )
}

function DeskCard({
  item,
  draft,
  onChange,
  meta,
  actions,
  busy,
}: {
  item: Editable
  draft: Draft
  onChange: (change: Partial<Draft>) => void
  meta: React.ReactNode
  actions: React.ReactNode
  busy: boolean
}) {
  const id = encodeURIComponent(item.url)
  return (
    <li className={cn('card-brand p-5', busy && 'opacity-60')}>
      <div className="flex items-start justify-between gap-4 text-sm text-ink-muted">
        {meta}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-medium text-brand hover:underline"
        >
          Open <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <label htmlFor={`t-${id}`} className="sr-only">
        Headline
      </label>
      <input
        id={`t-${id}`}
        value={draft.title}
        onChange={(e) => onChange({ title: e.target.value })}
        className="mt-3 w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-lg font-semibold text-ink hover:border-border focus:border-brand focus:outline-none"
      />

      <label htmlFor={`s-${id}`} className="sr-only">
        Summary
      </label>
      <textarea
        id={`s-${id}`}
        value={draft.summary}
        onChange={(e) => onChange({ summary: e.target.value })}
        rows={3}
        placeholder="Summary (optional)"
        className="mt-1 w-full resize-y rounded-md border border-transparent bg-transparent px-2 py-1 text-sm text-ink-muted hover:border-border focus:border-brand focus:outline-none"
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold tracking-wide text-ink-muted uppercase">Audience</span>
        {PULSE_AUDIENCES.map((a) => {
          const on = draft.audience.includes(a.id)
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={on}
              onClick={() =>
                onChange({ audience: on ? draft.audience.filter((x) => x !== a.id) : [...draft.audience, a.id] })
              }
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                on ? 'border-brand bg-brand text-on-brand' : 'border-border text-ink-muted hover:border-brand',
              )}
            >
              {a.label}
            </button>
          )
        })}
        <button
          type="button"
          aria-pressed={draft.pinned}
          onClick={() => onChange({ pinned: !draft.pinned })}
          className={cn(
            'ml-auto inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            draft.pinned ? 'border-brand text-brand' : 'border-border text-ink-muted hover:border-brand',
          )}
        >
          <Pin className="size-3.5" aria-hidden="true" />
          {draft.pinned ? 'Pinned' : 'Pin to top'}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">{actions}</div>
    </li>
  )
}

function Banner({ tone, children }: { tone: 'ok' | 'warn' | 'error'; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        'flex items-start gap-2 rounded-lg border px-4 py-3 text-sm',
        tone === 'ok' && 'border-brand/30 bg-brand/5 text-ink',
        tone === 'warn' && 'border-amber-500/40 bg-amber-500/10 text-ink',
        tone === 'error' && 'border-destructive/40 bg-destructive/10 text-ink',
      )}
    >
      {tone !== 'ok' && <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </p>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-ink-muted">{children}</p>
  )
}
