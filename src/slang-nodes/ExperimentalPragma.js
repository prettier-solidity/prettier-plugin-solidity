import { SlangNode } from './SlangNode.js';

export class ExperimentalPragma extends SlangNode {
  experimentalKeyword;

  feature;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [`${this.experimentalKeyword} `, path.call(print, 'feature')];
  }
}
