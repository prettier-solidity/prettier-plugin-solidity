import * as comments from './comments/index.js';
import { handleComments, printComment } from './slang-comments/index.js';
import massageAstNode from './clean.js';
import loc from './loc.js';
import options from './options.js';
import antlrParse from './parser.js';
import antlrPrint from './printer.js';
import slangParse from './slangSolidityParser.js';
import slangPrint from './slangPrinter.js';
import { isBlockComment, isComment } from './slang-utils/is-comment.js';
import { locEnd, locStart } from './slang-utils/loc.js';
import { hasPrettierIgnore } from './slang-utils/has-prettier-ignore.js';
import { getVisitorKeys } from './slang-utils/get-visitor-keys.js';

import type {
  AstPath,
  Doc,
  Parser,
  ParserOptions,
  Printer,
  RequiredOptions,
  SupportLanguage
} from 'prettier';
import type { PrintableNode } from './slang-nodes/types.d.ts';

const slangParserId = 'slang';
const antlrParserId = 'antlr';
const slangAstId = 'slang-ast';
const antlrAstId = 'antlr-ast';

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
const languages: SupportLanguage[] = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: [slangParserId, antlrParserId],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const antlrParser = { astFormat: antlrAstId, parse: antlrParse, ...loc };
const slangParser: Parser<PrintableNode> = {
  astFormat: slangAstId,
  parse: slangParse,
  locStart,
  locEnd
};

const parsers = {
  [slangParserId]: slangParser,
  [antlrParserId]: antlrParser
};

const antlrCanAttachComment = ({ type }: { type: string }): boolean =>
  typeof type === 'string' && type !== 'BlockComment' && type !== 'LineComment';
const canAttachComment = (node: PrintableNode): boolean =>
  // Make sure it's not Location
  node.kind && !isComment(node);

// https://prettier.io/docs/en/plugins.html#printers
const antlrPrinter = {
  canAttachComment: antlrCanAttachComment,
  handleComments: {
    ownLine: comments.solidityHandleOwnLineComment,
    endOfLine: comments.solidityHandleEndOfLineComment,
    remaining: comments.solidityHandleRemainingComment
  },
  isBlockComment: comments.isBlockComment,
  massageAstNode,
  print: antlrPrint,
  printComment: comments.printComment
};
const slangPrinter: Printer<PrintableNode> = {
  canAttachComment,
  handleComments,
  isBlockComment,
  massageAstNode,
  print: slangPrint as (
    path: AstPath<PrintableNode>,
    options: ParserOptions<PrintableNode>,
    print: (path: AstPath<PrintableNode>) => Doc,
    args?: unknown
  ) => Doc,
  hasPrettierIgnore,
  getVisitorKeys,
  printComment
};

const printers = {
  [slangAstId]: slangPrinter,
  [antlrAstId]: antlrPrinter
};

// https://prettier.io/docs/en/plugins.html#defaultoptions
const defaultOptions: Partial<RequiredOptions> = {
  bracketSpacing: false,
  tabWidth: 4
};

export default { languages, parsers, printers, options, defaultOptions };
