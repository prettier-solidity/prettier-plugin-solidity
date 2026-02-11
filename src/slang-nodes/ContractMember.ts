import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
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

const variantConstructors = {
  [ast.UsingDirective.name]: UsingDirective,
  [ast.FunctionDefinition.name]: FunctionDefinition,
  [ast.ConstructorDefinition.name]: ConstructorDefinition,
  [ast.ReceiveFunctionDefinition.name]: ReceiveFunctionDefinition,
  [ast.FallbackFunctionDefinition.name]: FallbackFunctionDefinition,
  [ast.UnnamedFunctionDefinition.name]: UnnamedFunctionDefinition,
  [ast.ModifierDefinition.name]: ModifierDefinition,
  [ast.StructDefinition.name]: StructDefinition,
  [ast.EnumDefinition.name]: EnumDefinition,
  [ast.EventDefinition.name]: EventDefinition,
  [ast.StateVariableDefinition.name]: StateVariableDefinition,
  [ast.ErrorDefinition.name]: ErrorDefinition,
  [ast.UserDefinedValueTypeDefinition.name]: UserDefinedValueTypeDefinition
};

function createNonterminalVariant(
  variant: ast.ContractMember['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): ContractMember['variant'] {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
}

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
