const { Parser } = require('htmlparser2');

// Convert an HTML string to an AST
//
//  html - (String) of HTML
//
// Returns an Object
const htmlToAST = html => {
  // The accumulator
  const ast = [];
  // An array tracking nested elements.
  const ancestry = [];

  const parser = new Parser({
    // Open tags get added to the child list of the last item in the ancestry
    // then are pushed into the ancestry themselves.
    onopentag(name, attribs) {
      const element = { type: 'element', name, attribs, children: [] };
      const latest = ancestry[ancestry.length - 1];
      if (latest) latest.children.push(element);
      ancestry.push(element);
    },
    // Text nodes are added to their parent element
    ontext(text) {
      if (text.trim()) {
        const latest = ancestry[ancestry.length - 1];
        latest.children.push({ type: 'text', text });
      }
    },
    // When elements are closed, we remove them from the ancestry and put them
    // in the accumulator
    onclosetag(name) {
      ast.push(ancestry.pop());
    },
  });

  parser.write(html);
  parser.end();
  return ast;
};

module.exports = htmlToAST;
