import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VariableDeclarationType } from './VariableDeclarationType.js';
import { StorageLocation } from './StorageLocation.js';
import { Identifier } from './Identifier.js';
import { VariableDeclarationValue } from './VariableDeclarationValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, indentIfBreak, line } = doc.builders;

export class VariableDeclarationStatement implements SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationStatement;

  comments;

  loc;

  variableType: VariableDeclarationType;

  storageLocation?: StorageLocation;

  name: Identifier;

  value?: VariableDeclarationValue;

  constructor(
    ast: ast.VariableDeclarationStatement,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.variableType = new VariableDeclarationType(ast.variableType, options);
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation);
    }
    this.name = new Identifier(ast.name);
    if (ast.value) {
      this.value = new VariableDeclarationValue(ast.value, options);
    }

    metadata = updateMetadata(metadata, [
      this.variableType,
      this.storageLocation,
      this.value
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
