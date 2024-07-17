import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { FunctionName } from './FunctionName.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionAttributes } from './FunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

export class FunctionDefinition extends SlangNode {
  functionKeyword;

  name;

  parameters;

  attributes;

  returns;

  body;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { functionKeyword, name, parameters, attributes, returns, body } =
        ast;
      this.functionKeyword = functionKeyword.text;
      this.name = new FunctionName(
        name,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.parameters = new ParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.attributes = new FunctionAttributes(
        attributes,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      if (returns) {
        this.returns = new ReturnsDeclaration(
          returns,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.body = new FunctionBody(
        body,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);

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
