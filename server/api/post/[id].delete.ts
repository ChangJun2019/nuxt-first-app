import { consola } from 'consola'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const deletePost = await event.context.prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  })
    .catch((error) => {
      consola.error(error)
    })

  return {
    success: true,
  }
})
