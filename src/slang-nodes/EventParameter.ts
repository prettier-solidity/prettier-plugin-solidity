import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class EventParameter extends SlangNode {
  readonly kind = NonterminalKind.EventParameter;

  typeName: TypeName['variant'];

  indexedKeyword?: string;

  name?: TerminalNode;

  constructor(
    ast: ast.EventParameter,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.typeName = extractVariant(
      new TypeName(ast.typeName, collected, options)
    );
    this.indexedKeyword = ast.indexedKeyword?.unparse();
    if (ast.name) {
      this.name = new TerminalNode(ast.name, collected);
    }

    this.updateMetadata(this.typeName);
  }

  print(print: PrintFunction): Doc {
    const nameDoc = print('name');
    return [
      print('typeName'),
      this.indexedKeyword ? ` ${this.indexedKeyword}` : '',
      nameDoc ? [' ', nameDoc] : ''
    ];
  }
}
