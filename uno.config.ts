import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(m => m.default || m),
        ph: () => import('@iconify-json/ph/icons.json').then(m => m.default || m),
      },
      scale: 1.1,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  safelist: [
    'i-carbon:maximize',
    'i-carbon:minimize',
    'i-carbon:arrow-left',
    'i-carbon:arrow-right',
    'i-carbon:apps',
    'i-carbon-moon',
    'i-carbon-sun',
    'i-carbon:pen',
    'i-carbon:presentation-file',
    'i-carbon:user-speaker',
    'i-carbon:text-annotation-toggle',
    'i-carbon:download',
    'i-carbon:document-pdf',
    'i-carbon:information',
    'i-carbon:template',
    'i-carbon:settings-adjust',
    'i-ph-cursor-fill',
    'i-ph-cursor-duotone',
  ],
})
