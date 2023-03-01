const {
  doc: {
    builders: { line, softline }
  }
} = require('prettier');

const { printSeparatedList } = require('../common/printer-helpers');

const UsingForDeclaration = {
  print: ({ node, path, print, options }) => {
    const parts = ['using '];

    if (node.functions && node.functions.length) {
      const importedFunctions = [];
      for (let i = 0; i < node.functions.length; i += 1) {
        const fun = node.functions[i];
        const operator = node.operators[i];

        if (operator) {
          importedFunctions.push(`${fun} as ${operator}`);
        } else {
          importedFunctions.push(fun);
        }
      }

      parts.push('{');
      parts.push(
        printSeparatedList(importedFunctions, {
          firstSeparator: options.bracketSpacing ? line : softline
        })
      );
      parts.push('}');
    } else {
      parts.push(node.libraryName);
    }

    parts.push(' for ');
    parts.push(node.typeName ? path.call(print, 'typeName') : '*');
    parts.push(node.isGlobal ? ' global;' : ';');

    return parts;
  }
};

module.exports = UsingForDeclaration;
