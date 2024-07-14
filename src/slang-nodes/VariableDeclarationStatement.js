import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, indent, indentIfBreak, line } = doc.builders;

export class VariableDeclarationStatement extends SlangNode {
  variableType;

  storageLocation;

  name;

  value;

  semicolon;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.variableType = parse(ast.variableType, this.nextChildOffset);
    if (ast.storageLocation) {
      this.storageLocation = parse(ast.storageLocation, this.nextChildOffset);
    }
    this.name = ast.name.text;
    if (ast.value) {
      this.value = parse(ast.value, this.nextChildOffset);
    }
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
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
