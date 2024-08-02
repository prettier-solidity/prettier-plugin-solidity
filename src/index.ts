import * as comments from './comments/index.js';
import * as slangComments from './slang-comments/index.js';
import massageAstNode from './clean.js';
import loc from './loc.js';
import options from './options.js';
import parse from './parser.js';
import print from './printer.js';
import slangParse from './slangParser.js';
import slangPrint from './slangPrinter.js';
import { isComment, isBlockComment } from './slang-utils/is-comment.js';
import { locEnd, locStart } from './slang-utils/loc.js';

import type {
  Parser,
  Printer,
  RequiredOptions,
  SupportLanguage
} from 'prettier';
import type { AstNode, Comment } from './types';

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
    parsers: ['solidity-parse', parserName],
    vscodeLanguageIds: ['solidity']
  }
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser = { astFormat: 'solidity-ast', parse, ...loc };
const slangParser: Parser<AstNode> = {
  astFormat,
  parse: slangParse,
  locStart,
  locEnd
};

const parsers = {
  'solidity-parse': parser,
  [parserName]: slangParser
};

const canAttachComment = (node: { type: string }): boolean =>
  typeof node.type === 'string' &&
  node.type !== 'BlockComment' &&
  node.type !== 'LineComment';
const slangCanAttachComment = (node: AstNode | Comment): boolean =>
  node.kind && !isComment(node);

// https://prettier.io/docs/en/plugins.html#printers
const printer = {
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
};
const slangPrinter: Printer<AstNode> = {
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
};

const printers = {
  'solidity-ast': printer,
  [astFormat]: slangPrinter
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
