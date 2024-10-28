import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';
import { ModifierAttributes } from './ModifierAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ModifierDefinition implements SlangNode {
  readonly kind = NonterminalKind.ModifierDefinition;

  comments;

  loc;

  name: Identifier;

  parameters?: ParametersDeclaration;

  attributes: ModifierAttributes;

  body: FunctionBody;

  constructor(ast: ast.ModifierDefinition, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    if (ast.parameters) {
      this.parameters = new ParametersDeclaration(ast.parameters, options);
    }
    this.attributes = new ModifierAttributes(ast.attributes);
    this.body = new FunctionBody(ast.body, options);

    metadata = updateMetadata(metadata, [
      this.parameters,
      this.attributes,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    if (!this.parameters) {
      const parametersOffset =
        this.attributes.loc.start - this.attributes.loc.leadingOffset;
      const parametersLoc = {
        start: parametersOffset,
        end: parametersOffset,
        leadingOffset: 0,
        trailingOffset: 0
      };

      this.parameters = Object.assign(
        Object.create(ParametersDeclaration.prototype) as ParametersDeclaration,
        {
          kind: NonterminalKind.ParametersDeclaration,
          loc: { ...parametersLoc },
          comments: [],
          parameters: Object.assign(
            Object.create(Parameters.prototype) as Parameters,
            {
              kind: NonterminalKind.Parameters,
              loc: { ...parametersLoc },
              comments: [],
              items: [],
              separators: []
            }
          )
        }
      );
    }
  }

  print(path: AstPath<ModifierDefinition>, print: PrintFunction): Doc {
    return printFunction(
      ['modifier ', path.call(print, 'name')],
      this,
      path,
      print
    );
  }
}
