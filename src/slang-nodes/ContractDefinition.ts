import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { satisfies } from 'semver';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { ContractSpecifiers } from './ContractSpecifiers.js';
import { ContractMembers } from './ContractMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { group, line } = doc.builders;

export class ContractDefinition extends SlangNode {
  readonly kind = NonterminalKind.ContractDefinition;

  abstractKeyword?: string;

  name: TerminalNode;

  specifiers: ContractSpecifiers;

  members: ContractMembers;

  constructor(
    ast: ast.ContractDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.abstractKeyword = ast.abstractKeyword?.unparse();
    this.name = new TerminalNode(ast.name, collected);
    this.specifiers = new ContractSpecifiers(
      ast.specifiers,
      collected,
      options
    );
    this.members = new ContractMembers(ast.members, collected, options);

    this.updateMetadata(this.specifiers, this.members);

    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    // So we delegate to the parents the responsibility of cleaning the
    // arguments of modifier invocations.
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
        print('name'),
        print('specifiers'),
        this.specifiers.items.length > 0 ? '' : line,
        '{'
      ]),
      print('members'),
      '}'
    ];
  }
}
