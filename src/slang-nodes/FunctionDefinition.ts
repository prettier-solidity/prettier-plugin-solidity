import { coerce, satisfies } from 'semver';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { FunctionName } from './FunctionName.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionAttributes } from './FunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class FunctionDefinition implements SlangNode {
  readonly kind = NonterminalKind.FunctionDefinition;

  comments;

  loc;

  name: FunctionName;

  parameters: ParametersDeclaration;

  attributes: FunctionAttributes;

  returns?: ReturnsDeclaration;

  body: FunctionBody;

  constructor(
    ast: ast.FunctionDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new FunctionName(ast.name, offsets[0]);
    this.parameters = new ParametersDeclaration(
      ast.parameters,
      offsets[1],
      options
    );
    this.attributes = new FunctionAttributes(
      ast.attributes,
      offsets[2],
      options
    );
    let i = 3;
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, offsets[i], options);
      i += 1;
    }
    this.body = new FunctionBody(ast.body, offsets[i], options);

    metadata = updateMetadata(metadata, [
      this.name,
      this.parameters,
      this.attributes,
      this.returns,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    const compiler = coerce(options.compiler);
    if (compiler && satisfies(compiler, '>=0.5.0')) {
      this.cleanModifierInvocationArguments();
    }
  }

  cleanModifierInvocationArguments(): void {
    for (const attribute of this.attributes.items) {
      if (
        typeof attribute.variant !== 'string' &&
        attribute.variant.kind === NonterminalKind.ModifierInvocation
      ) {
        attribute.variant.cleanModifierInvocationArguments();
      }
    }
  }

  print(path: AstPath<FunctionDefinition>, print: PrintFunction): Doc {
    return printFunction(
      ['function ', path.call(print, 'name')],
      this,
      path,
      print
    );
  }
}
