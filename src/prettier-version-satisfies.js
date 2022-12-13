const { version } = require('prettier');
const satisfies = require('semver/functions/satisfies');

const prettierVersionSatisfies = (range) => satisfies(version, range);

module.exports = prettierVersionSatisfies;
