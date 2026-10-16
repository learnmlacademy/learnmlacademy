import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const configDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(configDir, '.'),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-lucide';
          }
          if (id.includes('node_modules/recharts/') || id.includes('node_modules/d3-')) {
            return 'vendor-recharts';
          }
          if (id.includes('agenticTutorialLabs.json') || id.includes('genaiTutorialLabs.json') || id.includes('llmTutorialLabs.json')) {
            return 'modernai-labs-data';
          }
          if (id.includes('agenticLessonDetails') || id.includes('agenticLessonEnhancements')) {
            return 'modernai-agentic-details';
          }
        },
      },
    },
  },
});
