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

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.modifierKeyword = ast.modifierKeyword.text;
    this.name = ast.name.text;
    const parametersOffset = this.nextChildOffset;
    this.parameters = ast.parameters
      ? parse(ast.parameters, parse, parametersOffset)
      : new ParametersDeclaration({
          kind: 'ParametersDeclaration',
          loc: {
            start: parametersOffset,
            end: parametersOffset
          },
          openParen: '(',
          parameters: new Parameters({
            kind: 'Parameters',
            loc: {
              start: parametersOffset,
              end: parametersOffset
            },
            items: [],
            separators: []
          }),
          closeParen: ')'
        });
    this.attributes = parse(ast.attributes, parse, this.nextChildOffset);
    this.body = parse(ast.body, parse, this.nextChildOffset);
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
