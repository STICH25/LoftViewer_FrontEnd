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
      input: "index.html", // Explicitly set entry file
      output: {
        entryFileNames: "assets/[name]-[hash].js", // Correct relative path
        chunkFileNames: "assets/[name]-[hash].js", // Correct relative path
        assetFileNames: "assets/[name]-[hash].[ext]", // Correct relative path for styles/icons
      },
    },
  },
});
