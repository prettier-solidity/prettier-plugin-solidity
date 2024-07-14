import { SlangNode } from './SlangNode.js';

export class EventDefinition extends SlangNode {
  eventKeyword;

  name;

  parameters;

  anonymousKeyword;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      `${this.eventKeyword} ${this.name}`,
      path.call(print, 'parameters'),
      this.anonymousKeyword ? ` ${this.anonymousKeyword}` : '',
      this.semicolon
    ];
  }
}
