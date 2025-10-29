import { doc } from 'prettier';
import { satisfies } from 'semver';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ContractSpecifiers } from './ContractSpecifiers.js';
import { ContractMembers } from './ContractMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { group, line } = doc.builders;

export class ContractDefinition extends SlangNode {
  readonly kind = NonterminalKind.ContractDefinition;

  abstractKeyword?: string;

  name: TerminalNode;

  specifiers: ContractSpecifiers;

  members: ContractMembers;

  constructor(ast: ast.ContractDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.abstractKeyword = ast.abstractKeyword?.unparse();
    this.name = new TerminalNode(ast.name);
    this.specifiers = new ContractSpecifiers(ast.specifiers, options);
    this.members = new ContractMembers(ast.members, options);

    this.updateMetadata(this.specifiers, this.members);

    this.cleanModifierInvocationArguments(options);
  }

  cleanModifierInvocationArguments(options: ParserOptions<AstNode>): void {
    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    if (!satisfies(options.compiler, '>=0.5.0')) {
      for (const member of this.members.items) {
        if (
          member.kind === NonterminalKind.FunctionDefinition &&
          member.name.value !== this.name.value
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
