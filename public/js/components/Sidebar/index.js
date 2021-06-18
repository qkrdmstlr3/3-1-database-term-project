import {
  ShellHTML,
  createComponent,
  setGlobalState,
  useGlobalState
} from '../../lib/shell-html/index.js';
import { signinCustomerAPI } from '../../api/customer.js';

class SidebarComponent extends ShellHTML {
  connectedCallback() {
    this.enrollObserving('customer');
  }

  disconnectedCallback() {
    this.releaseObserving('customer');
  }

  myPageButtonClickHandler() {
    setGlobalState('page', 'mypage');
  }

  async signinButtonClickHandler() {
    const usernameInput = document.getElementById('sidebar__username');
    const passwordInput = document.getElementById('sidebar__password');

    const result = await signinCustomerAPI(usernameInput.value, passwordInput.value);
    if (result.error) {
      return window.alert(result.error);
    }
    setGlobalState('customer', { name: usernameInput.value });
  }

  signoutButtonClickHandler() {
    setGlobalState('customer', { name: undefined });
  }

  render() {
    const { name } = useGlobalState('customer');

    return {
      html: `
        <div class="sidebar">
          ${name ? profileHTML : loginHTML}
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
      ],
    };
  }
}

const loginHTML = `
  <div class="sidebar__top">
    <h2>LOGIN</h2>
    <input 
      id="sidebar__username"
      class="sidebar__input"
      placeholder="Username"
      value="kim"
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

const profileHTML = `
  <div class="sidebar__top">
    <h2>PROFILE</h2>
    <image class="sidebar__image" src="https://avatars.githubusercontent.com/u/26402298?s=400&u=d9afa2bb4eb8708b054cc208fd951be1862a03ca&v=4" />
    <span class="sidebar__name">유저명</span>
    <button class="sidebar__mypage__button">마이페이지</button>
    <button class="sidebar__button sidebar__signout">로그아웃</button>
  </div>
  <button class="sidebar__button sidebar__statistic">통계정보</button>
`;

createComponent('sidebar-component', SidebarComponent);

