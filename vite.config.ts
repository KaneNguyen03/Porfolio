import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    tailwindcss(),
  ],
  build: {
    // Tối ưu bundle size và performance
    rollupOptions: {
      output: {
        // Function form: object-form manualChunks hoists shared helpers into
        // the named chunk and makes the entry statically import it, which
        // defeated the dynamic import("mermaid") in MermaidDiagram.tsx.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("/react-router")) return "router";
          if (id.includes("/framer-motion") || id.includes("/motion-dom") || id.includes("/motion-utils")) return "animation";
          if (id.includes("/lucide-react")) return "icons";
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) return "vendor";
          return undefined;
        },
        // Tối ưu asset names
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    chunkSizeWarningLimit: 500,
    cssMinify: true,
    minify: "esbuild",
    sourcemap: false,
    target: "es2022",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@contexts": fileURLToPath(new URL("./src/contexts", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  // Tối ưu dev server
  server: {
    port: 3000,
    open: true,
  },
  // Pre-bundle dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
    ],
  },
});
