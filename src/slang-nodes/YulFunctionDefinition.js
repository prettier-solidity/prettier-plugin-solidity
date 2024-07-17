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

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { functionKeyword, name, parameters, returns, body } = ast;
      this.functionKeyword = functionKeyword.text;
      this.name = name.text;
      this.parameters = new YulParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      if (returns) {
        this.returns = new YulReturnsDeclaration(
          returns,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.body = new YulBlock(
        body,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
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
