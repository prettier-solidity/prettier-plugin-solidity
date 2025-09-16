import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { UsingClause } from './UsingClause.js';
import { UsingTarget } from './UsingTarget.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class UsingDirective extends SlangNode {
  readonly kind = NonterminalKind.UsingDirective;

  clause: UsingClause['variant'];

  target: UsingTarget['variant'];

  globalKeyword?: string;

  constructor(ast: ast.UsingDirective, options: ParserOptions<AstNode>) {
    super(ast);

    this.clause = extractVariant(new UsingClause(ast.clause));
    this.target = extractVariant(new UsingTarget(ast.target, options));
    this.globalKeyword = ast.globalKeyword?.unparse();

    this.updateMetadata(this.clause, this.target);
  }

  print(path: AstPath<UsingDirective>, print: PrintFunction): Doc {
    return [
      'using ',
      path.call(print, 'clause'),
      ' for ',
      path.call(print, 'target'),
      this.globalKeyword ? ' global;' : ';'
    ];
  }
}
