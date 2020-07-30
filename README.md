# Global search across Sentry websites

This repository contains an Algolia-powered library that can be used to search across all supported sources with a consistent, normalized output. Sources include:

- Docs
- Developer docs
- Help center
- Blog

## Add SentryGlobalSearch to your project

No idea how to make this work yet. Maybe a module, maybe not. I'm working on it.

## Usage

Initilize the search client with one or more site slugs. The order of the slugs determines the order of results.

```javascript
import SentryGlobalSearch from 'wherever-it-ends-up';

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
          "something": "Whatever makes sense, or nothing"
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

- `url` — Url to the match, including a deep link to the section it is in.

# Algolia record stategy

When sending content to Algolia, documents should be split into many records, as algolia has a fairly low character limit per record. In a prose document, in which we can assume a flat list of html tags, each top level tag should be a record. That is, each paragraph is a record, lists are flattened into single records, etc. Headings should not have their own records, as they are tracked as the section value of all other records and be used as the attribute for distinct search.

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
}
```
