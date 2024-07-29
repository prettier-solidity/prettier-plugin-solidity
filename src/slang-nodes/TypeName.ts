import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { ArrayTypeName } from './ArrayTypeName.js';
import { FunctionType } from './FunctionType.js';
import { MappingType } from './MappingType.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

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

  constructor(ast: ast.TypeName, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case 'ArrayTypeName':
        this.variant = new ArrayTypeName(
          ast.variant as ast.ArrayTypeName,
          offsets[0],
          options
        );
        break;
      case 'FunctionType':
        this.variant = new FunctionType(
          ast.variant as ast.FunctionType,
          offsets[0],
          options
        );
        break;
      case 'MappingType':
        this.variant = new MappingType(
          ast.variant as ast.MappingType,
          offsets[0],
          options
        );
        break;
      case 'ElementaryType':
        this.variant = new ElementaryType(
          ast.variant as ast.ElementaryType,
          offsets[0]
        );
        break;
      case 'IdentifierPath':
        this.variant = new IdentifierPath(
          ast.variant as ast.IdentifierPath,
          offsets[0]
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
