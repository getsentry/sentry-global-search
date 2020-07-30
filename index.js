const SentryGlobalSearch = require('./src/sentry-global-search');
const algoliaSettings = require('./src/sentry-global-search/helpers/algolia-settings');
const parseRecordsFromHTML = require('./src/sentry-global-search/helpers/parseRecordsFromHTML');

module.exports = {
  SentryGlobalSearch,
  algoliaSettings,
  parseRecordsFromHTML,
};
