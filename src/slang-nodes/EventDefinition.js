import { SlangNode } from './SlangNode.js';

export class EventDefinition extends SlangNode {
  eventKeyword;

  name;

  parameters;

  anonymousKeyword;

  semicolon;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.eventKeyword = ast.eventKeyword.text;
    this.name = ast.name.text;
    this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
    this.anonymousKeyword = ast.anonymousKeyword?.text;
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      `${this.eventKeyword} ${this.name}`,
      path.call(print, 'parameters'),
      this.anonymousKeyword ? ` ${this.anonymousKeyword}` : '',
      this.semicolon
    ];
  }
}
