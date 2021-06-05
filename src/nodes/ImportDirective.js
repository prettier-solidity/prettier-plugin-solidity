const {
  doc: {
    builders: { join }
  }
} = require('prettier/standalone');

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
      doc = ['{'];

      if (options.bracketSpacing) {
        doc.push(' ');
      }

      const symbolAliases = node.symbolAliases.map(([a, b]) =>
        b ? `${a} as ${b}` : a
      );
      doc.push(join(', ', symbolAliases));

      if (options.bracketSpacing) {
        doc.push(' ');
      }

      doc.push('} from ', importPath);
    } else {
      // import "./Foo.sol";
      doc = importPath;
    }

    return ['import ', doc, ';'];
  }
};

module.exports = ImportDirective;
