const {
  doc: {
    builders: { group, line, softline }
  }
} = require('prettier');

const printSeparatedList = require('./print-separated-list');
const { printString } = require('../prettier-comments/common/util');

const ImportDirective = {
  print: ({ node, options }) => {
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

      doc = [
        '{',
        printSeparatedList(symbolAliases, {
          firstSeparator: options.bracketSpacing ? line : softline
        }),
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
