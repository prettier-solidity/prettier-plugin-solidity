import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

const { dedent, line } = doc.builders;

export class YulLabel extends SlangNode {
  get kind() {
    return NonterminalKind.YulLabel;
  }

  label;

  colon;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      label: ast.label.text,
      colon: ast.colon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return [dedent(line), `${this.label}${this.colon}`];
  }
}
