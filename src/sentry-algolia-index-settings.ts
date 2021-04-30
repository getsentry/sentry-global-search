import { Settings } from '@algolia/client-search';

/**
 * These are the recommended settings for use with Sentry Algoli indexes.
 * requires an opinionated record style which can be created using
 * ./helpers/parseRecordsFromHTML
 */
const settings: Settings = {
  snippetEllipsisText: '…',
  hitsPerPage: 10,
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
  attributesToSnippet: [`text:15`],
  attributesToHighlight: ['section'],
  attributesForFaceting: [
    'filterOnly(pathSegments)',
    'filterOnly(platforms)',
    'filterOnly(legacy)',
  ],
  distinct: 1,
  attributeForDistinct: 'section',
  attributesToRetrieve: [
    'text',
    'title',
    'section',
    'url',
    'anchor',
    'context',
  ],
  searchableAttributes: ['unordered(section)', 'unordered(keywords)', 'text'],
  customRanking: ['asc(sectionRank)', 'desc(position)'],
  disableTypoToleranceOnWords: ['react', 'cli'],
  advancedSyntax: true,
};

export default settings;
