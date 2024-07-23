import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulParametersDeclaration } from './YulParametersDeclaration.js';
import { YulReturnsDeclaration } from './YulReturnsDeclaration.js';
import { YulBlock } from './YulBlock.js';

export class YulFunctionDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.YulFunctionDefinition;
  }

  functionKeyword;

  name;

  parameters;

  returns;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = 0;
      const children = {
        functionKeyword: ast.functionKeyword.text,
        name: ast.name.text,
        parameters: new YulParametersDeclaration(
          ast.parameters,
          offsets[0],
          options
        ),
        returns: ast.returns
          ? new YulReturnsDeclaration(ast.returns, offsets[(i += 1)], options)
          : undefined,
        body: new YulBlock(ast.body, offsets[(i += 1)], options)
      };
      return children;
    };

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
