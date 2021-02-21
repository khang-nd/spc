/** @param {HTMLElement} element The element to be checked. */
export function isFormElement(element) {
  const { tagName } = element;
  return tagName === "INPUT" || tagName === "TEXTAREA";
}

/** @param {HTMLElement} element The element to be checked. */
export function isEditable(element) {
  return element.isContentEditable || isFormElement(element);
}
