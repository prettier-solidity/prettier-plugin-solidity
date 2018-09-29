// source: https://github.com/prettier/prettier/blob/ee2839bacbf6a52d004fa2f0373b732f6f191ccc/tests_config/run_spec.js
'use strict';

const fs = require('fs');
const path = require('path');

const AST_COMPARE = process.env['AST_COMPARE'];

const prettier = require('prettier');

function run_spec(dirname, options) {
  fs.readdirSync(dirname).forEach(filename => {
    const filepath = dirname + '/' + filename;
    if (
      path.extname(filename) !== '.snap' &&
      fs.lstatSync(filepath).isFile() &&
      filename[0] !== '.' &&
      filename !== 'jsfmt.spec.js'
    ) {
      let rangeStart = 0;
      let rangeEnd = Infinity;
      let cursorOffset;
      const source = read(filepath)
        .replace(/\r\n/g, '\n')
        .replace('<<<PRETTIER_RANGE_START>>>', (match, offset) => {
          rangeStart = offset;
          return '';
        })
        .replace('<<<PRETTIER_RANGE_END>>>', (match, offset) => {
          rangeEnd = offset;
          return '';
        });

      const input = source.replace('<|>', (match, offset) => {
        cursorOffset = offset;
        return '';
      });

      const mergedOptions = Object.assign(mergeDefaultOptions(options || {}), {
        filepath,
        rangeStart,
        rangeEnd,
        cursorOffset
      });
      const output = prettyprint(input, mergedOptions);
      test(filename, () => {
        expect(
          raw(source + '~'.repeat(mergedOptions.printWidth) + '\n' + output)
        ).toMatchSnapshot();
      });

      if (AST_COMPARE) {
        test(`${filepath} parse`, () => {
          const compareOptions = Object.assign({}, mergedOptions);
          delete compareOptions.cursorOffset;
          const astMassaged = parse(input, compareOptions);
          let ppastMassaged = undefined;

          expect(() => {
            ppastMassaged = parse(
              prettyprint(input, compareOptions),
              compareOptions
            );
          }).not.toThrow();

          expect(ppastMassaged).toBeDefined();
          if (!astMassaged.errors || astMassaged.errors.length === 0) {
            expect(astMassaged).toEqual(ppastMassaged);
          }
        });
      }
    }
  });
}

global.run_spec = run_spec;

function parse(string, opts) {
  return prettier.__debug.parse(string, opts, /* massage */ true).ast;
}

function prettyprint(src, options) {
  const result = prettier.formatWithCursor(src, options);
  if (options.cursorOffset >= 0) {
    result.formatted =
      result.formatted.slice(0, result.cursorOffset) +
      '<|>' +
      result.formatted.slice(result.cursorOffset);
  }
  return result.formatted;
}

function read(filename) {
  return fs.readFileSync(filename, 'utf8');
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

function mergeDefaultOptions(parserConfig) {
  return Object.assign(
    {
      plugins: [path.dirname(__dirname)],
      printWidth: 80
    },
    parserConfig
  );
}
