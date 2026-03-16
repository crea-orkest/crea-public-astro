export type Font = {
  family: string;
  weight: number;
  style: string;
  woff2Url: string;
};

export const fontFamilyArchivo = 'Archivo, sans-serif';

export const fonts: Font[] = [
  {
    family: 'dm-sans',
    weight: 400,
    style: 'normal',
    woff2Url: '/fonts/dm-sans-regular.woff2',
  },
  {
    family: 'dm-sans',
    weight: 400,
    style: 'italic',
    woff2Url: '/fonts/dm-sans-regular-italic.woff2',
  },
  {
    family: 'dm-sans',
    weight: 700,
    style: 'normal',
    woff2Url: '/fonts/dm-sans-bold.woff2',
  },
  {
    family: 'dm-sans',
    weight: 700,
    style: 'italic',
    woff2Url: '/fonts/dm-sans-bold-italic.woff2',
  },
  {
    family: 'dm-serif',
    weight: 400,
    style: 'normal',
    woff2Url: '/fonts/dm-serif.woff2',
  },
  {
    family: 'dm-serif',
    weight: 400,
    style: 'italic',
    woff2Url: '/fonts/dm-serif-italic.woff2',
  },
];

export const getFontFaceDeclaration = (font: Font) => {
  return /* css */ `
    @font-face {
      font-family: '${font.family}';
      font-style: ${font.style};
      font-weight: ${font.weight};
      src: url('${font.woff2Url}') format('woff2');
      font-display: swap;
    }
  `;
};
