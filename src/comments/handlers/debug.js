const debug = comment => {
  throw new Error(
    `comment: ${JSON.stringify(comment.value)}
type: ${JSON.stringify(comment.type)}
precedingNode: ${JSON.stringify(
      comment.precedingNode ? comment.precedingNode.type : ''
    )}
enclosingNode: ${JSON.stringify(
      comment.enclosingNode ? comment.enclosingNode.type : ''
    )}
followingNode: ${JSON.stringify(
      comment.followingNode ? comment.followingNode.type : ''
    )}`
  );
};

module.exports = debug;
