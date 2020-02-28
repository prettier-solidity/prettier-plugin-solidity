const { handleComments, printComment } = require('./comments');

const massageAstNode = require('./clean');
const loc = require('./loc');
const options = require('./options');
const parse = require('./parser');
const print = require('./printer');

// https://prettier.io/docs/en/plugins.html#languages
const languages = [
  {
    extensions: ['.sol'],
    name: 'Solidity',
    parsers: ['solidity-parse'],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser = { astFormat: 'solidity-ast', parse, ...loc };
const parsers = {
  'solidity-parse': parser
};

const canAttachComment = node =>
  node.type && node.type !== 'BlockComment' && node.type !== 'LineComment';

// https://prettier.io/docs/en/plugins.html#printers
const printers = {
  'solidity-ast': {
    canAttachComment,
    handleComments: {
      ownLine: handleComments.handleOwnLineComment,
      endOfLine: handleComments.handleEndOfLineComment,
      remaining: handleComments.handleRemainingComment
    },
    isBlockComment: handleComments.isBlockComment,
    massageAstNode,
    print,
    printComment
  }
};

// https://prettier.io/docs/en/plugins.html#defaultoptions
const defaultOptions = {
  bracketSpacing: false,
  tabWidth: 4
};

module.exports = {
  languages,
  parsers,
  printers,
  options,
  defaultOptions
};
