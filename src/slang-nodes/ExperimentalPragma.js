import { SlangNode } from './SlangNode.js';
import { ExperimentalFeature } from './ExperimentalFeature.js';

export class ExperimentalPragma extends SlangNode {
  experimentalKeyword;

  feature;

  constructor({ ast, offset, options }) {
    super(ast, offset);
    this.experimentalKeyword = ast.experimentalKeyword.text;
    this.feature = new ExperimentalFeature({
      ast: ast.feature,
      offset: this.nextChildOffset,
      options
    });
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [`${this.experimentalKeyword} `, path.call(print, 'feature')];
  }
}
