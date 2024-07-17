import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { StringLiterals } from './StringLiterals.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { HexStringLiterals } from './HexStringLiterals.js';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.js';

const variants = {
  StringLiteral,
  StringLiterals,
  HexStringLiteral,
  HexStringLiterals,
  UnicodeStringLiterals
};

export class StringExpression extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();
    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant = new variants[variant.cst.kind](
        variant,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
