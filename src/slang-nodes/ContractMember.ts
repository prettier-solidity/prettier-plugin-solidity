import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
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

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.ContractMember,
  ContractMember
>([
  [ast.UsingDirective, UsingDirective],
  [ast.FunctionDefinition, FunctionDefinition],
  [ast.ConstructorDefinition, ConstructorDefinition],
  [ast.ReceiveFunctionDefinition, ReceiveFunctionDefinition],
  [ast.FallbackFunctionDefinition, FallbackFunctionDefinition],
  [ast.UnnamedFunctionDefinition, UnnamedFunctionDefinition],
  [ast.ModifierDefinition, ModifierDefinition],
  [ast.StructDefinition, StructDefinition],
  [ast.EnumDefinition, EnumDefinition],
  [ast.EventDefinition, EventDefinition],
  [ast.StateVariableDefinition, StateVariableDefinition],
  [ast.ErrorDefinition, ErrorDefinition],
  [ast.UserDefinedValueTypeDefinition, UserDefinedValueTypeDefinition]
]);

export class ContractMember extends PolymorphicNonterminalNode<
  ast.ContractMember,
  | UsingDirective
  | FunctionDefinition
  | ConstructorDefinition
  | ReceiveFunctionDefinition
  | FallbackFunctionDefinition
  | UnnamedFunctionDefinition
  | ModifierDefinition
  | StructDefinition
  | EnumDefinition
  | EventDefinition
  | StateVariableDefinition
  | ErrorDefinition
  | UserDefinedValueTypeDefinition
> {
  readonly kind = NonterminalKind.ContractMember;

  constructor(ast: ast.ContractMember, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
