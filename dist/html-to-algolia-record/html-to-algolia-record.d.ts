import { SearchHit } from '../sentry-global-search/lib/types';
import { Meta } from './lib/types';
/**
 * Create algolia record objects from HTML. Intended for use with the rendered
 * HTML generated from Markdown, which has a reliably flat structure.  See the
 * README for further details about the strategy this uses.
 *
 * @param html The HTML string
 * @param meta Additional content to be included in the record. At a minimum
 *             must include `title` and `url`
 */
declare const parseRecordsFromHTML: (html: string, meta: Meta, baseSelector?: string) => Promise<SearchHit[]>;
export default parseRecordsFromHTML;
