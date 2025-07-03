import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { StateVariableAttributes } from './StateVariableAttributes.js';
import { Identifier } from './Identifier.js';
import { StateVariableDefinitionValue } from './StateVariableDefinitionValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, indentIfBreak } = doc.builders;

export class StateVariableDefinition implements SlangNode {
  readonly kind = NonterminalKind.StateVariableDefinition;

  comments;

  loc;

  typeName: TypeName;

  attributes: StateVariableAttributes;

  name: Identifier;

  value?: StateVariableDefinitionValue;

  constructor(
    ast: ast.StateVariableDefinition,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName, options);
    this.attributes = new StateVariableAttributes(ast.attributes);
    this.name = new Identifier(ast.name);
    if (ast.value) {
      this.value = new StateVariableDefinitionValue(ast.value, options);
    }

    metadata = updateMetadata(metadata, [
      this.typeName,
      this.attributes,
      this.value
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<StateVariableDefinition>, print: PrintFunction): Doc {
    const groupId = Symbol('Slang.StateVariableDefinition.attributes');
    return [
      path.call(print, 'typeName'),
      group(indent(path.call(print, 'attributes')), { id: groupId }),
      ' ',
      path.call(print, 'name'),
      this.value ? indentIfBreak(path.call(print, 'value'), { groupId }) : '',
      ';'
    ];
  }
}
