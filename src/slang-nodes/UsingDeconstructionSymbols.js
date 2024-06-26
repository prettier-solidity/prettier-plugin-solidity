import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { line, softline } = doc.builders;

export const UsingDeconstructionSymbols = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ path, print, options }) =>
    printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    })
};
