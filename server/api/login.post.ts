import { compareSync } from 'bcrypt-ts'
import type { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

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
  const token = jwt.sign({
    email: user.email,
  }, useRuntimeConfig().jwtSecret, { expiresIn: '1 days' })
  setCookie(event, 'token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return {
    success: true,
  }
})
