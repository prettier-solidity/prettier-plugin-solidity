import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ABICoderPragma } from './ABICoderPragma.js';
import { ExperimentalPragma } from './ExperimentalPragma.js';
import { VersionPragma } from './VersionPragma.js';

const variants = { ABICoderPragma, ExperimentalPragma, VersionPragma };
export class Pragma extends SlangNode {
  get kind() {
    return NonterminalKind.Pragma;
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
