const { readdirSync } = require('fs');
const { join } = require('path');

const { makeConcatNameFunction } = require('./scope');

const projectBaseUrl = join(__dirname, '..', '..');

// Lerna

const lernaBaseUrl = join(projectBaseUrl, 'node_modules', 'lerna', 'cli.js');
const lernaCommandBase = `node ${lernaBaseUrl} exec`;

// Packages

const clientPackages = readdirSync(join(projectBaseUrl, 'clients')).map(
  makeConcatNameFunction('clients'),
);

const modulePackages = readdirSync(join(projectBaseUrl, 'packages')).map(
  makeConcatNameFunction('packages'),
);

// Commands

const scripts = {
  build: 'tsc',
  clean: 'rimraf build typings',
};

module.exports = {
  lernaBaseUrl,
  lernaCommandBase,

  clientPackages,
  modulePackages,

  scripts,
};
