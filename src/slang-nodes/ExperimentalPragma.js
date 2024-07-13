import { SlangNode } from './SlangNode.js';
import { ExperimentalFeature } from './ExperimentalFeature.js';

export class ExperimentalPragma extends SlangNode {
  experimentalKeyword;

  feature;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.experimentalKeyword = ast.experimentalKeyword.text;
    this.feature = new ExperimentalFeature(
      ast.feature,
      this.nextChildOffset,
      options
    );
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [`${this.experimentalKeyword} `, path.call(print, 'feature')];
  }
}
