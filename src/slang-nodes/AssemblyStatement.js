import { SlangNode } from './SlangNode.js';

export class AssemblyStatement extends SlangNode {
  assemblyKeyword;

  label;

  flags;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.assemblyKeyword = ast.assemblyKeyword.text;
    this.label = ast.label ? parse(ast.label, this.nextChildOffset) : undefined;
    this.flags = ast.flags ? parse(ast.flags, this.nextChildOffset) : undefined;
    this.body = parse(ast.body, this.nextChildOffset);
    this.initiateLoc(ast);
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
