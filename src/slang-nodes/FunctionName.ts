import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class FunctionName implements SlangNode {
  readonly kind = NonterminalKind.FunctionName;

  comments;

  loc;

  variant: Identifier;

  constructor(ast: ast.FunctionName) {
    const metadata = getNodeMetadata(ast);

    this.variant = new Identifier(ast.variant);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<FunctionName>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
