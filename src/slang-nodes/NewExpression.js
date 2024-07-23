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

    const fetch = (offsets) => ({
      newKeyword: ast.newKeyword.text,
      typeName: new TypeName(ast.typeName, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.newKeyword} `, path.call(print, 'typeName')];
  }
}
