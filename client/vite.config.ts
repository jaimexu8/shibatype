import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["firebase/app", "firebase/auth"],
  },
  resolve: {
    conditions: ["import", "module", "browser", "default"],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    commonjsOptions: {
      include: [/firebase/, /node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
