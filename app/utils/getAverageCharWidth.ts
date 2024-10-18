export function getAverageCharWidth(text: string, element: HTMLElement): number {
  const tempElement = document.createElement(element.tagName);
  tempElement.style.visibility = 'hidden';
  tempElement.style.whiteSpace = 'pre';
  tempElement.style.display = 'inline-block';

  const { fontSize, lineHeight, fontFamily } = getComputedStyle(element);
  tempElement.style.fontSize = fontSize;
  tempElement.style.lineHeight = lineHeight;
  tempElement.style.fontFamily = fontFamily;

  tempElement.textContent = text;
  document.body.appendChild(tempElement);

  const width = tempElement.getBoundingClientRect().width;
  const averageCharWidth = width / text.length;

  document.body.removeChild(tempElement);

  return averageCharWidth;
}
