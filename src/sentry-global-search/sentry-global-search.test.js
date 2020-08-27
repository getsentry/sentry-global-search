import SentryGlobalSearch from './sentry-global-search';
const algoliasearch = require('algoliasearch/lite');

const config = ['docs', 'develop', 'blog', 'help-center'];

describe('Search', () => {
  const client = algoliasearch();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('requires configuration', () => {
    expect(() => {
      new SentryGlobalSearch();
    }).toThrowErrorMatchingSnapshot();
  });

  test('requires configuration as array', () => {
    expect(() => {
      const search = new SentryGlobalSearch(
        'docs',
        'develop',
        'blog',
        'help-center'
      );
    }).toThrowErrorMatchingSnapshot();
  });

  test('rejects unknown sites', () => {
    expect(() => {
      const search = new SentryGlobalSearch(['foobar']);
    }).toThrowErrorMatchingSnapshot();
  });

  test('returns nothing for an empty query', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query();
    expect(results).toEqual([]);
  });

  test('queries', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query('react');
    expect(results).toMatchSnapshot();
  });

  test('queries with platform priority', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query('react', {
      platforms: ['sentry.javascript.react'],
    });
    expect(client.multipleQueries.mock.calls).toMatchSnapshot();
  });

  test('does not query platforms when none are provided', async () => {
    const search = new SentryGlobalSearch(config);
    await search.query('react', {
      platforms: [],
    });
    expect(client.multipleQueries.mock.calls).toMatchSnapshot();
  });

  test('queries with path as priority', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query('react', {
      path: ['/foo/bar/'],
    });
    expect(client.multipleQueries.mock.calls).toMatchSnapshot();
  });

  test('prioritizes path over platform', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query('react', {
      path: ['/foo/bar/'],
      platforms: ['sentry.javascript.react'],
    });
    expect(client.multipleQueries.mock.calls).toMatchSnapshot();
  });
});
