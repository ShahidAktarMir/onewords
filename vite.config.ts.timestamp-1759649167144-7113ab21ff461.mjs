// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src"),
      "@/components": resolve(__vite_injected_original_dirname, "./src/components"),
      "@/hooks": resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@/store": resolve(__vite_injected_original_dirname, "./src/store"),
      "@/types": resolve(__vite_injected_original_dirname, "./src/types"),
      "@/utils": resolve(__vite_injected_original_dirname, "./src/utils"),
      "@/services": resolve(__vite_injected_original_dirname, "./src/services"),
      "@/constants": resolve(__vite_injected_original_dirname, "./src/constants"),
      "@/assets": resolve(__vite_injected_original_dirname, "./src/assets")
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          state: ["zustand", "@reduxjs/toolkit", "react-redux"],
          ui: ["framer-motion", "lucide-react"]
        }
      }
    }
  },
  server: {
    port: 3e3,
    open: true
  },
  preview: {
    port: 4173
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgICdAL2NvbXBvbmVudHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgICdAL2hvb2tzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9ob29rcycpLFxuICAgICAgJ0Avc3RvcmUnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3N0b3JlJyksXG4gICAgICAnQC90eXBlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdHlwZXMnKSxcbiAgICAgICdAL3V0aWxzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy91dGlscycpLFxuICAgICAgJ0Avc2VydmljZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3NlcnZpY2VzJyksXG4gICAgICAnQC9jb25zdGFudHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbnN0YW50cycpLFxuICAgICAgJ0AvYXNzZXRzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMnKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgIHJvdXRlcjogWydyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgc3RhdGU6IFsnenVzdGFuZCcsICdAcmVkdXhqcy90b29sa2l0JywgJ3JlYWN0LXJlZHV4J10sXG4gICAgICAgICAgdWk6IFsnZnJhbWVyLW1vdGlvbicsICdsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBvcGVuOiB0cnVlLFxuICB9LFxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogNDE3MyxcbiAgfSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUMvQixnQkFBZ0IsUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUNyRCxXQUFXLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQzNDLFdBQVcsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDM0MsV0FBVyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMzQyxXQUFXLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQzNDLGNBQWMsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNqRCxlQUFlLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUEsTUFDbkQsWUFBWSxRQUFRLGtDQUFXLGNBQWM7QUFBQSxJQUMvQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM3QixRQUFRLENBQUMsa0JBQWtCO0FBQUEsVUFDM0IsT0FBTyxDQUFDLFdBQVcsb0JBQW9CLGFBQWE7QUFBQSxVQUNwRCxJQUFJLENBQUMsaUJBQWlCLGNBQWM7QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
