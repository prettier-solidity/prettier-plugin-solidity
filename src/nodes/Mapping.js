const Mapping = {
  print: ({ path, print }) => {
    const keyType = path.call(print, 'keyType');
    const keyName = path.call(print, 'keyName');
    const valueType = path.call(print, 'valueType');
    const valueName = path.call(print, 'valueName');
    return [
      'mapping(',
      keyType,
      keyName ? ` ${keyName}` : '',
      ' => ',
      valueType,
      valueName ? ` ${valueName}` : '',
      ')'
    ];
  }
};

module.exports = Mapping;
