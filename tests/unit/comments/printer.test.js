import { printComment } from '../../../src/slang-comments/printer.ts';

test('given an unknown comment type then printComment function should throw', () => {
  const mockCommentPath = {
    getNode: () => ({ type: 'UnknownComment', range: [0, 1] })
  };

  expect(() => {
    printComment(mockCommentPath);
  }).toThrow('Not a comment:');
});
