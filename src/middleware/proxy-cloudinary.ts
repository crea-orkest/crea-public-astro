import { defineMiddleware } from 'astro/middleware';
import { CLOUDINARY_ENV } from 'astro:env/server';

export const cloudinaryImagesPath = '/images/cloudinary/';
export const cloudinaryOrigin = 'https://res.cloudinary.com/';

export const proxyCloudinary = defineMiddleware(
  async ({ request, redirect }, next) => {
    const requestUrl = new URL(request.url);
    const cloudinaryId = CLOUDINARY_ENV;
    if (
      requestUrl.pathname.startsWith(`${cloudinaryImagesPath}${cloudinaryId}/`)
    ) {
      return redirect(
        `${cloudinaryOrigin}${requestUrl.pathname.replace(cloudinaryImagesPath, '')}`,
      );
    }

    return next();
  },
);
