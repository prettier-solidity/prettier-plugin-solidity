import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { joinExisting } from '../slang-utils/join-existing.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group } = doc.builders;

export class Parameter extends SlangNode {
  readonly kind = NonterminalKind.Parameter;

  typeName: TypeName;

  storageLocation?: StorageLocation;

  name?: TerminalNode;

  constructor(ast: ast.Parameter, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new TypeName(ast.typeName, options);
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation);
    }
    if (ast.name) {
      this.name = new TerminalNode(ast.name);
    }

    this.updateMetadata(this.typeName, this.storageLocation);
  }

  print(path: AstPath<Parameter>, print: PrintFunction): Doc {
    return group(
      joinExisting(' ', [
        printVariant('typeName', path, print),
        path.call(print, 'storageLocation'),
        path.call(print, 'name')
      ])
    );
  }
}
