import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest'
import { getSlicedText } from '../getSlicedText';

vi.mock( '../getAverageCharWidth', () => ({
  getAverageCharWidth: () => 13,
}));

describe('getSlicedText', () => {
  it('2 lines, slicing done', () => {
    const { slicedText, widthsByLines } = getSlicedText("Скидки и акции от продавцов", 90, 2, {} as HTMLElement);

    expect(slicedText).toBe('Скидки и акци');
    expect(widthsByLines).toEqual([78, 78])

  });

  it('2 lines, no slicing needed', () => {
    const { slicedText, widthsByLines } = getSlicedText("Скидки и всё", 90, 2, {} as HTMLElement);

    expect(slicedText).toBe('Скидки и всё');
    expect(widthsByLines).toEqual([78, 65])
  });

  it('1 line, no slicing needed', () => {
    const { slicedText, widthsByLines } = getSlicedText("Скидки", 90, 2, {} as HTMLElement);

    expect(slicedText).toBe('Скидки');
    expect(widthsByLines).toEqual([78])
  });
});
