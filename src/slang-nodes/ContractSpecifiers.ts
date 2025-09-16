import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortContractSpecifiers } from '../slang-utils/sort-contract-specifiers.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ContractSpecifier } from './ContractSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { group, ifBreak, line, softline } = doc.builders;

export class ContractSpecifiers extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifiers;

  items: ContractSpecifier['variant'][];

  constructor(ast: ast.ContractSpecifiers, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ContractSpecifier(item, options))
    );

    this.items.sort(sortContractSpecifiers);
  }

  print(path: AstPath<ContractSpecifiers>, print: PrintFunction): Doc {
    const [specifier1, specifier2] = path.map(print, 'items');

    if (specifier1 === undefined) return '';

    if (specifier2 === undefined) return [' ', specifier1];

    const groupId = Symbol('Slang.ContractSpecifiers.inheritance');
    return printSeparatedList(
      [group(specifier1, { id: groupId }), specifier2],
      { firstSeparator: line, separator: ifBreak('', softline, { groupId }) }
    );
  }
}
