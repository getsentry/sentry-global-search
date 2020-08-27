import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Search from './sentry-global-search/components/search';

const styles = require('./sentry-global-search/scss/styles.scss');

const SearchDemo = () => {
  const [platforms, setPlatforms] = useState([
    {
      slug: 'sentry.javascript',
      selected: false,
    },
    { slug: 'sentry.python', selected: false },
  ]);

  const togglePlatform = (slug, checked) => {
    const newPlatforms = platforms.map(x => ({
      ...x,
      ...(slug === x.slug && { selected: checked }),
    }));
    setPlatforms(newPlatforms);
  };

  const selectedPlatformSlugs = platforms
    .filter(x => x.selected)
    .map(x => x.slug);

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
      </div>

      <Search
        {...{
          ...(selectedPlatformSlugs && { platforms: selectedPlatformSlugs }),
        }}
      />
    </div>
  );
};

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<SearchDemo />, wrapper) : false;
