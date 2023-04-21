import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'

export async function getUserFromToken(event: H3Event) {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'token') || ''

  try {
    const payload = jwt.verify(token, config.jwtSecret) as any

    const user = await event.context.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    })
    return user
  }
  catch (error) {
    return null
  }
}
