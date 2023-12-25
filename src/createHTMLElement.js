export default function createHTMLElement(
  tag,
  classList = [],
  attrs = {},
  text = ""
) {
  const elt = document.createElement(tag);
  elt.classList.add(...classList);
  elt.textContent = text;

  for (const attr in attrs) {
    elt[attr] = attrs[attr];
  }
  return elt;
}
