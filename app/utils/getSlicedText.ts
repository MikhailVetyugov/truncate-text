import { getAverageCharWidth } from "./getAverageCharWidth";

const WHITESPACE_RE = /\s/;

export function getSlicedText(text: string, containerWidth: number, maxLines: number, element: HTMLElement) {
  let lineWidth = 0;
  const widthsByLines = []

  for (let i = 0; i < text.length; i++) {
    const charWidth = getAverageCharWidth(text[i], element); // TODO: optimize

    if (lineWidth + charWidth <= containerWidth) {
      lineWidth += charWidth;
      continue;
    }

    widthsByLines.push(lineWidth);
    lineWidth = 0;
    
    // Пробелы будут превращены в перенос строки.
    if (!WHITESPACE_RE.test(text[i])) {
      lineWidth = charWidth;
    }

    if (widthsByLines.length === maxLines) {
      return {
        slicedText: text.slice(0, i),
        widthsByLines,
      }
    }
  }

  widthsByLines.push(lineWidth);

  return {
    slicedText: text,
    widthsByLines,
  };
}
