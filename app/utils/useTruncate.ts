import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

import { getSlicedText } from "./getSlicedText";
import { getCharWidths } from "./getCharWidths";

// Если поставлять компонент, под капотом которого используется хук, то придется решать проблему
// передачи туда контента вроде <h1>Test<span>Span</span></h1>, что усложнит реализацию.
export const useTruncate = (text: string, linesCount: number) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (containerRef.current) {
      const charWidthMap = getCharWidths(text, containerRef.current);

      const containerWidth = containerRef.current.offsetWidth;
      const { slicedText, widthsByLines } = getSlicedText(text, containerWidth, linesCount, charWidthMap);
      
      if (text.length > slicedText.length) {
        const dotCharWidth = charWidthMap.get('.')!;
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

  const fallbackStyle = useMemo<CSSProperties>(() => ({
    // Фоллбэк для SSR.
    display: '-webkit-box',
    WebkitLineClamp: linesCount,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    }), [linesCount]);

  return { truncatedText, containerRef, fallbackStyle };
};
