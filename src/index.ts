import * as comments from './comments/index.js';
import massageAstNode from './clean.js';
import { locEnd, locStart } from './common/util.js';
import options from './options.js';
import parse from './parser.js';
import print from './printer.js';
import type {
  Parser,
  Plugin,
  Printer,
  RequiredOptions,
  SupportLanguage
} from 'prettier';

const astFormat = 'solidity-ast';
const parserName = 'solidity-parse';

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
const languages: SupportLanguage[] = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: [parserName],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser: Parser = { astFormat, locEnd, locStart, parse };
const parsers = { [parserName]: parser };

// https://prettier.io/docs/en/plugins.html#printers
const printer: Printer = {
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
const defaultOptions: Partial<RequiredOptions> = {
  bracketSpacing: false,
  tabWidth: 4
};

const plugin: Plugin = {
  languages,
  parsers,
  printers,
  options,
  defaultOptions
};

export default plugin;
