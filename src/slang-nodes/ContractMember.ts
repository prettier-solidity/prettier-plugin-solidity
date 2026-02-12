import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
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

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ContractMember,
  ast.ContractMember
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

  constructor(
    ast: ast.ContractMember,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
