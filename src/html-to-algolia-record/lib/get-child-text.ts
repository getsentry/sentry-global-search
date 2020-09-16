import { Node } from './types';

/**
 * Recursively traverse an AST, flattening each node into its child text.
 */
const getChildText = (children: Node[]): string =>
  children
    .map(child =>
      child.type === 'element' ? getChildText(child.children) : child.text
    )
    .filter(Boolean)
    .join('');

export default getChildText;
