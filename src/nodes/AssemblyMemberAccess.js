const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const AssemblyMemberAccess = {
  print: ({ path, print }) => {
    return concat([
      path.call(print, 'expression'),
      '.',
      path.call(print, 'memberName')
    ]);
  }
};

module.exports = AssemblyMemberAccess;
