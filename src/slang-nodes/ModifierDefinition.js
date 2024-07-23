import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';
import { ModifierAttributes } from './ModifierAttributes.js';
import { FunctionBody } from './FunctionBody.js';

const postProcess = (properties) => {
  if (typeof properties.parameters !== 'undefined') return properties;

  const parametersOffset =
    properties.attributes.loc.start - properties.attributes.loc.leadingOffset;
  const parametersLoc = {
    start: parametersOffset,
    end: parametersOffset,
    leadingOffset: 0,
    trailingOffset: 0
  };

  return {
    ...properties,
    parameters: Object.create(ParametersDeclaration.prototype, {
      loc: { value: { ...parametersLoc } },
      openParen: { value: '(' },
      parameters: {
        value: Object.create(Parameters.prototype, {
          loc: { value: { ...parametersLoc } },
          items: { value: [] },
          separators: { value: [] }
        })
      },
      closeParen: { value: ')' }
    })
  };
};

export class ModifierDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.ModifierDefinition;
  }

  modifierKeyword;

  name;

  parameters;

  attributes;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = -1;
      const children = {
        modifierKeyword: ast.modifierKeyword.text,
        name: ast.name.text,
        parameters: ast.parameters
          ? new ParametersDeclaration(
              ast.parameters,
              offsets[(i += 1)],
              options
            )
          : undefined,
        attributes: new ModifierAttributes(
          ast.attributes,
          offsets[(i += 1)],
          options
        ),
        body: new FunctionBody(ast.body, offsets[(i += 1)], options)
      };
      return children;
    };

    this.initialize(ast, offset, fetch, postProcess);
  }

  print(path, print) {
    return printFunction(
      `${this.modifierKeyword} ${this.name}`,
      this,
      path,
      print
    );
  }
}
