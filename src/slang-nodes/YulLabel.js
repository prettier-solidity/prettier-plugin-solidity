import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { dedent, line } = doc.builders;
export class YulLabel extends SlangNode {
  label;

  colon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return [dedent(line), `${this.label}${this.colon}`];
  }
}
