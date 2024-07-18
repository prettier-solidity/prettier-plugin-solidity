import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class NewExpression extends SlangNode {
  get kind() {
    return NonterminalKind.NewExpression;
  }

  newKeyword;

  typeName;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      newKeyword: ast.newKeyword.text,
      typeName: new TypeName(ast.typeName, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.newKeyword} `, path.call(print, 'typeName')];
  }
}
