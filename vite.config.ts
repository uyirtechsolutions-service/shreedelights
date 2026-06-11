import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
  ],
  build: {
    // Inline all assets (images, fonts) as base64
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
});
