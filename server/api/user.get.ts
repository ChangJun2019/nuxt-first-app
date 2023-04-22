export default defineEventHandler(async (event) => {
  return getUserFromToken(event)
})
