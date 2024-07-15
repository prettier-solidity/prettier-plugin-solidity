import { SlangNode } from './SlangNode.js';

export class ExperimentalPragma extends SlangNode {
  experimentalKeyword;

  feature;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [`${this.experimentalKeyword} `, path.call(print, 'feature')];
  }
}
