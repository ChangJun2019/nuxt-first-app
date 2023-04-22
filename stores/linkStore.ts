import type { Link } from '@/types/link'

interface LinksState {
  links: Link[] | null
}

export const useLinkStore = defineStore('links', {
  state: (): LinksState => {
    return {
      links: null,
    }
  },

  getters: {
    getLinks(): Link[] | null {
      return this.links
    },
  },

  actions: {

  },
})
