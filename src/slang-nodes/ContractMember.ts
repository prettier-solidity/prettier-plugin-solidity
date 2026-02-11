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

const keys = [
  ast.UsingDirective,
  ast.FunctionDefinition,
  ast.ConstructorDefinition,
  ast.ReceiveFunctionDefinition,
  ast.FallbackFunctionDefinition,
  ast.UnnamedFunctionDefinition,
  ast.ModifierDefinition,
  ast.StructDefinition,
  ast.EnumDefinition,
  ast.EventDefinition,
  ast.StateVariableDefinition,
  ast.ErrorDefinition,
  ast.UserDefinedValueTypeDefinition
];
const constructors = [
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
];

const variantConstructors = new Map<string, (typeof constructors)[number]>(
  keys.map((key, index) => [key.name, constructors[index]])
);

function createNonterminalVariant(
  variant: ast.ContractMember['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): ContractMember['variant'] {
  const variantConstructor = variantConstructors.get(variant.constructor.name);
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
