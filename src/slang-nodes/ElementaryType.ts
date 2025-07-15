import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AddressType } from './AddressType.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class ElementaryType extends SlangNode {
  readonly kind = NonterminalKind.ElementaryType;

  variant: AddressType | TerminalNode;

  constructor(ast: ast.ElementaryType) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new AddressType(variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ElementaryType>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
