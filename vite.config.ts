import { defineConfig } from 'vite'

export default defineConfig({
  base: '/TCG/',
  build: { rollupOptions: { output: { manualChunks: id => id.includes('node_modules/firebase') || id.includes('node_modules/@firebase') ? 'firebase' : id.includes('node_modules/gsap') ? 'gsap' : undefined } } },
  define: { __IMG_V__: JSON.stringify(Date.now().toString(36)) },   // cambia en cada build: evita que el navegador reutilice imágenes viejas
})