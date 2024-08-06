import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VariableDeclarationType } from './VariableDeclarationType.js';
import { StorageLocation } from './StorageLocation.js';
import { VariableDeclarationValue } from './VariableDeclarationValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

const { group, indent, indentIfBreak, line } = doc.builders;

export class VariableDeclarationStatement implements SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationStatement;

  comments;

  loc;

  variableType: VariableDeclarationType;

  storageLocation?: StorageLocation;

  name: string;

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
      this.storageLocation = ast.storageLocation
        ? new StorageLocation(ast.storageLocation, offsets[i])
        : undefined;
      i += 1;
    }
    this.name = ast.name.text;
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
          ` ${this.name}`
        ])
      ],
      { id: Symbol('Slang.VariableDeclarationStatement.variables') }
    );

    return [
      declarationDoc,
      indentIfBreak(this.value ? path.call(print, 'value') : '', {
        groupId: declarationDoc.id!
      }),
      ';'
    ];
  }
}
