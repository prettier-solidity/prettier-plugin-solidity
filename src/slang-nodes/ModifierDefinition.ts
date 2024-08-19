import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';
import { ModifierAttributes } from './ModifierAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

const objectConfig = {
  writable: true,
  enumerable: true,
  configurable: true
};

export class ModifierDefinition implements SlangNode {
  readonly kind = NonterminalKind.ModifierDefinition;

  comments;

  loc;

  name: Identifier;

  parameters?: ParametersDeclaration;

  attributes: ModifierAttributes;

  body: FunctionBody;

  constructor(
    ast: ast.ModifierDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new Identifier(ast.name, offsets[0]);
    let i = 1;
    if (ast.parameters) {
      this.parameters = new ParametersDeclaration(
        ast.parameters,
        offsets[i],
        options
      );
      i += 1;
    }
    this.attributes = new ModifierAttributes(ast.attributes, offsets[i]);
    i += 1;
    this.body = new FunctionBody(ast.body, offsets[i], options);

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

      this.parameters = Object.create(ParametersDeclaration.prototype, {
        kind: {
          value: NonterminalKind.ParametersDeclaration,
          ...objectConfig
        },
        loc: {
          value: { ...parametersLoc },
          ...objectConfig
        },
        comments: { value: [], ...objectConfig },
        parameters: {
          value: Object.create(Parameters.prototype, {
            kind: { value: NonterminalKind.Parameters, ...objectConfig },
            loc: { value: { ...parametersLoc }, ...objectConfig },
            comments: { value: [], ...objectConfig },
            items: { value: [], ...objectConfig },
            separators: { value: [], ...objectConfig }
          }) as Parameters,
          ...objectConfig
        }
      }) as ParametersDeclaration;
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
