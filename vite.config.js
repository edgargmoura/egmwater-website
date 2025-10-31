import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // ...outras configurações (plugins, etc.)
  
  server: {
    // Adicione esta parte:
    host: true, // Isso também ajuda a aceitar conexões de fora do localhost
    allowedHosts: ['egm-water']
  }
})
