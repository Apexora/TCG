import { defineConfig } from 'vite'

export default defineConfig({
  base: '/TCG/',
  define: { __IMG_V__: JSON.stringify(Date.now().toString(36)) },   // cambia en cada build: evita que el navegador reutilice imágenes viejas
})