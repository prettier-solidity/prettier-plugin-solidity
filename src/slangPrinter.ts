import { isBlockComment } from './slang-utils/is-comment.js';
import { locEnd, locStart } from './slang-utils/loc.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, StrictAstNode } from './slang-nodes/types.d.ts';
import type { PrintFunction } from './types.d.ts';
import type { ArgumentsDeclaration } from './slang-nodes/ArgumentsDeclaration.js';
import type { ConstructorAttribute } from './slang-nodes/ConstructorAttribute.js';
import type { FallbackFunctionAttribute } from './slang-nodes/FallbackFunctionAttribute.js';
import type { FunctionAttribute } from './slang-nodes/FunctionAttribute.js';
import type { FunctionTypeAttribute } from './slang-nodes/FunctionTypeAttribute.js';
import type { ModifierAttribute } from './slang-nodes/ModifierAttribute.js';
import type { ReceiveFunctionAttribute } from './slang-nodes/ReceiveFunctionAttribute.js';
import type { StateVariableAttribute } from './slang-nodes/StateVariableAttribute.js';
import type { UnnamedFunctionAttribute } from './slang-nodes/UnnamedFunctionAttribute.js';
import type { ContractMember } from './slang-nodes/ContractMember.js';
import type { SourceUnitMember } from './slang-nodes/SourceUnitMember.js';
import type { Statement } from './slang-nodes/Statement.js';
import type { YulStatement } from './slang-nodes/YulStatement.js';
import type { ContractSpecifier } from './slang-nodes/ContractSpecifier.js';
import type { ElementaryType } from './slang-nodes/ElementaryType.js';
import type { ExperimentalFeature } from './slang-nodes/ExperimentalFeature.js';
import type { Expression } from './slang-nodes/Expression.js';
import type { ForStatementInitialization } from './slang-nodes/ForStatementInitialization.js';
import type { ForStatementCondition } from './slang-nodes/ForStatementCondition.js';
import type { FunctionBody } from './slang-nodes/FunctionBody.js';
import type { FunctionName } from './slang-nodes/FunctionName.js';
import type { ImportClause } from './slang-nodes/ImportClause.js';
import type { MappingKeyType } from './slang-nodes/MappingKeyType.js';
import type { Pragma } from './slang-nodes/Pragma.js';
import type { StringExpression } from './slang-nodes/StringExpression.js';
import type { TupleMember } from './slang-nodes/TupleMember.js';
import type { TypeName } from './slang-nodes/TypeName.js';
import type { UsingClause } from './slang-nodes/UsingClause.js';
import type { UsingTarget } from './slang-nodes/UsingTarget.js';
import type { VariableDeclarationType } from './slang-nodes/VariableDeclarationType.js';
import type { VersionExpression } from './slang-nodes/VersionExpression.js';
import type { VersionLiteral } from './slang-nodes/VersionLiteral.js';
import type { YulAssignmentOperator } from './slang-nodes/YulAssignmentOperator.js';
import type { YulLiteral } from './slang-nodes/YulLiteral.js';
import type { YulStackAssignmentOperator } from './slang-nodes/YulStackAssignmentOperator.js';
import type { YulSwitchCase } from './slang-nodes/YulSwitchCase.js';

function hasNodeIgnoreComment({ comments }: StrictAstNode): boolean {
  // Prettier sets SourceUnit's comments to undefined after assigning comments
  // to each node.
  return Boolean(
    comments?.some(
      (comment) =>
        comment.value
          .slice(2, isBlockComment(comment) ? -2 : undefined)
          .trim() === 'prettier-ignore'
    )
  );
}

function ignoreComments(path: AstPath<AstNode>): void {
  const node = path.node;
  // We ignore anything that is not an object
  if (node === null || typeof node !== 'object') return;

  let key: keyof StrictAstNode;
  for (key in node) {
    switch (key) {
      // We ignore `kind`, `loc`, and `comments` since these are added by the
      // parser. `updateMetadata` is an internal function.
      case 'kind':
      case 'loc':
      case 'updateMetadata':
        break;
      // The key `comments` will contain every comment for this node.
      case 'comments':
        path.each((commentPath) => (commentPath.node.printed = true), key);
        break;
      default:
        // If the value for that key is an Array or an Object we go deeper.
        const childNode = node[key];
        if (typeof childNode === 'object') {
          if (Array.isArray(childNode)) {
            path.each(ignoreComments, key);
            return;
          }
          path.call(ignoreComments, key);
        }
    }
  }
}

// Nodes take care of undefined and string properties so we can restrict path
// to AstPath<StrictAstNode>
function genericPrint(
  path: AstPath<
    Exclude<
      StrictAstNode,
      | ArgumentsDeclaration
      | ConstructorAttribute
      | FallbackFunctionAttribute
      | FunctionAttribute
      | FunctionTypeAttribute
      | ModifierAttribute
      | ReceiveFunctionAttribute
      | StateVariableAttribute
      | UnnamedFunctionAttribute
      | ContractMember
      | SourceUnitMember
      | Statement
      | YulStatement
      | ContractSpecifier
      | ElementaryType
      | ExperimentalFeature
      | Expression
      | ForStatementInitialization
      | ForStatementCondition
      | FunctionBody
      | FunctionName
      | ImportClause
      | MappingKeyType
      | Pragma
      | StringExpression
      | TupleMember
      | TypeName
      | UsingClause
      | UsingTarget
      | VariableDeclarationType
      | VersionExpression
      | VersionLiteral
      | YulAssignmentOperator
      | YulLiteral
      | YulStackAssignmentOperator
      | YulSwitchCase
    >
  >,
  options: ParserOptions<AstNode>,
  print: PrintFunction
): Doc {
  const node = path.node;

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(locStart(node), locEnd(node));
  }

  // Since each node has a print function with a specific AstPath, the union of
  // all nodes into AstNode creates a print function with an AstPath of the
  // intersection of all nodes. This forces us to cast this with a never type.
  return node.print(path as AstPath<never>, print, options);
}

export default genericPrint;
