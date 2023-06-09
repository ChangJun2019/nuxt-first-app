import type { User } from '@/types/user'

interface UserState {
  user: User | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      user: null,
    }
  },

  getters: {
    getUser(): User | null {
      return this.user
    },
  },

  actions: {
    async fetchUser() {
      const cookieHeaders = useRequestHeaders(['cookie'])
      const { data: user } = await useFetch('/api/user', {
        method: 'GET',
        headers: cookieHeaders as HeadersInit,
      })
      this.user = user.value
      return this.user
    },

    async logout() {
      const router = useRouter()
      const cookieHeaders = useRequestHeaders(['cookie'])
      const { data } = await useFetch('/api/logout', {
        method: 'GET',
        headers: cookieHeaders as HeadersInit,
      })
      this.user = null
      if (data.value?.success)
        router.replace('/login')
    },
  },
})
