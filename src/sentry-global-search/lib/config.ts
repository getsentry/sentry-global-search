import { SearchOptions } from '@algolia/client-search';

import { Config } from './types';
import * as Transformers from './transformers';
import { indexNames } from '../../../config/index-names';

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
        indexName: indexNames.USER_DOCS,
        transformer: Transformers.transformDocsGatsbyHit,
      },
    ],
  }),
  config({
    site: 'develop',
    name: 'Developer Documentation',
    indexes: [
      {
        indexName: indexNames.DEVELOP_DOCS,
        transformer: Transformers.transformDevelopHit,
      },
    ],
  }),
  config({
    site: 'help-center',
    name: 'Help Center',
    indexes: [
      {
        indexName: indexNames.HELP_CENTER,
        transformer: Transformers.transformHelpCenterHit,
      },
    ],
  }),
  config({
    site: 'zendesk_sentry_articles',
    name: 'Help Center',
    indexes: [
      {
        indexName: indexNames.ZENDESK,
        transformer: Transformers.transformZendeskArticlesHit,
      },
    ],
  }),
  config({
    site: 'blog',
    name: 'Blog Posts',
    indexes: [
      {
        indexName: indexNames.BLOG,
        transformer: Transformers.transformBlogHit,
      },
    ],
  }),
];
