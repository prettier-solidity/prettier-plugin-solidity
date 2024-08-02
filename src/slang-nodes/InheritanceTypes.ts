import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { InheritanceType } from './InheritanceType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

const { line } = doc.builders;

export class InheritanceTypes implements SlangNode {
  readonly kind = NonterminalKind.InheritanceTypes;

  comments;

  loc;

  items: InheritanceType[];

  separators: string[];

  constructor(
    ast: ast.InheritanceTypes,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new InheritanceType(item, offsets[index], options)
    );
    this.separators = ast.separators.map((separator) => separator.text);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<InheritanceTypes>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line
    });
  }
}
