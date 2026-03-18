import {  sequence } from 'astro:middleware';

import { proxyCloudinary } from './proxy-cloudinary';

export const onRequest = sequence(
  proxyCloudinary,
);
