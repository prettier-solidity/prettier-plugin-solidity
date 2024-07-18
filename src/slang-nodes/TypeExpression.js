import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class TypeExpression extends SlangNode {
  get kind() {
    return NonterminalKind.TypeExpression;
  }

  typeKeyword;

  openParen;

  typeName;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeKeyword: ast.typeKeyword.text,
      openParen: ast.openParen.text,
      typeName: new TypeName(ast.typeName, childrenOffsets.shift(), options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: TypeExpression'];
  }
}
