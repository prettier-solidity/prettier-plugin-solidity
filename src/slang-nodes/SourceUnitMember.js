import { SlangNode } from './SlangNode.js';
import { PragmaDirective } from './PragmaDirective.js';
import { ImportDirective } from './ImportDirective.js';
import { ContractDefinition } from './ContractDefinition.js';
import { InterfaceDefinition } from './InterfaceDefinition.js';
import { LibraryDefinition } from './LibraryDefinition.js';
import { StructDefinition } from './StructDefinition.js';
import { EnumDefinition } from './EnumDefinition.js';
import { FunctionDefinition } from './FunctionDefinition.js';
import { ConstantDefinition } from './ConstantDefinition.js';
import { ErrorDefinition } from './ErrorDefinition.js';
import { UserDefinedValueTypeDefinition } from './UserDefinedValueTypeDefinition.js';
import { UsingDirective } from './UsingDirective.js';
import { EventDefinition } from './EventDefinition.js';

const variants = {
  PragmaDirective,
  ImportDirective,
  ContractDefinition,
  InterfaceDefinition,
  LibraryDefinition,
  StructDefinition,
  EnumDefinition,
  FunctionDefinition,
  ConstantDefinition,
  ErrorDefinition,
  UserDefinedValueTypeDefinition,
  UsingDirective,
  EventDefinition
};

export class SourceUnitMember extends SlangNode {
  variant;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.variant = new variants[ast.variant.cst.kind]({
      ast: ast.variant,
      parse,
      offset: this.nextChildOffset,
      options
    });
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return path.call(print, 'variant');
  }
}
