import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
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
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class SourceUnitMember implements SlangNode {
  readonly kind = NonterminalKind.SourceUnitMember;

  comments;

  loc;

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

  constructor(ast: ast.SourceUnitMember) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.PragmaDirective:
        this.variant = new PragmaDirective(ast.variant as ast.PragmaDirective);
        break;
      case NonterminalKind.ImportDirective:
        this.variant = new ImportDirective(ast.variant as ast.ImportDirective);
        break;
      case NonterminalKind.ContractDefinition:
        this.variant = new ContractDefinition(
          ast.variant as ast.ContractDefinition
        );
        break;
      case NonterminalKind.InterfaceDefinition:
        this.variant = new InterfaceDefinition(
          ast.variant as ast.InterfaceDefinition
        );
        break;
      case NonterminalKind.LibraryDefinition:
        this.variant = new LibraryDefinition(
          ast.variant as ast.LibraryDefinition
        );
        break;
      case NonterminalKind.StructDefinition:
        this.variant = new StructDefinition(
          ast.variant as ast.StructDefinition
        );
        break;
      case NonterminalKind.EnumDefinition:
        this.variant = new EnumDefinition(ast.variant as ast.EnumDefinition);
        break;
      case NonterminalKind.FunctionDefinition:
        this.variant = new FunctionDefinition(
          ast.variant as ast.FunctionDefinition
        );
        break;
      case NonterminalKind.ConstantDefinition:
        this.variant = new ConstantDefinition(
          ast.variant as ast.ConstantDefinition
        );
        break;
      case NonterminalKind.ErrorDefinition:
        this.variant = new ErrorDefinition(ast.variant as ast.ErrorDefinition);
        break;
      case NonterminalKind.UserDefinedValueTypeDefinition:
        this.variant = new UserDefinedValueTypeDefinition(
          ast.variant as ast.UserDefinedValueTypeDefinition
        );
        break;
      case NonterminalKind.UsingDirective:
        this.variant = new UsingDirective(ast.variant as ast.UsingDirective);
        break;
      case NonterminalKind.EventDefinition:
        this.variant = new EventDefinition(ast.variant as ast.EventDefinition);
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<SourceUnitMember>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
