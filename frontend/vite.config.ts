
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/

import path from "path"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})