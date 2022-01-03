import React, { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';

import { htmlToAlgoliaRecord, SearchHit } from '..';
import sampleDocument from '../html-to-algolia-record/lib/sample-document';

type Rendered = {
  html: string;
  records: SearchHit[];
};

const ParseDemo = () => {
  const [rendered, setRendered] = useState<Rendered>({ html: '', records: [] });

  useEffect(() => {
    (async () => {
      const generateRecord = async () => {
        const { html, title, url } = await sampleDocument();

        const document = `<p>This is outside of the main parser area.</p><main>${html}</main>`;

        const records = await htmlToAlgoliaRecord(
          document,
          { title, url },
          'main'
        );

        setRendered({
          html: document,
          records,
        });
      };

      generateRecord();
    })();
  }, [htmlToAlgoliaRecord]);

  return (
    <>
      <h1>Parse HTML to Algolia records</h1>
      <p>
        This parses html documents and generates Algolia records from them{' '}
        <br />
        <a href="https://github.com/getsentry/sentry-global-search">
          View on GitHub
        </a>{' '}
        | <a href="/">View Search demo</a>
      </p>
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
