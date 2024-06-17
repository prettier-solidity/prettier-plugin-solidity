import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { printSeparatedList } from '../common/printer-helpers.js';

const { line, softline } = doc.builders;

export const ImportDeconstructionSymbols = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets)),
    separators: ast.separators.map((separator) => separator.text)
  }),
  print: ({ path, print, options }) => {
    const compiler = coerce(options.compiler);
    let firstSeparator;
    let separator;

    if (compiler && satisfies(compiler, '>=0.7.4')) {
      // if the compiler exists and is greater than or equal to 0.7.4 we will
      // split the ImportDirective.
      firstSeparator = options.bracketSpacing ? line : softline;
      separator = [',', line];
    } else {
      // if the compiler is not given or is lower than 0.7.4 we will not
      // split the ImportDirective.
      firstSeparator = options.bracketSpacing ? ' ' : '';
      separator = ', ';
    }
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator,
      separator
    });
  }
};
