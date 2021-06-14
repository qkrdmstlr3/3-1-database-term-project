import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';

class MainComponent extends ShellHTML {
  render() {
    return {
      html: `
        <div class="main">
          main
        </div>`,
    };
  }
}

createComponent('main-component', MainComponent);
