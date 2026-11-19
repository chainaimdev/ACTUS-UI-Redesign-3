import { collectSignals } from '@/lib/pulse/collect'
import { pulseConfig } from '@/lib/pulse/config'
import { isStoreWritable, readApproved } from '@/lib/pulse/store'
import type { SignalsResponse } from '@/lib/pulse/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Live fetch for Signal Desk. Nothing here is saved. */
export async function GET() {
  if (!pulseConfig().deskEnabled) return Response.json({ error: 'Not found' }, { status: 404 })

  const [{ signals, errors }, approved, writable] = await Promise.all([
    collectSignals(),
    readApproved(),
    isStoreWritable(),
  ])

  const body: SignalsResponse = { signals, approved, errors, fetchedAt: new Date().toISOString(), writable }
  return Response.json(body, { headers: { 'Cache-Control': 'no-store' } })
}
