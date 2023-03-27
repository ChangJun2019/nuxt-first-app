import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'link': 'font-bold underline decoration-primary underline-offset-4 ',
      'app-bg': 'bg-light dark:bg-dark-900',
      'app-text': 'text-dark-900 dark:text-light-900',
    },
  ],

  presets: [
    presetUno({}),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],

  theme: {
    colors: {
      primary: {
        DEFAULT: '#00dd83',
      },
      green: {
        50: '#e6fff1',
        100: '#a3ffce',
        200: '#7affbd',
        300: '#4ff7a9',
        400: '#26eb95',
        500: '#00dd83',
        600: '#00b874',
        700: '#009161',
        800: '#006b4b',
        900: '#004532',
      },
    },
  },

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
