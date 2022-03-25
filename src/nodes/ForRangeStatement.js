const {
    doc: {
        builders: { group, indent, line }
    }
} = require('prettier');

const printSeparatedList = require('./print-separated-list');

const rangeDeclaration = (node, path, print) => {
    const variables = printSeparatedList(path.map(print, 'rangeDeclaration'));
    if (node.rangeDeclaration.length === 2) {
        return ['(', variables, ')'];
    }
    return variables;
}

const rangeExpression = (node, path, print) =>
 path.call(print, 'rangeExpression')

const printBody = (node, path, print) =>
    node.body.type === 'Block'
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]));

const ForRangeStatement = {
    print: ({ node, path, print }) => [
        'for (',
        printSeparatedList(
            [
                rangeDeclaration(node, path, print),
                rangeExpression(node, path, print),
            ],
            {
                separator: [':', line]
            }
        ),
        ')',
        printBody(node, path, print)
    ]
};

module.exports = ForRangeStatement;
