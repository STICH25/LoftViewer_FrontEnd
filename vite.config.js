import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/postcss";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3025,
    strictPort: true,
  },  
  base: "LoftViewer_FrontEnd", // Ensure this matches your repository name
  build: {
    outDir: "dist", // Default output folder
  }
});
