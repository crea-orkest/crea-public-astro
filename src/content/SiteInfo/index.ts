import { datocmsRequest } from '@lib/datocms';
import {
  SiteInfoCollectionEntry as generalInfoQuery,
  type SiteInfoCollectionEntryQuery,
} from '@lib/datocms/types';
import { defineCollection, z } from 'astro:content';

type SiteInfoRecord = SiteInfoCollectionEntryQuery['seo' | 'general'];

type Meta<T extends SiteInfoRecord> = {
  recordId: string; // The record ID of the entry in DatoCMS
  recordType: NonNullable<T>['__typename']; // The type of the record in DatoCMS
  path: string; // The path of the page, excluding the locale
};
export type SiteInfoCollectionEntry<R extends SiteInfoRecord> = R & {
  id: 'general' | 'seo'; // A unique ID for the entry in the content collection, combining the path and locale
  meta: Meta<R>;
};

const name = 'SiteInfo' as const;

/**
 * Loads a single entry from the collection by its ID and locale.
 *
 * @param path - The path of the entry to load.
 * @returns A promise that resolves to a SiteInfoCollectionEntry object or undefined if not found.
 */
const loadEntry = async () => {
  const { seo, general } = await datocmsRequest<SiteInfoCollectionEntryQuery>({
    query: generalInfoQuery,
  });

  return [
    {
      ...general,
      id: 'general',
      meta: {
        recordId: general.id,
        recordType: general.__typename,
        path: 'general',
      },
    },
    {
      ...seo,
      id: 'seo',
      meta: {
        recordId: 'site-info',
        recordType: seo.__typename,
        path: 'seo',
      },
    }] satisfies SiteInfoCollectionEntry<SiteInfoRecord>[];
};

/**
 * Loads all entries from the collection, mapping them to their respective locales.
 *
 * @returns A promise that resolves to an array of SiteInfoCollectionEntry objects.
 **/
const loadCollection = async () => {
  // For each id/locale pair, load the entry and return it.
  // Note that this might be slow if there are many entries, as it makes a
  // separate request for each entry.
  return Promise.all([loadEntry()]).then((entries) =>
    entries.filter((entry) => entry !== undefined),
  ).then((entries) => entries.flat() as SiteInfoCollectionEntry<SiteInfoRecord>[]);
};

const collection = defineCollection({
  loader: loadCollection,
  schema: z.custom<SiteInfoCollectionEntry<SiteInfoRecord>>(),
});

export default {
  [name]: {
    name,
    collection,
    loadCollection,
    loadEntry,
  },
};
