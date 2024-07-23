import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration.js';
import { YulBlock } from './YulBlock.js';

export class AssemblyStatement extends SlangNode {
  get kind() {
    return NonterminalKind.AssemblyStatement;
  }

  assemblyKeyword;

  label;

  flags;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = -1;
      const children = {
        assemblyKeyword: ast.assemblyKeyword.text,
        label: ast.label
          ? new StringLiteral(ast.label, offsets[(i += 1)], options)
          : undefined,
        flags: ast.flags
          ? new AssemblyFlagsDeclaration(ast.flags, offsets[(i += 1)], options)
          : undefined,
        body: new YulBlock(ast.body, offsets[(i += 1)], options)
      };
      return children;
    };

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.assemblyKeyword} `,
      this.label ? [path.call(print, 'label'), ' '] : '',
      this.flags ? [path.call(print, 'flags'), ' '] : '',
      path.call(print, 'body')
    ];
  }
}
