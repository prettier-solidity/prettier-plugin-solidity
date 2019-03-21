/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const MemberAccess = {
  print: ({ node, path, print }) =>
    concat([path.call(print, 'expression'), '.', node.memberName])
};

module.exports = MemberAccess;
