import { handleComments, printComment } from './slang-comments/index.ts';
import massageAstNode from './clean.ts';
import options from './options.ts';
import slangParse from './slangSolidityParser.ts';
import slangPrint from './slangPrinter.ts';
import { isBlockComment, isComment } from './slang-utils/is-comment.ts';
import { locEnd, locStart } from './slang-utils/loc.ts';
import { hasPrettierIgnore } from './slang-utils/has-prettier-ignore.ts';
import { getVisitorKeys } from './slang-utils/get-visitor-keys.ts';

import type {
  Parser,
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

const canAttachComment = (node: PrintableNode): boolean =>
  // Make sure it's not Location
  node.kind && !isComment(node);

// https://prettier.io/docs/en/plugins.html#printers
const slangPrinter: Printer<PrintableNode> = {
  canAttachComment,
  handleComments,
  isBlockComment,
  massageAstNode,
  print: slangPrint,
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
