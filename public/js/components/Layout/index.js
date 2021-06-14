import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';

class LayoutMain extends ShellHTML {
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
    };
  }
}

createComponent('layout-component', LayoutMain);
