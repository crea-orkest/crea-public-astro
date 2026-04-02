import { defineConfig, envField } from 'astro/config';
import graphql from '@rollup/plugin-graphql';
import type { PluginOption } from 'vite';
import serviceWorker from './config/service-worker-integration.ts';

const localhostPort = 4323;
export const siteUrl = process.env.CF_PAGES
  ? process.env.CF_PAGES_URL
  : `http://localhost:${localhostPort}`;

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      DATOCMS_READONLY_API_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        default: process.env.DATOCMS_READONLY_API_TOKEN,
      }),
      MAPBOX_ACCESS_TOKEN: envField.string({
        context: 'client',
        access: 'public',
        default: process.env.MAPBOX_ACCESS_TOKEN,
      }),
    },
  },
  integrations: [serviceWorker()],
  output: 'static',
  server: { port: localhostPort },
  site: siteUrl,
  vite: {
    plugins: [graphql() as PluginOption],
  },
});
