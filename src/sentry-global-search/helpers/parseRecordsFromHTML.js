const crypto = require('crypto');
const INDEXABLE_ELEMENTS = ['h1', 'h2', 'h3', 'p', 'li'];

const { Parser } = require('htmlparser2');

// Convert an object into a md5 string
//
//  input - (Object)
//
// Returns a String
const hashObject = input => {
  const string = JSON.stringify(input);
  return crypto.createHash('md5').update(string).digest('hex');
};

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

const parseRecordsFromHTML = (html, meta) => {
  const { title, url } = meta;
  const records = [];

  // This object is merged into each record and is mutated to track headings
  //and relevance
  const initialValues = {
    // id of the last heading seen
    anchor: '',
    // title of the page
    section: title,
    // h1 = 100, h2 = 90, h3 = 80
    // Relevance decreases as nesting increases
    sectionRank: 100,
    // Incremented for each record. Relevance decreases as position increases
    position: 0,
  };

  const ast = htmlToAST(html);
  ast.reduce((acc, el) => {
    // Ignore text
    if (el.type !== 'element') return acc;
    // We only want to index certain things
    if (!INDEXABLE_ELEMENTS.includes(el.name)) return acc;

    const text = getChildText(el.children).trim();

    // Update the context when we get a heading.
    if (/h[1-3]/.test(el.name)) {
      const level = parseInt(el.name[1], 10);
      acc.anchor = el.attribs.id;
      acc.section = text;
      acc.sectionRank = 100 * (1 - 0.1 * (level - 1));
      // We don't want to create records for titles, we just want the data, so /// we'll return here.
      return acc;
    }

    // Keep track of where in the doc this is. Lower stuff is less important
    acc.position++;

    const record = { text, ...meta, ...acc };
    records.push({ objectID: hashObject(record), ...record });

    return acc;
  }, initialValues);

  return records;
};

export default parseRecordsFromHTML;
