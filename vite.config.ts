import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dockops-ui/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
});
