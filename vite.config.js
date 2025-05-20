import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";

// Replace 'my-react-app' with your actual GitHub repo name
const repoName = "LoftViewer_FrontEnd";

export default defineConfig({
  base: `/${repoName}/`, // ✅ Required for GitHub Pages
  plugins: [
    react(),
    copy({
      targets: [
        { src: "src/assets", dest: "public/" }
      ],
      verbose: true,
    }),
  ],
  server: {
    port: 3025,
    strictPort: true,
    mimeTypes: {
      "application/javascript": ["js", "jsx"],
    },
    headers: {
      "Content-Type": "application/javascript",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
});
