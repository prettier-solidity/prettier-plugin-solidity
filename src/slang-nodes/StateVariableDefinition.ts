import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { StateVariableAttributes } from './StateVariableAttributes.js';
import { StateVariableDefinitionValue } from './StateVariableDefinitionValue.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class StateVariableDefinition implements SlangNode {
  readonly kind = NonterminalKind.StateVariableDefinition;

  comments;

  loc;

  typeName: TypeName;

  attributes: StateVariableAttributes;

  name: string;

  value?: StateVariableDefinitionValue;

  semicolon: string;

  constructor(
    ast: ast.StateVariableDefinition,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.attributes = new StateVariableAttributes(ast.attributes, offsets[1]);
    this.name = ast.name.text;
    this.value = ast.value
      ? new StateVariableDefinitionValue(ast.value, offsets[2], options)
      : undefined;
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [
      this.typeName,
      this.attributes,
      this.value
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      path.call(print, 'typeName'),
      path.call(print, 'attributes'),
      ` ${this.name}`,
      this.value ? path.call(print, 'value') : '',
      this.semicolon
    ];
  }
}
