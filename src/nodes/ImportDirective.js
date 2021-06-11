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
    let doc = printString(node.path, options);

    if (node.unitAlias) {
      doc = [doc, ' as ', node.unitAlias];
    } else if (node.symbolAliases) {
      let firstSeparator;
      let separator;
      if (semver.satisfies(getCompiler(path), '<0.7.4')) {
        firstSeparator = options.bracketSpacing ? ' ' : '';
        separator = ', ';
      } else {
        firstSeparator = options.bracketSpacing ? line : softline;
        separator = [',', line];
      }

      doc = [
        '{',
        printSeparatedList(
          node.symbolAliases.map(([a, b]) => (b ? `${a} as ${b}` : a)),
          { firstSeparator, separator }
        ),
        '} from ',
        doc
      ];
    }
    return group(['import ', doc, ';']);
  }
};

module.exports = ImportDirective;
