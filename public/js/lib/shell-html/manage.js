export function render(ElementName, dom) {
  if (dom) {
    dom.innerHTML = `<${ElementName}/>`;
  }
}

export function createComponent(name, component) {
  customElements.define(name, component);
}
