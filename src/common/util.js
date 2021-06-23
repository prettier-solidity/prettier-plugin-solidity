const semver = require('semver');

/**
 * Strips all decorations from the semantic version of the compiler given in
 * the options object.
 *
 * e.g.
 * ```
 * getCompiler({compiler: undefined})                                  // null
 * getCompiler({compiler: '0.8.4'})                                    // '0.8.4'
 * getCompiler({compiler: 'v0.7.3+commit.9bfce1f6'})                   // '0.7.3'
 * getCompiler({compiler: 'v0.7.5-nightly.2020.11.9+commit.41f50365'}) // '0.7.5'
 * ```
 *
 * @param {Object} options          - The options object given to Prettier's API.
 * @param {string} options.compiler - The compiler version to be used for
 *                                    formatting.
 * @returns {string} A clean semantic version of the compiler.
 */
const getCompiler = ({ compiler }) => semver.valid(semver.coerce(compiler));

module.exports = { getCompiler };
