const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier');

const FunctionCall = {
  print: ({ node, path, print }) => {
    let doc;
    if (node.names && node.names.length > 0) {
      doc = concat([
        '{',
        group(
          concat([
            indent(
              concat([
                softline,
                join(
                  concat([',', line]),
                  path
                    .map(print, 'arguments')
                    .map((arg, index) => concat([node.names[index], ': ', arg]))
                )
              ])
            ),
            softline
          ])
        ),
        '}'
      ]);
    } else {
      doc = group(
        concat([
          indent(
            concat([
              softline,
              join(concat([',', line]), path.map(print, 'arguments'))
            ])
          ),
          softline
        ])
      );
    }
    return concat([path.call(print, 'expression'), '(', doc, ')']);
  }
};

module.exports = FunctionCall;
