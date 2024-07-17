import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration.js';
import { YulBlock } from './YulBlock.js';

export class AssemblyStatement extends SlangNode {
  assemblyKeyword;

  label;

  flags;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      assemblyKeyword: ast.assemblyKeyword.text,
      label: ast.label
        ? new StringLiteral(
            ast.label,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      flags: ast.flags
        ? new AssemblyFlagsDeclaration(
            ast.flags,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      body: new YulBlock(ast.body, childrenOffsets.shift(), comments, options)
    });

    this.initialize(ast, offset, fetch, comments);
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
