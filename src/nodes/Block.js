const {
  doc: {
    builders: { hardline, indent }
  }
} = require('prettier');

const {
  printComments,
  printPreservingEmptyLines
} = require('../common/printer-helpers');

const Block = {
  print: ({ node, options, path, print }) =>
    // if block is empty, just return the pair of braces
    node.statements.length === 0 && !node.comments
      ? '{}'
      : [
          '{',
          indent([
            hardline,
            printPreservingEmptyLines(path, 'statements', options, print),
            printComments(node, path, options)
          ]),
          hardline,
          '}'
        ]
};

module.exports = Block;
