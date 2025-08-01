import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ArrayTypeName } from './ArrayTypeName.js';
import { FunctionType } from './FunctionType.js';
import { MappingType } from './MappingType.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.TypeName['variant'],
  options: ParserOptions<AstNode>
): TypeName['variant'] {
  if (variant instanceof ast.ArrayTypeName) {
    return new ArrayTypeName(variant, options);
  }
  if (variant instanceof ast.FunctionType) {
    return new FunctionType(variant, options);
  }
  if (variant instanceof ast.MappingType) {
    return new MappingType(variant, options);
  }
  if (variant instanceof ast.ElementaryType) {
    return new ElementaryType(variant);
  }
  if (variant instanceof ast.IdentifierPath) {
    return new IdentifierPath(variant);
  }
  const exhaustiveCheck: never = variant;
  return exhaustiveCheck;
}

export class TypeName extends SlangNode {
  readonly kind = NonterminalKind.TypeName;

  variant:
    | ArrayTypeName
    | FunctionType
    | MappingType
    | ElementaryType
    | IdentifierPath;

  constructor(ast: ast.TypeName, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<TypeName>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
