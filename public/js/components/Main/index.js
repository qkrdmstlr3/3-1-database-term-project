import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';

const isbookspage = true;

class MainComponent extends ShellHTML {
  render() {
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
