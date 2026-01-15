// react/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/autocal/react/dist/', // あなたのリポジトリ名に合わせて調整
});
