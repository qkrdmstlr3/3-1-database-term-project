/**
 * 파일설명
 *
 * 메인화면을 담당하는 UI 컴포넌트입니다.
 * 페이지에 따라 책들 목록 또는 마이페이지를 보여줍니다.
 */
import { ShellHTML, createComponent, useGlobalState } from '../../lib/shell-html/index.js';

class MainComponent extends ShellHTML {
  // 컴포넌트가 렌더링되면 실행됩니다.
  connectedCallback() {
    // lib/state의 전역상태를 등록합니다. 전역상태가 변경되면 이 컴포넌트는 리렌더링 됩니다.
    this.enrollObserving('page');
  }

  // 컴포넌트가 dom에서 사라지면 실행됩니다.
  disconnectedCallback() {
    // lib/state의 전역상태 목록에서 해제합니다.
    this.releaseObserving('page');
  }

  render() {
    const page = useGlobalState('page'); // lib/state.js의 전역상태값을 가져옵니다.
    const isbookspage = page === 'books';

    // 렌더링할 html코드를 반환합니다.
    return {
      html: `
        <div class="main">
          ${
            isbookspage
              ? `<books-component id="books"></books-component>`
              : `<mypage-component id="mypage"></mypage-component>`
          }
        </div>`,
    };
  }
}

createComponent('main-component', MainComponent);
