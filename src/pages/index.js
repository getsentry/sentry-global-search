import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import SentryAlgolia from '../sentry-algolia';

const search = new SentryAlgolia(['blog']);

class IndexPage extends React.Component {
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
      console.log(results);
      this.setState({ results });
    });
  }

  setQuery(query) {
    this.setState({ query }, this.searchQuery);
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <input
          type="text"
          value={this.state.query}
          onChange={({ target }) => this.setQuery(target.value)}
        />

        {this.state.results.map(result => {
          return (
            <div key={result.site}>
              <h1>{result.name}</h1>
              {result.hits.map(hit => (
                <li key={hit.id}>
                  <strong>
                    <a
                      href={hit.url}
                      dangerouslySetInnerHTML={{ __html: hit.title }}
                    />
                  </strong>
                  <br />

                  <span dangerouslySetInnerHTML={{ __html: hit.text }} />
                  {hit.context && (
                    <>
                      <br />
                      <small>{hit.context}</small>
                    </>
                  )}
                </li>
              ))}
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default IndexPage;
