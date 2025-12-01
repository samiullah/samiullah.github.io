import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For User/Org sites (https://username.github.io/), base should be '/'
  // For Project sites (https://username.github.io/repo/), base should be '/repo/'
  base: '/', 
});