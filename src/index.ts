import * as comments from './comments/index.js';
import { handleComments, printComment } from './slang-comments/index.js';
import massageAstNode from './clean.js';
import loc from './loc.js';
import options from './options.js';
import parse from './parser.js';
import print from './printer.js';
import solidityParse from './slangSolidityParser.js';
import slangPrint from './slangPrinter.js';
import { isComment, isBlockComment } from './slang-utils/is-comment.js';
import { locEnd, locStart } from './slang-utils/loc.js';

import type {
  Parser,
  Printer,
  RequiredOptions,
  SupportLanguage
} from 'prettier';
import type { AstNode } from './slang-nodes';

const parserSolidity = 'slang-solidity';
const astFormat = 'slang-ast';

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
const languages: SupportLanguage[] = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: [parserSolidity, 'solidity-parse'],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser = { astFormat: 'solidity-ast', parse, ...loc };
const solidityParser: Parser<AstNode> = {
  astFormat,
  parse: solidityParse,
  locStart,
  locEnd
};

const parsers = {
  [parserSolidity]: solidityParser,
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
  print,
  printComment: comments.printComment
};
const slangPrinter: Printer<AstNode> = {
  canAttachComment,
  handleComments,
  isBlockComment,
  massageAstNode,
  print: slangPrint,
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
