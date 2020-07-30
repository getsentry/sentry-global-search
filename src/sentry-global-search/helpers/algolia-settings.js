// These are the recommended settings for use with Sentry Algoli indexes.
// requires an opinionated record style which can be created using
// ./helpers/parseRecordsFromHTML
export default {
  snippetEllipsisText: '…',
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
  attributesToSnippet: [`text:15`],
  attributesToHighlight: ['section'],
  distinct: 3,
  attributeForDistinct: 'section',
  attributesToRetrieve: ['text', 'title', 'section', 'url', 'anchor'],
  searchableAttributes: ['section', 'text'],
  ranking: [
    'desc(date)',
    'typo',
    'geo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom',
  ],
  customRanking: ['asc(sectionRank)', 'desc(position)'],
  disableTypoToleranceOnWords: ['react'],
  advancedSyntax: true,
};
