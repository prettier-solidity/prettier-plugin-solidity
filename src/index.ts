import * as comments from './comments/index.js';
import { handleComments, printComment } from './slang-comments/index.js';
import massageAstNode from './clean.js';
import loc from './loc.js';
import options from './options.js';
import solidityParse from './parser.js';
import solidityPrint from './printer.js';
import parse from './slangParser.js';
import print from './slangPrinter.js';
import { isComment, isBlockComment } from './slang-utils/is-comment.js';
import { locEnd, locStart } from './slang-utils/loc.js';

import type {
  Parser,
  Printer,
  RequiredOptions,
  SupportLanguage
} from 'prettier';
import type { AstNode } from './slang-nodes';

const parserName = 'slang';
const astFormat = 'slang-ast';

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/ikatyang/linguist-languages/blob/master/data/Solidity.json
const languages: SupportLanguage[] = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: [parserName, 'solidity-parse'],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser = { astFormat: 'solidity-ast', parse: solidityParse, ...loc };
const slangParser: Parser<AstNode> = {
  astFormat,
  parse,
  locStart,
  locEnd
};

const parsers = {
  [parserName]: slangParser,
  'solidity-parse': parser
};

const solidityCanAttachComment = (node: { type: string }): boolean =>
  typeof node.type === 'string' &&
  node.type !== 'BlockComment' &&
  node.type !== 'LineComment';
const canAttachComment = (node: AstNode): boolean =>
  typeof node !== 'string' &&
  typeof node !== 'undefined' &&
  node.kind && // Make sure it's not Location
  !isComment(node);

// https://prettier.io/docs/en/plugins.html#printers
const printer = {
  canAttachComment: solidityCanAttachComment,
  handleComments: {
    ownLine: comments.solidityHandleOwnLineComment,
    endOfLine: comments.solidityHandleEndOfLineComment,
    remaining: comments.solidityHandleRemainingComment
  },
  isBlockComment: comments.isBlockComment,
  massageAstNode,
  print: solidityPrint,
  printComment: comments.printComment
};
const slangPrinter: Printer<AstNode> = {
  canAttachComment,
  handleComments,
  isBlockComment,
  massageAstNode,
  print,
  printComment
};

const printers = {
  [astFormat]: slangPrinter,
  'solidity-ast': printer
};

// https://prettier.io/docs/en/plugins.html#defaultoptions
const defaultOptions: Partial<RequiredOptions> = {
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
