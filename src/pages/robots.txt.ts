// robots.txt contains dynamic content, which can be determined at build time.
// so we use this API route to prerender the robots.txt file.
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async (context) => {
  return new Response(
    robotsTxt({
      siteUrl: context.site!.origin,
    }),
    {
      headers: {
        'content-type': 'text/plain',
      },
    },
  );
};

const robotsTxt = ({ siteUrl }: { siteUrl: string }) =>
  `
User-agent: *
Allow: /
Disallow: /style-guide

Sitemap: ${siteUrl}/sitemap-index.xml

`.trim();
