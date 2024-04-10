import { SearchOptions } from '@algolia/client-search';

import { Config } from './types';
import * as Transformers from './transformers';

const config = (
  settings: Omit<Config, 'pathBias' | 'platformBias' | 'legacyBias'>
) => {
  return {
    pathBias: false,
    platformBias: true,
    legacyBias: true,
    ...settings,
  };
};

export const defaultQueryParams: Partial<SearchOptions> = {
  snippetEllipsisText: '…',
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
};

export const sites = [
  config({
    site: 'docs',
    name: 'Documentation',
    indexes: [
      {
        indexName: 'sentry-docs-v2',
        transformer: Transformers.transformDocsGatsbyHit,
      },
    ],
  }),
  config({
    site: 'develop',
    name: 'Developer Documentation',
    indexes: [
      {
        indexName: 'develop-docs',
        transformer: Transformers.transformDevelopHit,
      },
    ],
  }),
  config({
    site: 'help-center',
    name: 'Help Center',
    indexes: [
      {
        indexName: 'sentry-help',
        transformer: Transformers.transformHelpCenterHit,
      },
    ],
  }),
  config({
    site: 'zendesk_sentry_articles',
    name: 'Help Center',
    indexes: [
      {
        indexName: 'zendesk_sentry_articles',
        transformer: Transformers.transformZendeskArticlesHit,
      },
    ],
  }),
  config({
    site: 'blog',
    name: 'Blog Posts',
    indexes: [
      {
        indexName: 'sentry-blog-posts',
        transformer: Transformers.transformBlogHit,
      },
    ],
  }),
];
