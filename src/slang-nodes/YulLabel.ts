import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

const { dedent, line } = doc.builders;

export class YulLabel implements SlangNode {
  readonly kind = NonterminalKind.YulLabel;

  comments;

  loc;

  label: YulIdentifier;

  constructor(ast: ast.YulLabel, offset: number) {
    const metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.label = new YulIdentifier(ast.label, offsets[0]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulLabel>, print: PrintFunction): Doc {
    return [dedent(line), path.call(print, 'label'), ':'];
  }
}
