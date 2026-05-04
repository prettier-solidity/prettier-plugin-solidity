import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ContractSpecifier } from './ContractSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { group, ifBreak, line, softline } = doc.builders;

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

  constructor(
    ast: ast.ContractSpecifiers,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ContractSpecifier(item, collected, options))
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
