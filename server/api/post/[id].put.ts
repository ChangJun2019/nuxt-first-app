export default defineEventHandler(async (event) => {
  const { url, title } = await readBody(event)

  const id = getRouterParam(event, 'id')

  const updatePost = await event.context.prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      url,
      title,
    },
  })
    .catch((error) => {
      console.error(error)
    })

  return {
    success: true,
  }
})
