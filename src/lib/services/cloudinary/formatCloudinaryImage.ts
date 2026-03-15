import type { CloudinaryAsset, Image } from './types';

export const formatCloudinaryImage = (
  asset: CloudinaryAsset | undefined,
): Image | undefined => {
  if (!asset) return;
  return {
    id: `v${asset.version}/${asset.id}`,
    alt: asset.alt?.['nl-NL'] ?? '',
    width: asset.width,
    height: asset.height,
    url: asset.secure_url,
  };
};
