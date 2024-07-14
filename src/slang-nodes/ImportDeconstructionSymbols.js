import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line, softline } = doc.builders;

export class ImportDeconstructionSymbols extends SlangNode {
  items;

  separators;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print, options) {
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
}
