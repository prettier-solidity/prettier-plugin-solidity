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
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.ContractMember['variant'],
  options: ParserOptions<AstNode>
): ContractMember['variant'] {
  if (variant instanceof ast.UsingDirective) {
    return new UsingDirective(variant, options);
  }
  if (variant instanceof ast.FunctionDefinition) {
    return new FunctionDefinition(variant, options);
  }
  if (variant instanceof ast.ConstructorDefinition) {
    return new ConstructorDefinition(variant, options);
  }
  if (variant instanceof ast.ReceiveFunctionDefinition) {
    return new ReceiveFunctionDefinition(variant, options);
  }
  if (variant instanceof ast.FallbackFunctionDefinition) {
    return new FallbackFunctionDefinition(variant, options);
  }
  if (variant instanceof ast.UnnamedFunctionDefinition) {
    return new UnnamedFunctionDefinition(variant, options);
  }
  if (variant instanceof ast.ModifierDefinition) {
    return new ModifierDefinition(variant, options);
  }
  if (variant instanceof ast.StructDefinition) {
    return new StructDefinition(variant, options);
  }
  if (variant instanceof ast.EnumDefinition) {
    return new EnumDefinition(variant);
  }
  if (variant instanceof ast.EventDefinition) {
    return new EventDefinition(variant, options);
  }
  if (variant instanceof ast.StateVariableDefinition) {
    return new StateVariableDefinition(variant, options);
  }
  if (variant instanceof ast.ErrorDefinition) {
    return new ErrorDefinition(variant, options);
  }
  if (variant instanceof ast.UserDefinedValueTypeDefinition) {
    return new UserDefinedValueTypeDefinition(variant);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
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

  constructor(ast: ast.ContractMember, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
