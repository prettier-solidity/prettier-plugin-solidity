// https://prettier.io/docs/en/plugins.html#parsers
import { SourceUnit as SlangSourceUnit } from '@nomicfoundation/slang/ast';
import { inferAndParse } from './slang-utils/infer-and-parse.ts';
import { collectMetadata } from './slang-utils/collect-metadata.ts';
import { SourceUnit } from './slang-nodes/SourceUnit.ts';

import type { ParserOptions } from 'prettier';
import type { PrintableNode } from './slang-nodes/types.d.ts';

// Prettier prints some temporary messages while formatting, and this warning
// can mess with that output. We clear the line and move the cursor to the
// beginning of the line to avoid this.
//
// \x1b: Escape character
//  [2K: Escape code to clear the entire line
//   \r: Carriage return
const clearLine = '\x1b[2K\r';

function printWarning(message: string): void {
  console.warn(`${clearLine}[prettier-solidity] ${message}`);
}

export default function parse(
  text: string,
  options: ParserOptions<PrintableNode>
): PrintableNode {
  if (options.parser === 'antlr') {
    printWarning(
      `The 'antlr' parser is no longer supported, use 'slang' instead.`
    );
  }
  const { version, parseOutput } = inferAndParse(text, options);

  const { locations, comments } = collectMetadata(
    parseOutput.createTreeCursor(),
    options.originalText
  );
  const parsed = new SourceUnit(
    new SlangSourceUnit(parseOutput.tree.asNonterminalNode()),
    { locations, options, compiler: version }
  );

  parsed.comments = comments;
  return parsed;
}
