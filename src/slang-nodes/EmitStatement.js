import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class EmitStatement extends SlangNode {
  get kind() {
    return NonterminalKind.EmitStatement;
  }

  emitKeyword;

  event;

  arguments;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      emitKeyword: ast.emitKeyword.text,
      event: new IdentifierPath(ast.event, offsets[0], options),
      arguments: new ArgumentsDeclaration(ast.arguments, offsets[1], options),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.emitKeyword} `,
      path.call(print, 'event'),
      path.call(print, 'arguments'),
      this.semicolon
    ];
  }
}
