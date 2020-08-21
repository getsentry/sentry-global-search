import React from 'react';
import ReactDOM from 'react-dom';

import Search from './sentry-global-search/components/search';

const styles = require('./sentry-global-search/scss/styles.scss');

const SearchDemo = () => (
  <div style={{ fontFamily: 'Helvetica' }}>
    <p>
      This searches across all supported Sentry sites. <br />
      <a href="https://github.com/getsentry/sentry-global-search">
        View on GitHub
      </a>{' '}
      | <a href="/parse/">View Parser demo</a>
    </p>

    <Search />
  </div>
);

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<SearchDemo />, wrapper) : false;
