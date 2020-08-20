import SentryGlobalSearch from './sentry-global-search';

const config = ['docs', 'develop', 'blog', 'help-center'];

describe('Search', () => {
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
});
