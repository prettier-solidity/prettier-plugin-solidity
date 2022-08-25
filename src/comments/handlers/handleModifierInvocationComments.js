const {
  util: {
    addLeadingComment,
    addTrailingComment,
    addDanglingComment,
    getNextNonSpaceNonCommentCharacterIndex
  }
} = require('prettier');

function handleModifierInvocationComments({
  text,
  precedingNode,
  enclosingNode,
  comment,
  options
}) {
  if (!enclosingNode || enclosingNode.type !== 'ModifierInvocation') {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned after the modifier's name:
  //    function a() public modifier /* comment 1 */ ( /* comment 2 */ ) /* comment 3 */
  // The only workaround I found is to look at the next character to see if
  // it is a ().
  const nextCharacter = text.charAt(
    getNextNonSpaceNonCommentCharacterIndex(text, comment, options.locEnd)
  );

  // The comment is behind the start of the Parentheses `()`
  if (nextCharacter === '(') {
    // In this scenario the comment is between the modifier's name and the
    // parentheses so it's placed as a leading comment.
    //    function a() public modifier // comment
    //        ()
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  if (nextCharacter === ')') {
    if (precedingNode) {
      // In this scenario the comment belongs to an argument passed to the modifier.
      //    function a() public modifier(argument /* comment for the argument */)
      addTrailingComment(precedingNode, comment);
      return true;
    }

    if (comment.type === 'LineComment') {
      // In this scenario there's no arguments and the parentheses should either be
      // together or dismissed so the comment is placed as a leading comment.
      //    function a() public modifier(
      //        // weird place to put a line comment
      //    )
      addLeadingComment(enclosingNode, comment);
      return true;
    }

    // In this scenario there's no arguments but since the comment is a block
    // comment, we assume there's an explicit reason for it to be placed there
    // so we respect it here.
    //    function a() public modifier(/* block comment */)
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

module.exports = handleModifierInvocationComments;
