import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { UsingDirective } from './UsingDirective.ts';
import { FunctionDefinition } from './FunctionDefinition.ts';
import { ConstructorDefinition } from './ConstructorDefinition.ts';
import { ReceiveFunctionDefinition } from './ReceiveFunctionDefinition.ts';
import { FallbackFunctionDefinition } from './FallbackFunctionDefinition.ts';
import { UnnamedFunctionDefinition } from './UnnamedFunctionDefinition.ts';
import { ModifierDefinition } from './ModifierDefinition.ts';
import { StructDefinition } from './StructDefinition.ts';
import { EnumDefinition } from './EnumDefinition.ts';
import { EventDefinition } from './EventDefinition.ts';
import { StateVariableDefinition } from './StateVariableDefinition.ts';
import { ErrorDefinition } from './ErrorDefinition.ts';
import { UserDefinedValueTypeDefinition } from './UserDefinedValueTypeDefinition.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
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

export class ContractMember extends SlangNode {
  readonly kind = NonterminalKind.ContractMember;

  variant:
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
    | UserDefinedValueTypeDefinition;

  constructor(ast: ast.ContractMember, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
