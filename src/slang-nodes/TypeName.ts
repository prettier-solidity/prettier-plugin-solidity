import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ArrayTypeName } from './ArrayTypeName.js';
import { FunctionType } from './FunctionType.js';
import { MappingType } from './MappingType.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.TypeName['variant'],
  options: ParserOptions<AstNode>
): TypeName['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.ArrayTypeName:
      return new ArrayTypeName(variant as ast.ArrayTypeName, options);
    case NonterminalKind.FunctionType:
      return new FunctionType(variant as ast.FunctionType, options);
    case NonterminalKind.MappingType:
      return new MappingType(variant as ast.MappingType, options);
    case NonterminalKind.ElementaryType:
      return new ElementaryType(variant as ast.ElementaryType);
    case NonterminalKind.IdentifierPath:
      return new IdentifierPath(variant as ast.IdentifierPath);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
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
