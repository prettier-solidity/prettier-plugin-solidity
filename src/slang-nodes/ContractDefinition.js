import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { SlangNode } from './SlangNode.js';

const { group, line } = doc.builders;

export class ContractDefinition extends SlangNode {
  abstractKeyword;

  contractKeyword;

  name;

  inheritance;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.cleanModifierInvocationArguments(options);
    this.initializeLoc(ast);
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
