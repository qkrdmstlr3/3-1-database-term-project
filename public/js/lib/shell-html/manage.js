/**
 * 제가 자체적으로 개발한 라이브러리입니다.
 * 별도의 설명은 아래 주소를 참고 부탁드립니다.
 * https://shellboylog.com/develop/shell-html%20DOCS
 * 잘 안나온다면 아래 주소의 가장 상위 포스트 참고
 * https://shellboylog.com/list
 */
export function render(ElementName, dom) {
  if (dom) {
    dom.innerHTML = `<${ElementName}/>`;
  }
}

export function createComponent(name, component) {
  customElements.define(name, component);
}
