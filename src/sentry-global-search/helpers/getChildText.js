// Recursively traverse an AST, flattening each node into its child text.
//
//  children - (Array) of child nodes
//
// Returns a String
const getChildText = children => {
  const strings = children.map(child => {
    const result = child.children ? getChildText(child.children) : child.text;
    return result;
  });
  return strings.filter(Boolean).join('');
};

module.exports = getChildText;
