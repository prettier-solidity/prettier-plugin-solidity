import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class TryStatement extends SlangNode {
  tryKeyword;

  expression;

  returns;

  body;

  catchClauses;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.tryKeyword = ast.tryKeyword.text;
    this.expression = parse(ast.expression, parse, this.nextChildOffset);
    this.returns = ast.returns
      ? parse(ast.returns, parse, this.nextChildOffset)
      : undefined;
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.catchClauses = parse(ast.catchClauses, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      this.tryKeyword,
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      }),
      this.returns ? [path.call(print, 'returns'), ' '] : '',
      path.call(print, 'body'),
      ' ',
      path.call(print, 'catchClauses')
    ];
  }
}
