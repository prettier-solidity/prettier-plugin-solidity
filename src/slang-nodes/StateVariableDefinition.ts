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
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.attributes = new StateVariableAttributes(ast.attributes, offsets[1]);
    this.name = new Identifier(ast.name, offsets[2]);
    if (ast.value) {
      this.value = new StateVariableDefinitionValue(
        ast.value,
        offsets[3],
        options
      );
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
    const attributesDoc = group(indent(path.call(print, 'attributes')), {
      id: Symbol('Slang.StateVariableDefinition.attributes')
    });

    return [
      path.call(print, 'typeName'),
      attributesDoc,
      ' ',
      path.call(print, 'name'),
      this.value
        ? indentIfBreak(path.call(print, 'value'), {
            groupId: attributesDoc.id!
          })
        : '',
      ';'
    ];
  }
}
