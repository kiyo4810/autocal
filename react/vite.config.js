// react/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/autocal/', // リポジトリ名に合わせます。末尾のスラッシュを忘れずに！
});
