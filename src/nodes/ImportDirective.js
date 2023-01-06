const {
  doc: {
    builders: { group, line, softline }
  }
} = require('prettier');
const coerce = require('semver/functions/coerce');
const satisfies = require('semver/functions/satisfies');

const { printSeparatedList } = require('../common/printer-helpers');
const { printString } = require('../common/util');

const ImportDirective = {
  print: ({ node, options }) => {
    const importPath = printString(node.path, options);
    let doc;

    if (node.unitAlias) {
      // import "./Foo.sol" as Foo;
      doc = [importPath, ' as ', node.unitAlias];
    } else if (node.symbolAliases) {
      // import { Foo, Bar as Qux } from "./Foo.sol";
      const compiler = coerce(options.compiler);
      const symbolAliases = node.symbolAliases.map(([a, b]) =>
        b ? `${a} as ${b}` : a
      );
      let firstSeparator;
      let separator;

      if (compiler && satisfies(compiler, '>=0.7.4')) {
        // if the compiler exists and is greater than or equal to 0.7.4 we will
        // split the ImportDirective.
        firstSeparator = options.bracketSpacing ? line : softline;
        separator = [',', line];
      } else {
        // if the compiler is not given or is lower than 0.7.4 we will not
        // split the ImportDirective.
        firstSeparator = options.bracketSpacing ? ' ' : '';
        separator = ', ';
      }

      doc = [
        '{',
        printSeparatedList(symbolAliases, { firstSeparator, separator }),
        '} from ',
        importPath
      ];
    } else {
      // import "./Foo.sol";
      doc = importPath;
    }
    return group(['import ', doc, ';']);
  }
};

module.exports = ImportDirective;
