import {
  cloudinaryImagesPath,
  cloudinaryOrigin,
} from '@middleware/proxy-cloudinary';
import type { CloudinaryAsset } from './types';

interface Document {
  id: string;
  url: string;
  bytes?: number;
  alt?: string;
}

export const formatCloudinaryDocument = (
  document: CloudinaryAsset | undefined,
): Document | undefined => {
  if (!document?.id) return;
  if (!document.version) return;
  if (!document?.secure_url) return;
  if (document.format !== 'pdf') return;
  return {
    id: `v${document.version}/${document.id}`,
    url: document.secure_url
      .replace('http://', 'https://')
      .replace(cloudinaryOrigin, cloudinaryImagesPath),
    bytes: document.bytes,
    alt: document.alt?.['nl-NL'] ?? '',
  };
};
