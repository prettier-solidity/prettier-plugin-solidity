import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { SlangNode } from './SlangNode.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { ContractMembers } from './ContractMembers.js';

const { group, line } = doc.builders;

export class ContractDefinition extends SlangNode {
  abstractKeyword;

  contractKeyword;

  name;

  inheritance;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      abstractKeyword: ast.abstractKeyword?.text,
      contractKeyword: ast.contractKeyword.text,
      name: ast.name.text,
      inheritance: ast.inheritance
        ? new InheritanceSpecifier(
            ast.inheritance,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      openBrace: ast.openBrace.text,
      members: new ContractMembers(
        ast.members,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch, comments);

    this.cleanModifierInvocationArguments(options);
  }

  cleanModifierInvocationArguments(options) {
    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    const compiler = coerce(options.compiler);
    if (compiler && !satisfies(compiler, '>=0.5.0')) {
      this.members.items.forEach((member) => {
        if (
          member.variant.kind === 'FunctionDefinition' &&
          member.variant.name.variant !== this.name
        ) {
          member.variant.cleanModifierInvocationArguments();
        }
      });
    }
  }

  print(path, print) {
    return [
      group([
        `${this.abstractKeyword ? `${this.abstractKeyword} ` : ''}${this.contractKeyword} ${this.name}`,
        this.inheritance ? [' ', path.call(print, 'inheritance')] : line,
        this.openBrace
      ]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
