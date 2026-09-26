import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind, NonterminalNode } from '@nomicfoundation/slang/cst';
import { checkArgumentsDeclarationVariant } from './ArgumentsDeclaration.ts';
import { checkContractMemberVariant } from './ContractMember.ts';
import { checkContractSpecifierVariant } from './ContractSpecifier.ts';
import { checkExpressionVariant } from './Expression.ts';
import { checkFallbackFunctionAttributeVariant } from './FallbackFunctionAttribute.ts';
import { checkForStatementInitializationVariant } from './ForStatementInitialization.ts';
import { checkFunctionAttributeVariant } from './FunctionAttribute.ts';
import { checkImportClauseVariant } from './ImportClause.ts';
import { checkMappingKeyTypeVariant } from './MappingKeyType.ts';
import { checkPragmaVariant } from './Pragma.ts';
import { checkReceiveFunctionAttributeVariant } from './ReceiveFunctionAttribute.ts';
import { checkSourceUnitMemberVariant } from './SourceUnitMember.ts';
import { checkStatementVariant } from './Statement.ts';
import { checkStringExpressionVariant } from './StringExpression.ts';
import { checkTupleMemberVariant } from './TupleMember.ts';
import { checkTypeNameVariant } from './TypeName.ts';
import { checkUsingClauseVariant } from './UsingClause.ts';
import { checkVersionExpressionVariant } from './VersionExpression.ts';
import { checkYulExpressionVariant } from './YulExpression.ts';
import { checkYulLiteralVariant } from './YulLiteral.ts';
import { checkYulStatementVariant } from './YulStatement.ts';
import { checkYulSwitchCaseVariant } from './YulSwitchCase.ts';

export function variantCoverage(cst: NonterminalNode): void {
  switch (cst.kind) {
    case NonterminalKind.ArgumentsDeclaration:
      checkArgumentsDeclarationVariant(
        new ast.ArgumentsDeclaration(cst).variant
      );
      break;
    case NonterminalKind.ContractMember:
      checkContractMemberVariant(new ast.ContractMember(cst).variant);
      break;
    case NonterminalKind.ContractSpecifier:
      checkContractSpecifierVariant(new ast.ContractSpecifier(cst).variant);
      break;
    case NonterminalKind.Expression:
      checkExpressionVariant(new ast.Expression(cst).variant);
      break;
    case NonterminalKind.FallbackFunctionAttribute:
      checkFallbackFunctionAttributeVariant(
        new ast.FallbackFunctionAttribute(cst).variant
      );
      break;
    case NonterminalKind.ForStatementInitialization:
      checkForStatementInitializationVariant(
        new ast.ForStatementInitialization(cst).variant
      );
      break;
    case NonterminalKind.FunctionAttribute:
      checkFunctionAttributeVariant(new ast.FunctionAttribute(cst).variant);
      break;
    case NonterminalKind.ImportClause:
      checkImportClauseVariant(new ast.ImportClause(cst).variant);
      break;
    case NonterminalKind.MappingKeyType:
      checkMappingKeyTypeVariant(new ast.MappingKeyType(cst).variant);
      break;
    case NonterminalKind.Pragma:
      checkPragmaVariant(new ast.Pragma(cst).variant);
      break;
    case NonterminalKind.ReceiveFunctionAttribute:
      checkReceiveFunctionAttributeVariant(
        new ast.ReceiveFunctionAttribute(cst).variant
      );
      break;
    case NonterminalKind.SourceUnitMember:
      checkSourceUnitMemberVariant(new ast.SourceUnitMember(cst).variant);
      break;
    case NonterminalKind.Statement:
      checkStatementVariant(new ast.Statement(cst).variant);
      break;
    case NonterminalKind.StringExpression:
      checkStringExpressionVariant(new ast.StringExpression(cst).variant);
      break;
    case NonterminalKind.TupleMember:
      checkTupleMemberVariant(new ast.TupleMember(cst).variant);
      break;
    case NonterminalKind.TypeName:
      checkTypeNameVariant(new ast.TypeName(cst).variant);
      break;
    case NonterminalKind.UsingClause:
      checkUsingClauseVariant(new ast.UsingClause(cst).variant);
      break;
    case NonterminalKind.VersionExpression:
      checkVersionExpressionVariant(new ast.VersionExpression(cst).variant);
      break;
    case NonterminalKind.YulExpression:
      checkYulExpressionVariant(new ast.YulExpression(cst).variant);
      break;
    case NonterminalKind.YulLiteral:
      checkYulLiteralVariant(new ast.YulLiteral(cst).variant);
      break;
    case NonterminalKind.YulStatement:
      checkYulStatementVariant(new ast.YulStatement(cst).variant);
      break;
    case NonterminalKind.YulSwitchCase:
      checkYulSwitchCaseVariant(new ast.YulSwitchCase(cst).variant);
      break;
  }

  for (const { node } of cst.children()) {
    if (node instanceof NonterminalNode) {
      variantCoverage(node);
    }
  }
}
