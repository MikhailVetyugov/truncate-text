export function getAverageCharWidth(text: string): number {
  // Create a temporary element and add it to the document
  const tempElement = document.createElement('h1'); // TODO: take span/h1 from ref.current
  tempElement.style.visibility = 'hidden';
  tempElement.style.whiteSpace = 'pre';

  /**
   * TODO: take from ref
   */
  tempElement.style.fontSize = '24px';
  tempElement.style.lineHeight = '32px';
  tempElement.style.fontFamily = 'Arial';
  tempElement.style.display = 'inline-block';

  tempElement.textContent = text;
  document.body.appendChild(tempElement);

  // Measure the width of the element and divide by the number of characters
  const width = tempElement.getBoundingClientRect().width;
  const averageCharWidth = width / text.length;

  // Remove the temporary element
  // document.body.removeChild(tempElement);

  return averageCharWidth;
}