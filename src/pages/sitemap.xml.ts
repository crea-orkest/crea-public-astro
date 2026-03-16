import { getCollection, type CollectionEntry } from '@lib/content';
import type { APIRoute } from 'astro';
import { HOMEPAGE_SLUG } from './index.astro';

export const prerender = true;
const defaultPriority = 0.7;

export const GET: APIRoute = async (context) => {
  const pages = await getCollection(
    'Pages',
    (page) => page.data.slug !== '404',
  );
  const concerts = await getCollection('Concerts');

  return new Response(
    createSitemap({
      pages,
      concerts,
      siteUrl: context.site!.origin,
    }),
    {
      headers: {
        'content-type': 'text/xml',
      },
    },
  );
};

function createSitemap({
  pages,
  concerts,
  siteUrl,
}: {
  pages: CollectionEntry<'Pages'>[];
  concerts: CollectionEntry<'Concerts'>[];
  siteUrl: string;
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map((page) => getPageLine(page, siteUrl)).join('\n')}
    ${concerts.map((concert) => getConcertLine(concert, siteUrl)).join('\n')}
  </urlset>`;
}

function getPageLine(page: CollectionEntry<'Pages'>, siteUrl: string) {
  if (!page.data.indexPage) {
    return '';
  }
  const isHomepage = page.data.slug === HOMEPAGE_SLUG;
  const slugWithSlash = isHomepage ? '/' : `/${page.data.slug}/`;
  const priority = isHomepage ? 1.0 : defaultPriority;
  return `<url>
    <loc>${siteUrl}${slugWithSlash}</loc>
    <lastmod>${page.data._updatedAt}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}

function getConcertLine(concert: CollectionEntry<'Concerts'>, siteUrl: string) {
  return `<url>
    <loc>${siteUrl}/${concert.data.meta.path}/</loc>
    <lastmod>${concert.data._updatedAt}</lastmod>
    <priority>${defaultPriority}</priority>
  </url>`;
}
