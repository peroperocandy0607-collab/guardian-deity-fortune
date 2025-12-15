import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],

    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },

    // ❌ dev専用なので本番では不要（削除）
    // server: {
    //   port: 3000,
    // },

    // ✅ Railway対応（本番は preview を使う）
    preview: {
      host: true,
      port: process.env.PORT, // Railway指定PORTを使用
      allowedHosts: ['.railway.app'],
    },
  };
});
