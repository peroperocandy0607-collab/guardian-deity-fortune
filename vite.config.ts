import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],

    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },

    preview: {
      host: true,
      port: Number(process.env.PORT), // ★ここが重要
      allowedHosts: ['.railway.app'],
    },
  };
});
