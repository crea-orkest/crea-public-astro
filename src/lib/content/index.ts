import {
  getCollection as getAstroCollection,
  getEntry as getAstroCollectionEntry,
} from 'astro:content';
import { collectionMap } from '@content/config';
import type { SiteInfoCollectionEntryQuery } from '@lib/datocms/types';

export type CollectionName = keyof typeof collectionMap;

type BareCollectionEntry<K extends CollectionName> = NormalizedEntry<
  Awaited<ReturnType<(typeof collectionMap)[K]['loadCollection']>>[number]
>;
/**
 * CollectionEntry is a type that represents a single entry in a collection.
 */
export type CollectionEntry<K extends CollectionName> = BareCollectionEntry<K>;

/**
 * Fetches entries from a collection.
 *
 * @param collection - The key of the collection to fetch entries from
 * @param filter - Optional function to filter the collection entries
 * @param locale - SiteLocale to filter on, defaults to current locale. Use `null` for all locales.
 * @returns A promise that resolves to an array of normalized collection entries
 */
export async function getCollection<K extends CollectionName>(
  collection: K,
  filter?: (entry: BareCollectionEntry<K>) => boolean,
): Promise<CollectionEntry<K>[]> {
  const entries = !filter
    ? await getAstroCollection(collection)
    : await getAstroCollection(collection, (entry: BareCollectionEntry<K>) => {
      return [
        !filter || (typeof filter === 'function' && filter(entry)),
      ].every(Boolean);
    });

  return entries;
}

/**
 * Fetches a single entry from a collection by its slug.
 *
 * @param collection - The key of the collection to fetch the entry from
 * @param id - The id of the entry to fetch
 * @param locale - Optional SiteLocale to find the localized entry.
 * @returns A promise that resolves to the requested collection entry or undefined if not found
 */
export async function getEntry<K extends CollectionName>(
  collection: K,
  id: string,
): Promise<CollectionEntry<K> | undefined>;
export async function getEntry(
  collection: 'SiteInfo',
  id: 'general',
): Promise<
  | (CollectionEntry<'SiteInfo'> & {
      data: SiteInfoCollectionEntryQuery['general'];
    })
  | undefined
>;
export async function getEntry(
  collection: 'SiteInfo',
  id: 'seo',
): Promise<
  | (CollectionEntry<'SiteInfo'> & {
      data: SiteInfoCollectionEntryQuery['seo'];
    })
  | undefined
>;
export async function getEntry<K extends CollectionName>(
  collection: K,
  id: string,
): Promise<CollectionEntry<K> | undefined> {
  const entry = await getAstroCollectionEntry(collection, id);
  return entry;
}

export type BaseEntry = {
  id: string;
};
export type NormalizedEntry<T extends BaseEntry = BaseEntry> = {
  id: string;
  collection: string;
  data: T;
};
