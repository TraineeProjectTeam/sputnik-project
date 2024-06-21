import { defineConfig, UserConfig, AliasOptions } from 'vite';
import react from '@vitejs/plugin-react';

const alias: AliasOptions = [
  { find: 'pages', replacement: '/src/pages' },
  { find: 'app', replacement: '/src/app' },
  { find: 'entities', replacement: '/src/entities' },
  { find: 'features', replacement: '/src/features' },
  { find: 'shared', replacement: '/src/shared' },
  { find: 'widgets', replacement: '/src/widgets' },
];

const config: UserConfig = {
  plugins: [react()],
  resolve: {
    alias,
  },
};

export default defineConfig(config);
