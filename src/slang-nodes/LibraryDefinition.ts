import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { satisfies } from 'semver';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { LibraryMembers } from './LibraryMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { group, line } = doc.builders;

export class LibraryDefinition extends SlangNode {
  readonly kind = NonterminalKind.LibraryDefinition;

  name: TerminalNode;

  members: LibraryMembers;

  constructor(
    ast: ast.LibraryDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    this.members = new LibraryMembers(ast.members, collected, options);

    this.updateMetadata(this.members);

    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    // So we delegate to the parents the responsibility of cleaning the
    // arguments of modifier invocations.
    if (!satisfies(options.compiler, '>=0.5.0')) {
      for (const member of this.members.items) {
        if (member.kind === NonterminalKind.FunctionDefinition) {
          member.cleanModifierInvocationArguments();
        }
      }
    }
  }

  print(path: AstPath<LibraryDefinition>, print: PrintFunction): Doc {
    return [
      group(['library ', print('name'), line, '{']),
      print('members'),
      '}'
    ];
  }
}
