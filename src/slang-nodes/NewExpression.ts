import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class NewExpression extends SlangNode {
  readonly kind = NonterminalKind.NewExpression;

  typeName: TypeName['variant'];

  constructor(ast: ast.NewExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = extractVariant(new TypeName(ast.typeName, options));

    this.updateMetadata(this.typeName);
  }

  print(path: AstPath<NewExpression>, print: PrintFunction): Doc {
    return ['new ', path.call(print, 'typeName')];
  }
}
