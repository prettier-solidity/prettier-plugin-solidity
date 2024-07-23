import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Pragma } from './Pragma.js';

export class PragmaDirective extends SlangNode {
  get kind() {
    return NonterminalKind.PragmaDirective;
  }

  pragmaKeyword;

  pragma;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      pragmaKeyword: ast.pragmaKeyword.text,
      pragma: new Pragma(ast.pragma, offsets[0], options),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.pragmaKeyword} `,
      path.call(print, 'pragma'),
      this.semicolon
    ];
  }
}
