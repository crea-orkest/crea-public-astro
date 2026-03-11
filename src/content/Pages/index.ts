import { datocmsCollection, datocmsRequest } from '@lib/datocms';
import {
  PageRoute as fragment,
  PageCollectionEntry as query,
  type PageCollectionEntryQuery,
  type PageRouteFragment,
} from '@lib/datocms/types';
import { defineCollection, z } from 'astro:content';

type Meta<T extends PageCollectionEntryQuery['record']> = {
  recordId: string; // The record ID of the entry in DatoCMS
  recordType: NonNullable<T>['__typename']; // The type of the record in DatoCMS
  path: string; // The path of the page, excluding the locale
};
export type PageCollectionEntry = PageCollectionEntryQuery['record'] & {
  id: string; // A unique ID for the entry in the content collection, combining the path and locale
  meta: Meta<PageCollectionEntryQuery['record']>;
};

const name = 'Pages' as const;

/**
 * Loads a single entry from the collection by its ID and locale.
 *
 * @param path - The path of the entry to load.
 * @returns A promise that resolves to a PageCollectionEntry object or undefined if not found.
 */
const loadEntry = async (path: string) => {
  const slug = path;

  if (!slug) {
    return undefined;
  }

  const variables = { slug };
  const { record } = await datocmsRequest<PageCollectionEntryQuery>({
    query,
    variables,
  });

  if (!record) {
    return undefined; // If no entry is found, return undefined
  }

  return {
    ...record,
    id: path,
    meta: {
      recordId: record.id,
      recordType: record.__typename,
      path,
    },
  } satisfies PageCollectionEntry;
};

/**
 * Loads all entries from the collection, mapping them to their respective locales.
 *
 * @returns A promise that resolves to an array of PageCollectionEntry objects.
 **/
const loadCollection = async () => {
  const items = (
    await datocmsCollection<PageRouteFragment>({
      collection: name,
      fragment,
    })
  )
    // Flatten the array of entries to get an array of { id } pairs.
    // In this instance, the `id` of the entry is the path of the page
    .flatMap((record) => {
      return {
        path: record.slug,
      };
    });

  // For each id/locale pair, load the entry and return it.
  // Note that this might be slow if there are many entries, as it makes a
  // separate request for each entry.
  return Promise.all(items.map(({ path }) => loadEntry(path))).then((entries) =>
    entries.filter((entry) => entry !== undefined),
  );
};

const collection = defineCollection({
  loader: loadCollection,
  schema: z.custom<PageCollectionEntry>(),
});

export default {
  [name]: {
    name,
    collection,
    loadCollection,
    loadEntry,
  },
};
