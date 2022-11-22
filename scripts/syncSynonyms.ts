import algoliasearch from 'algoliasearch';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

// Algolia treats synonyms like records, so they cannot be sent as settings
// when an index is sent, at least via the Gatsby plugin we use. This script
// syncs our synonym config with all the indexes we have indicated should use
// these synonym settings.
//
// See src/algolia-synonyms.yml for the actual synonym config

type Config = {
  synonym: string[][];
  oneWaySynonym: { [k: string]: string[] };
  altCorrection1: { [k: string]: string[] };
};

const SYNCED_INDEXES = [
  'sentry-docs',
  'develop-docs',
  'sentry-help',
  'sentry-blog-posts',
] as const;

if (!process.env.ALGOLIA_ADMIN_KEY) {
  throw new Error('ALGOLIA_ADMIN_KEY is required to be set');
}

const client = algoliasearch('OOK48W9UCL', process.env.ALGOLIA_ADMIN_KEY);

const yamlFile = path.join(__dirname, '..', 'config/algolia-synonyms.yml');
const config = yaml.safeLoad(fs.readFileSync(yamlFile, 'utf8')) as Config;

const hash = (input: string) => {
  return createHash('sha1').update(input).digest('hex');
};

let payload = [
  ...config.synonym.map(synonyms => {
    return {
      objectID: hash(`synonym:${synonyms.join(':')}`),
      type: 'synonym' as const,
      synonyms,
    };
  }),

  ...Object.keys(config.oneWaySynonym).map(k => {
    const synonyms = config.oneWaySynonym[k];
    return {
      objectID: hash(`oneWaySynonym:${k}:${synonyms.join(':')}`),
      type: 'oneWaySynonym' as const,
      input: k,
      synonyms,
    };
  }),

  ...Object.keys(config.altCorrection1).map(k => {
    const corrections = config.altCorrection1[k];
    return {
      objectID: hash(`altCorrection1:${k}:${corrections.join(':')}`),
      type: 'altCorrection1' as const,
      word: k,
      corrections,
    };
  }),
];

const replaceAllSynonyms = (slug: string) => {
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
