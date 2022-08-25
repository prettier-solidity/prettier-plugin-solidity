const {
  doc: {
    builders: { group, indent, indentIfBreak, label, softline }
  }
} = require('prettier');

let groupIndex = 0;
const IndexAccess = {
  print: ({ path, print }) => {
    let baseDoc = path.call(print, 'base');
    let indexDoc = group([
      indent([softline, path.call(print, 'index')]),
      softline,
      ']'
    ]);

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (baseDoc.label === 'MemberAccessChain') {
      baseDoc = group(baseDoc.contents, {
        id: `IndexAccess.base-${groupIndex}`
      });

      groupIndex += 1;

      indexDoc = indentIfBreak(indexDoc, {
        groupId: baseDoc.id
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [baseDoc, '[', indexDoc]);
    }

    return [baseDoc, '[', indexDoc];
  }
};

module.exports = IndexAccess;
