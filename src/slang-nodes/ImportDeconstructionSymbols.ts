import { doc } from 'prettier';
import { coerce, satisfies } from 'semver';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportDeconstructionSymbol } from './ImportDeconstructionSymbol.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line, softline } = doc.builders;

export class ImportDeconstructionSymbols implements SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbols;

  comments;

  loc;

  items: ImportDeconstructionSymbol[];

  separators: string[];

  constructor(ast: ast.ImportDeconstructionSymbols) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new ImportDeconstructionSymbol(item));
    this.separators = ast.separators.map((separator) => separator.unparse());

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
      compiler && satisfies(compiler, '>=0.7.4') && this.items.length > 1
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
