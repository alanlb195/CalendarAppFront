import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import process from 'node:process';
import replace from '@rollup/plugin-replace'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'


const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['vite.svg'],
  manifest: {
    name: 'PWA Calendar',
    short_name: 'PWA Calendar',
    theme_color: '#ffffffff',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.VITE_SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}


const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.VITE_CLAIMS === 'true'
const reload = process.env.VITE_RELOAD_SW === 'true'
const selfDestroying = process.env.VITE_SW_DESTROY === 'true'

if (process.env.VITE_SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
    ; (pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Calendar Production'
    ; (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Calendar Prod'
  pwaOptions.injectManifest = {
    minify: false,
    enableWorkboxModulesLogs: true,
  }
}


if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(pwaOptions),
    replace(replaceOptions),
  ],
})
