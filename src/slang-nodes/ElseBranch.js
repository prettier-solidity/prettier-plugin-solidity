import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

const printBody = (bodyVariantKind, path, print) =>
  bodyVariantKind === 'Block' || bodyVariantKind === 'IfStatement'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export class ElseBranch extends SlangNode {
  elseKeyword;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [this.elseKeyword, printBody(this.body.variant.kind, path, print)];
  }
}
