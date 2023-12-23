import type {
  BinaryOperation,
  BinOp
} from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../nodes/types';

interface BinaryOperationPrinter extends NodePrinter<BinaryOperation> {
  operators: BinOp[];
}
