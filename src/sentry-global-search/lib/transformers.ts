import prettyPath from './pretty-path';
import { Transformer, Hit } from './types';

export const transformDocsGatsbyHit: Transformer = hit => {
  const obj: Hit = {
    id: hit.objectID,
    site: 'docs',
    url: `https://docs.sentry.io${hit.url}`,
    context: {
      context1: prettyPath(hit.url),
    },
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};

export const transformDevelopHit: Transformer = hit => {
  const obj: Hit = {
    id: hit.objectID,
    site: 'develop',
    url: `https://develop.sentry.dev${hit.url}`,
    context: {
      context1: prettyPath(hit.url),
    },
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};

export const transformHelpCenterHit: Transformer = hit => {

  const obj: Hit = {
    id: hit.objectID,
    site: 'blog',
    context: {
      context1: `${hit.title}`,
    },
    url: `https://help.sentry.io${hit.url}${
      hit.anchor ? `#${hit.anchor}` : ''
    }`,
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};

export const transformBlogHit: Transformer = hit => {
  const obj: Hit = {
    id: hit.objectID,
    site: 'blog',
    context: {
      context1: hit.title,
    },
    url: `https://blog.sentry.io${hit.url}${
      hit.anchor ? `#${hit.anchor}` : ''
    }`,
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};
