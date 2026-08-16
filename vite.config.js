import { defineConfig } from 'vite'

<<<<<<< HEAD
export default defineConfig({
  // Der Pfad MUSS exakt mit dem GitHub-Repository-Namen übereinstimmen:
  base: '/CacheNJump/',
});
=======
export default defineConfig(({ command }) => {
  return {
    // Im Dev-Modus (npm run dev) nutzen wir '/', beim Build (npm run build) den Unterordner
    base: command === 'serve' ? '/' : '/CacheNJump/',
  }
})
>>>>>>> 6b5a020 (Spielerauswahl und Mosquitos hinzugefügt)
