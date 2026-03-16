import type { CloudinaryAsset, Image } from './types';

export const defaultOptimisations =
  '/f_auto,q_80,fl_strip_profile,fl_progressive';

export const formatCloudinaryImage = (
  asset: CloudinaryAsset | undefined,
): Image | undefined => {
  if (!asset || !asset.url) return;
  const [baseUrl, rest] = asset.url.split(`/v${asset.version}/`);
  const newUrl = `${baseUrl}${defaultOptimisations}/${rest}`;
  return {
    id: `v${asset.version}/${asset.id}`,
    alt: asset.alt?.['nl-NL'] ?? '',
    width: asset.width,
    height: asset.height,
    url: newUrl.replace('http://', 'https://'),
  };
};

export const getImageUrl = (
  url: string,
  options: { width: number; extra?: string },
) => {
  const [baseUrl, rest] = url.split(defaultOptimisations);
  const newUrl = `${baseUrl}/w_${options.width}${options.extra ? `/${options.extra}` : ''}${defaultOptimisations}${rest}`;
  return newUrl;
};
