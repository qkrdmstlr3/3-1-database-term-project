import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';

class SidebarComponent extends ShellHTML {
  render() {
    return {
      html: `
        <div class="sidebar">
          sidebar
        </div>`,
    };
  }
}

createComponent('sidebar-component', SidebarComponent);
