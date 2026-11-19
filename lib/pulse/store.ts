/**
 * Approved-items store: data/pulse-approved.json.
 *
 * This one file is both the store (Option C) and the code export (Option D):
 * the home page and /pulse import it at build time, so committing it and
 * redeploying publishes the approved items on Vercel with no database.
 *
 * Writes need a writable filesystem (local `pnpm dev` / `pnpm start`).
 * On Vercel the filesystem is read-only, so writes fail with ReadOnlyStoreError.
 */
import { constants, promises as fs } from 'node:fs'
import path from 'node:path'
import { isPulseAudience, type PulseItem } from './types'

const STORE_FILE = path.join(process.cwd(), 'data', 'pulse-approved.json')

export class ReadOnlyStoreError extends Error {
  constructor() {
    super(
      'The store is read-only here (e.g. on Vercel). Approve items locally with `pnpm dev`, then commit data/pulse-approved.json and redeploy.',
    )
  }
}

export async function readApproved(): Promise<PulseItem[]> {
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(STORE_FILE, 'utf8'))
    return Array.isArray(parsed) ? (parsed as PulseItem[]) : []
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw err
  }
}

export async function isStoreWritable(): Promise<boolean> {
  try {
    await fs.access(path.dirname(STORE_FILE), constants.W_OK)
    return true
  } catch {
    return false
  }
}

async function writeApproved(items: PulseItem[]) {
  try {
    await fs.writeFile(STORE_FILE, `${JSON.stringify(items, null, 2)}\n`, 'utf8')
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'EROFS' || code === 'EACCES' || code === 'EPERM') throw new ReadOnlyStoreError()
    throw err
  }
}

// One write at a time, so two quick clicks can't overwrite each other.
let queue: Promise<unknown> = Promise.resolve()
function serial<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task)
  queue = run.catch(() => undefined)
  return run
}

export function upsertApproved(item: PulseItem): Promise<PulseItem[]> {
  return serial(async () => {
    const items = await readApproved()
    const index = items.findIndex((x) => x.url === item.url)
    if (index >= 0) items[index] = { ...items[index], ...item, approvedAt: items[index].approvedAt }
    else items.push(item)
    await writeApproved(items)
    return items
  })
}

export function removeApproved(url: string): Promise<PulseItem[]> {
  return serial(async () => {
    const items = (await readApproved()).filter((x) => x.url !== url)
    await writeApproved(items)
    return items
  })
}

const TITLE_MAX = 300
const SUMMARY_MAX = 600

/** Validates an incoming approve request. Returns an error string or a clean item. */
export function toPulseItem(body: unknown): PulseItem | string {
  if (!body || typeof body !== 'object') return 'Body must be a JSON object.'
  const b = body as Record<string, unknown>

  const url = typeof b.url === 'string' ? b.url.trim() : ''
  if (!/^https?:\/\//i.test(url)) return 'url must be an http(s) link.'
  const title = typeof b.title === 'string' ? b.title.trim().slice(0, TITLE_MAX) : ''
  if (!title) return 'title is required.'
  const source = typeof b.source === 'string' ? b.source.trim().slice(0, 120) : ''
  if (!source) return 'source is required.'

  const date = typeof b.date === 'string' && !Number.isNaN(Date.parse(b.date)) ? new Date(b.date).toISOString() : undefined
  const summary = typeof b.summary === 'string' ? b.summary.trim().slice(0, SUMMARY_MAX) : ''
  const audience = Array.isArray(b.audience) ? [...new Set(b.audience.filter(isPulseAudience))] : []

  return {
    url,
    title,
    source,
    ...(date !== undefined && { date }),
    ...(summary.length > 0 && { summary }),
    ...(audience.length > 0 && { audience }),
    ...(b.pinned === true && { pinned: true }),
    approvedAt: new Date().toISOString(),
  }
}
