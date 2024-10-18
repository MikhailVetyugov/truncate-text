import { useEffect, useRef, useState } from "react";

import { getAverageCharWidth } from './getAverageCharWidth';
import { getSlicedText } from "./getSlicedText";

export const useTruncate = (text: string, linesCount: number) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [truncatedText, setTruncatedText] = useState(text);

  // TODO: Как у Циан в разметке с сервера?
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const { slicedText, widthsByLines } = getSlicedText(text, containerWidth, linesCount, containerRef.current);
      
      if (text.length > slicedText.length) {
        const dotCharWidth = getAverageCharWidth('.', containerRef.current);
        const threeDotsWidth = dotCharWidth * 3;

        const lastLineWidth = widthsByLines[linesCount - 1];
        const averageCharWidth = widthsByLines.reduce((acc, current) => acc + current, 0) / slicedText.length;
  
        const maxWidthForNoDotsText = containerWidth - threeDotsWidth;
        const textWidthToReplaceByDots = Math.max(0, lastLineWidth - maxWidthForNoDotsText);
        // Упрощение. В идеале для получения количества идти посимвольно с конца обрезанного текста,
        // суммируя длину, пока не превысим textWidthToReplaceByDots.
        const symbolsCountForDotReplacing = Math.ceil(textWidthToReplaceByDots / averageCharWidth)

        setTruncatedText(`${text.slice(0, slicedText.length - symbolsCountForDotReplacing)}...`);
      }
    }
  }, [text, linesCount]);

  return { truncatedText, containerRef };
};
