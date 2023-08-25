import { printComment } from '../../../src/comments/printer.js';
import loc from '../../../src/loc.js';

test('given an unknown comment type then printComment function should throw', () => {
  const mockCommentPath = {
    getNode: () => ({ type: 'UnknownComment', range: [0, 1] })
  };
  const mockOptions = { ...loc, originalText: 'foo' };

  expect(() => {
    printComment(mockCommentPath, mockOptions);
  }).toThrow();
});
