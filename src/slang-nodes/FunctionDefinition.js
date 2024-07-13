import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class FunctionDefinition extends SlangNode {
  functionKeyword;

  name;

  parameters;

  attributes;

  returns;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.functionKeyword = ast.functionKeyword.text;
    this.name = parse(ast.name, parse, this.nextChildOffset);
    this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
    this.attributes = parse(ast.attributes, parse, this.nextChildOffset);
    this.returns = ast.returns
      ? parse(ast.returns, parse, this.nextChildOffset)
      : undefined;
    this.body = parse(ast.body, parse, this.nextChildOffset);

    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    const compiler = coerce(options.compiler);
    if (compiler && satisfies(compiler, '>=0.5.0')) {
      this.cleanModifierInvocationArguments();
    }
    this.initiateLoc(ast);
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
