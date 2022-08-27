/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
function clean(ast, newObj /* , parent */) {
  delete newObj.code;
  delete newObj.codeStart;
  delete newObj.loc;
  delete newObj.range;
  delete newObj.raw;
  // TODO: for some reason comments are not iterated through.
  delete newObj.comments;
}

module.exports = clean;
