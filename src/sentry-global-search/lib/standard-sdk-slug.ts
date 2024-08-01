// SDK slugs must follow the format entity.ecosystem[.flavor]¹. This provides a
// handy way to map non-standard formatted slugs into the ones expected by the
// platform result ranker. Values are matched in a case-insensitive manner.
//
// Left side is the slug matched, right side is the preferred slug.
//
// ¹ https://develop.sentry.dev/sdk/event-payloads/types/#clientsdkinfo
// ² https://docs.google.com/spreadsheets/d/15zpY36yMaLcsZoYDzoiHmTAkK-xPSRYuw25TZ6vsii4/

const names = {
  'sentry.rust': 'Rust',
  'sentry.ruby': 'Ruby',
  'sentry.react-native': 'React Native',
  'sentry.python': 'Python',
  'sentry.php': 'PHP',
  'sentry.perl': 'Perl',
  'sentry.native': 'Native',
  'sentry.javascript': 'JavaScript',
  'sentry.java': 'Java',
  'sentry.go': 'Go',
  'sentry.flutter': 'Flutter',
  'sentry.elixir': 'Elixir',
  'sentry.dotnet': '.Net',
  'sentry.cocoa': 'Cocoa',
  'sentry.android': 'Android',
} as const;

const synonyms = {
  rust: 'sentry.rust',
  ruby: 'sentry.ruby',
  'react-native': 'sentry.react-native',
  python: 'sentry.python',
  php: 'sentry.php',
  perl: 'sentry.perl',
  native: 'sentry.native',
  javascript: 'sentry.javascript',
  java: 'sentry.java',
  go: 'sentry.go',
  flutter: 'sentry.flutter',
  elixir: 'sentry.elixir',
  dotnet: 'sentry.dotnet',
  cocoa: 'sentry.cocoa',
  android: 'sentry.android',
} as const;

export const standardSDKSlug = (slug: string) => {
  if (typeof slug !== 'string') return;
  const validSlugs: Array<String> = Object.values(synonyms);
  const isValidSlug: Boolean = validSlugs.indexOf(slug) >= 0;

  const standardSlug: string = isValidSlug
    ? slug
    : synonyms[slug.toLowerCase()] ?? slug;
  const name: string =
    names[standardSlug] ??
    standardSlug.charAt(0).toUpperCase() + standardSlug.slice(1);

  return {
    slug: standardSlug,
    name,
  };
};
