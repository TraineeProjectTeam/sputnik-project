import { defineConfig, UserConfig, AliasOptions } from 'vite';
import react from '@vitejs/plugin-react';

const alias: Partial<AliasOptions> = [
  { find: 'pages', replacement: '/src/pages' },
  { find: 'app', replacement: '/src/app' },
  { find: 'entities', replacement: '/src/entities' },
  { find: 'features', replacement: '/src/features' },
  { find: 'shared', replacement: '/src/shared' },
  { find: 'widgets', replacement: '/src/widgets' },
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
} as UserConfig);
