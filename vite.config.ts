/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
  },
  server: {
    proxy: {
      "^/api/.*": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path);
          const p = path.replace(/^\/api/, "");
          console.log(p);
          return p;
        },
      },
    },
  },
});
