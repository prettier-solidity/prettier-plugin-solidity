const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const MemberAccess = (node, path, options, print) => {
  return concat([path.call(print, 'expression'), '.', node.memberName]);
};

module.exports = MemberAccess;
