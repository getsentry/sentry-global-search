import { ObjectWithObjectID, SearchResponse } from '@algolia/client-search';

export type Site = 'docs' | 'develop' | 'help-center' | 'blog';

export type SearchHit = ObjectWithObjectID & {
  /**
   * URL of the result
   */
  url: string;
  /**
   * Title of the result
   */
  title: string;
  /**
   * ID of the result if available
   */
  id?: string;
  /**
   * Anchor ID of the result if available
   */
  anchor?: string;
  /**
   * String or path to the "result section"
   */
  section?: string | { full_path: string };
  /**
   * Object containing additional detail to contextualize the search result.
   * Varies by site and by record.
   */
  context?: {
    /**
     * String representing primary context information.
     */
    context1?: string;
    /**
     * String representing secondary context information.
     */
    context2?: string;
  };
  /**
   * Optional queryID returned when search is performed with clickAnalytics enabled
   */
  queryID?: string
  /**
   * Algolia specific highlight mapping.
   *
   * XXX(epurkhiser): Not sure why these aren't in the Algolia types
   */
  _highlightResult?: { [k: string]: { value: string } };
  _snippetResult?: { [k: string]: { value: string } };
};

export type Result = {
  site: Site;
  name: string;
  hits: Hit[];
};

export type Hit = {
  /**
   * objectID from Algolia. Useful as a React `key`.
   */
  id: string;
  /**
   * Slug for the site this hit is from.
   */
  site: Site;
  /**
   * Url to the match, including a deep link to the section it is in.
   */
  url: string;
  /**
   * (Highlighted) Title of the hit. Typically, this is the section heading
   * this record is under.
   */
  title?: string;
  /**
   * Optional result context
   */
  text?: string;
  /**
   * Object containing additional detail to contextualize the search result.
   * Varies by site and by record.
   */
  context: {
    /**
     * String representing primary context information.
     */
    context1?: string;
    /**
     * String representing secondary context information.
     */
    context2?: string;
  };
  /**
   * Optional queryID returned when search is performed with clickAnalytics enabled
   */
  queryID?: string
};

export type Config = {
  /**
   * Required String of a valid site slug.
   */
  site: Site;
  /**
   * Name of the searched site.
   */
  name?: string;
  /**
   * Optional Boolean indicating whether to bias path match results if a path
   * is provided to the query.
   *
   * Defaults to `false`.
   */
  pathBias?: boolean;
  /**
   * Optional Boolean indicating whether to bias platform match results if a
   * platform is provided to the query
   *
   * Defaults to `true`.
   */
  platformBias?: boolean;
  /**
   * Optional Boolean indicating whether to bias legacy results.
   *
   * Defaults to `true`.
   */
  legacyBias?: boolean;
  indexes: Index[];
};

export type Index = {
  /**
   * The algolia index name
   */
  indexName: string;
  /**
   * Enables clickAnalytics for this search which generates a queryID
   */
  clickAnalytics?: boolean;
  /**
   * Function use to transform algolia results to a `Hit` objects
   */
  transformer: Transformer;
};

export type Transformer = (hit: SearchHit, results: SearchResponse) => Hit;
