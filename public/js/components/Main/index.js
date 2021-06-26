import {
  ShellHTML,
  createComponent,
  useGlobalState,
} from '../../lib/shell-html/index.js';

class MainComponent extends ShellHTML {
  connectedCallback() {
    this.enrollObserving('page');
  }

  disconnectedCallback() {
    this.releaseObserving('page');
  }

  render() {
    const page = useGlobalState('page');
    const isbookspage = page === 'books';
    const isStatisticpage = page === 'statistic';

    return {
      html: `
        <div class="main">
          ${
            isbookspage
              ? `<books-component id="books"></books-component>`
              : isStatisticpage 
                ? `<statistic-component id="statistic"></statistic-component>` 
                : `<mypage-component id="mypage"></mypage-component>`
          }
        </div>`,
    };
  }
}

createComponent('main-component', MainComponent);
