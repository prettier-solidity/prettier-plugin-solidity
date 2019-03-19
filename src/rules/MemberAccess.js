/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const MemberAccess = (node, path, options, print) =>
  concat([path.call(print, 'expression'), '.', node.memberName]);

module.exports = MemberAccess;
