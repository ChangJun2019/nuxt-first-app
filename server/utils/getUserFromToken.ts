import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import type { User } from '@/types/user'

export async function getUserFromToken(event: H3Event): Promise<User | null> {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'token') || ''

  try {
    const payload = jwt.verify(token, config.jwtSecret) as any

    const user = await event.context.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        password: false,
      },
    })
    return user
  }
  catch (error) {
    return null
  }
}
