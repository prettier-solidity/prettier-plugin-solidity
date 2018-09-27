/* eslint-disable implicit-arrow-linebreak, max-len, no-nested-ternary, no-param-reassign, no-underscore-dangle, no-use-before-define, operator-linebreak, prefer-template */

const parse = require('./parser');
const print = require('./printer');
const massageAstNode = require('./clean');

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
    locStart: node => node.range[0],
    locEnd: node => node.range[1],
    parse
  }
};

function canAttachComment(node) {
  return (
    node.type && node.type !== 'BlockComment' && node.type !== 'LineComment'
  );
}

function printComment(commentPath) {
  const comment = commentPath.getValue();

  switch (comment.type) {
    case 'BlockComment': {
      return '/*' + comment.raw + '*/';
    }
    case 'LineComment':
      return '//' + comment.raw.trimRight();
    default:
      throw new Error('Not a comment: ' + JSON.stringify(comment));
  }
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
