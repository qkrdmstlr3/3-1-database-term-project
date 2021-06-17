import {
  ShellHTML,
  createComponent,
  setGlobalState,
} from '../../lib/shell-html/index.js';

class LayoutMain extends ShellHTML {
  titleClickHandler() {
    setGlobalState('page', 'books');
  }

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
