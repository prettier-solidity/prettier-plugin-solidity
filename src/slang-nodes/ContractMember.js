import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { UsingDirective } from './UsingDirective.js';
import { FunctionDefinition } from './FunctionDefinition.js';
import { ConstructorDefinition } from './ConstructorDefinition.js';
import { ReceiveFunctionDefinition } from './ReceiveFunctionDefinition.js';
import { FallbackFunctionDefinition } from './FallbackFunctionDefinition.js';
import { UnnamedFunctionDefinition } from './UnnamedFunctionDefinition.js';
import { ModifierDefinition } from './ModifierDefinition.js';
import { StructDefinition } from './StructDefinition.js';
import { EnumDefinition } from './EnumDefinition.js';
import { EventDefinition } from './EventDefinition.js';
import { StateVariableDefinition } from './StateVariableDefinition.js';
import { ErrorDefinition } from './ErrorDefinition.js';
import { UserDefinedValueTypeDefinition } from './UserDefinedValueTypeDefinition.js';

const variants = {
  UsingDirective,
  FunctionDefinition,
  ConstructorDefinition,
  ReceiveFunctionDefinition,
  FallbackFunctionDefinition,
  UnnamedFunctionDefinition,
  ModifierDefinition,
  StructDefinition,
  EnumDefinition,
  EventDefinition,
  StateVariableDefinition,
  ErrorDefinition,
  UserDefinedValueTypeDefinition
};

export class ContractMember extends SlangNode {
  get kind() {
    return NonterminalKind.ContractMember;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant: new variants[ast.variant.cst.kind](
        ast.variant,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
