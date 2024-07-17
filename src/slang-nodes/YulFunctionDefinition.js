import { SlangNode } from './SlangNode.js';
import { YulParametersDeclaration } from './YulParametersDeclaration.js';
import { YulReturnsDeclaration } from './YulReturnsDeclaration.js';
import { YulBlock } from './YulBlock.js';

export class YulFunctionDefinition extends SlangNode {
  functionKeyword;

  name;

  parameters;

  returns;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      functionKeyword: ast.functionKeyword.text,
      name: ast.name.text,
      parameters: new YulParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        options
      ),
      returns: ast.returns
        ? new YulReturnsDeclaration(
            ast.returns,
            childrenOffsets.shift(),
            options
          )
        : undefined,
      body: new YulBlock(ast.body, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.functionKeyword} ${this.name}`,
      path.call(print, 'parameters'),
      this.returns ? path.call(print, 'returns') : ' ',
      path.call(print, 'body')
    ];
  }
}
