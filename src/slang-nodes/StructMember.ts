import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class StructMember extends SlangNode {
  readonly kind = NonterminalKind.StructMember;

  typeName: TypeName['variant'];

  name: TerminalNode;

  constructor(ast: ast.StructMember, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = extractVariant(new TypeName(ast.typeName, options));
    this.name = new TerminalNode(ast.name);

    this.updateMetadata(this.typeName);
  }

  print(path: AstPath<StructMember>, print: PrintFunction): Doc {
    return [path.call(print, 'typeName'), ' ', path.call(print, 'name'), ';'];
  }
}
