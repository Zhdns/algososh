import { bubbleSort, selectionSort } from "./sorting-pageUnit";

describe('bubbleSort', () => {
    it('correctly sorts an empty array',  () => {
      const emptyArray = [];
      const sortedEmptyArray =  bubbleSort(emptyArray);
      expect(sortedEmptyArray).toEqual([]);
    });
  
    it('correctly sorts an array with one element',  () => {
      const singleElementArray = [1];
      const sortedSingleElementArray = bubbleSort(singleElementArray);
      expect(sortedSingleElementArray).toEqual([1]);
    });
  
    it('correctly sorts an array with multiple elements',  () => {
      const multipleElementsArray = [3, 1, 4, 1, 5, 9];
      const sortedMultipleElementsArray =  bubbleSort(multipleElementsArray);
      expect(sortedMultipleElementsArray).toEqual([1, 1, 3, 4, 5, 9]);
    });
  
  });

  describe('selectionSort', () => {
    it('correctly sorts an empty array', () => {
      const emptyArray = [];
      expect(selectionSort(emptyArray)).toEqual([]);
    });
  
    it('correctly sorts an array with one element', () => {
      const singleElementArray = [1];
      expect(selectionSort(singleElementArray)).toEqual([1]);
    });
  
    it('correctly sorts an array with multiple elements', () => {
      const multipleElementsArray = [3, 1, 4, 1, 5, 9];
      expect(selectionSort(multipleElementsArray)).toEqual([1, 1, 3, 4, 5, 9]);
    });
  
  });