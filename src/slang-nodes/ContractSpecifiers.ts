import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { sortContractSpecifiers } from '../slang-utils/sort-contract-specifiers.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { ContractSpecifier } from './ContractSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, ifBreak, line, softline } = doc.builders;

export class ContractSpecifiers extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifiers;

  items: ContractSpecifier[];

  constructor(ast: ast.ContractSpecifiers, options: ParserOptions<AstNode>) {
    super(ast);

    this.items = ast.items.map((item) => new ContractSpecifier(item, options));

    this.updateMetadata(this.items);

    this.items = this.items.sort(sortContractSpecifiers);
  }

  print(path: AstPath<ContractSpecifiers>, print: PrintFunction): Doc {
    const [specifier1, specifier2] = path.map(print, 'items');

    if (typeof specifier1 === 'undefined') return '';

    if (typeof specifier2 === 'undefined') return [' ', specifier1];

    const groupId = Symbol('Slang.ContractSpecifiers.inheritance');
    return printSeparatedList(
      [group(specifier1, { id: groupId }), specifier2],
      { firstSeparator: line, separator: ifBreak('', softline, { groupId }) }
    );
  }
}
