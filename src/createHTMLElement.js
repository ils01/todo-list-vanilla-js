export default function createHTMLElement(
  type,
  classList = [],
  attrs = {},
  text = ""
) {
  const elt = document.createElement(type);
  classList.forEach((className) => {
    elt.classList.add(className);
  });
  elt.textContent = text;

  for (const attr in attrs) {
    elt[attr] = attrs[attr];
  }
  return elt;
}
