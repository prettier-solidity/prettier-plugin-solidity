import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';
import { ModifierAttributes } from './ModifierAttributes.js';
import { FunctionBody } from './FunctionBody.js';

const postProcess = (properties) => {
  if (typeof properties.parameters !== 'undefined') return properties;

  const parametersOffset = properties.attributes.loc.startWithTrivia;
  const parametersLoc = {
    startWithTrivia: parametersOffset,
    start: parametersOffset,
    endWithTrivia: parametersOffset,
    end: parametersOffset
  };

  return {
    ...properties,
    parameters: new ParametersDeclaration({
      kind: 'ParametersDeclaration',
      loc: { ...parametersLoc },
      openParen: '(',
      parameters: new Parameters({
        kind: 'Parameters',
        loc: { ...parametersLoc },
        items: [],
        separators: []
      }),
      closeParen: ')'
    })
  };
};

export class ModifierDefinition extends SlangNode {
  modifierKeyword;

  name;

  parameters;

  attributes;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      modifierKeyword: ast.modifierKeyword.text,
      name: ast.name.text,
      parameters: ast.parameters
        ? new ParametersDeclaration(
            ast.parameters,
            childrenOffsets.shift(),
            options
          )
        : undefined,
      attributes: new ModifierAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        options
      ),
      body: new FunctionBody(ast.body, childrenOffsets.shift(), options)
    });

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
