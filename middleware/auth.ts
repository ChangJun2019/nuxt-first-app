import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useUserStore()
  const user = await store.fetchUser()
  if (!user && to.path !== '/')
    return navigateTo('/login')
})
