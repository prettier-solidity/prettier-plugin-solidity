import { SlangNode } from './SlangNode.js';

export class ExperimentalPragma extends SlangNode {
  experimentalKeyword;

  feature;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.experimentalKeyword = ast.experimentalKeyword.text;
    this.feature = parse(ast.feature, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [`${this.experimentalKeyword} `, path.call(print, 'feature')];
  }
}
