import remark from 'remark';
import html from 'remark-html';
export const sampleDocument = async () => {
  const url = 'https://example.com';
  const title = 'Getting started';
  const markdown = `
# ${title}

For an overview of what Sentry does, take a look at the Sentry workflow.

Sentry is designed to be both simple to get off the ground and powerful to grow into. If you have never used Sentry before, this tutorial helps you get started.

Getting started with Sentry is a three step process:

1. Sign up for an account
    1. This will
    1. Test children
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

  const promise = new Promise((resolve, reject) => {
    remark()
      .use(html)
      .process(markdown, (err, file) => {
        if (err) reject(err);
        const html = String(file);
        resolve({ html, title, url });
      });
  });

  return promise;
};

export default sampleDocument;
