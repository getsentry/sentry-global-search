import sampleDocument from './lib/sample-document';
import htmlToAlgoliaRecord from './html-to-algolia-record';

describe('HTML to Algolia record', () => {
  let document = {};

  beforeAll(async () => {
    document = await sampleDocument();
  });

  test('meets expectations', () => {
    const { html, title, url } = document;
    const records = htmlToAlgoliaRecord(html, { title, url });
    expect(records).toMatchSnapshot();
  });
});
