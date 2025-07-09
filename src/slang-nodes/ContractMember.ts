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

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.UsingDirective:
        this.variant = new UsingDirective(
          variant as ast.UsingDirective,
          options
        );
        break;
      case NonterminalKind.FunctionDefinition:
        this.variant = new FunctionDefinition(
          variant as ast.FunctionDefinition,
          options
        );
        break;
      case NonterminalKind.ConstructorDefinition:
        this.variant = new ConstructorDefinition(
          variant as ast.ConstructorDefinition,
          options
        );
        break;
      case NonterminalKind.ReceiveFunctionDefinition:
        this.variant = new ReceiveFunctionDefinition(
          variant as ast.ReceiveFunctionDefinition,
          options
        );
        break;
      case NonterminalKind.FallbackFunctionDefinition:
        this.variant = new FallbackFunctionDefinition(
          variant as ast.FallbackFunctionDefinition,
          options
        );
        break;
      case NonterminalKind.UnnamedFunctionDefinition:
        this.variant = new UnnamedFunctionDefinition(
          variant as ast.UnnamedFunctionDefinition,
          options
        );
        break;
      case NonterminalKind.ModifierDefinition:
        this.variant = new ModifierDefinition(
          variant as ast.ModifierDefinition,
          options
        );
        break;
      case NonterminalKind.StructDefinition:
        this.variant = new StructDefinition(
          variant as ast.StructDefinition,
          options
        );
        break;
      case NonterminalKind.EnumDefinition:
        this.variant = new EnumDefinition(variant as ast.EnumDefinition);
        break;
      case NonterminalKind.EventDefinition:
        this.variant = new EventDefinition(
          variant as ast.EventDefinition,
          options
        );
        break;
      case NonterminalKind.StateVariableDefinition:
        this.variant = new StateVariableDefinition(
          variant as ast.StateVariableDefinition,
          options
        );
        break;
      case NonterminalKind.ErrorDefinition:
        this.variant = new ErrorDefinition(
          variant as ast.ErrorDefinition,
          options
        );
        break;
      case NonterminalKind.UserDefinedValueTypeDefinition:
        this.variant = new UserDefinedValueTypeDefinition(
          variant as ast.UserDefinedValueTypeDefinition
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ContractMember>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
