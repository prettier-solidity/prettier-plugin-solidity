import { createKindCheckFunction } from './create-kind-check-function.js';

export const isBlockComment = createKindCheckFunction([
  'MultiLineComment',
  'MultiLineNatSpecComment'
]);

export const isLineComment = createKindCheckFunction([
  'SingleLineComment',
  'SingleLineNatSpecComment'
]);

export const isComment = createKindCheckFunction([
  'MultiLineComment',
  'MultiLineNatSpecComment',
  'SingleLineComment',
  'SingleLineNatSpecComment'
]);
