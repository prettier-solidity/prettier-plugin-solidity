import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line, softline } = doc.builders;

export class UsingDeconstructionSymbols extends SlangNode {
  items;

  separators;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.items = ast.items.map((item) =>
      parse(item, parse, this.nextChildOffset)
    );
    this.separators = ast.separators.map((separator) => separator.text);
    this.initiateLoc(ast);
  }

  print({ path, print, options }) {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
