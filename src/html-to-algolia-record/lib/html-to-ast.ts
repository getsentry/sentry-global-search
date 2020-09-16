import { Parser } from 'htmlparser2';
import { Element, Node } from './types';

/**
 * Convert an HTML string into an AST
 */
const htmlToAST = (html: string) => {
  // The accumulator
  const ast: Node[] = [];

  // An array tracking nested elements.
  const ancestry: Node[] = [];

  const parser = new Parser({
    // Open tags get added to the child list of the last item in the ancestry
    // then are pushed into the ancestry themselves.
    onopentag(name, attribs) {
      const element: Element = { type: 'element', name, attribs, children: [] };
      const latest = ancestry[ancestry.length - 1];
      if (latest) latest.children.push(element);
      ancestry.push(element);
    },
    // Text nodes are added to their parent element
    ontext(text) {
      if (text.trim()) {
        const latest = ancestry[ancestry.length - 1];
        latest.children.push({ type: 'text', text, children: [] });
      }
    },
    // When elements are closed, we remove them from the ancestry and put them
    // in the accumulator
    onclosetag(_name) {
      ast.push(ancestry.pop()!);
    },
  });

  parser.write(html);
  parser.end();
  return ast;
};

export default htmlToAST;
