const algoliasearch = require('algoliasearch');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

//
// Algolia treats synonyms like records, so they cannot be sent as settings
// when an index is sent, at least via the Gatsby plugin we use. This script
// syncs our synonym config with all the indexes we have indicated should use
// these synonym settings.
//
// See src/algolia-synonyms.yml for the actual synonym config
//

const SYNCED_INDEXES = [
  'sentry-docs',
  'develop-docs',
  'zendesk-sentry-articles',
  'sentry-blog-post',
];

const client = algoliasearch('OOK48W9UCL', process.env.ALGOLIA_ADMIN_KEY);

if (!process.env.ALGOLIA_ADMIN_KEY) {
  throw new Error('ALGOLIA_ADMIN_KEY is required');
}

const yamlFile = path.join(process.cwd(), 'src/algolia-synonyms.yml');
const config = yaml.safeLoad(fs.readFileSync(yamlFile, 'utf8'));

const hash = input => {
  return crypto.createHash('sha1').update(input).digest('hex');
};

let payload = [
  ...config.synonym.map(synonyms => {
    return {
      objectID: hash(`synonym:${synonyms.join(':')}`),
      type: 'synonym',
      synonyms,
    };
  }),

  ...Object.keys(config.oneWaySynonym).map(k => {
    const synonyms = config.oneWaySynonym[k];
    return {
      objectID: hash(`oneWaySynonym:${k}:${synonyms.join(':')}`),
      type: 'oneWaySynonym',
      input: k,
      synonyms,
    };
  }),

  ...Object.keys(config.altCorrection1).map(k => {
    const corrections = config.altCorrection1[k];
    return {
      objectID: hash(`altCorrection1:${k}:${corrections.join(':')}`),
      type: 'altCorrection1',
      word: k,
      corrections,
    };
  }),
];

const replaceAllSynonyms = slug => {
  const index = client.initIndex(slug);
  console.log(`Syncing ${slug}`);
  return index.replaceAllSynonyms(payload);
};

Promise.all(SYNCED_INDEXES.map(replaceAllSynonyms))
  .then(() => {
    console.log('Synonym sync complete');
  })
  .catch(error => {
    console.error(error);
  });
