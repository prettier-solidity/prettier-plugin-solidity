import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VariableDeclarationType } from './VariableDeclarationType.js';
import { StorageLocation } from './StorageLocation.js';
import { Identifier } from './Identifier.js';
import { VariableDeclarationValue } from './VariableDeclarationValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

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
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.variableType = new VariableDeclarationType(
      ast.variableType,
      offsets[0],
      options
    );
    let i = 1;
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        offsets[i]
      );
      i += 1;
    }
    this.name = new Identifier(ast.name, offsets[i]);
    i += 1;
    if (ast.value) {
      this.value = new VariableDeclarationValue(ast.value, offsets[i], options);
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
    const declarationDoc = group(
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
      { id: Symbol('Slang.VariableDeclarationStatement.variables') }
    );

    return [
      declarationDoc,
      indentIfBreak(path.call(print, 'value'), {
        groupId: declarationDoc.id!
      }),
      ';'
    ];
  }
}