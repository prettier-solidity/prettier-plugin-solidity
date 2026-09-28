import { NonterminalKind, SlangAst } from '../slang-utils/slang.ts';
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

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.ContractMember,
  ContractMember
>(() => [
  [SlangAst.UsingDirective, UsingDirective],
  [SlangAst.FunctionDefinition, FunctionDefinition],
  [SlangAst.ConstructorDefinition, ConstructorDefinition],
  [SlangAst.ReceiveFunctionDefinition, ReceiveFunctionDefinition],
  [SlangAst.FallbackFunctionDefinition, FallbackFunctionDefinition],
  [SlangAst.UnnamedFunctionDefinition, UnnamedFunctionDefinition],
  [SlangAst.ModifierDefinition, ModifierDefinition],
  [SlangAst.StructDefinition, StructDefinition],
  [SlangAst.EnumDefinition, EnumDefinition],
  [SlangAst.EventDefinition, EventDefinition],
  [SlangAst.StateVariableDefinition, StateVariableDefinition],
  [SlangAst.ErrorDefinition, ErrorDefinition],
  [SlangAst.UserDefinedValueTypeDefinition, UserDefinedValueTypeDefinition]
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
