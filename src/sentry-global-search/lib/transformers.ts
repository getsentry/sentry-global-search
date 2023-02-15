import prettyPath from './pretty-path';
import { Transformer, Hit } from './types';

export const transformDocsGatsbyHit: Transformer = (hit, results) => {
  const obj: Hit = {
    id: hit.objectID,
    site: 'docs',
    url: `https://docs.sentry.io${hit.url}`,
    index: results.index ?? "",
    context: {
      context1: prettyPath(hit.url),
    },
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  if(results.queryID) obj.queryID = results.queryID
  return obj;
};

export const transformDevelopHit: Transformer = (hit, results) => {
  const obj: Hit = {
    id: hit.objectID,
    site: 'develop',
    url: `https://develop.sentry.dev${hit.url}`,
    index: results.index ?? "",
    context: {
      context1: prettyPath(hit.url),
    },
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  if(results.queryID) obj.queryID = results.queryID
  return obj;
};

export const transformHelpCenterHit: Transformer = (hit, results) => {
  const obj: Hit = {
    id: hit.objectID,
    site: 'blog',
    context: {
      ...hit.context
    },
    url: `https://help.sentry.io${hit.url}${
      hit.anchor ? `#${hit.anchor}` : ''
    }`,
    index: results.index ?? "",
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  if(results.queryID) obj.queryID = results.queryID
  return obj;
};

export const transformBlogHit: Transformer = (hit, results) => {
  const obj: Hit = {
    id: hit.objectID,
    site: 'blog',
    context: {
      context1: hit.title,
    },
    url: `https://blog.sentry.io${hit.url}${
      hit.anchor ? `#${hit.anchor}` : ''
    }`,
    index: results.index ?? "",
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  if(results.queryID) obj.queryID = results.queryID
  return obj;
};
