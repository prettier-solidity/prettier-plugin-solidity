// @TODO: add support for assembly language specifier
const { printString } = require('../prettier-comments/common/util');
const printSeparatedList = require('./print-separated-list');

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
