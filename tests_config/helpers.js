const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

function mergeDefaultOptions(parserConfig) {
  return {
    plugins: [path.dirname(__dirname)],
    printWidth: 80,
    ...parserConfig
  };
}

function prettyprint(src, options) {
  const result = prettier.formatWithCursor(src, options);
  if (options.cursorOffset >= 0) {
    result.formatted = `${result.formatted.slice(
      0,
      result.cursorOffset
    )}<|>${result.formatted.slice(result.cursorOffset)}`;
  }
  return result.formatted;
}

/**
 * Wraps a string in a marker object that is used by `./raw-serializer.js` to
 * directly print that string in a snapshot without escaping all double quotes.
 * Backticks will still be escaped.
 */
function raw(string) {
  if (typeof string !== 'string') {
    throw new Error('Raw snapshots have to be strings.');
  }
  return { [Symbol.for('raw')]: string };
}

function read(filename) {
  return fs.readFileSync(filename, 'utf8');
}

function parse(string, opts) {
  return prettier.__debug.parse(string, opts, /* massage */ true).ast;
}

module.exports = { mergeDefaultOptions, parse, prettyprint, raw, read };
