const getCompiler = (path) => {
  let i = 0;
  let elderNode;
  do {
    elderNode = path.getParentNode(i);
    i += 1;
  } while (elderNode.type !== 'SourceUnit');
  return elderNode.compiler;
};

module.exports = { getCompiler };
