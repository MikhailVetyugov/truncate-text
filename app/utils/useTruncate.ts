import { useEffect, useRef, useState } from "react";

import { getAverageCharWidth } from './getAverageCharWidth';

export const useTruncate = (text: string, linesCount: number) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const averageCharWidth = getAverageCharWidth(text);
      const charsPerLine = Math.floor(containerWidth / averageCharWidth); // Will work with round
      const maxChars = charsPerLine * linesCount;

      const averageDotCharWidth = getAverageCharWidth('.');
      const dotSpaceInStandardSymbols = averageDotCharWidth / averageCharWidth;
      const symbolsCountForDotReplacing = Math.ceil(dotSpaceInStandardSymbols * 3);

      // const style = window.getComputedStyle(containerRef.current);
      // const lineHeight = parseFloat(style.lineHeight);
      // const maxContainerHeight = lineHeight * linesCount;

      if (text.length > maxChars) {
        setTruncatedText(`${text.slice(0, maxChars - symbolsCountForDotReplacing)}...`);
      }
    }
  }, [text, linesCount]);

  return { truncatedText, containerRef };
};