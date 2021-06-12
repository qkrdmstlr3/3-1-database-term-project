import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';

class LayoutMain extends ShellHTML {
  render() {
    return {
      html: `<div>hello</div>`,
    };
  }
}

createComponent('layout-main', LayoutMain);
