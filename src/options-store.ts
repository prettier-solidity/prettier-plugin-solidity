import { ParserOptions } from 'prettier';
import { AstNode } from './slang-nodes/types.js';

const optionsStore = new Map<'options', ParserOptions<AstNode>>();

export default optionsStore;
