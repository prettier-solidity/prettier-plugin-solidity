import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { PragmaDirective } from './PragmaDirective.js';
import { ImportDirective } from './ImportDirective.js';
import { ContractDefinition } from './ContractDefinition.js';
import { InterfaceDefinition } from './InterfaceDefinition.js';
import { LibraryDefinition } from './LibraryDefinition.js';
import { StructDefinition } from './StructDefinition.js';
import { EnumDefinition } from './EnumDefinition.js';
import { FunctionDefinition } from './FunctionDefinition.js';
import { ConstantDefinition } from './ConstantDefinition.js';
import { ErrorDefinition } from './ErrorDefinition.js';
import { UserDefinedValueTypeDefinition } from './UserDefinedValueTypeDefinition.js';
import { UsingDirective } from './UsingDirective.js';
import { EventDefinition } from './EventDefinition.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class SourceUnitMember extends SlangNode {
  readonly kind = NonterminalKind.SourceUnitMember;

  variant:
    | PragmaDirective
    | ImportDirective
    | ContractDefinition
    | InterfaceDefinition
    | LibraryDefinition
    | StructDefinition
    | EnumDefinition
    | FunctionDefinition
    | ConstantDefinition
    | ErrorDefinition
    | UserDefinedValueTypeDefinition
    | UsingDirective
    | EventDefinition;

  constructor(ast: ast.SourceUnitMember, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.PragmaDirective:
        this.variant = new PragmaDirective(
          variant as ast.PragmaDirective,
          options
        );
        break;
      case NonterminalKind.ImportDirective:
        this.variant = new ImportDirective(
          variant as ast.ImportDirective,
          options
        );
        break;
      case NonterminalKind.ContractDefinition:
        this.variant = new ContractDefinition(
          variant as ast.ContractDefinition,
          options
        );
        break;
      case NonterminalKind.InterfaceDefinition:
        this.variant = new InterfaceDefinition(
          variant as ast.InterfaceDefinition,
          options
        );
        break;
      case NonterminalKind.LibraryDefinition:
        this.variant = new LibraryDefinition(
          variant as ast.LibraryDefinition,
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
      case NonterminalKind.FunctionDefinition:
        this.variant = new FunctionDefinition(
          variant as ast.FunctionDefinition,
          options
        );
        break;
      case NonterminalKind.ConstantDefinition:
        this.variant = new ConstantDefinition(
          variant as ast.ConstantDefinition,
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
      case NonterminalKind.UsingDirective:
        this.variant = new UsingDirective(
          variant as ast.UsingDirective,
          options
        );
        break;
      case NonterminalKind.EventDefinition:
        this.variant = new EventDefinition(
          variant as ast.EventDefinition,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<SourceUnitMember>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
