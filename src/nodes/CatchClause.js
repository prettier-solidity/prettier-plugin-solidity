const {
  doc: {
    builders: { concat, group, join, indent, line, softline }
  }
} = require('prettier/standalone');

const CatchClause = {
  print: ({ node, path, print }) => {
    return group(
      concat([
        'catch ',
        node.isReasonStringType ? 'Error' : '',
        '(',
        group(
          concat([
            indent(
              concat([
                softline,
                join(concat([',', line]), path.map(print, 'parameters'))
              ])
            ),
            softline
          ])
        ),
        ') ',
        path.call(print, 'body')
      ])
    );
  }
};

module.exports = CatchClause;
