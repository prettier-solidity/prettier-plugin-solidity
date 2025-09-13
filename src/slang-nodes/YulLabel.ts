import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { dedent, line } = doc.builders;

export class YulLabel extends SlangNode {
  readonly kind = NonterminalKind.YulLabel;

  label: TerminalNode;

  constructor(ast: ast.YulLabel) {
    super(ast);

    this.label = new TerminalNode(ast.label);
  }

  print(path: AstPath<YulLabel>, print: PrintFunction): Doc {
    return [dedent(line), path.call(print, 'label'), ':'];
  }
}
