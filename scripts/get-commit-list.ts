import { execSync } from 'child_process';

function run(): void {
  const lastTag = execSync('git describe --tags --abbrev=0').toString().trim();

  // Get commits since the last tag
  const commits = execSync(`git log ${lastTag}..HEAD --format="- %s"`)
    .toString()
    .split('\n');

  const newCommits = commits.filter(commit => {
    // Filter out merge commits
    if (/Merge pull request/.test(commit)) {
      return false;
    }
    // Filter release branch merged
    if (/Merge branch/.test(commit)) {
      return false;
    }
    // Filter release commit itself
    if (/release:/.test(commit)) {
      return false;
    }

    return true;
  });

  newCommits.sort((a, b) => a.localeCompare(b));

  const issueUrl = 'https://github.com/getsentry/sentry-global-search/pull/';
  const newCommitsWithLink = newCommits.map(commit =>
    commit.replace(/#(\d+)/, `[#$1](${issueUrl}$1)`)
  );

  // eslint-disable-next-line no-console
  console.log(newCommitsWithLink.join('\n'));
}

run();
