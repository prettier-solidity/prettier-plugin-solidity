import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TerminalNode } from './TerminalNode.ts';
import { ParametersDeclaration } from './ParametersDeclaration.ts';
import { Parameters } from './Parameters.ts';
import { ModifierAttributes } from './ModifierAttributes.ts';
import { FunctionBody } from './FunctionBody.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type {
  AstLocation,
  CollectedMetadata,
  PrintFunction
} from '../types.d.ts';

export class ModifierDefinition extends SlangNode {
  readonly kind = NonterminalKind.ModifierDefinition;

  name: TerminalNode;

  parameters?: ParametersDeclaration;

  attributes: ModifierAttributes;

  body: FunctionBody['variant'];

  constructor(ast: ast.ModifierDefinition, collected: CollectedMetadata) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    if (ast.parameters) {
      this.parameters = new ParametersDeclaration(ast.parameters, collected);
    }
    this.attributes = new ModifierAttributes(ast.attributes, collected);
    this.body = extractVariant(new FunctionBody(ast.body, collected));

    this.updateMetadata(this.parameters, this.attributes, this.body);

    if (!this.parameters) {
      const parametersOffset = this.attributes.loc.outerStart;
      const parametersLoc: AstLocation = {
        outerStart: parametersOffset,
        outerEnd: parametersOffset,
        start: parametersOffset,
        end: parametersOffset
      };

      this.parameters = ParametersDeclaration.createSynthetic({
        kind: NonterminalKind.ParametersDeclaration,
        loc: { ...parametersLoc },
        comments: undefined,
        parameters: Parameters.createSynthetic({
          kind: NonterminalKind.Parameters,
          loc: { ...parametersLoc },
          comments: undefined,
          items: []
        })
      });
    }
  }

  print(print: PrintFunction): Doc {
    return printFunction(['modifier ', print('name')], this, print);
  }
}
