import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3025,
    strictPort: true,
  },
  esbuild: {
    loader: {
       ".js": "jsx"
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  build: {
    outDir: "dist",
  },
});