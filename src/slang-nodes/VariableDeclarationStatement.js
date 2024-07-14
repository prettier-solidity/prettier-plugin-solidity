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
    this.storageLocation = ast.storageLocation
      ? parse(ast.storageLocation, this.nextChildOffset)
      : undefined;
    this.name = ast.name.text;
    this.value = ast.value ? parse(ast.value, this.nextChildOffset) : undefined;
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
