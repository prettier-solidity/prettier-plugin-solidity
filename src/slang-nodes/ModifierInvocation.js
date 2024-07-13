import { isComment } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ModifierInvocation extends SlangNode {
  name;

  arguments;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.name = parse(ast.name, parse, this.nextChildOffset);
    this.arguments = ast.arguments
      ? parse(ast.arguments, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  removeInvocationArguments() {
    if (
      this.arguments &&
      this.arguments.variant.kind === 'PositionalArgumentsDeclaration' &&
      this.arguments.variant.arguments.items.length === 0 && // no arguments
      !ast.arguments.variant.cst.children().some((child) => isComment(child)) // no comments
    ) {
      this.arguments = undefined;
    }
  }

  print({ path, print }) {
    return [
      path.call(print, 'name'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
