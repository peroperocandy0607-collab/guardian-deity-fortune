import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],

    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },

    // ★ Railwayでは PORT を絶対に指定しない
    preview: {
      host: true,
      allowedHosts: ['.railway.app'],
    },
  };
});
