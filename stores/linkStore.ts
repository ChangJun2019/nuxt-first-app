import type { Link } from '@/types/link'

interface LinksState {
  links: Link[] | []
}

export const useLinkStore = defineStore('links', {
  state: (): LinksState => {
    return {
      links: [],
    }
  },

  getters: {
    getLinks(): Link[] | [] {
      return this.links
    },
  },

  actions: {
    async fetchAllLinks() {
      const { data } = useFetch('/api/links')
      this.links = data.value || []
    },
  },
})
