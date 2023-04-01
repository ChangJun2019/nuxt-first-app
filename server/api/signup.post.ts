import { logger } from 'nuxt/kit'
import { hashSync } from 'bcrypt-ts'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const createUser = await event.context.prisma.user.create({
    data: {
      email,
      password: hashSync(password, 8),
    },
  }).catch((err) => {
    logger.error(err)
  })

  return {
    success: true,
  }
})
