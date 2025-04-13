import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Include .js files as JSX 
    include: "**/*.{jsx,js,ts,tsx}",
  })],
  // Disable the annoying HMR overlay
  server: {
    hmr: {
      overlay: false
    }
  }
})