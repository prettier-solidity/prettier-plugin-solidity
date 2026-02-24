import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.ImportClause,
  ImportClause
>([
  [slangAst.PathImport, PathImport],
  [slangAst.NamedImport, NamedImport],
  [slangAst.ImportDeconstruction, ImportDeconstruction]
]);

export class ImportClause extends SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(
    ast: slangAst.ImportClause,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of `ImportClause`
      // in the `createNonterminalVariant` function above.
      ((variant: slangAst.ImportClause['variant']): void => {
        if (variant instanceof slangAst.PathImport) return;
        if (variant instanceof slangAst.NamedImport) return;
        if (variant instanceof slangAst.ImportDeconstruction) return;
        /* c8 ignore next 2 */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
