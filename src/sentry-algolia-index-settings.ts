import { Settings } from '@algolia/client-search';

/**
 * These are the recommended settings for use with Sentry Algoli indexes.
 * requires an opinionated record style which can be created using
 * ./helpers/parseRecordsFromHTML
 */
export const settings: Settings = {
  snippetEllipsisText: '…',
  hitsPerPage: 10,
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
  attributesToSnippet: [`text:15`],
  attributesToHighlight: ['section'],
  attributesForFaceting: [
    'filterOnly(pathSegments)',
    'filterOnly(sdk)',
    'filterOnly(framework)',
    'filterOnly(legacy)',
  ],
  distinct: 1,
  attributeForDistinct: 'section',
  attributesToRetrieve: ['*'],
  searchableAttributes: ['unordered(section)', 'unordered(keywords)', 'text'],
  disableTypoToleranceOnWords: ['react', 'cli'],
  advancedSyntax: true,
  ranking: [
    'filters',
    'desc(sectionRank)',
    'asc(popularity)',
    'asc(position)',
    'attribute',
    'exact',
    'proximity',
    'words',
    'typo',
  ],
};
