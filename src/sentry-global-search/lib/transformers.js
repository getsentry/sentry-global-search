exports.transformDocsGatsbyHit = hit => {
  const obj = {
    id: hit.objectID,
    site: 'docs',
    url: `https://docs.sentry.io${hit.url}`,
  };

  if (hit._snippetResult) obj.text = hit._snippetResult.content.value;
  if (hit._highlightResult) obj.title = hit._highlightResult.title.value;
  return obj;
};

exports.transformDevelopHit = hit => {
  const obj = {
    id: hit.objectID,
    site: 'develop',
    url: `https://develop.sentry.dev${hit.fields.slug}`,
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.title.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.excerpt.value;
  return obj;
};

exports.transformHelpCenterHit = hit => {
  const obj = {
    id: hit.objectID,
    site: 'help-center',
    context: {
      breadcrumbs: hit.section.full_path,
    },
    url: `https://help.sentry.io/hc/en-us/articles/${hit.id}`,
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.title.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.body_safe.value;
  return obj;
};

exports.transformBlogHit = hit => {
  const obj = {
    id: hit.objectID,
    site: 'blog',
    context: {
      title: hit.title,
    },
    url: `https://blog.sentry.io${hit.url}${
      hit.anchor ? `#${hit.anchor}` : ''
    }`,
  };

  if (hit._highlightResult) obj.title = hit._highlightResult.section.value;
  if (hit._snippetResult) obj.text = hit._snippetResult.text.value;
  return obj;
};
