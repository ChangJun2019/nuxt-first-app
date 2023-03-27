export default defineAppConfig({
  name: 'Nuxt First App',
  footer: {
    author: 'ChangJun',
    authorLink: 'https://52chinaweb.com/',
  },

  nuxtIcon: {
    size: '24px',
    class: 'icon',
    aliases: {},
  },
})

declare module 'nuxt/schema' {
  interface AppConfigInput {
    name: string
    // website footer config
    footer: {
      author: string
      authorLink: string
    }
  }
}
