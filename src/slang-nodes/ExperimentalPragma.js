import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ExperimentalFeature } from './ExperimentalFeature.js';

export class ExperimentalPragma extends SlangNode {
  get kind() {
    return NonterminalKind.ExperimentalPragma;
  }

  experimentalKeyword;

  feature;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      experimentalKeyword: ast.experimentalKeyword.text,
      feature: new ExperimentalFeature(ast.feature, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.experimentalKeyword} `, path.call(print, 'feature')];
  }
}
