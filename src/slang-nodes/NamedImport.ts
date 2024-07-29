import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { ImportAlias } from './ImportAlias.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class NamedImport implements SlangNode {
  readonly kind = NonterminalKind.NamedImport;

  comments;

  loc;

  asterisk: string;

  alias: ImportAlias;

  fromKeyword: string;

  path: StringLiteral;

  constructor(ast: ast.NamedImport, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.asterisk = ast.asterisk.text;
    this.alias = new ImportAlias(ast.alias, offsets[0]);
    this.fromKeyword = ast.fromKeyword.text;
    this.path = new StringLiteral(ast.path, offsets[1], options);

    metadata = updateMetadata(metadata, [this.alias, this.path]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      this.asterisk,
      path.call(print, 'alias'),
      ` ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
