const { titleCase } = require('title-case');

// The left hand side is the text to match, right hand side the text to replace.
// Left hand side text is case insensitive.
const SPECIAL_CASES = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
};

const prettyPath = input => {
  const specialCases = Object.keys(SPECIAL_CASES).reduce(
    (a, k) => ({ ...a, [k.toLowerCase()]: SPECIAL_CASES[k] }),
    {}
  );

  const segments = input.split('/').filter(Boolean);
  const re = new RegExp(`(${Object.keys(specialCases).join('|')})`, 'gi');
  const recased = segments.map(x => {
    const titlecased = titleCase(decodeURIComponent(x).replace(/-/, ' '));
    const customCases = titlecased.split(re);
    const replaced = customCases.map(x => specialCases[x.toLowerCase()] || x);
    return replaced.join('');
  });

  return recased.join(' > ');
};
module.exports = prettyPath;
