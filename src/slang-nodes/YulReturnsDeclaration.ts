import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulVariableNames } from './YulVariableNames.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line } = doc.builders;

export class YulReturnsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.YulReturnsDeclaration;

  comments;

  loc;

  variables: YulVariableNames;

  constructor(ast: ast.YulReturnsDeclaration) {
    let metadata = getNodeMetadata(ast);

    this.variables = new YulVariableNames(ast.variables);

    metadata = updateMetadata(metadata, [this.variables]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulReturnsDeclaration>, print: PrintFunction): Doc {
    return printSeparatedItem(['->', path.call(print, 'variables')], {
      firstSeparator: line
    });
  }
}
