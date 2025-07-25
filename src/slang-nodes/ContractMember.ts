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

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.ContractMember['variant'],
  options: ParserOptions<AstNode>
): ContractMember['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.UsingDirective:
      return new UsingDirective(variant as ast.UsingDirective, options);
    case NonterminalKind.FunctionDefinition:
      return new FunctionDefinition(variant as ast.FunctionDefinition, options);
    case NonterminalKind.ConstructorDefinition:
      return new ConstructorDefinition(
        variant as ast.ConstructorDefinition,
        options
      );
    case NonterminalKind.ReceiveFunctionDefinition:
      return new ReceiveFunctionDefinition(
        variant as ast.ReceiveFunctionDefinition,
        options
      );
    case NonterminalKind.FallbackFunctionDefinition:
      return new FallbackFunctionDefinition(
        variant as ast.FallbackFunctionDefinition,
        options
      );
    case NonterminalKind.UnnamedFunctionDefinition:
      return new UnnamedFunctionDefinition(
        variant as ast.UnnamedFunctionDefinition,
        options
      );
    case NonterminalKind.ModifierDefinition:
      return new ModifierDefinition(variant as ast.ModifierDefinition, options);
    case NonterminalKind.StructDefinition:
      return new StructDefinition(variant as ast.StructDefinition, options);
    case NonterminalKind.EnumDefinition:
      return new EnumDefinition(variant as ast.EnumDefinition);
    case NonterminalKind.EventDefinition:
      return new EventDefinition(variant as ast.EventDefinition, options);
    case NonterminalKind.StateVariableDefinition:
      return new StateVariableDefinition(
        variant as ast.StateVariableDefinition,
        options
      );
    case NonterminalKind.ErrorDefinition:
      return new ErrorDefinition(variant as ast.ErrorDefinition, options);
    case NonterminalKind.UserDefinedValueTypeDefinition:
      return new UserDefinedValueTypeDefinition(
        variant as ast.UserDefinedValueTypeDefinition
      );
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
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

  print(path: AstPath<ContractMember>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
