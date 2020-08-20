import React, { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';

import remark from 'remark';
import html from 'remark-html';

import parseRecordsFromHTML from './sentry-global-search/helpers/parseRecordsFromHTML';

const title = 'Getting started';

const markdown = `
# ${title}

For an overview of what Sentry does, take a look at the Sentry workflow.

Sentry is designed to be both simple to get off the ground and powerful to grow into. If you have never used Sentry before, this tutorial helps you get started.

Getting started with Sentry is a three step process:

1. Sign up for an account
1. Install your SDK
1. Configure your SDK

## Install an SDK

Sentry captures data by using an SDK within your application’s runtime. These are platform specific and allow Sentry to have a deep understanding of how your application works.

Install our Python SDK using pip:

\`\`\`
$ pip install --upgrade sentry-sdk==0.16.2
\`\`\`

### Configure the SDK

After you completed setting up a project in Sentry, you’ll be given a value which we call a DSN, or Data Source Name. It looks a lot like a standard URL, but it’s actually just a representation of the configuration required by the Sentry SDKs. It consists of a few pieces, including the protocol, public key, the server address, and the project identifier.


`;

const ParseDemo = () => {
  const [rendered, setRendered] = useState('');

  useEffect(() => {
    remark()
      .use(html)
      .process(markdown, (err, file) => {
        const html = String(file);
        const records = parseRecordsFromHTML(html, {
          title,
          url: 'https://sentry.io/example',
        });

        setRendered({
          html,
          records,
        });
      });
  }, [parseRecordsFromHTML]);

  return (
    <>
      <h1>Parse HTML to Algolia records</h1>

      <div
        style={{
          display: 'flex',
          width: '100%',
          margin: '-1rem',
        }}
      >
        <div
          style={{
            flex: 1,
            flexBasis: 0,
            padding: '1rem',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: rendered.html }} />
        </div>
        <div
          style={{
            flex: 1,
            flexBasis: 0,
            padding: '1rem',
            fontSize: '.875rem',
            overflow: 'scroll',
            border: '1px solid #eee',
            borderRadius: '.25rem',
          }}
        >
          <pre
            style={{
              fontSize: '.875rem',
            }}
          >
            {JSON.stringify(rendered.records, null, 2)}
          </pre>
        </div>
      </div>
    </>
  );
};

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<ParseDemo />, wrapper) : false;
