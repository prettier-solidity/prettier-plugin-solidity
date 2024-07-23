import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

const { group } = doc.builders;

export class ReturnsDeclaration extends SlangNode {
  get kind() {
    return NonterminalKind.ReturnsDeclaration;
  }

  returnsKeyword;

  variables;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      returnsKeyword: ast.returnsKeyword.text,
      variables: new ParametersDeclaration(ast.variables, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.returnsKeyword} `, group(path.call(print, 'variables'))];
  }
}
