import { getEntry } from '@lib/content';
import type { SiteInfoCollectionEntryQuery, Tag } from '@lib/datocms/types';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const siteInfo = await getEntry('SiteInfo', 'seo');

  if (!siteInfo) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(JSON.stringify(getManifestText(siteInfo.data)), {
    headers: {
      'content-type': 'application/manifest+json',
    },
  });
};

function getManifestText(data: SiteInfoCollectionEntryQuery['seo']) {
  const text = {
    name: data.globalSeo?.siteName,
    short_name: data.globalSeo?.siteName?.replace('Het ', ''),
    description: data?.globalSeo?.fallbackSeo?.description,
    display: 'standalone',
    start_url: '/',
    orientation: 'portrait',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    icons: data.faviconMetaTags.map((tag) => getIconText(tag)).filter(Boolean),
  };
  return text;
}

function getIconText(tag: Tag) {
  if (tag.attributes?.rel === 'icon') {
    return {
      src: `${tag.attributes.href}&fm=png`,
      sizes: tag.attributes.sizes,
      type: 'image/png',
    };
  }
  return null;
}
