/* eslint-disable implicit-arrow-linebreak, max-len, no-nested-ternary, no-param-reassign, no-underscore-dangle, no-use-before-define, operator-linebreak, prefer-template */

const { concat, hardline, join } = require('prettier').doc.builders;
const { hasNewline } = require('prettier').util;
const parse = require('./parser');
const print = require('./printer');
const massageAstNode = require('./clean');
const loc = require('./loc');

// https://prettier.io/docs/en/plugins.html#languages
const languages = [
  {
    extensions: ['.sol'],
    name: 'Solidity',
    parsers: ['solidity-parse']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parsers = {
  'solidity-parse': {
    astFormat: 'solidity-ast',
    locEnd: loc.locEnd,
    locStart: loc.locStart,
    parse
  }
};

function canAttachComment(node) {
  return (
    node.type &&
    node.type !== 'CommentBlock' &&
    node.type !== 'CommentLine' &&
    node.type !== 'Line' &&
    node.type !== 'Block' &&
    node.type !== 'EmptyStatement' &&
    node.type !== 'TemplateElement' &&
    node.type !== 'Import' &&
    !(node.callee && node.callee.type === 'Import')
  );
}

function printComment(commentPath, options) {
  const comment = commentPath.getValue();

  switch (comment.type) {
    case 'CommentBlock':
    case 'Block':
    case 'BlockComment': {
      if (isJsDocComment(comment)) {
        const printed = printJsDocComment(comment);
        // We need to prevent an edge case of a previous trailing comment
        // printed as a `lineSuffix` which causes the comments to be
        // interleaved. See https://github.com/prettier/prettier/issues/4412
        if (
          comment.trailing &&
          !hasNewline(options.originalText, options.locStart(comment), {
            backwards: true
          })
        ) {
          return concat([hardline, printed]);
        }
        return printed;
      }

      const isInsideFlowComment =
        options.originalText.substr(options.locEnd(comment) - 3, 3) === '*-/';

      return '/*' + comment.value + (isInsideFlowComment ? '*-/' : '*/');
    }
    case 'CommentLine':
    case 'Line':
    case 'LineComment':
      // Print shebangs with the proper comment characters
      if (
        options.originalText.slice(options.locStart(comment)).startsWith('#!')
      ) {
        return '#!' + comment.value.trimRight();
      }
      return '//' + comment.value.trimRight();
    default:
      throw new Error('Not a comment: ' + JSON.stringify(comment));
  }
}

function isJsDocComment(comment) {
  const lines = comment.value.split('\n');
  return (
    lines.length > 1 &&
    lines.slice(0, lines.length - 1).every(line => line.trim()[0] === '*')
  );
}

function printJsDocComment(comment) {
  const lines = comment.value.split('\n');

  return concat([
    '/*',
    join(
      hardline,
      lines.map(
        (line, index) =>
          (index > 0 ? ' ' : '') +
          (index < lines.length - 1 ? line.trim() : line.trimLeft())
      )
    ),
    '*/'
  ]);
}

// https://prettier.io/docs/en/plugins.html#printers
const printers = {
  'solidity-ast': {
    canAttachComment,
    print,
    printComment,
    massageAstNode
  }
};

module.exports = {
  languages,
  parsers,
  printers
};
