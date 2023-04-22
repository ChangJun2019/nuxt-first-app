export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const getPost = await event.context.prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  })
    .catch((error) => {
      console.error(error)
    })

  return getPost
})
