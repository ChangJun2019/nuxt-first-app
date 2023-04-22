import type { H3Event } from 'h3'
import type { User } from '@/types/user'

export default eventHandler(async (event) => {
  const _open = await hasOpenAuthRoute(event)

  if (!_open) {
    throw createError({
      statusCode: 401,
      statusMessage: 'unauthorized',
    })
  }
})

async function hasOpenAuthRoute(event: H3Event): Promise<boolean> {
  const whiteList = ['/api/user', '/api/logout', '/api/post/', '/api/links']
  if (whiteList.some(route => event.path?.startsWith(route))) {
    return true
  }
  else {
    const user = await getUserFromToken(event)
    if (!user)
      return false
    event.context.user = user
  }
  return true
}

declare module 'h3' {
  interface H3EventContext {
    user: User | null
  }
}
