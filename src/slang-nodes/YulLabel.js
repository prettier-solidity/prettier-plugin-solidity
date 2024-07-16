import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { dedent, line } = doc.builders;

export class YulLabel extends SlangNode {
  label;

  colon;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return [dedent(line), `${this.label}${this.colon}`];
  }
}
