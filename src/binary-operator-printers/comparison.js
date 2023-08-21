import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

const indentIfNecessaryBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 0; ; i += 1) {
    const parentNode = path.getParentNode(i);
    if (parentNode.type === 'ReturnStatement') return document;
    if (parentNode.type === 'IfStatement') return document;
    if (parentNode.type === 'ForStatement') return document;
    if (parentNode.type === 'WhileStatement') return document;
    if (parentNode.type !== 'BinaryOperation') return indent(document);
    if (node === parentNode.right) return document;
    node = parentNode;
  }
};

export const comparison = {
  match: (op) => ['<', '>', '<=', '>=', '==', '!='].includes(op),
  print: (node, path, print) => {
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    const right = [node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return group([
      path.call(print, 'left'),
      ' ',
      indentIfNecessary(shouldGroup ? group(right) : right)
    ]);
  }
};
