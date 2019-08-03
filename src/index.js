const { handleComments } = require('./prettier-comments');

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
const parser = Object.assign({}, { astFormat: 'solidity-ast', parse }, loc);
const parsers = {
  'solidity-parse': parser
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
      return `/*${comment.raw}*/`;
    }
    case 'LineComment':
      return `//${comment.raw.trimRight()}`;
    default:
      throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
  }
}

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
