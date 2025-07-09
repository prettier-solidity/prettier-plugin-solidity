import handleBlockComments from './handle-block-comments.js';
import handleContractDefinitionComments from './handle-contract-definition-comments.js';
import handleContractSpecifiersComments from './handle-contract-specifiers-comments.js';
import handleElseBranchComments from './handle-else-branch-comments.js';
import handleIfStatementComments from './handle-if-statement-comments.js';
import handleInterfaceDefinitionComments from './handle-interface-definition-comments.js';
import handleLibraryDefinitionComments from './handle-library-definition-comments.js';
import handleModifierInvocationComments from './handle-modifier-invocation-comments.js';
import handleParametersDeclarationComments from './handle-parameters-declaration-comments.js';
import handlePositionalArgumentsDeclarationComments from './handle-positional-arguments-declaration-comments.js';
import handleStorageLayoutSpecifierComments from './handle-storage-layout-specifier-comments.js';
import handleStructComments from './handle-struct-comments.js';
import handleWhileStatementComments from './handle-while-statement-comments.js';
import handleYulBlockComments from './handle-yul-block-comments.js';

export default [
  handleBlockComments,
  handleContractDefinitionComments,
  handleContractSpecifiersComments,
  handleElseBranchComments,
  handleIfStatementComments,
  handleInterfaceDefinitionComments,
  handleLibraryDefinitionComments,
  handleModifierInvocationComments,
  handleParametersDeclarationComments,
  handlePositionalArgumentsDeclarationComments,
  handleStorageLayoutSpecifierComments,
  handleStructComments,
  handleWhileStatementComments,
  handleYulBlockComments
];
