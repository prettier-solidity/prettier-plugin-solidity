import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class InheritanceType extends SlangNode {
  get kind() {
    return NonterminalKind.InheritanceType;
  }

  typeName;

  arguments;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new IdentifierPath(
        ast.typeName,
        childrenOffsets.shift(),
        options
      ),
      arguments: ast.arguments
        ? new ArgumentsDeclaration(
            ast.arguments,
            childrenOffsets.shift(),
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
