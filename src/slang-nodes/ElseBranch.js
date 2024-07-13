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

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.elseKeyword = ast.elseKeyword.text;
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [this.elseKeyword, printBody(this.body.variant.kind, path, print)];
  }
}
