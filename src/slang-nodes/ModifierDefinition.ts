import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunctionWithBody } from '../slang-printers/print-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';
import { ModifierAttributes } from './ModifierAttributes.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ModifierDefinition extends SlangNode {
  readonly kind = NonterminalKind.ModifierDefinition;

  name: TerminalNode;

  parameters?: ParametersDeclaration;

  attributes: ModifierAttributes;

  body: FunctionBody['variant'];

  constructor(ast: ast.ModifierDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new TerminalNode(ast.name);
    if (ast.parameters) {
      this.parameters = new ParametersDeclaration(ast.parameters, options);
    }
    this.attributes = new ModifierAttributes(ast.attributes);
    this.body = extractVariant(new FunctionBody(ast.body, options));

    this.updateMetadata(this.parameters, this.attributes, this.body);

    if (!this.parameters) {
      const attributesLoc = this.attributes.loc;
      const parametersOffset =
        attributesLoc.start - attributesLoc.leadingOffset;
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
              items: []
            }
          )
        }
      );
    }
  }

  print(path: AstPath<ModifierDefinition>, print: PrintFunction): Doc {
    return printFunctionWithBody(
      ['modifier ', path.call(print, 'name')],
      this,
      path,
      print
    );
  }
}
