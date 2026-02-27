/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  // css: {
  //   modules: {
  //     localsConvention: "camelCase",
  //     generateScopedName: "[name]__[local]___[hash:base64:5]",
  //     hashPrefix: "wings",
  //     scopeBehaviour: "local",
  //    globalModulePaths: [/_global\.module\.css$/],
  //   },
  // },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ["./vitest-setup.js"],
    // projects: [{
    //   extends: true,
    //   plugins: [
    //   // The plugin will run tests for the stories defined in your Storybook config
    //   // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    //   storybookTest({
    //     configDir: path.join(dirname, '.storybook')
    //   })],
    //   test: {
    //     name: 'storybook',
    //     browser: {
    //       enabled: true,
    //       headless: true,
    //       provider: 'playwright',
    //       instances: [{
    //         browser: 'chromium'
    //       }]
    //     },
    //     setupFiles: ['.storybook/vitest.setup.js']
    //   }
    // }]
  }
});