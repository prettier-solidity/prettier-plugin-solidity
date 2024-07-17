import { SlangNode } from './SlangNode.js';
import { ExperimentalFeature } from './ExperimentalFeature.js';

export class ExperimentalPragma extends SlangNode {
  experimentalKeyword;

  feature;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { experimentalKeyword, feature } = ast;
      this.experimentalKeyword = experimentalKeyword.text;
      this.feature = new ExperimentalFeature(
        feature,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [`${this.experimentalKeyword} `, path.call(print, 'feature')];
  }
}
