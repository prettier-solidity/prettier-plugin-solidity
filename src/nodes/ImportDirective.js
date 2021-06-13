const {
  doc: {
    builders: { group, line, softline }
  }
} = require('prettier');

const { getCompiler } = require('../common/util');
const printSeparatedList = require('./print-separated-list');
const { printString } = require('../prettier-comments/common/util');

const ImportDirective = {
  print: ({ node, path, options }) => {
    const importPath = printString(node.path, options);
    let doc;

    if (node.unitAlias) {
      // import "./Foo.sol" as Foo;
      doc = [importPath, ' as ', node.unitAlias];
    } else if (node.symbolAliases) {
      // import { Foo, Bar as Qux } from "./Foo.sol";
      const symbolAliases = node.symbolAliases.map(([a, b]) =>
        b ? `${a} as ${b}` : a
      );
      let firstSeparator;
      let separator;

      // if the compiler is below 0.7.4 we must not split the group since it
      // only recognizes ImportDirectives in a single line.
      if (semver.satisfies(getCompiler(path), '<0.7.4')) {
        firstSeparator = options.bracketSpacing ? ' ' : '';
        separator = ', ';
      } else {
        firstSeparator = options.bracketSpacing ? line : softline;
        separator = [',', line];
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
