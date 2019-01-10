/* eslint-disable operator-linebreak */
const {
  doc: {
    builders: { concat, group, hardline, indent, join, line, softline }
  }
} = require('prettier');
const nodes = require('./nodes');
const printPreservingEmptyLines = require('./nodes/print-preserving-empty-lines');

function genericPrint(path, options, print) {
  const node = path.getValue();
  let doc;
  switch (node.type) {
    case 'ParameterList':
      // don't insert softlines when there are no parameters
      if (node.parameters.length === 0) {
        return '';
      }
      return group(
        concat([
          indent(
            concat([
              softline,
              join(concat([',', line]), path.map(print, 'parameters'))
            ])
          ),
          softline
        ])
      );
    case 'Parameter':
      doc = path.call(print, 'typeName');
      doc = join(
        ' ',
        [
          doc,
          node.storageLocation,
          node.typeName.stateMutability,
          node.name
        ].filter(element => element)
      );
      return doc;
    case 'ModifierInvocation':
      doc = node.name;
      if (node.arguments && node.arguments.length > 0) {
        doc = concat([doc, '(', join(', ', path.map(print, 'arguments')), ')']);
      }
      return doc;
    case 'Block': {
      // if block is empty, just return the pair of braces
      if (node.statements.length === 0 && !node.comments) {
        return '{}';
      }

      const parts = [
        '{',
        indent(line),
        indent(printPreservingEmptyLines(path, 'statements', options, print))
      ];

      if (node.comments) {
        let first = true;
        path.each(commentPath => {
          if (first) {
            first = false;
          } else {
            parts.push(indent(line));
          }
          const comment = commentPath.getValue();
          if (comment.trailing || comment.leading) {
            return;
          }
          comment.printed = true;
          parts.push(options.printer.printComment(commentPath));
        }, 'comments');
      }

      parts.push(line);
      parts.push('}');

      return concat(parts);
    }
    case 'EventDefinition':
      return concat([
        'event ',
        node.name,
        '(',
        path.call(print, 'parameters'),
        ');'
      ]);

    case 'ExpressionStatement': {
      return concat([
        node.expression ? path.call(print, 'expression') : '',
        node.omitSemicolon ? '' : ';'
      ]);
    }
    case 'FunctionCall':
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
    case 'ElementaryTypeNameExpression':
      return path.call(print, 'typeName');
    case 'WhileStatement':
      return concat([
        'while (',
        path.call(print, 'condition'),
        ') ',
        path.call(print, 'body')
      ]);
    case 'ForStatement':
      return concat([
        'for (',
        node.initExpression ? path.call(print, 'initExpression') : '',
        '; ',
        node.conditionExpression ? path.call(print, 'conditionExpression') : '',
        '; ',
        path.call(print, 'loopExpression'),
        ') ',
        path.call(print, 'body')
      ]);
    case 'EmitStatement':
      return concat(['emit ', path.call(print, 'eventCall'), ';']);
    case 'VariableDeclarationStatement': {
      const startsWithVar =
        node.variables.filter(x => x && x.typeName).length === 0;

      doc = join(
        ', ',
        path.map(statementPath => {
          if (!statementPath.getValue()) {
            return ', ';
          }
          return print(statementPath);
        }, 'variables')
      );

      if (node.variables.length > 1 || startsWithVar) {
        doc = concat(['(', doc, ')']);
      }

      if (node.initialValue) {
        doc = concat([doc, ' = ', path.call(print, 'initialValue')]);
      }
      return concat([
        startsWithVar ? 'var ' : '',
        doc,
        node.omitSemicolon ? '' : ';'
      ]);
    }
    case 'StateVariableDeclaration':
      doc = concat(
        path.map(statementPath => {
          if (!statementPath.getValue()) {
            return ', ';
          }
          return print(statementPath);
        }, 'variables')
      );
      if (node.initialValue) {
        doc = concat([doc, ' = ', path.call(print, 'initialValue')]);
      }
      return concat([doc, ';']);
    case 'StructDefinition':
      return concat([
        'struct ',
        node.name,
        ' {',
        indent(line),
        indent(
          join(
            hardline,
            path.map(print, 'members').map(element => concat([element, ';']))
          )
        ),
        hardline,
        '}'
      ]);
    case 'VariableDeclaration': {
      if (!node.typeName) {
        return node.name;
      }
      doc = path.call(print, 'typeName');
      if (node.isIndexed) {
        doc = join(' ', [doc, 'indexed']);
      }
      const constantKeyword = node.isDeclaredConst ? 'constant' : '';
      if (node.visibility === 'default') {
        return join(
          ' ',
          [
            doc,
            node.typeName.stateMutability,
            constantKeyword,
            node.name
          ].filter(element => element)
        );
      }
      return join(
        ' ',
        [
          doc,
          node.typeName.stateMutability,
          node.visibility,
          constantKeyword,
          node.storageLocation,
          node.name
        ].filter(element => element)
      );
    }
    case 'ArrayTypeName':
      return concat([
        path.call(print, 'baseTypeName'),
        '[',
        node.length ? path.call(print, 'length') : '',
        ']'
      ]);
    case 'Conditional':
      return join(' ', [
        path.call(print, 'condition'),
        '?',
        path.call(print, 'trueExpression'),
        ':',
        path.call(print, 'falseExpression')
      ]);
    case 'IfStatement':
      doc = concat([
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
    case 'EnumDefinition':
      return concat([
        'enum ',
        node.name,
        ' {',
        join(', ', path.map(print, 'members')),
        '}'
      ]);
    case 'EnumValue':
      return node.name;
    case 'NewExpression':
      return concat(['new ', path.call(print, 'typeName')]);
    case 'MemberAccess':
      return concat([path.call(print, 'expression'), '.', node.memberName]);
    case 'ElementaryTypeName':
      return node.name;
    case 'UserDefinedTypeName':
      return node.namePath;
    case 'NumberLiteral':
      if (node.subdenomination) {
        return join(' ', [node.number, node.subdenomination]);
      }
      return node.number;
    case 'HexLiteral':
      return node.value;
    case 'StringLiteral':
      // @TODO: handle scaping, single/double quotes, etc.
      return concat(['"', node.value, '"']);
    case 'BooleanLiteral':
      return node.value ? 'true' : 'false';
    case 'Mapping':
      return concat([
        'mapping(',
        path.call(print, 'keyType'),
        ' => ',
        path.call(print, 'valueType'),
        ')'
      ]);
    case 'TupleExpression':
      // @TODO: remove hack once solidity-parser-antlr is fixed
      if (node.components) {
        doc = join(', ', path.map(print, 'components'));
      } else {
        doc = join(', ', path.map(print, 'elements'));
      }
      if (node.isArray) {
        return concat(['[', doc, ']']);
      }
      return concat(['(', doc, ')']);
    case 'Identifier':
      return node.name;
    case 'IndexAccess':
      return concat([
        path.call(print, 'base'),
        '[',
        path.call(print, 'index'),
        ']'
      ]);
    case 'BinaryOperation':
      return join(' ', [
        path.call(print, 'left'),
        node.operator,
        path.call(print, 'right')
      ]);
    case 'UnaryOperation':
      if (node.isPrefix) {
        if (node.operator === 'delete') {
          return join(' ', [node.operator, path.call(print, 'subExpression')]);
        }
        return concat([node.operator, path.call(print, 'subExpression')]);
      }
      return concat([path.call(print, 'subExpression'), node.operator]);
    case 'BreakStatement':
      return 'break;';
    case 'ContinueStatement':
      return 'continue;';
    case 'ReturnStatement':
      doc = 'return';
      if (node.expression) {
        doc = join(' ', [doc, path.call(print, 'expression')]);
      }
      return concat([doc, ';']);
    case 'ModifierDefinition': {
      let parts = ['modifier ', node.name];

      if (node.parameters && node.parameters.parameters) {
        // if node.paremeters is an object, print parameter list
        parts.push('(');
        parts = parts.concat(path.call(print, 'parameters'));
        parts.push(') ');
      } else if (node.parameters && node.parameters.length === 0) {
        // if node.paremeters is an empty array, don't print parentheses
        parts.push(' ');
      } else {
        // otherwise, throw a not implemented error
        throw new Error('[ModifierDefinition] Scenario not implemented');
      }

      parts.push(path.call(print, 'body'));

      return concat(parts);
    }
    case 'InlineAssemblyStatement':
      // @TODO: add support for assembly language specifier
      return concat(['assembly ', path.call(print, 'body')]);
    case 'AssemblyBlock':
      return concat([
        '{',
        indent(hardline),
        indent(printPreservingEmptyLines(path, 'operations', options, print)),
        hardline,
        '}'
      ]);
    case 'LabelDefinition':
      return concat([node.name, ':', line]);
    case 'AssemblyCall':
      if (node.arguments.length === 0) {
        return node.functionName;
      }
      return concat([
        node.functionName,
        '(',
        group(
          concat([
            indent(
              concat([
                softline,
                join(concat([',', line]), path.map(print, 'arguments'))
              ])
            ),
            softline
          ])
        ),
        ')'
      ]);
    case 'HexNumber':
      return node.value;
    case 'DecimalNumber':
      return node.value;
    case 'AssemblySwitch':
      doc = join(hardline, path.map(print, 'cases'));
      return concat([
        'switch ',
        path.call(print, 'expression'),
        indent(hardline),
        indent(doc)
      ]);
    case 'AssemblyCase':
      if (node.default) {
        doc = concat(['default']);
      } else {
        doc = concat(['case ', path.call(print, 'value')]);
      }
      return join(' ', [doc, path.call(print, 'block')]);
    case 'AssemblyLocalDefinition':
      return join(' ', [
        'let',
        join(', ', path.map(print, 'names')),
        ':=',
        path.call(print, 'expression')
      ]);
    case 'AssemblyAssignment':
      return join(' ', [
        join(', ', path.map(print, 'names')),
        ':=',
        path.call(print, 'expression')
      ]);
    case 'AssemblyIf':
      return concat([
        'if ',
        path.call(print, 'condition'),
        ' ',
        path.call(print, 'body')
      ]);
    case 'AssemblyFor': {
      return join(' ', [
        'for',
        path.call(print, 'pre'),
        path.call(print, 'condition'),
        path.call(print, 'post'),
        path.call(print, 'body')
      ]);
    }
    case 'FunctionTypeName': {
      const returns = returnTypes => {
        if (returnTypes.length > 0) {
          return concat([
            'returns (',
            join(', ', path.map(print, 'returnTypes')),
            ')'
          ]);
        }
        return null;
      };

      return join(
        ' ',
        [
          concat([
            'function(',
            join(', ', path.map(print, 'parameterTypes')),
            ')'
          ]),
          returns(node.returnTypes),
          node.visibility === 'default' ? null : node.visibility,
          node.stateMutability
        ].filter(element => element)
      );
    }
    case 'ThrowStatement':
      return 'throw;';
    default: {
      const nodeType = nodes[node.type];
      if (nodeType) {
        return nodeType.print({ options, node, path, print });
      }
      throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
    }
  }
}

module.exports = genericPrint;
