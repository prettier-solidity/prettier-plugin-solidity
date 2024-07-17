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

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      functionKeyword: ast.functionKeyword.text,
      name: new FunctionName(
        ast.name,
        childrenOffsets.shift(),
        comments,
        options
      ),
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        comments,
        options
      ),
      attributes: new FunctionAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        comments,
        options
      ),
      returns: ast.returns
        ? new ReturnsDeclaration(
            ast.returns,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      body: new FunctionBody(
        ast.body,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);

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
