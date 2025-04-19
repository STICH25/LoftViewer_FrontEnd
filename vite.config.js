import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3025,
    strictPort: true,
    mimeTypes: {
      "application/javascript": ["js", "jsx"], // Ensures files are served with the right MIME type
    },
    headers: {
      "Content-Type": "application/javascript", // Explicitly define the MIME type
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx", // Map .js files to JSX
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },  
  base: './',
  build: {    
    outDir: "dist",
    rollupOptions: {
      output: {
        entryFileNames: "index.js", // Ensures .js files are correctly named
      },
    },
  },
});
