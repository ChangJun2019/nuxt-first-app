export default defineEventHandler((event) => {
  event.context.user = getUserFromToken(event)
})
