import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { PathImport } from './PathImport.js';
import { NamedImport } from './NamedImport.js';
import { ImportDeconstruction } from './ImportDeconstruction.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const keys = [ast.PathImport, ast.NamedImport, ast.ImportDeconstruction];
const constructors = [PathImport, NamedImport, ImportDeconstruction];

const variantConstructors = new Map<string, (typeof constructors)[number]>(
  keys.map((key, index) => [key.name, constructors[index]])
);

function createNonterminalVariant(
  variant: ast.ImportClause['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): ImportClause['variant'] {
  const variantConstructor = variantConstructors.get(variant.constructor.name);
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
}

export class ImportClause extends SlangNode {
  readonly kind = NonterminalKind.ImportClause;

  variant: PathImport | NamedImport | ImportDeconstruction;

  constructor(
    ast: ast.ImportClause,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
