import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { VariableDeclarationType } from './VariableDeclarationType.js';
import { StorageLocation } from './StorageLocation.js';
import { VariableDeclarationValue } from './VariableDeclarationValue.js';

const { group, indent, indentIfBreak, line } = doc.builders;

export class VariableDeclarationStatement extends SlangNode {
  variableType;

  storageLocation;

  name;

  value;

  semicolon;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { variableType, storageLocation, name, value, semicolon } = ast;
      this.variableType = new VariableDeclarationType(
        variableType,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      if (storageLocation) {
        this.storageLocation = new StorageLocation(
          storageLocation,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.name = name.text;
      if (value) {
        this.value = new VariableDeclarationValue(
          value,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    const declarationDoc = group(
      [
        path.call(print, 'variableType'),
        indent([
          this.storageLocation
            ? [line, path.call(print, 'storageLocation')]
            : '',
          ` ${this.name}`
        ])
      ],
      { id: 'VariableDeclarationStatement.variables' }
    );

    return [
      declarationDoc,
      indentIfBreak(this.value ? path.call(print, 'value') : '', {
        groupId: declarationDoc.id
      }),
      this.semicolon
    ];
  }
}
