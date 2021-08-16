/**
 * Recursively traverse an AST, flattening each node into its child text.
 */
const getChildText = (element): string => {
  return element.children
    .map(child =>
      child.type === 'tag' ? getChildText(child) : child.data.trim()
    )
    .filter(Boolean)
    .join(' ');
};

export default getChildText;
