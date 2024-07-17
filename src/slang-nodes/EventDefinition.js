import { SlangNode } from './SlangNode.js';
import { EventParametersDeclaration } from './EventParametersDeclaration.js';

export class EventDefinition extends SlangNode {
  eventKeyword;

  name;

  parameters;

  anonymousKeyword;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      eventKeyword: ast.eventKeyword.text,
      name: ast.name.text,
      parameters: new EventParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        comments,
        options
      ),
      anonymousKeyword: ast.anonymousKeyword?.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
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
