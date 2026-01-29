import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class TypeExpression extends SlangNode {
  readonly kind = NonterminalKind.TypeExpression;

  typeName: TypeName['variant'];

  constructor(
    ast: ast.TypeExpression,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.typeName = extractVariant(
      new TypeName(ast.typeName, collected, options)
    );

    this.updateMetadata(this.typeName);
  }

  print(path: AstPath<TypeExpression>, print: PrintFunction): Doc {
    return ['type(', path.call(print, 'typeName'), ')'];
  }
}
