import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { postProcessFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { FunctionAttribute } from './FunctionAttribute.js';

const { line } = doc.builders;

export class FunctionAttributes extends SlangNode {
  get kind() {
    return NonterminalKind.FunctionAttributes;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      items: ast.items.map(
        (item, index) => new FunctionAttribute(item, offsets[index], options)
      )
    });

    this.initialize(ast, offset, fetch, postProcessFunctionAttributes);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
