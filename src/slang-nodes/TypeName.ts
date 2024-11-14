import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ArrayTypeName } from './ArrayTypeName.js';
import { FunctionType } from './FunctionType.js';
import { MappingType } from './MappingType.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class TypeName implements SlangNode {
  readonly kind = NonterminalKind.TypeName;

  comments;

  loc;

  variant:
    | ArrayTypeName
    | FunctionType
    | MappingType
    | ElementaryType
    | IdentifierPath;

  constructor(ast: ast.TypeName, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.ArrayTypeName:
        this.variant = new ArrayTypeName(
          ast.variant as ast.ArrayTypeName,
          options
        );
        break;
      case NonterminalKind.FunctionType:
        this.variant = new FunctionType(
          ast.variant as ast.FunctionType,
          options
        );
        break;
      case NonterminalKind.MappingType:
        this.variant = new MappingType(ast.variant as ast.MappingType, options);
        break;
      case NonterminalKind.ElementaryType:
        this.variant = new ElementaryType(ast.variant as ast.ElementaryType);
        break;
      case NonterminalKind.IdentifierPath:
        this.variant = new IdentifierPath(ast.variant as ast.IdentifierPath);
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TypeName>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
