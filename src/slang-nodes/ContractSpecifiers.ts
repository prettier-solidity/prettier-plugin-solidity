import { NonterminalKind } from '@nomicfoundation/slang/cst';
import {
  group,
  ifBreak,
  line,
  softline
} from '../slang-printers/prettier-builders.ts';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { ContractSpecifier } from './ContractSpecifier.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

function sortContractSpecifiers(
  { kind: aKind }: ContractSpecifier['variant'],
  { kind: bKind }: ContractSpecifier['variant']
): number {
  // OverrideSpecifiers before ModifierInvocation
  if (
    aKind === NonterminalKind.InheritanceSpecifier &&
    bKind === NonterminalKind.StorageLayoutSpecifier
  )
    return -1;
  if (
    bKind === NonterminalKind.InheritanceSpecifier &&
    aKind === NonterminalKind.StorageLayoutSpecifier
  )
    return 1;

  return 0;
}

export class ContractSpecifiers extends SlangNode {
  readonly kind = NonterminalKind.ContractSpecifiers;

  items: ContractSpecifier['variant'][];

  constructor(ast: ast.ContractSpecifiers, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ContractSpecifier(item, collected))
    );

    this.items.sort(sortContractSpecifiers);
  }

  print(print: PrintFunction, path: AstPath<ContractSpecifiers>): Doc {
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
