// TODO: Можно использование useTruncate обернуть компонентом
// Компонент проставит на разметку какой-то data атрибут.
// Убираем аргументы у getCharWidths.
// По data-атрибуту берем все текста из разметки и составляем карту по ним для неоднократного пользования.
// Вызов getCharWidths мемоизуем или добавляем на глобальный объект.
// При очередном вызове useTruncate проверяем, есть ли у нас все символы.
// Если нет, то добавляем в map (доработать getCharWidths, чтобы умели работать с существующей map)
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
