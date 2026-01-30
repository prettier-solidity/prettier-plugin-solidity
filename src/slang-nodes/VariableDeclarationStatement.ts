import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printGroupAndIndentIfBreakPair } from '../slang-printers/print-group-and-indent-if-break-pair.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { VariableDeclarationType } from './VariableDeclarationType.js';
import { StorageLocation } from './StorageLocation.js';
import { TerminalNode } from './TerminalNode.js';
import { VariableDeclarationValue } from './VariableDeclarationValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { indent, line } = doc.builders;

export class VariableDeclarationStatement extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationStatement;

  variableType: VariableDeclarationType['variant'];

  storageLocation?: StorageLocation;

  name: TerminalNode;

  value?: VariableDeclarationValue;

  constructor(
    ast: ast.VariableDeclarationStatement,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variableType = extractVariant(
      new VariableDeclarationType(ast.variableType, collected, options)
    );
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        collected
      );
    }
    this.name = new TerminalNode(ast.name, collected);
    if (ast.value) {
      this.value = new VariableDeclarationValue(ast.value, collected, options);
    }

    this.updateMetadata(this.variableType, this.storageLocation, this.value);
  }

  print(
    path: AstPath<VariableDeclarationStatement>,
    print: PrintFunction
  ): Doc {
    return printGroupAndIndentIfBreakPair(
      [
        path.call(print, 'variableType'),
        this.storageLocation
          ? indent([line, path.call(print, 'storageLocation')])
          : '',
        ' ',
        path.call(print, 'name')
      ],
      [path.call(print, 'value'), ';']
    );
  }
}
