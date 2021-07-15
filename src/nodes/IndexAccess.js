const {
  doc: {
    builders: { group, indent, label, softline }
  }
} = require('prettier');

let indexAccessId = 0;

const IndexAccess = {
  print: ({ path, print }) => {
    const indexAccessLabel = {
      type: 'IndexAccess',
      groupId: `IndexAccess-${indexAccessId}`
    };
    indexAccessId += 1;

    return label(JSON.stringify(indexAccessLabel), [
      path.call(print, 'base'),
      '[',
      group([indent([softline, path.call(print, 'index')]), softline], {
        id: indexAccessLabel.groupId
      }),
      ']'
    ]);
  }
};

module.exports = IndexAccess;
