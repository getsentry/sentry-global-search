import { sites } from '../../lib/config';

const indexes = sites.reduce(
  (a, x) => [...a, ...x.indexes.map(y => y.indexName)],
  []
);

const mockHit = additional => {
  return {
    title: 'Mocked hit',
    draft: false,
    fields: {
      slug: '/platforms/javascript/react/',
    },
    excerpt: 'Mocked excerpt',
    objectID: 'cd5528ad-935b-5a33-b25e-4f945638551b',
    section: {
      full_path: 'Mocked full_path',
    },
    _snippetResult: {
      excerpt: {
        value: 'Mocked excerpt',
        matchLevel: 'full',
      },
      content: {
        value: 'MockedContent',
        matchLevel: 'full',
      },
      text: {
        value: 'Mocked text',
        matchLevel: 'full',
      },
      body_safe: {
        value: 'Mocked body_safe',
        matchLevel: 'full',
      },
    },
    _highlightResult: {
      title: {
        value: '<mark>React</mark>',
        matchLevel: 'full',
        fullyHighlighted: true,
        matchedWords: ['react'],
      },
      fields: {
        slug: {
          value: '/platforms/javascript/<mark>react</mark>/',
          matchLevel: 'full',
          fullyHighlighted: false,
          matchedWords: ['react'],
        },
      },
      excerpt: {
        value: 'Mocked excerpt',
        matchLevel: 'full',
        fullyHighlighted: false,
        matchedWords: ['react'],
      },
      section: {
        value: 'Mocked section',
        matchLevel: 'none',
        matchedWords: [],
      },
    },
    ...additional,
  };
};

const mockResult = index => {
  return {
    hits: [mockHit(), mockHit({ anchor: 'mocked-anchor' })],
    nbHits: 1,
    page: 0,
    nbPages: 1,
    hitsPerPage: 20,
    exhaustiveNbHits: true,
    query: 'react',
    params:
      'query=react&snippetEllipsisText=%E2%80%A6&highlightPreTag=%3Cmark%3E&highlightPostTag=%3C%2Fmark%3E',
    index,
    processingTimeMS: 13,
  };
};

module.exports = jest.fn(() => {
  return {
    multipleQueries: jest.fn(() =>
      Promise.resolve({
        results: indexes.map(mockResult),
      })
    ),
  };
});
