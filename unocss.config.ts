import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'

export default defineConfig({
  shortcuts: [],

  presets: [
    presetUno({}),
    presetDaisy({
      themes: ['light', 'forest'],
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
