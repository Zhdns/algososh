
import { reverseArray } from './stringUnit';

describe('reverseArray', () => {
  it('should correctly reverse a string with an even number of characters', () => {
    expect(reverseArray('abcd')).toEqual(['d', 'c', 'b', 'a']);
  });

  it('should correctly reverse a string with an odd number of characters', () => {
    expect(reverseArray('abcde')).toEqual(['e', 'd', 'c', 'b', 'a']);
  });

  it('should correctly handle a single character', () => {
    expect(reverseArray('q')).toEqual(['q']);
  });

  it('should handle an empty string', () => {
    expect(reverseArray('')).toEqual([]);
  });
});

