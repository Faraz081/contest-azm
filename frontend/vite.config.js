import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'charts'
            if (id.includes('react') || id.includes('react-router')) return 'react'
            if (id.includes('lucide-react') || id.includes('@base-ui') || id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) return 'ui'
          }
        },
      },
    },
  },
})