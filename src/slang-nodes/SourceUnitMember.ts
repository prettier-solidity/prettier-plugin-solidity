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

function createNonterminalVariant(
  variant: ast.SourceUnitMember['variant'],
  options: ParserOptions<AstNode>
): SourceUnitMember['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.PragmaDirective:
      return new PragmaDirective(variant as ast.PragmaDirective, options);
    case NonterminalKind.ImportDirective:
      return new ImportDirective(variant as ast.ImportDirective, options);
    case NonterminalKind.ContractDefinition:
      return new ContractDefinition(variant as ast.ContractDefinition, options);
    case NonterminalKind.InterfaceDefinition:
      return new InterfaceDefinition(
        variant as ast.InterfaceDefinition,
        options
      );
    case NonterminalKind.LibraryDefinition:
      return new LibraryDefinition(variant as ast.LibraryDefinition, options);
    case NonterminalKind.StructDefinition:
      return new StructDefinition(variant as ast.StructDefinition, options);
    case NonterminalKind.EnumDefinition:
      return new EnumDefinition(variant as ast.EnumDefinition);
    case NonterminalKind.FunctionDefinition:
      return new FunctionDefinition(variant as ast.FunctionDefinition, options);
    case NonterminalKind.ConstantDefinition:
      return new ConstantDefinition(variant as ast.ConstantDefinition, options);
    case NonterminalKind.ErrorDefinition:
      return new ErrorDefinition(variant as ast.ErrorDefinition, options);
    case NonterminalKind.UserDefinedValueTypeDefinition:
      return new UserDefinedValueTypeDefinition(
        variant as ast.UserDefinedValueTypeDefinition
      );
    case NonterminalKind.UsingDirective:
      return new UsingDirective(variant as ast.UsingDirective, options);
    case NonterminalKind.EventDefinition:
      return new EventDefinition(variant as ast.EventDefinition, options);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

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

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<SourceUnitMember>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
