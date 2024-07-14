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

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.modifierKeyword = ast.modifierKeyword.text;
    this.name = ast.name.text;
    if (ast.parameters) {
      this.parameters = parse(ast.parameters, this.nextChildOffset);
    } else {
      const parametersLoc = {
        startWithTrivia: this.loc.childrenOffsets[0],
        start: this.loc.childrenOffsets[0],
        endWithTrivia: this.loc.childrenOffsets[0],
        end: this.loc.childrenOffsets[0]
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
    this.attributes = parse(ast.attributes, this.nextChildOffset);
    this.body = parse(ast.body, this.nextChildOffset);
    this.initiateLoc(ast);
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
