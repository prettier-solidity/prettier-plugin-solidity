import { SlangNode } from './SlangNode.js';
import { ABICoderPragma } from './ABICoderPragma.js';
import { ExperimentalPragma } from './ExperimentalPragma.js';
import { VersionPragma } from './VersionPragma.js';

const variants = { ABICoderPragma, ExperimentalPragma, VersionPragma };

export class Pragma extends SlangNode {
  variant;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.variant = new variants[ast.variant.cst.kind]({
      ast: ast.variant,
      parse,
      offset: this.nextChildOffset
    });
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return path.call(print, 'variant');
  }
}
