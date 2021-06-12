import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';
// import styleSheet from './style.css';

class LayoutMain extends ShellHTML {
  render() {
    return {
      html: `
        <main>
          <header>LIBRARY</header>
        </main>`,
      // css: styleSheet,
    };
  }
}

createComponent('layout-main', LayoutMain);
