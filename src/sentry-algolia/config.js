import * as Transformers from "./transformers"

export const defaultQueryParams = {
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>",
}

export const sites = [
  {
    site: "docs",
    name: "Documentation",
    indexes: [
      {
        indexName: "sentry-gatsby-docs",
        transformer: Transformers.transformDocsGatsbyHit,
      },
      {
        indexName: "sentry-docs",
        transformer: Transformers.transformDocsJekyllHit,
      },
    ],
  },
  {
    site: "develop",
    name: "Developer Documentation",
    indexes: [
      {
        indexName: "develop-docs",
        transformer: Transformers.transformDevelopHit,
      },
    ],
  },
  {
    site: "help-center",
    name: "Help Center",
    indexes: [
      {
        indexName: "zendesk_sentry_articles",
        transformer: Transformers.transformHelpCenterHit,
      },
    ],
  },
  {
    site: "blog",
    name: "Blog Posts",
    indexes: [
      {
        indexName: "sentry-blog-posts",
        transformer: Transformers.transformBlogHit,
      },
    ],
  },
]
