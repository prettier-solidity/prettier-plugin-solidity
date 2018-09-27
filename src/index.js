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
    locEnd: node => node.range[1],
    locStart: node => node.range[0],
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
    massageAstNode,
    print,
    printComment
  }
};

module.exports = {
  languages,
  parsers,
  printers
};
