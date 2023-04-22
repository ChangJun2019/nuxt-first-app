import { consola } from 'consola'

export default defineEventHandler(async (event) => {
  const { url, title } = await readBody(event)
  const userId = event.context.user?.id

  const createPost = await event.context.prisma.post.create({
    data: {
      url,
      title,
      authorId: userId,
    },
  }).catch((err) => {
    consola.log(err)
  })

  return {
    success: true,
  }
})
