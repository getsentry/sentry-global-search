const algoliasearch = require('algoliasearch/lite');
const sites = require('./lib/config').sites;
const defaultQueryParams = require('./lib/config').defaultQueryParams;

const errorType = `SentryGlobalSearchError`;

class SentryGlobalSearch {
  constructor(configs = []) {
    // Complain if no configuration has been provided
    if (configs.length === 0 || !Array.isArray(configs)) {
      throw new Error(
        `${errorType}: SentryGlobalSearch must be initialized with an array that includes one or more of: ${sites
          .map(x => x.site)
          .join(', ')}.`
      );
    }

    // Validate configuration
    this.configs = configs.map(x => {
      const config = {
        site: x,
      };
      const defaults = sites.find(x => x.site === config.site);

      if (!!defaults) return { ...defaults, ...config };

      throw new Error(
        `${errorType}: unknown site "${config.site}" in config.include`
      );
    });

    // Create an Algolia client to work with
    this.client = algoliasearch(
      'OOK48W9UCL',
      '2d64ec1106519cbc672d863b0d200782'
    );

    this.query = this.query.bind(this);
  }

  async query(query, args = {}) {
    if (!query) return [];
    const { client, configs } = this;

    const optionalFilters = [];
    if (args.platforms && args.platforms.length > 0) {
      optionalFilters.push(args.platforms.map(x => `platforms:${x}`));
    }

    // Create a list of Algolia query objects from our configs
    const queries = configs.reduce((queries, site) => {
      const newQueries = site.indexes.map(({ indexName }) => {
        const obj = {
          indexName,
          query,
          params: {
            ...defaultQueryParams,
            ...(optionalFilters.length && { optionalFilters }),
          },
        };
        return obj;
      });
      return [...queries, ...newQueries];
    }, []);

    // Get the search results
    const { results: algoliaResults } = await client.multipleQueries(queries);

    // Reduce and normalize the Algolia results
    const results = configs.map(config => {
      // If a site has more than one index, reduce them to one array.
      const hits = config.indexes.reduce((hits, index) => {
        const algoliaResult = algoliaResults.find(
          result => result.index === index.indexName
        );

        // Normalize the results into a consistent format
        return [...hits, ...algoliaResult.hits.map(index.transformer)];
      }, []);

      return {
        site: config.site,
        name: config.name,
        hits,
      };
    });

    return results;
  }
}

module.exports = SentryGlobalSearch;
