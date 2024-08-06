import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportDeconstructionSymbol } from './ImportDeconstructionSymbol.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

const { line, softline } = doc.builders;

export class ImportDeconstructionSymbols implements SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbols;

  comments;

  loc;

  items: ImportDeconstructionSymbol[];

  separators: string[];

  constructor(ast: ast.ImportDeconstructionSymbols, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new ImportDeconstructionSymbol(item, offsets[index])
    );
    this.separators = ast.separators.map((separator) => separator.text);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<ImportDeconstructionSymbols>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    const compiler = coerce(options.compiler);
    return printSeparatedList(
      path.map(print, 'items'),
      compiler && satisfies(compiler, '>=0.7.4')
        ? {
            // if the compiler exists and is greater than or equal to 0.7.4 we will
            // split the ImportDirective.
            firstSeparator: options.bracketSpacing ? line : softline,
            separator: [',', line]
          }
        : {
            // if the compiler is not given or is lower than 0.7.4 we will not
            // split the ImportDirective.
            firstSeparator: options.bracketSpacing ? ' ' : '',
            separator: ', '
          }
    );
  }
}
