// @TODO: add support for assembly language specifier
const { printString } = require('../common/util');
const { printSeparatedList } = require('../common/printer-helpers');

const InlineAssemblyStatement = {
  print: ({ node, path, print, options }) => [
    'assembly ',
    node.language ? `${printString(node.language, options)} ` : '',
    node.flags && node.flags.length > 0
      ? [
          '(',
          printSeparatedList(
            node.flags.map((flag) => printString(flag, options))
          ),
          ') '
        ]
      : '',
    path.call(print, 'body')
  ]
};
module.exports = InlineAssemblyStatement;
