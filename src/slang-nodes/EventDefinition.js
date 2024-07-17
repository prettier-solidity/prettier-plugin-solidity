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

    const fetch = (childrenOffsets) => {
      const { eventKeyword, name, parameters, anonymousKeyword, semicolon } =
        ast;
      this.eventKeyword = eventKeyword.text;
      this.name = name.text;
      this.parameters = new EventParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.anonymousKeyword = anonymousKeyword?.text;
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch);
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
