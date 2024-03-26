import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      'src': '/src',
      'app': '/src/app',
      'pages': '/src/pages',
      'widgets': '/src/widgets',
      'entities': '/src/entities',
      'features': '/src/features',
      'shared': '/src/shared',
    }
  }
});
