import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { dedent, line } = doc.builders;

export class YulLabel extends SlangNode {
  label;

  colon;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      label: ast.label.text,
      colon: ast.colon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return [dedent(line), `${this.label}${this.colon}`];
  }
}
