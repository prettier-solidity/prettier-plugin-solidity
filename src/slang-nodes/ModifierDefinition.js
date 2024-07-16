import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';

export class ModifierDefinition extends SlangNode {
  modifierKeyword;

  name;

  parameters;

  attributes;

  body;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);

    if (typeof this.parameters === 'undefined') {
      const parametersOffset = this.attributes.loc.startWithTrivia;
      const parametersLoc = {
        startWithTrivia: parametersOffset,
        start: parametersOffset,
        endWithTrivia: parametersOffset,
        end: parametersOffset
      };
      this.parameters = new ParametersDeclaration({
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
      });
    }
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
