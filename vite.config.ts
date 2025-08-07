// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  
  // --- НАЧАЛО ИЗМЕНЕНИЙ ---
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    
    // Явно указываем минификатор
    minify: 'terser',
    
    // Добавляем опции для него
    terserOptions: {
      format: {
        // Эта опция запрещает превращать кириллицу в \uXXXX
        ascii_only: false,
      },
    },
  },
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});