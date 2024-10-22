// Потенциальное улучшение:
// 1. В хуке в дополнительном useEffect перед основным useEffect проставить data-атрибут у элемента, либо отдать их для простановки
// подобно фолбэк-стилю.
// 2. В ещё одном useEffect вызвать получение всех необработанных (см. ниже) элементов
// и вызвать getCharWidths, передавая туда один аргумент - все элементы.
// Он возвращает карту карт, где ключ 1-й карты - шрифт, его размер и высота строки, а значение - карта ширин символов.
// Элементы могут отличаться шрифтом, размером шрифта, высотой строки, поэтому для одного и того же символа могут быть разные ширины.
// 3. Помечаем элемент обработанным.
// 4. Кэшируем в глобальном объекте и используем такую карту.
// 5. getCharWidths должен уметь добавлять данные по новым необработанным элементам в существующую карту.
export function getCharWidths(text: string, element: HTMLElement): Map<string, number> {
  const textAndDot = `${text}.`;
  const uniqueText = Array.from(new Set(textAndDot)).join('');

  const tempElements = [];
  const documentFragment = document.createDocumentFragment();
  const root = document.createElement('div');
  documentFragment.appendChild(root);

  for (const char of uniqueText) {
    const tempElement = document.createElement(element.tagName);
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'pre';
    tempElement.style.display = 'inline-block';
    tempElement.textContent = char;
  
    const { fontSize, lineHeight, fontFamily } = getComputedStyle(element);
    tempElement.style.fontSize = fontSize;
    tempElement.style.lineHeight = lineHeight;
    tempElement.style.fontFamily = fontFamily;

    tempElements.push(tempElement);
    root.appendChild(tempElement);;
  }

  document.body.appendChild(documentFragment);

  const map = new Map<string, number>();

  for (let i = 0; i < uniqueText.length; i++) {
    const width = tempElements[i].getBoundingClientRect().width;
    map.set(uniqueText[i], width)
  }

  document.body.removeChild(root);

  return map;
}
