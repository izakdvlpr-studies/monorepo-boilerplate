const chalk = require('chalk');

const { clientPackages, modulePackages } = require('./config');

const exec = require('./exec');

const { makeScope } = require('./scope');

const buildedPackages = new Set();

const [, , firstFlag] = process.argv;

function setBuildedPackages(packages) {
  for (const package of packages) buildedPackages.add(package);
}

function makeStringPackages(packages) {
  return packages.map(package => `"${package}"`).join(', ');
}

async function buildPackages(packages, parallel = true) {
  const packagesToBuild = packages.filter(
    package => !buildedPackages.has(package),
  );

  const packagesWithScope = packagesToBuild.map(makeScope);
  const packagesWithScopeJoined = packagesWithScope.join(' ');

  if (packagesWithScope.length) {
    console.log(
      chalk.yellow(`Building ${makeStringPackages(packagesToBuild)}...`),
    );

    await exec('clean', { command: packagesWithScopeJoined });

    if (parallel) {
      await exec('build', { command: packagesWithScopeJoined });
    } else {
      for await (const package of packagesWithScope) {
        await exec('build', { command: package });
      }
    }

    setBuildedPackages(packagesToBuild);
  }

  return packagesToBuild;
}

async function build() {
  await buildPackages(modulePackages);

  if (firstFlag === '--all') {
    await buildPackages(clientPackages);
  }

  console.log(
    chalk.green(
      `Success! ${makeStringPackages(
        Array.from(buildedPackages.values()),
      )} were compiled.'`,
    ),
  );
}

build();
