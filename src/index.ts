import { handleComments, printComment } from './slang-comments/index.js';
import massageAstNode from './clean.js';
import options from './options.js';
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
const slangParser: Parser<PrintableNode> = {
  astFormat: slangAstId,
  parse: slangParse,
  locStart,
  locEnd
};

const parsers = { [slangParserId]: slangParser, [antlrParserId]: slangParser };

const canAttachComment = (node: PrintableNode | undefined): boolean =>
  typeof node !== 'string' &&
  node !== undefined &&
  node.kind && // Make sure it's not Location
  !isComment(node);

// https://prettier.io/docs/en/plugins.html#printers
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

const printers = { [slangAstId]: slangPrinter };

// https://prettier.io/docs/en/plugins.html#defaultoptions
const defaultOptions: Partial<RequiredOptions> = {
  bracketSpacing: false,
  tabWidth: 4
};

export default { languages, parsers, printers, options, defaultOptions };
