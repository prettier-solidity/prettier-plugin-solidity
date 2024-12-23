import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import { printString } from '../common/util.js';

const { group, line, softline } = doc.builders;

export const ImportDirective = {
  print: ({ node, options }) => {
    const importPath = printString(node.path, options);
    let document;

    if (node.unitAlias) {
      // First we look for '*' between the beginning of the import and the
      // beginning of the importPath
      document = options.originalText
        .slice(options.locStart(node), options.locStart(node.pathLiteral))
        .includes('*')
        ? // import * as Bar from "./Bar.sol";
          ['* as ', node.unitAlias, ' from ', importPath]
        : // import "./Foo.sol" as Foo;
          [importPath, ' as ', node.unitAlias];
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

      document = [
        '{',
        printSeparatedList(symbolAliases, { firstSeparator, separator }),
        '} from ',
        importPath
      ];
    } else {
      // import "./Foo.sol";
      document = importPath;
    }
    return group(['import ', document, ';']);
  }
};
