import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { ContractMembers } from './ContractMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

const { group, line } = doc.builders;

export class ContractDefinition implements SlangNode {
  readonly kind = NonterminalKind.ContractDefinition;

  comments;

  loc;

  abstractKeyword?: string;

  name: string;

  inheritance?: InheritanceSpecifier;

  members: ContractMembers;

  constructor(
    ast: ast.ContractDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.abstractKeyword = ast.abstractKeyword?.text;
    this.name = ast.name.text;
    let i = 0;
    if (ast.inheritance) {
      this.inheritance = new InheritanceSpecifier(
        ast.inheritance,
        offsets[i],
        options
      );
      i += 1;
    }
    this.members = new ContractMembers(ast.members, offsets[i], options);

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
          member.variant.name.variant !== this.name
        ) {
          member.variant.cleanModifierInvocationArguments();
        }
      }
    }
  }

  print(
    path: AstPath<ContractDefinition>,
    print: (path: AstPath<AstNode | undefined>) => Doc
  ): Doc {
    return [
      group([
        this.abstractKeyword ? 'abstract ' : '',
        `contract ${this.name}`,
        this.inheritance ? [' ', path.call(print, 'inheritance')] : line,
        '{'
      ]),
      path.call(print, 'members'),
      '}'
    ];
  }
}
