# Global search across Sentry websites

### Table of Contents

| [Sentry Global Search JavaScript Library](#sentry-global-search-javascript-library)                         | [Algolia](#algolia)                                                                                                                                                        |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Installation](#installation)<br>[Usage](#usage)<br>[Configuration](#configuration) <br>[Results](#results) | [Constructing Algolia Records](#constructing-algolia-records)<br>[Ranking and Sorting](#ranking-and-sorting)<br>[Index settings](#index-settings)<br>[Synonyms](#synonyms) |

## Sentry Global Search JavaScript Library

The Sentry Global Search JavaScript library provides an easy way to query across all Sentry static sites and get consistent, normalized results without needing to worry about Algolia configuration and the complexities of each index. Sources include

- [Docs](https://docs.sentry.io)
- [Developer docs](https://develop.sentry.dev)
- [Help center](https://help.sentry.io/)
- [Blog](https://blog.sentry.io)

### Installation

```
yarn add @sentry-internal/global-search
```

### Usage

Initialize the search client with one or more site slugs. The order of the slugs determines the order of results.

```javascript
import SentryGlobalSearch from '@sentry-internal/global-search';

// This will include all sites in the results
const search = new SentryGlobalSearch([
  'docs',
  'develop',
  'help-center',
  'blog',
]);

const results = await search.query('erlang');
```

### Configuration

By default, the SentryGlobalSearch constructor takes an array of slugs matching the supported sites. To provide more flexible options, you may provide an object instead.

```javascript
const search = new SentryGlobalSearch([
  {
    site: 'docs',
    pathBias: true,
  },
  'develop',
  'help-center',
  'blog',
]);
```

- `site`: Required String of a valid site slug.

- `pathBias`: Optional Boolean indicating whether to bias path match results if a path is provided to the query. Default: `false`.

- `platformBias`: Optional Boolean indicating whether to bias platform match results if a platform is provided to the query. Default: `true`.

- `legacyBias`: Optional Boolean indicating whether to bias legacy results. Default: `true`.

When more than one bias is configured, the following priority is used:

1. Same or child path
2. Same or parent platform
3. Everything else
4. Legacy docs

### Query Options

`query` takes an optional second Object argument which can be used to configure the results.

```javascript
const results = await search.query('configuration', {
  searchAllIndexes: true,
  platform: 'sentry.erlang',
});
```

- `path` — String of a path in the format of `/foo/bar/`. Results with a path matching or subornate will appear first.

- `platform` — String of a valid [SDK slug][sdk-slug-format]. Results matching this slug will appear first or after `path` results.

- `searchAllIndexes` — Boolean, defalt false. Searches all configured indexes if true. Otherwise, search only the first.

### Results

SentryGlobalSearch returns an Array of Site objects and normalizes the list of Hits so that components are straightforward to create. If a site is configured to include results from multiple indexes (for example, during a content migration), those hits will be combined in the final output as a single list of hits for that site.

```json
[
  {
    "site": "docs",
    "name": "Documentation",
    "hits": [
      {
        "id": "bbb19a43-5e51-5397-8ba0-9112999b5153",
        "site": "site-slug",
        "title": "Section within document",
        "text": "…snippet text is a paragraph within the document with <mark>content that matches</mark> the provided query…",
        "url": "https://result.url#section-within-document",
        "context": {
          "context1": "If present, this is the primary context information",
          "context2": "If present, this is secondary context information"
        }
      },
    ]
  }
]]
```

#### Site Object

The site object is what you'd expect.

- `site` — Slug for the site these results are associated with

- `name` — Human friendly name of the site these results are associated with.

- `hits` — Array of Hit objects representing search results.

#### Hit Object

A hit object contains search data from Algolia, normalized for use in Sentry search. Where indicated, text matching the given query is highlighted with unescaped `mark` tags. All values are strings.

- `id` — objectID from Algolia. Useful as a React `key`.

- `site` — Slug for the site this hit is from.

- `title` - (Highlighted) Title of the hit. Typically, this is the section heading this record is under.

- `context` — Object containing additional detail to contextualize the search result. Varies by site and by record.

  - `context1` — String representing primary context information.

  - `context2` — String representing secondary context information.

- `url` — Url to the match, including a deep link to the section it is in.

## Algolia

### Constructing Algolia Records

While not all indexes follow this guide, the preferred strategy for indexing records is thus: Rather than considering an entire document a record, each block level tag (excluding headings) is a record. That is, each paragraph is a record, lists are flattened into single records, etc.

Headings should not have their own records. They are searchable as the `section` value of other records and are used as the `distinct` value for deduplication.

Ideally, a record object should include the following keys:

#### Searchable Fields

- `section`: `String` — Text of the last heading seen. Initially set to the document title.
- `text`: `String` — Text content of the record.
- `keywords`: `[String]` — Specific word a record should be searchable for which may not exist in the section or text.

#### Context Fields

- `title`: `String` — Title of the document this record comes from.
- `url`: `String` — URL for the document
- `anchor`: `String` — `id` attribute matching `section` heading, for deep linking.

#### Ranking Fields

- `platforms`: `[String]` — SDK slugs for [platform sorting](#sorting-by-platform).
- `pathSegments`: `[String]` — Segemented of the document path for [path sorting](#sorting-by-path).
- `position`: `Number` — Position in the document. Starts at 0, increments for each record.
- `sectionRank`: `Number` — Rank of header. H1: 100, H2: 90, H3: 80.
- `legacy`: `Boolean` — Indicates whether this is a record within a legacy document.

### Ranking and Sorting

#### Ranking

Results are ranked using Algolia's built in algorithm. Ties are broken using the following prioritization: `section` > `keywords` > `text`.

#### Sorting by Path

In some cases, we may wish to float results of pages that are subbordinate to the current page higher than pages elsewhere in a site. That is, when on `/foo/` results for `/foo/bar/` should appear before results on `/bat/`.

To do this, each record includes a `pathSegments` array, containing all parent paths. For example, a record for `/foo/bar/` will look like:

```JavaScript
pathSegments: [
  '/foo/'
  '/foo/bar/'
]
```

When doing a search while on the page `/foo/`, we tell Algolia to put all records containing a `/foo/` path segment first in the list.

#### Sorting by Platform

In most cases, searches are done in the context of a specific platform. We float the results from a given platform to the top of the list by indexing a record’s applicable platforms and then using Algolias `optionalFilters` to request the appropriate platform results. Additionally, we want a platform’s family results to also be promoted, for example, we should show JavaScript results under React results if the priority is React.

Records include a `platforms` array which includes applicable [SDK slugs][sdk-slug-format]. The format is `entity.ecosystem[.flavor]`, and the platforms list includes slugs for the parents of a SDK in addition to the SDK itself. That is, a React record looks like:

```JavaScript
platforms: [
  'sentry',
  'sentry.javascript',
  'sentry.javascript.react',
]
```

Using this list, we can prioritize our results as such:

- Put all records matching `sentry.javascript.react` first.
- Show results which contain `sentry.javascript` next.
- Show everything else last.

By including the `entity` portion of the SDK slug, we also give ourselves the ability to filter 1st party SDKs higher than 3rd party SDKs.

#### Sorting By legacy

Legacy docs should be searchable, but they should appear last. Records include a `legacy` value which allows for sorting them last.

[sdk-slug-format]: https://develop.sentry.dev/sdk/event-payloads/types/#clientsdkinfo

#### Ranking by Position

We consider a match at the top of the document more important than a match at the bottom of a document.

#### Ranking by Section Rank

We consider a match inside an H1 more important than a match inside an H3.

### Index Settings

If an index follows the record structure presented above, it should also use the preferred [Algolia index settings](src/sentry-algolia-index-settings.js).

### Synonyms

Synonyms can be configured in the [Algolia Synonym Config](src/algolia-synonyms.yml). This is used to tell Algolia that "C#" and "csharp" are the same, or that a search for "Cocoa" should show results for both "Swift" and "Objective-C". We also use it to catch common misspellings, so that a search for "reach" will also include "React" results.
