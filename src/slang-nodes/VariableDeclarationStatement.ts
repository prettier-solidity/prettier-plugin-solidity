import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { indent, line } from '../slang-printers/prettier-builders.ts';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { VariableDeclarationType } from './VariableDeclarationType.ts';
import { StorageLocation } from './StorageLocation.ts';
import { TerminalNode } from './TerminalNode.ts';
import { VariableDeclarationValue } from './VariableDeclarationValue.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class VariableDeclarationStatement extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationStatement;

  variableType: VariableDeclarationType['variant'];

  storageLocation?: StorageLocation;

  name: TerminalNode;

  value?: VariableDeclarationValue;

  constructor(
    ast: ast.VariableDeclarationStatement,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.variableType = extractVariant(
      new VariableDeclarationType(ast.variableType, collected)
    );
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        collected
      );
    }
    this.name = new TerminalNode(ast.name, collected);
    if (ast.value) {
      this.value = new VariableDeclarationValue(ast.value, collected);
    }

    this.updateMetadata(this.variableType, this.storageLocation, this.value);
  }

  print(print: PrintFunction): Doc {
    return printGroupAndIndentIfBreakPair(
      [
        print('variableType'),
        this.storageLocation ? indent([line, print('storageLocation')]) : '',
        ' ',
        print('name')
      ],
      [print('value'), ';']
    );
  }
}
