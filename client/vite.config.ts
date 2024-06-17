import { defineConfig, UserConfig, AliasOptions } from 'vite';

const alias: Partial<AliasOptions> = [
  { find: 'pages', replacement: '/src/pages' },
  { find: 'app', replacement: '/src/app' },
  { find: 'entities', replacement: '/src/entities' },
  { find: 'features', replacement: '/src/features' },
  { find: 'shared', replacement: '/src/shared' },
  { find: 'widgets', replacement: '/src/widgets' },
];

export default defineConfig(() => {
  return {
    resolve: {
      alias,
    },
  } as UserConfig;
});