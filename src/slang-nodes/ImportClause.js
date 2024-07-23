import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

const variants = { PathImport, NamedImport, ImportDeconstruction };

export class ImportClause extends SlangNode {
  get kind() {
    return NonterminalKind.ImportClause;
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
