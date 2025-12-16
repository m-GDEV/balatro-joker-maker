import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from "@vitejs/plugin-basic-ssl"
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    basicSsl(),
    nodePolyfills({
      include: ['process']
    }),
  ],
})
