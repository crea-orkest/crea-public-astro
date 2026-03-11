import { defineConfig, envField } from 'astro/config';
import graphql from '@rollup/plugin-graphql';
import type { PluginOption } from 'vite';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      DATOCMS_READONLY_API_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        default: process.env.DATOCMS_READONLY_API_TOKEN,
      }),
    },
  },
  output: 'static',
  server: { port: 4323 },
  vite: {
    plugins: [graphql() as PluginOption],
  },
});
