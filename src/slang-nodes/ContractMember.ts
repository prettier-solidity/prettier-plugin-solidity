import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
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

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.ContractMember,
  ContractMember
>([
  [slangAst.UsingDirective, UsingDirective],
  [slangAst.FunctionDefinition, FunctionDefinition],
  [slangAst.ConstructorDefinition, ConstructorDefinition],
  [slangAst.ReceiveFunctionDefinition, ReceiveFunctionDefinition],
  [slangAst.FallbackFunctionDefinition, FallbackFunctionDefinition],
  [slangAst.UnnamedFunctionDefinition, UnnamedFunctionDefinition],
  [slangAst.ModifierDefinition, ModifierDefinition],
  [slangAst.StructDefinition, StructDefinition],
  [slangAst.EnumDefinition, EnumDefinition],
  [slangAst.EventDefinition, EventDefinition],
  [slangAst.StateVariableDefinition, StateVariableDefinition],
  [slangAst.ErrorDefinition, ErrorDefinition],
  [slangAst.UserDefinedValueTypeDefinition, UserDefinedValueTypeDefinition]
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
    ast: slangAst.ContractMember,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of
      // `ContractMember` in the `createNonterminalVariant` function above.
      ((variant: slangAst.ContractMember['variant']): void => {
        if (variant instanceof slangAst.UsingDirective) return;
        if (variant instanceof slangAst.FunctionDefinition) return;
        if (variant instanceof slangAst.ConstructorDefinition) return;
        if (variant instanceof slangAst.ReceiveFunctionDefinition) return;
        if (variant instanceof slangAst.FallbackFunctionDefinition) return;
        if (variant instanceof slangAst.UnnamedFunctionDefinition) return;
        if (variant instanceof slangAst.ModifierDefinition) return;
        if (variant instanceof slangAst.StructDefinition) return;
        if (variant instanceof slangAst.EnumDefinition) return;
        if (variant instanceof slangAst.EventDefinition) return;
        if (variant instanceof slangAst.StateVariableDefinition) return;
        if (variant instanceof slangAst.ErrorDefinition) return;
        if (variant instanceof slangAst.UserDefinedValueTypeDefinition) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
