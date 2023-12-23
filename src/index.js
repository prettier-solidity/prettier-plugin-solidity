import * as comments from './comments/index.js';
import massageAstNode from './clean.ts';
import { locEnd, locStart } from './common/util.ts';
import options from './options.ts';
import parse from './parser.ts';
import print from './printer.js';

const astFormat = 'solidity-ast';
const parserName = 'solidity-parse';

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
const languages = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    type: 'programming',
    color: '#AA6746',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: [parserName],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser = { astFormat, locEnd, locStart, parse };
const parsers = { [parserName]: parser };

// https://prettier.io/docs/en/plugins.html#printers
const printer = {
  canAttachComment: comments.canAttachComment,
  handleComments: {
    ownLine: comments.solidityHandleOwnLineComment,
    endOfLine: comments.solidityHandleEndOfLineComment,
    remaining: comments.solidityHandleRemainingComment
  },
  isBlockComment: comments.isBlockComment,
  massageAstNode,
  print,
  printComment: comments.printComment
};
const printers = { [astFormat]: printer };

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
