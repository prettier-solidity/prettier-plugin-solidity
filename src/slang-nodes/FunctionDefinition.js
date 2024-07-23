import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { FunctionName } from './FunctionName.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionAttributes } from './FunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

export class FunctionDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.FunctionDefinition;
  }

  functionKeyword;

  name;

  parameters;

  attributes;

  returns;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = 2;
      const children = {
        functionKeyword: ast.functionKeyword.text,
        name: new FunctionName(ast.name, offsets[0], options),
        parameters: new ParametersDeclaration(
          ast.parameters,
          offsets[1],
          options
        ),
        attributes: new FunctionAttributes(ast.attributes, offsets[2], options),
        returns: ast.returns
          ? new ReturnsDeclaration(ast.returns, offsets[(i += 1)], options)
          : undefined,
        body: new FunctionBody(ast.body, offsets[(i += 1)], options)
      };
      return children;
    };

    this.initialize(ast, offset, fetch);

    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    const compiler = coerce(options.compiler);
    if (compiler && satisfies(compiler, '>=0.5.0')) {
      this.cleanModifierInvocationArguments();
    }
  }

  cleanModifierInvocationArguments() {
    this.attributes.items.forEach((attribute) => {
      if (attribute.variant.kind === 'ModifierInvocation') {
        attribute.variant.cleanModifierInvocationArguments();
      }
    });
  }

  print(path, print) {
    return printFunction(
      [`${this.functionKeyword} `, path.call(print, 'name')],
      this,
      path,
      print
    );
  }
}
