import { hashSync } from 'bcrypt-ts'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const createUser = await event.context.prisma.user.create({
    data: {
      email,
      password: hashSync(password, 8),
    },
  }).catch((err) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw createError({
          statusCode: 409,
          statusMessage: 'Email already registered',
        })
      }
    }
  })

  return {
    success: true,
  }
})
