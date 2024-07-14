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

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.tryKeyword = ast.tryKeyword.text;
    this.expression = parse(ast.expression, this.nextChildOffset);
    this.returns = ast.returns
      ? parse(ast.returns, this.nextChildOffset)
      : undefined;
    this.body = parse(ast.body, this.nextChildOffset);
    this.catchClauses = parse(ast.catchClauses, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
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
