import path from "path";
import { keycloakify } from "keycloakify/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    keycloakify({
      accountThemeImplementation: "none",
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
