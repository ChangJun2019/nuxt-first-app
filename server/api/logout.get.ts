export default defineEventHandler(async (event) => {
  setCookie(event, 'token', 'invalid', {
    httpOnly: true,
    path: '/',
  })

  return {
    success: true,
  }
})
