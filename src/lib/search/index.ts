import Fuse, { type IFuseOptions } from 'fuse.js';

export const searchQueryParam = 'q';

export function searchEntries<T>({
  entries,
  keys,
  query,
}: {
  entries: T[];
  keys: IFuseOptions<T>['keys'];
  query?: string;
}): T[] {
  const fuse = new Fuse(entries, {
    keys,
    ignoreDiacritics: true,
  });
  return query ? fuse.search(query).map((result) => result.item) : entries;
}
