import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
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

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class ContractMember implements SlangNode {
  readonly kind = NonterminalKind.ContractMember;

  comments;

  loc;

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

  constructor(ast: ast.ContractMember, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.UsingDirective:
        this.variant = new UsingDirective(
          ast.variant as ast.UsingDirective,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.FunctionDefinition:
        this.variant = new FunctionDefinition(
          ast.variant as ast.FunctionDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.ConstructorDefinition:
        this.variant = new ConstructorDefinition(
          ast.variant as ast.ConstructorDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.ReceiveFunctionDefinition:
        this.variant = new ReceiveFunctionDefinition(
          ast.variant as ast.ReceiveFunctionDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.FallbackFunctionDefinition:
        this.variant = new FallbackFunctionDefinition(
          ast.variant as ast.FallbackFunctionDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.UnnamedFunctionDefinition:
        this.variant = new UnnamedFunctionDefinition(
          ast.variant as ast.UnnamedFunctionDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.ModifierDefinition:
        this.variant = new ModifierDefinition(
          ast.variant as ast.ModifierDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.StructDefinition:
        this.variant = new StructDefinition(
          ast.variant as ast.StructDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.EnumDefinition:
        this.variant = new EnumDefinition(
          ast.variant as ast.EnumDefinition,
          offsets[0]
        );
        break;
      case NonterminalKind.EventDefinition:
        this.variant = new EventDefinition(
          ast.variant as ast.EventDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.StateVariableDefinition:
        this.variant = new StateVariableDefinition(
          ast.variant as ast.StateVariableDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.ErrorDefinition:
        this.variant = new ErrorDefinition(
          ast.variant as ast.ErrorDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.UserDefinedValueTypeDefinition:
        this.variant = new UserDefinedValueTypeDefinition(
          ast.variant as ast.UserDefinedValueTypeDefinition,
          offsets[0]
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
