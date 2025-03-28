import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: false,
    },
    allowedHosts: [
      '.replit.dev', // ✅ allow wildcard Replit domains
    ],
  },
});
