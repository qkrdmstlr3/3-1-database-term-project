import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';

const isLogged = false;

class SidebarComponent extends ShellHTML {
  render() {
    const loginHTML = `
      <div class="sidebar__top">
        <h2>LOGIN</h2>
        <input 
          class="sidebar__input" 
          placeholder="Username"
          type="text"
        />
        <input 
          class="sidebar__input"
          placeholder="Password"
          type="password"
        />
        <button class="sidebar__button">login</button>
      </div>
    `;
    const profileHTML = `
      <div class="sidebar__top">
        <h2>PROFILE</h2>
        <image class="sidebar__image" src="https://avatars.githubusercontent.com/u/26402298?s=400&u=d9afa2bb4eb8708b054cc208fd951be1862a03ca&v=4" />
        <span class="sidebar__name">유저명</span>
        <button class="sidebar__button">마이페이지</button>
        <button class="sidebar__button">로그아웃</button>
      </div>
      <button class="sidebar__button sidebar__statistic">통계정보</button>
    `;

    return {
      html: `
        <div class="sidebar">
          ${isLogged ? profileHTML : loginHTML}
        </div>`,
    };
  }
}

createComponent('sidebar-component', SidebarComponent);
