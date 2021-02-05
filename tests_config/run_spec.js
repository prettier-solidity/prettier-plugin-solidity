// source: https://github.com/prettier/prettier/blob/ee2839bacbf6a52d004fa2f0373b732f6f191ccc/tests_config/run_spec.js
const fs = require('fs');
const path = require('path');
const {
  read,
  mergeDefaultOptions,
  prettyprint,
  raw,
  parse
} = require('./helpers');

const { AST_COMPARE } = process.env;

function runSpec(dirname, options) {
  fs.readdirSync(dirname).forEach((filename) => {
    const filepath = `${dirname}/${filename}`;
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
          raw(`${source + '~'.repeat(mergedOptions.printWidth)}\n${output}`)
        ).toMatchSnapshot();
      });

      if (AST_COMPARE) {
        test(`${filepath} parse`, () => {
          const compareOptions = { ...mergedOptions };
          delete compareOptions.cursorOffset;
          const astMassaged = parse(input, compareOptions);
          let ppastMassaged;

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

global.run_spec = runSpec;
