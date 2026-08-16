import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  return {
    // Im Dev-Modus (npm run dev) nutzen wir '/', beim Build (npm run build) den Unterordner
    base: command === 'serve' ? '/' : '/CacheNJump/',
  }
})