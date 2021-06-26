/**
 * 파일설명
 *
 * 좌측의 유저 정보가 있는 sidebar를 담당하는 UI 컴포넌트입니다.
 * useGlobalState는 lib/state.js의 전역상태 값을 가져옵니다.
 * setGlobalState는 lib/state.js의 전역상태를 변경시킵니다.
 *
 */
import {
  ShellHTML,
  createComponent,
  setGlobalState,
  useGlobalState
} from '../../lib/shell-html/index.js';
import { signinCustomerAPI } from '../../api/customer.js';

class SidebarComponent extends ShellHTML {
  // 컴포넌트가 렌더링되면 실행됩니다.
  connectedCallback() {
    // lib/state의 전역상태를 등록합니다. 전역상태가 변경되면 이 컴포넌트는 리렌더링 됩니다.
    this.enrollObserving('customer');
  }

  // 컴포넌트가 dom에서 사라지면 실행됩니다.
  disconnectedCallback() {
    // lib/state의 전역상태 목록에서 해제합니다.
    this.releaseObserving('customer');
  }

  // 마이페이지 화면을 보여주고자 할 때 발생하는 이벤트
  myPageButtonClickHandler() {
    setGlobalState('page', 'mypage');
  }

  // 통계 화면을 보여주고자 할 때 발생하는 이벤트
  statisticButtonClickHandler() {
    setGlobalState('page', 'statistic');
  }

  // 로그인을 할 때 발생하는 이벤트
  async signinButtonClickHandler() {
    const emailInput = document.getElementById('sidebar__username');
    const passwordInput = document.getElementById('sidebar__password');

    const result = await signinCustomerAPI(emailInput.value, passwordInput.value);
    if (result.error) {
      return window.alert(result.error);
    }
    
    setGlobalState('customer', { name: result.name, cno: result.cno });
  }

  // 로그아웃을 할 때 발생하는 이벤트
  signoutButtonClickHandler() {
    setGlobalState('customer', { name: undefined });
  }

   // login이 안되어있을 경우
  getLoginHTML() {
    return `
    <div class="sidebar__top">
      <h2>LOGIN</h2>
      <input 
        id="sidebar__username"
        class="sidebar__input"
        placeholder="Email"
        value="kim@naver.com"
        type="text"
      />
      <input 
        id="sidebar__password"
        class="sidebar__input"
        placeholder="Password"
        value="0000"
        type="password"
      />
      <button class="sidebar__button sidebar__signin__button">login</button>
    </div>
    `;
  }

  // login이 되어있을 경우
  getProfileHTML(name) {
    return `
    <div class="sidebar__top">
      <h2>PROFILE</h2>
      <image class="sidebar__image" src="https://avatars.githubusercontent.com/u/26402298?s=400&u=d9afa2bb4eb8708b054cc208fd951be1862a03ca&v=4" />
      <span class="sidebar__name">${name}</span>
      <button class="sidebar__mypage__button">마이페이지</button>
      <button class="sidebar__button sidebar__statistic">통계정보</button>
      <button class="sidebar__button sidebar__signout">로그아웃</button>
    </div>
    `;
  }

  // 렌더링할 html코드를 반환합니다. evetFuncs는 해당 클래스에 등록할 이벤트와 타입을 지정합니다.
  render() {
    const { name } = useGlobalState('customer');

    return {
      html: `
        <div class="sidebar">
          ${name ? this.getProfileHTML(name) : this.getLoginHTML()}
        </div>`,
      eventFuncs: [
        {
          className: 'sidebar__mypage__button',
          func: this.myPageButtonClickHandler,
          type: 'click',
        },
        {
          className: 'sidebar__signin__button',
          func: this.signinButtonClickHandler,
          type: 'click',
        },
        {
          className: 'sidebar__signout',
          func: this.signoutButtonClickHandler,
          type: 'click',
        },
        {
          className: 'sidebar__statistic',
          func: this.statisticButtonClickHandler,
          type: 'click',
        }
      ],
    };
  }
}

createComponent('sidebar-component', SidebarComponent);

