const {
  doc: {
    builders: { hardline }
  },
  version
} = require('prettier');
const semver = require('semver');

const printComments = require('./print-comments');

const ExpressionStatement = {
  print: ({ node, options, path, print }) => {
    const parts = [];

    const parent = path.getParentNode();

    if (parent.type === 'IfStatement') {
      if (node.comments && node.comments.length) {
        const comments = printComments(node, path, options);
        const hasComments = semver.satisfies(version, '^2.3.0')
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
