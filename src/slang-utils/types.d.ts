import type { Expression } from '../slang-nodes/Expression.ts';

type HugFunction = (node: Expression['variant']) => Expression['variant'];
