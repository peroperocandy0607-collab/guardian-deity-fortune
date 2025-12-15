import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],

    define: {
      // 既存の挙動はそのまま（APIキー）
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },

    server: {
      port: 3000,
    },

    // ★ ここが今回の追加ポイント（Railway対策）
    preview: {
      allowedHosts: ['.railway.app'],
    },
  };
});
