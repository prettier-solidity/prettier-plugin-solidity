import * as comments from './comments/index.js';
import massageAstNode from './clean.js';
import loc from './loc.js';
import options from './options.js';
import parse from './parser.js';
import print from './printer.js';
import slangParse from './slangParser.js';
import slangPrint from './slangPrinter.js';

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/ikatyang/linguist-languages/blob/master/data/Solidity.json
const languages = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    type: 'programming',
    color: '#AA6746',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: ['solidity-parse', 'solidity-slang-parser'],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser = { astFormat: 'solidity-ast', parse, ...loc };
const slangParser = {
  astFormat: 'solidity-slang-ast',
  parse: slangParse,
  ...loc
};
const parsers = {
  'solidity-parse': parser,
  'solidity-slang-parse': slangParser
};

const canAttachComment = (node) =>
  node.type && node.type !== 'BlockComment' && node.type !== 'LineComment';

// https://prettier.io/docs/en/plugins.html#printers
const printers = {
  'solidity-ast': {
    canAttachComment,
    handleComments: {
      ownLine: comments.solidityHandleOwnLineComment,
      endOfLine: comments.solidityHandleEndOfLineComment,
      remaining: comments.solidityHandleRemainingComment
    },
    isBlockComment: comments.isBlockComment,
    massageAstNode,
    print,
    printComment: comments.printComment
  },
  'solidity-slang-ast': {
    canAttachComment,
    handleComments: {
      ownLine: comments.solidityHandleOwnLineComment,
      endOfLine: comments.solidityHandleEndOfLineComment,
      remaining: comments.solidityHandleRemainingComment
    },
    isBlockComment: comments.isBlockComment,
    massageAstNode,
    print: slangPrint,
    printComment: comments.printComment
  }
};

// https://prettier.io/docs/en/plugins.html#defaultoptions
const defaultOptions = {
  bracketSpacing: false,
  tabWidth: 4
};

const plugin = {
  languages,
  parsers,
  printers,
  options,
  defaultOptions
};

export default plugin;
