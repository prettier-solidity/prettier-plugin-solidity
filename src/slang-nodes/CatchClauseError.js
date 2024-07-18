import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

const { group } = doc.builders;

export class CatchClauseError extends SlangNode {
  get kind() {
    return NonterminalKind.CatchClauseError;
  }

  name;

  parameters;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: ast.name?.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.name ?? ''}`, group(path.call(print, 'parameters')), ' '];
  }
}
