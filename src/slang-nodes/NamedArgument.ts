import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class NamedArgument extends SlangNode {
  readonly kind = NonterminalKind.NamedArgument;

  name: TerminalNode;

  value: Expression['variant'];

  constructor(ast: ast.NamedArgument, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new TerminalNode(ast.name);
    this.value = extractVariant(new Expression(ast.value, options));

    this.updateMetadata(this.value);
  }

  print(path: AstPath<NamedArgument>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), ': ', path.call(print, 'value')];
  }
}
