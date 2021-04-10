const {
  util: { addLeadingComment, addTrailingComment, addDanglingComment }
} = require('prettier');
const {
  getNextNonSpaceNonCommentCharacter
} = require('../../prettier-comments/common/util');

// There are often comments before the else clause of if statements like
//
//   if (1) { ... }
//   // comment
//   else { ... }
//
// They are being attached as leading comments of the BlockExpression which
// is not well printed. What we want is to instead move the comment inside
// of the block and make it leadingComment of the first element of the block
// or dangling comment of the block if there is nothing inside
//
//   if (1) { ... }
//   else {
//     // comment
//     ...
//   }
function handleIfStatementComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment,
  options
) {
  if (
    !enclosingNode ||
    enclosingNode.type !== 'IfStatement' ||
    !followingNode
  ) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   if (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = getNextNonSpaceNonCommentCharacter(
    text,
    comment,
    options.locEnd
  );
  if (nextCharacter === ')') {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Comments before `else`:
  // - treat as trailing comments of the trueBody, if it's a ExpressionStatement
  // - treat as a dangling comment otherwise
  if (
    precedingNode === enclosingNode.trueBody &&
    followingNode === enclosingNode.falseBody
  ) {
    if (precedingNode.type === 'ExpressionStatement') {
      addTrailingComment(precedingNode, comment);
    } else {
      addDanglingComment(enclosingNode, comment);
    }
    return true;
  }

  if (followingNode.type === 'ExpressionStatement') {
    addDanglingComment(followingNode, comment);
    return true;
  }

  if (followingNode.type === 'IfStatement') {
    addLeadingComment(followingNode.trueBody, comment);
    return true;
  }

  // For comments positioned after the condition parenthesis in an if statement
  // before the trueBody without brackets on, such as
  // if (a) /* comment */ true,
  // we look at the next character to see if the following node
  // is the trueBody for the if statement
  if (enclosingNode.trueBody === followingNode) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}

module.exports = handleIfStatementComments;
