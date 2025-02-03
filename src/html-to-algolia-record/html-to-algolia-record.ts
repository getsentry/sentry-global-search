import { SearchHit } from '../sentry-global-search/lib/types';
import { hashObject } from './lib/hash-object';
import { getChildText } from './lib/get-child-text';
import { htmlToAST } from './lib/html-to-ast';
import { Meta } from './lib/types';
import { selectOne, selectAll, is } from 'css-select';

const INCLUDE = ['h1', 'h2', 'h3', 'p', 'li', '[data-index]', 'pre'];
const EXCLUDE = ['[data-noindex]'];

const isDescendant = (testNode, highNode) => {
  let test = testNode.parent;
  while (test) {
    if (highNode === test) return true;
    test = test.parent;
  }
  return false;
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
export const parseRecordsFromHTML = async (
  html: string,
  meta: Meta,
  baseSelector?: string
) => {
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

  // Fetch the initial AST
  let dom = await htmlToAST(html);

  if (baseSelector) dom = selectOne(baseSelector, dom);

  dom = selectAll(`${INCLUDE.join(',')}`, dom);
  dom = dom.filter(x =>
    is(x, `:not(${EXCLUDE.map(x => `${x}, ${x} *`).join(',')})`)
  );

  dom.reduce((acc, el) => {
    const isChildOfExistingElement = !!dom.find(x => isDescendant(el, x));

    if (isChildOfExistingElement) return acc;
    const text = getChildText(el).trim();

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

    const record = {
      text,
      ...meta,
      popularity: meta.popularity ?? Number.MAX_SAFE_INTEGER,
      ...acc,
    };
    records.push({ objectID: hashObject(record), ...record });

    return acc;
  }, initialValues);

  return records;
};
