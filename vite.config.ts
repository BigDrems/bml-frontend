import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Fallback to index.html for SPA routing in dev mode
    historyApiFallback: true,
  },
  preview: {
    // Fallback to index.html for SPA routing in preview mode
    historyApiFallback: true,
  },
})
