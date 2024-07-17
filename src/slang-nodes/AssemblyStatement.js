import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration.js';
import { YulBlock } from './YulBlock.js';

export class AssemblyStatement extends SlangNode {
  assemblyKeyword;

  label;

  flags;

  body;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { assemblyKeyword, label, flags, body } = ast;
      this.assemblyKeyword = assemblyKeyword.text;
      if (label) {
        this.label = new StringLiteral(
          label,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      if (flags) {
        this.flags = new AssemblyFlagsDeclaration(
          flags,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.body = new YulBlock(
        body,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
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
