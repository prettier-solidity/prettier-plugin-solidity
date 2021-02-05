function ignoreComments(node) {
  if (node === undefined || node === null) return;
  const keys = Object.keys(node);
  keys.forEach((key) => {
    if (key === 'comments') {
      node.comments.forEach((comment) => {
        comment.printed = true;
      });
      return;
    }
    if (typeof node[key] === 'object') {
      ignoreComments(node[key]);
    }
  });
}

module.exports = ignoreComments;
