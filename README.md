# Global search across Sentry websites

This repository contains an Algolia-powered library that can be used to search across all supported sources with a consistent, normalized output. Sources include:

- Docs
- Developer docs
- Help center
- Blog

## Add SentryGlobalSearch to your project

This isn’t a published module. Point it to the repo instead. It’s recommended to fix it to [the latest tag](https://github.com/getsentry/sentry-global-search/releases/latest).

```
yarn add getsentry/sentry-global-search
```

## Usage

Initilize the search client with one or more site slugs. The order of the slugs determines the order of results.

```javascript
import SentryGlobalSearch from 'sentry-global-search';

const search = new SentryGlobalSearch([
  'docs',
  'develop',
  'help-center',
  'blog',
]);
const results = await search.query('erlang');
```

## Results

SentryGlobalSearch returns an Array of Site objects and normalizes the list of Hits so that components are straightforward to create. If a site is configured to include multiple indexes, those hits will be combined in the final output.

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

### Site object

The site object is what you'd expect.

- `site` — Slug for the site these results are associated with

- `name` — Human friendly name of the site these results are associated with.

- `hits` — Array of Hit objects representing search results.

### Hit Object

A hit object contains search data from Algolia, normalized for use in Sentry search. Where indicated, text matching the given query is highlighted with unescaped `mark` tags. All values are strings.

- `id` — objectID from Algolia. Useful as a React `key`.

- `site` — Slug for the site this hit is from.

- `title` - (Highlighted) Title of the hit. Typically, this is the section heading this record is under.

- `context` — Object containing additional detail to contextualize the search result. Varies by site and by record.

  - `context1` — String representing primary context information.

  - `context2` — String representing secondary context information.

- `url` — Url to the match, including a deep link to the section it is in.

# Algolia record stategy

When sending content to Algolia, documents should be split into many records, as Algolia has a fairly low character limit per record. In a prose document, in which we can assume a flat list of html tags, each top level tag should be a record. That is, each paragraph is a record, lists are flattened into single records, etc. Headings should not have their own records, as they are tracked as the section value of all other records and be used as the attribute for distinct search.

A record object should look like this:

```
{

  /* Searchable */
  text         // Text content of the record
  section      // Last heading seen. Initially set to the document title

  /* Context */
  anchor       // `id` attribute of section heading for deep link
  url          // url to the page
               // … other site-specific context goes here

  /* For ranking */
  position     // Number indicating position in the page vs other records. Starts at 0
  sectionRank  // Number ranking hierarchy of parent section. H1:100, H2:90, H3: 80

  /* For sorting */
  platforms    // Array of sdk name slugs. See "Sorting by platform" for more info.
  pathSegments // Array containing segmented versions of the document path.
               // See "Sorting by path" for more info.
  legacy       // Boolean indicating whether a record is current or legacy
}
```

## Sorting by a platform

We frequently want to float results matching a specific platform to the top of the list. We do this by indexing a record's applicable platforms and then using Algolias `optionalFilters` to request the appropriate platform results. Additionally, we want a platform's family results to also be promoted, for example, we should show JavaScript results under React results if the priority is React.

Records include a `platforms` array which includes applicable [SDK slugs](https://develop.sentry.dev/sdk/event-payloads/types/#clientsdkinfo). The format is `entity.ecosystem[.flavor]`, and the platforms list includes slugs for the parents of a SDK in addition to the SDK itself. That is, a React record looks like:

```JavaScript
platforms: [
  'sentry',
  'sentry.javascript',
  'sentry.javascript.react',
]
```

Using this list, we can prioritize our results as such:

- Put all records matching `sentry.javascript.react` first.
- Show results which contain `sentry.javascript` but not `sentry.javascript.react`.
- Show everything else last.

By including the `entity` portion of the SDK slug, we also give ourselves the ability to filter 1st party SDKs higher than 3rd party SDKs.

## Sorting by path

In some cases, we may wish to float results of pages that are subbordinate to the current page higher than pages elsewhere in a site. That is, when on `/foo/` results for `/foo/bar/` should appear before results on `/bat/`.

To do this, each record includes a `pathSegments` array, containing all parent paths. For example, a record for `/foo/bar/` will look like:

```JavaScript
pathSegments: [
  '/foo/'
  '/foo/bar/'
]
```

When doing a search on `/foo/`, we tell algolia to put all records containing a `/foo/` path segment at the top.

## Sorting by legacy

Legacy docs should be searchable, but they should appear last. Records include a `legacy` value which allows for sorting them last.

## Priority

This library uses the following logic to sort:

1. Same or child path
2. Same or parent platform
3. Everything else
4. Legacy docs
