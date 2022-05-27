import { MultipleQueriesQuery } from '@algolia/client-search';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';

import { Config, SearchHit, Hit, Result, Site } from './lib/types';
import { sites, defaultQueryParams } from './lib/config';

const errorType = `SentryGlobalSearchError`;

type QueryArgs = {
  path?: string;
  platforms?: string[];
  searchAllIndexes?: boolean;
};

type OptionalFilters = Array<string | string[]>;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type ConstructorConfig = string | Optional<Config, 'indexes'>;

class SentryGlobalSearch {
  configs: Config[];
  client: SearchClient;

  constructor(configs: ConstructorConfig[] = []) {
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
      const config = typeof x === 'string' ? { site: x as Site } : x;
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

  async query(query: string, args: QueryArgs = {}) {
    if (!query) return [];

    // Strip out all but Basic Latin, to minimize impact from bot search that
    // uses random characters. We don't have localized docs so there's no point
    // in searching non-latin characters.
    const sanitizedQuery = query.replace(/[^\u0020-\u007f]/gi, '');

    const { client, configs } = this;

    const searchAllIndexes = args.searchAllIndexes || false;
    const configsToSearch = searchAllIndexes ? configs : [configs[0]];

    // Create a list of Algolia query objects from our configs
    const queries = configsToSearch.reduce<MultipleQueriesQuery[]>(
      (queries, config) => {
        const optionalFilters: OptionalFilters = [];

        if (config.pathBias && args.path) {
          optionalFilters.push(`pathSegments:${args.path}`);
        }

        if (
          config.platformBias &&
          args.platforms &&
          args.platforms.length > 0
        ) {
          optionalFilters.push(args.platforms.map(x => `platforms:${x}`));
        }

        if (config.legacyBias) {
          optionalFilters.push(`legacy:0`);
        }

        const newQueries = config.indexes.map(({ indexName }) => {
          const obj: MultipleQueriesQuery = {
            indexName,
            query: sanitizedQuery,
            params: {
              ...defaultQueryParams,
              ...(optionalFilters.length && { optionalFilters }),
            },
          };
          return obj;
        });
        return [...queries, ...newQueries];
      },
      []
    );

    // Get the search results
    const { results: algoliaResults } = await client.search<SearchHit>(queries);

    // Reduce and normalize the Algolia results
    const results = configsToSearch.map(config => {
      // If a site has more than one index, reduce them to one array.
      const hits = config.indexes.reduce<Hit[]>((hits, index) => {
        const algoliaResult = algoliaResults.find(
          result => result.index === index.indexName
        );

        // if no result return early
        if (!algoliaResult) {
          return [...hits];
        }

        // Normalize the results into a consistent format
        return [...hits, ...algoliaResult.hits.map(index.transformer)];
      }, []);

      return {
        site: config.site,
        name: config.name,
        hits,
      } as Result;
    });

    return results;
  }
}

export default SentryGlobalSearch;
