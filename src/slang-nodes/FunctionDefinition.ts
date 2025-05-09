import { coerce, satisfies } from 'semver';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import optionsStore from '../options-store.js';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { FunctionName } from './FunctionName.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionAttributes } from './FunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class FunctionDefinition implements SlangNode {
  readonly kind = NonterminalKind.FunctionDefinition;

  comments;

  loc;

  name: FunctionName;

  parameters: ParametersDeclaration;

  attributes: FunctionAttributes;

  returns?: ReturnsDeclaration;

  body: FunctionBody;

  constructor(ast: ast.FunctionDefinition) {
    let metadata = getNodeMetadata(ast);

    this.name = new FunctionName(ast.name);
    this.parameters = new ParametersDeclaration(ast.parameters);
    this.attributes = new FunctionAttributes(ast.attributes);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns);
    }
    this.body = new FunctionBody(ast.body);

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
    const compiler = coerce(optionsStore.get('options')!.compiler);
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
