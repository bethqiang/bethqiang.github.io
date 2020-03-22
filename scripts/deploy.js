const ghpages = require('gh-pages'); // eslint-disable-line import/no-extraneous-dependencies

ghpages.publish(
  'public', {
    branch: 'master',
    repo: 'https://github.com/bethqiang/bethqiang.github.io',
  },
  () => console.log('Deployed'), // eslint-disable-line no-console
);
