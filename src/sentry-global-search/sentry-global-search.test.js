import { SentryGlobalSearch } from './sentry-global-search';
import algoliasearch from 'algoliasearch/lite';

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

  test('queries multiple indexes', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query('react', {
      searchAllIndexes: true,
    });
    expect(results).toMatchSnapshot();
  });

  test('queries with platform priority', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query('react', {
      platforms: ['sentry.javascript', 'sentry.javascript.react'],
    });
    expect(client.search.mock.calls).toMatchSnapshot();
  });

  test('does not query platforms when none are provided', async () => {
    const search = new SentryGlobalSearch(config);
    await search.query('react', {
      platforms: [],
    });
    expect(client.search.mock.calls).toMatchSnapshot();
  });

  test('queries with path as priority', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query('react', {
      path: ['/foo/bar/'],
    });
    expect(client.search.mock.calls).toMatchSnapshot();
  });

  test('prioritizes path over platform', async () => {
    const search = new SentryGlobalSearch(config);
    const results = await search.query('react', {
      path: ['/foo/bar/'],
      platforms: ['sentry.javascript', 'sentry.javascript.react'],
    });
    expect(client.search.mock.calls).toMatchSnapshot();
  });

  test('can bias individual sites', async () => {
    const biasedConfig = [...config];
    biasedConfig.push({
      site: biasedConfig.pop(),
      pathBias: true,
      platformBias: false,
      legacyBias: false,
    });
    const search = new SentryGlobalSearch(biasedConfig);
    const results = await search.query('react', {
      path: ['/foo/bar/'],
      platforms: ['sentry.javascript', 'sentry.javascript.react'],
      legacy: true,
    });
    expect(client.search.mock.calls).toMatchSnapshot();
  });

  test('calls search with clickAnalytics', async () => {
    const search = new SentryGlobalSearch([
      {
        site: 'blog',
        indexes: [
          {
            indexName: 'blog',
            clickAnalytics: true,
          },
        ],
      },
    ]);

    const results = await search.query('react', {
      path: ['/foo/bar/'],
      platforms: ['sentry.javascript', 'sentry.javascript.react'],
      legacy: true,
    });
    expect(client.search.mock.calls).toMatchSnapshot();
  });

  test('calls transformer with response', async () => {
    const config = [
      {
        site: 'blog',
        indexes: [
          {
            indexName: 'sentry-blog-posts',
            clickAnalytics: true,
            transformer: jest.fn(),
          },
        ],
      },
    ];

    const search = new SentryGlobalSearch(config);
    await search.query('react');

    expect(config[0].indexes[0].transformer).toHaveBeenCalledTimes(2);
    expect(config[0].indexes[0].transformer.mock.calls[0][1]).toMatchSnapshot();
    expect(config[0].indexes[0].transformer.mock.calls[0][1].hitsPerPage).toBe(
      20
    );
  });
});
