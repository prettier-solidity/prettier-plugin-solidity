import handleBlockComments from './handleBlockComments.js';
import handleContractDefinitionComments from './handleContractDefinitionComments.js';
import handleWhileStatementComments from './handleWhileStatementComments.js';
import handleYulBlockComments from './handleYulBlockComments.js';

export default [
  handleBlockComments,
  handleContractDefinitionComments,
  handleWhileStatementComments,
  handleYulBlockComments
];
