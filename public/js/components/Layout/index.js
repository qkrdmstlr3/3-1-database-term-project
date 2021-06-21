/**
 * 파일설명
 *
 * 전체적인 레이아웃을 담당하는 UI컴포넌트입니다.
 */
import { ShellHTML, createComponent, setGlobalState } from '../../lib/shell-html/index.js';

class LayoutMain extends ShellHTML {
  // 클릭시 페이지를 책들 목록을 보여주도록 바꿔주는 함수입니다.
  titleClickHandler() {
    setGlobalState('page', 'books');
  }

  // 렌더링할 html코드를 반환합니다. evetFuncs는 해당 클래스에 등록할 이벤트와 타입을 지정합니다.
  render() {
    return {
      html: `
        <main class="layout">
          <header class="layout__header">LIBRARY</header>
          <div class="layout__main">
            <sidebar-component id="sidebar"></sidebar-component>
            <main-component id="main"></main-component>
          </div>
        </main>`,
      eventFuncs: [
        {
          className: 'layout__header',
          func: this.titleClickHandler,
          type: 'click',
        },
      ],
    };
  }
}

createComponent('layout-component', LayoutMain);
