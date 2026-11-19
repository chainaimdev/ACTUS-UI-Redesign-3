import { pulseConfig } from '@/lib/pulse/config'
import { ReadOnlyStoreError, readApproved, removeApproved, toPulseItem, upsertApproved } from '@/lib/pulse/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const notFound = () => Response.json({ error: 'Not found' }, { status: 404 })

function failure(err: unknown) {
  if (err instanceof ReadOnlyStoreError) return Response.json({ error: err.message }, { status: 409 })
  console.error('[pulse] store error', err)
  return Response.json({ error: 'Could not save. See the server log.' }, { status: 500 })
}

/** GET → approved list. GET ?download=1 → same list as a file (the Export button). */
export async function GET(request: Request) {
  if (!pulseConfig().deskEnabled) return notFound()
  const items = await readApproved()
  const download = new URL(request.url).searchParams.get('download') === '1'
  return Response.json(items, {
    headers: {
      'Cache-Control': 'no-store',
      ...(download && { 'Content-Disposition': 'attachment; filename="pulse-approved.json"' }),
    },
  })
}

/** POST → approve a new item, or update an approved one (same url). */
export async function POST(request: Request) {
  if (!pulseConfig().deskEnabled) return notFound()
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Body must be JSON.' }, { status: 400 })
  }
  const item = toPulseItem(body)
  if (typeof item === 'string') return Response.json({ error: item }, { status: 400 })
  try {
    return Response.json({ items: await upsertApproved(item) })
  } catch (err) {
    return failure(err)
  }
}

/** DELETE ?url=… → unpublish. */
export async function DELETE(request: Request) {
  if (!pulseConfig().deskEnabled) return notFound()
  const url = new URL(request.url).searchParams.get('url')
  if (!url) return Response.json({ error: 'url is required.' }, { status: 400 })
  try {
    return Response.json({ items: await removeApproved(url) })
  } catch (err) {
    return failure(err)
  }
}
