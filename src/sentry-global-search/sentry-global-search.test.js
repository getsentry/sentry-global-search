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
    expect(results).toMatchSnapshot();
    expect(client.multipleQueries.mock.calls).toMatchSnapshot();
  });

  test('queries with platform priority', async () => {
    const search = new SentryGlobalSearch(config);
    await search.query('react', {
      platforms: [],
    });
    expect(client.multipleQueries.mock.calls).toMatchSnapshot();
  });
});
