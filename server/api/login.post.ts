import { compareSync } from 'bcrypt-ts'
import type { PrismaClient } from '@prisma/client'

async function validate(email: string, password: string, prisma: PrismaClient) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'user not found',
    })
  }

  if (compareSync(password, user.password)) {
    return user
  }
  else {
    throw createError({
      statusCode: 401,
      statusMessage: 'email or password not correct',
    })
  }
}

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const user = await validate(email, password, event.context.prisma)

  return {
    success: true,
  }
})
