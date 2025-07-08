import { doc } from 'prettier';
import { satisfies } from 'semver';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ContractSpecifiers } from './ContractSpecifiers.js';
import { ContractMembers } from './ContractMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
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

  constructor(ast: ast.ContractDefinition, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    this.abstractKeyword = ast.abstractKeyword?.unparse();
    this.name = new Identifier(ast.name);
    this.specifiers = new ContractSpecifiers(ast.specifiers, options);
    this.members = new ContractMembers(ast.members, options);

    [this.loc, this.comments] = updateMetadata(metadata, [
      this.specifiers,
      this.members
    ]);

    this.cleanModifierInvocationArguments(options);
  }

  cleanModifierInvocationArguments(options: ParserOptions<AstNode>): void {
    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    if (!satisfies(options.compiler, '>=0.5.0')) {
      for (const { variant: member } of this.members.items) {
        if (
          member.kind === NonterminalKind.FunctionDefinition &&
          member.name.variant.value !== this.name.value
        ) {
          member.cleanModifierInvocationArguments();
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
