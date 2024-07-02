import * as comments from './comments/index.js';
import * as slangComments from './slang-comments/index.js';
import massageAstNode from './clean.js';
import loc from './loc.js';
import options from './options.js';
import parse from './parser.js';
import print from './printer.js';
import slangParse from './slangParser.js';
import slangPrint from './slangPrinter.js';
import { isComment, isBlockComment } from './common/slang-helpers.js';

const parserName = 'slang';
const astFormat = 'slang-ast';

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
    parsers: ['solidity-parse', parserName],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser = { astFormat: 'solidity-ast', parse, ...loc };
const slangParser = {
  astFormat,
  parse: slangParse,
  locStart: (node) => node.loc.start,
  locEnd: (node) => node.loc.end
};
const parsers = {
  'solidity-parse': parser,
  [parserName]: slangParser
};

const canAttachComment = (node) =>
  node.type && node.type !== 'BlockComment' && node.type !== 'LineComment';

const slangCanAttachComment = (node) => node.kind && !isComment(node);

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
  [astFormat]: {
    canAttachComment: slangCanAttachComment,
    handleComments: {
      ownLine: slangComments.slangHandleOwnLineComment,
      endOfLine: slangComments.slangHandleEndOfLineComment,
      remaining: slangComments.slangHandleRemainingComment
    },
    isBlockComment,
    massageAstNode,
    print: slangPrint,
    printComment: slangComments.printComment
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
