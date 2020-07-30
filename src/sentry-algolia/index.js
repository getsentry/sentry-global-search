import algoliasearch from "algoliasearch/lite"
import { sites, defaultQueryParams } from "./config"

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APPLICATION_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const errorType = `SentryAlgoliaError`

class SentryAlgolia {
  constructor(configs = []) {
    // Complain if no configuration has been provided
    if (configs.length === 0) {
      const slugs = sites.map(x => x.site).join(", ")
      throw new Error(
        `${errorType}: SentryAlgolia must be initialized with an array of supported site slugs.`
      )
    }

    // Validate configuration
    this.configs = configs.map(x => {
      const userConfig =
        typeof x === "string"
          ? {
              site: x,
            }
          : x
      const defaults = sites.find(x => x.site === userConfig.site)

      if (!!defaults) return { ...defaults, ...userConfig }

      throw new Error(
        `${errorType}: unknow site "${userConfig.site}" in config.include`
      )
    })

    this.query = this.query.bind(this)
  }

  async query(query = "") {
    // Create a list of Algolia query objects from our configs
    const queries = this.configs.reduce((queries, site) => {
      const newQueries = site.indexes.map(({ indexName }) => {
        return {
          indexName,
          query,
          params: {
            ...defaultQueryParams,
          },
        }
      })
      return [...queries, ...newQueries]
    }, [])

    // Get the search results
    const { results: algoliaResults } = await client.multipleQueries(queries)

    // Reduce and normalize the Algolia results
    const results = this.configs.map(config => {
      // If a site has more than one index, reduce them to one array.
      const hits = config.indexes.reduce((hits, index) => {
        const algoliaResult = algoliaResults.find(
          result => result.index === index.indexName
        )

        // Normalize the results into a consistent format
        return [...hits, ...algoliaResult.hits.map(index.transformer)]
      }, [])

      return {
        site: config.site,
        name: config.name,
        hits,
      }
    })

    return results
  }
}

export default SentryAlgolia
