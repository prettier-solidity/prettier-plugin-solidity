import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { VariableDeclarationType } from './VariableDeclarationType.js';
import { StorageLocation } from './StorageLocation.js';
import { Identifier } from './Identifier.js';
import { VariableDeclarationValue } from './VariableDeclarationValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent, indentIfBreak, line } = doc.builders;

export class VariableDeclarationStatement extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationStatement;

  variableType: VariableDeclarationType;

  storageLocation?: StorageLocation;

  name: Identifier;

  value?: VariableDeclarationValue;

  constructor(
    ast: ast.VariableDeclarationStatement,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.variableType = new VariableDeclarationType(ast.variableType, options);
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation);
    }
    this.name = new Identifier(ast.name);
    if (ast.value) {
      this.value = new VariableDeclarationValue(ast.value, options);
    }

    this.updateMetadata([this.variableType, this.storageLocation, this.value]);
  }

  print(
    path: AstPath<VariableDeclarationStatement>,
    print: PrintFunction
  ): Doc {
    const groupId = Symbol('Slang.VariableDeclarationStatement.variables');
    return [
      group(
        [
          path.call(print, 'variableType'),
          indent([
            this.storageLocation
              ? [line, path.call(print, 'storageLocation')]
              : '',
            ' ',
            path.call(print, 'name')
          ])
        ],
        { id: groupId }
      ),
      indentIfBreak(path.call(print, 'value'), { groupId }),
      ';'
    ];
  }
}
