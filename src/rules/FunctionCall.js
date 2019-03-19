const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier');

const FunctionCall = (node, path, options, print) => {
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
                path.map(print, 'arguments').map(
                  (arg, index) => concat([node.names[index], ': ', arg]) // eslint-disable-line
                )
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
};

module.exports = FunctionCall;
