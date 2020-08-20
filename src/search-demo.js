import React from 'react';
import ReactDOM from 'react-dom';

import SentryGlobalSearch from './sentry-global-search';

const search = new SentryGlobalSearch([
  'docs',
  'develop',
  'help-center',
  'blog',
]);

class SearchDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      query: 'react',
      results: [],
    };

    this.setQuery = this.setQuery.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
  }

  componentDidMount() {
    this.searchQuery();
  }

  searchQuery() {
    search.query(this.state.query).then(results => {
      this.setState({ results });
    });
  }

  setQuery(query) {
    this.setState({ query }, this.searchQuery);
  }

  render() {
    return (
      <>
        <p>
          This searches across all supported Sentry sites. <br />
          <a href="https://github.com/getsentry/sentry-global-search">
            View on GitHub
          </a>{' '}
          | <a href="/parse/">View Parser demo</a>
        </p>

        <input
          type="text"
          value={this.state.query}
          onChange={({ target }) => this.setQuery(target.value)}
        />
        <div style={{ display: 'flex', margin: '1rem -1rem -1rem' }}>
          {this.state.results.map(result => {
            return (
              <div key={result.site} style={{ flex: 1, padding: '1rem' }}>
                <h2 style={{ fontSize: '1rem' }}>{result.name}</h2>
                {result.hits.map(hit => (
                  <li
                    key={hit.id}
                    style={{
                      listStyleType: 'none',
                      marginBottom: '16px',
                      fontSize: '.875rem',
                    }}
                  >
                    <strong>
                      <a href={hit.url}>
                        <span
                          dangerouslySetInnerHTML={{ __html: hit.title }}
                        ></span>
                      </a>
                    </strong>
                    <br />

                    <span dangerouslySetInnerHTML={{ __html: hit.text }} />
                  </li>
                ))}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<SearchDemo />, wrapper) : false;
