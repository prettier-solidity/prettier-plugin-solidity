const { version } = require('prettier');
const semver = require('semver');

const prettierVersionSatisfies = (range) => semver.satisfies(version, range);

module.exports = prettierVersionSatisfies;
