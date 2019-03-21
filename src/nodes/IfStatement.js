const {
  doc: {
    builders: { concat, hardline }
  }
} = require('prettier');

const IfStatement = {
  print: ({ node, path, print }) => {
    let doc = concat([
      'if (',
      path.call(print, 'condition'),
      ') ',
      path.call(print, 'trueBody')
    ]);
    if (node.falseBody) {
      const elseOnSameLine = node.trueBody.type === 'Block';
      doc = concat([
        doc,
        elseOnSameLine ? ' ' : hardline,
        'else ',
        path.call(print, 'falseBody')
      ]);
    }
    return doc;
  }
};

module.exports = IfStatement;
