import handleBlockComments from './handle-block-comments.ts';
import handleContractDefinitionComments from './handle-contract-definition-comments.ts';
import handleContractSpecifiersComments from './handle-contract-specifiers-comments.ts';
import handleElseBranchComments from './handle-else-branch-comments.ts';
import handleIfStatementComments from './handle-if-statement-comments.ts';
import handleInterfaceDefinitionComments from './handle-interface-definition-comments.ts';
import handleLibraryDefinitionComments from './handle-library-definition-comments.ts';
import handleMemberAccessExpressionComments from './handle-member-access-expression-comments.ts';
import handleModifierInvocationComments from './handle-modifier-invocation-comments.ts';
import handleParametersDeclarationComments from './handle-parameters-declaration-comments.ts';
import handlePositionalArgumentsDeclarationComments from './handle-positional-arguments-declaration-comments.ts';
import handleSourceUnitMembersComments from './handle-source-unit-members-comments.ts';
import handleStructDefinitionComments from './handle-struct-definition-comments.ts';
import handleWhileStatementComments from './handle-while-statement-comments.ts';
import handleYulBlockComments from './handle-yul-block-comments.ts';

export default [
  handleBlockComments,
  handleContractDefinitionComments,
  handleContractSpecifiersComments,
  handleElseBranchComments,
  handleIfStatementComments,
  handleInterfaceDefinitionComments,
  handleLibraryDefinitionComments,
  handleMemberAccessExpressionComments,
  handleModifierInvocationComments,
  handleParametersDeclarationComments,
  handlePositionalArgumentsDeclarationComments,
  handleSourceUnitMembersComments,
  handleStructDefinitionComments,
  handleWhileStatementComments,
  handleYulBlockComments
];
