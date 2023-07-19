/* eslint-disable global-require */
import handleContractDefinitionComments from './handleContractDefinitionComments.js';
import handleModifierInvocationComments from './handleModifierInvocationComments.js';

export default [
  handleContractDefinitionComments,
  handleModifierInvocationComments
];
