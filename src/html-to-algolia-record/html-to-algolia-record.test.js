import sampleDocument from './lib/sample-document';
import { parseRecordsFromHTML } from './html-to-algolia-record';

describe('HTML to Algolia record', () => {
  let document = {};

  beforeAll(async () => {
    document = await sampleDocument();
  });

  test('meets expectations', async () => {
    const { html, title, url } = document;
    const records = await parseRecordsFromHTML(html, { title, url });
    expect(records).toMatchSnapshot();
  });
});
