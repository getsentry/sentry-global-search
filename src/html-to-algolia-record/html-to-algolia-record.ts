import { SearchHit } from '../sentry-global-search/lib/types';
import hashObject from './lib/hash-object';
import getChildText from './lib/get-child-text';
import htmlToAST from './lib/html-to-ast';
import { Meta, Element } from './lib/types';

const INCLUDE = ['h1', 'h2', 'h3', 'p', 'li', '[data-index]'];
const EXCLUDE = ['[data-noindex]'];

const testSelector = (selector: string, node: Element): boolean => {
  selector = selector.trim();
  const attributeSelector = /\[(.+)\]/.exec(selector);
  if (attributeSelector) {
    const attribute: string = attributeSelector[1];
    const value = node.attribs[attribute];
    if (value !== undefined) return true;
  }
  return node.name === selector ? true : false;
};

const canBeIndexed = (node: Element): boolean => {
  let match = false;
  // See if any of the include selectors match. If so, this is a match
  match = !!INCLUDE.find(x => testSelector(x, node));

  // Unless the node matches any of the exclude selectors
  if (!!EXCLUDE.find(x => testSelector(x, node))) {
    match = false;
  }

  return match;
};

/**
 * Create algolia record objects from HTML. Intended for use with the rendered
 * HTML generated from Markdown, which has a reliably flat structure.  See the
 * README for further details about the strategy this uses.
 *
 * @param html The HTML string
 * @param meta Additional content to be included in the record. At a minimum
 *             must include `title` and `url`
 */
const parseRecordsFromHTML = (html: string, meta: Meta) => {
  const { title } = meta;
  const records: SearchHit[] = [];

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
    // We only want to index certain things
    if (el.type !== 'element') {
      return acc;
    }

    if (!canBeIndexed(el)) return acc;

    const text = getChildText(el.children).trim();

    // Update the context when we get a heading.
    if (/h[1-3]/.test(el.name)) {
      const level = parseInt(el.name[1], 10);
      acc.anchor = el.attribs.id;
      acc.section = text;
      acc.sectionRank = 100 * (1 - 0.1 * (level - 1));

      // We don't want to create records for titles, we just want the data, so
      // we'll return here.
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
