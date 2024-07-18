import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { VariableDeclarationType } from './VariableDeclarationType.js';
import { StorageLocation } from './StorageLocation.js';
import { VariableDeclarationValue } from './VariableDeclarationValue.js';

const { group, indent, indentIfBreak, line } = doc.builders;

export class VariableDeclarationStatement extends SlangNode {
  get kind() {
    return NonterminalKind.VariableDeclarationStatement;
  }

  variableType;

  storageLocation;

  name;

  value;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variableType: new VariableDeclarationType(
        ast.variableType,
        childrenOffsets.shift(),
        options
      ),
      storageLocation: ast.storageLocation
        ? new StorageLocation(
            ast.storageLocation,
            childrenOffsets.shift(),
            options
          )
        : undefined,
      name: ast.name.text,
      value: ast.value
        ? new VariableDeclarationValue(
            ast.value,
            childrenOffsets.shift(),
            options
          )
        : undefined,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
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
