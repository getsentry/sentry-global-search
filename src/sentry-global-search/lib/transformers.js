exports.transformDocsGatsbyHit = hit => {
  return {
    id: hit.objectID,
    site: 'docs',
    title: hit._highlightResult.title.value,
    text: hit._snippetResult.content.value,
    url: `https://docs.sentry.io${hit.url}`,
  };
};

exports.transformDevelopHit = hit => {
  return {
    id: hit.objectID,
    site: 'develop',
    title: hit._highlightResult.title.value,
    text: hit._snippetResult.excerpt.value,
    url: `https://develop.sentry.dev${hit.fields.slug}`,
  };
};

exports.transformHelpCenterHit = hit => {
  return {
    id: hit.objectID,
    site: 'help-center',
    title: hit._highlightResult.title.value,
    text: hit._snippetResult.body_safe.value,
    context: {
      breadcrumbs: hit.section.full_path,
    },
    url: `https://help.sentry.io/hc/en-us/articles/${hit.id}`,
  };
};

exports.transformBlogHit = hit => {
  return {
    id: hit.objectID,
    site: 'blog',
    title: hit._highlightResult.section.value,
    text: hit._snippetResult.text.value,
    context: {
      title: hit.title,
    },
    url: `https://blog.sentry.io${hit.url}${
      hit.anchor ? `#${hit.anchor}` : ''
    }`,
  };
};
