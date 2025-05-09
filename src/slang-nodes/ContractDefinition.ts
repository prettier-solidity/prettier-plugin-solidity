import { doc } from 'prettier';
import { coerce, satisfies } from 'semver';
import optionsStore from '../options-store.js';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ContractSpecifiers } from './ContractSpecifiers.js';
import { ContractMembers } from './ContractMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, line } = doc.builders;

export class ContractDefinition implements SlangNode {
  readonly kind = NonterminalKind.ContractDefinition;

  comments;

  loc;

  abstractKeyword?: string;

  name: Identifier;

  specifiers: ContractSpecifiers;

  members: ContractMembers;

  constructor(ast: ast.ContractDefinition) {
    let metadata = getNodeMetadata(ast);

    this.abstractKeyword = ast.abstractKeyword?.unparse();
    this.name = new Identifier(ast.name);
    this.specifiers = new ContractSpecifiers(ast.specifiers);
    this.members = new ContractMembers(ast.members);

    metadata = updateMetadata(metadata, [this.specifiers, this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.cleanModifierInvocationArguments();
  }

  cleanModifierInvocationArguments(): void {
    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    const compiler = coerce(optionsStore.get('options')!.compiler);
    if (compiler && !satisfies(compiler, '>=0.5.0')) {
      for (const member of this.members.items) {
        if (
          member.variant.kind === NonterminalKind.FunctionDefinition &&
          member.variant.name.variant.value !== this.name.value
        ) {
          member.variant.cleanModifierInvocationArguments();
        }
      }
    }
  }

  print(path: AstPath<ContractDefinition>, print: PrintFunction): Doc {
    return [
      group([
        this.abstractKeyword ? 'abstract ' : '',
        'contract ',
        path.call(print, 'name'),
        path.call(print, 'specifiers'),
        this.specifiers.items.length > 0 ? '' : line,
        '{'
      ]),
      path.call(print, 'members'),
      '}'
    ];
  }
}
