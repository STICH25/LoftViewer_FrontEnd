import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Correct for custom domains or root-level deployment
  plugins: [react()],
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
  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 8080, // 👈 Railway needs this
  },
});
