import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';

export class ModifierDefinition extends SlangNode {
  modifierKeyword;

  name;

  parameters;

  attributes;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    if (typeof this.parameters === 'undefined') {
      const parametersLoc = {
        startWithTrivia: this.attributes.loc.startWithTrivia,
        start: this.attributes.loc.startWithTrivia,
        endWithTrivia: this.attributes.loc.startWithTrivia,
        end: this.attributes.loc.startWithTrivia
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
    this.initializeLoc(ast);
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
