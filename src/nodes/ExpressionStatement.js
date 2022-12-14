const {
  doc: {
    builders: { hardline }
  }
} = require('prettier');
const { prettierVersionSatisfies } = require('../common/util');

const printComments = require('./print-comments');

const ExpressionStatement = {
  print: ({ node, options, path, print }) => {
    const parts = [];

    const parent = path.getParentNode();

    if (parent.type === 'IfStatement') {
      if (node.comments && node.comments.length) {
        const comments = printComments(node, path, options);
        const hasComments = prettierVersionSatisfies('^2.3.0')
          ? comments && comments.parts && comments.parts.length // Prettier V2
          : comments && comments.length; // Prettier V3
        if (hasComments) {
          parts.push(comments);
          parts.push(hardline);
        }
      }
    }

    parts.push(path.call(print, 'expression'));
    parts.push(node.omitSemicolon ? '' : ';');

    return parts;
  }
};

module.exports = ExpressionStatement;
