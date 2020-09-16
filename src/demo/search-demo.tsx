import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import '../sentry-global-search/scss/styles.scss';
import Search from '../sentry-global-search/components/search';

const SearchDemo = () => {
  const [platforms, setPlatforms] = useState([
    {
      slug: 'sentry.javascript',
      selected: false,
    },
    { slug: 'sentry.python', selected: false },
  ]);

  const togglePlatform = (slug: string, checked: boolean) => {
    const newPlatforms = platforms.map(x => ({
      ...x,
      ...(slug === x.slug && { selected: checked }),
    }));
    setPlatforms(newPlatforms);
  };

  const selectedPlatformSlugs = platforms
    .filter(x => x.selected)
    .map(x => x.slug);

  const [path, setPath] = useState('');

  return (
    <div style={{ fontFamily: 'Helvetica' }}>
      <p>
        This searches across all supported Sentry sites. <br />
        <a href="https://github.com/getsentry/sentry-global-search">
          View on GitHub
        </a>{' '}
        | <a href="/parse/">View Parser demo</a>
      </p>

      <div style={{ marginBottom: 16 }}>
        {platforms.map(platform => (
          <label key={platform.slug} style={{ marginRight: 8 }}>
            <input
              type="checkbox"
              name={platform.slug}
              checked={platform.selected}
              onChange={event =>
                togglePlatform(platform.slug, event.target.checked)
              }
            />
            {platform.slug}
          </label>
        ))}
        <label>
          Simulated path:{' '}
          <input
            type="text"
            value={path}
            onChange={event => setPath(event.currentTarget.value)}
          />
        </label>
      </div>

      <Search
        {...{
          ...(selectedPlatformSlugs && { platforms: selectedPlatformSlugs }),
          ...(path && { path }),
        }}
      />
    </div>
  );
};

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<SearchDemo />, wrapper) : false;
