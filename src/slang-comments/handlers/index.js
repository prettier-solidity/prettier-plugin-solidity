import handleBlockComments from './handleBlockComments.js';
import handleContractDefinitionComments from './handleContractDefinitionComments.js';
import handleWhileComments from './handleWhileComments.js';
import handleYulBlockComments from './handleYulBlockComments.js';

export default [
  handleBlockComments,
  handleContractDefinitionComments,
  handleWhileComments,
  handleYulBlockComments
];
