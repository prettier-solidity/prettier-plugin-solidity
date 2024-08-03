import handleBlockComments from './handle-block-comments.js';
import handleContractDefinitionComments from './handle-contract-definition-comments.js';
import handleIfStatementComments from './handle-if-statement-comments.js';
import handleParametersDeclarationComments from './handle-parameters-declaration-comments.js';
import handleWhileStatementComments from './handle-while-statement-comments.js';
import handleYulBlockComments from './handle-yul-block-comments.js';

export default [
  handleBlockComments,
  handleContractDefinitionComments,
  handleIfStatementComments,
  handleParametersDeclarationComments,
  handleWhileStatementComments,
  handleYulBlockComments
];
