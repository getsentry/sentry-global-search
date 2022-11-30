/**
 * Recursively traverse an AST, flattening each node into its child text.
 */
export const getChildText = (element): string => {
  return element.children
    .reduce((str, child) => {
      let newStr: string | undefined;
      if (child.type === 'text') {
        newStr = child.data;
      } else if (child.type === 'tag') {
        newStr = getChildText(child);
      }

      newStr = newStr?.trim();

      if (newStr) {
        str += str ? ` ${newStr}` : newStr;
      }

      return str;
    }, '')
    .trim();
};
