import { doc } from 'prettier';
import { coerce, satisfies } from 'semver';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
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

  inheritance?: InheritanceSpecifier;

  members: ContractMembers;

  constructor(ast: ast.ContractDefinition, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.abstractKeyword = ast.abstractKeyword?.unparse();
    this.name = new Identifier(ast.name);
    if (ast.inheritance) {
      this.inheritance = new InheritanceSpecifier(ast.inheritance, options);
    }
    this.members = new ContractMembers(ast.members, options);

    metadata = updateMetadata(metadata, [this.inheritance, this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.cleanModifierInvocationArguments(options);
  }

  cleanModifierInvocationArguments(options: ParserOptions<AstNode>): void {
    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    const compiler = coerce(options.compiler);
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
        this.inheritance ? [' ', path.call(print, 'inheritance')] : line,
        '{'
      ]),
      path.call(print, 'members'),
      '}'
    ];
  }
}
