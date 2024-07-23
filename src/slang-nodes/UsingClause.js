import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

const variants = { IdentifierPath, UsingDeconstruction };

export class UsingClause extends SlangNode {
  get kind() {
    return NonterminalKind.UsingClause;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      variant: new variants[ast.variant.cst.kind](
        ast.variant,
        offsets[0],
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
