import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { dedent, line } = doc.builders;

export class YulLabel extends SlangNode {
  label;

  colon;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { label, colon } = ast;
      this.label = label.text;
      this.colon = colon.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return [dedent(line), `${this.label}${this.colon}`];
  }
}
