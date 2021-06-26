import { createComponent, ShellHTML } from '../../lib/shell-html/index.js';
import makePieChart from '../../lib/pie-chart.js';
import { getFirstStatistic, getSecondStatistic, getThirdStatistic } from '../../api/statistic.js';

class Statistic extends ShellHTML {
  constructor() {
    super({ tab: 'first', first: undefined, second: undefined, third: undefined });
  }

  changeTabHandler(event) {
    const className = event.target.classList[0];
    this.setState({
      ...this.state,
      tab: className,
    });
  }

  async getFirstStatisticData() {
    const data = await getFirstStatistic();
    
    const totalBook = data.reduce((acc, cur, index) => {
      if(!index) return acc;
      return acc + cur["대출 수"]
    }, 0)

    const result = [];
    data.forEach((item, index) => {
      if (!index) return;

      const newItem = {}
      newItem.name = item["도서명"];
      newItem.color = "#3BB6AE"
      newItem.textColor = "black";
      newItem.percentage = Math.floor(item["대출 수"] / totalBook * 100);
      result.push(newItem);
    })

    this.setState({
      ...this.state,
      first: result,
    })
  }

  async getSecondStatisticData() {
    const data = await getSecondStatistic();

    const totalBook = data.reduce((acc, cur, index) => {
      if(!index) return acc;
      return acc + cur["대출 권 수"]
    }, 0)

    const result = [];
    data.forEach((item, index) => {
      if (!index) return;

      const newItem = {}
      newItem.name = item.고객번호;
      newItem.color = "#3BB6AE"
      newItem.textColor = "black";
      newItem.percentage = Math.floor(item["대출 권 수"] / totalBook * 100);
      newItem.data = [
        {
          name: '',
          color: 'crimson',
          percentage: 50
        }
      ]
      result.push(newItem);
    })

    this.setState({
      ...this.state,
      second: result,
    })
  }

  async getThirdStatisticData() {
    const data = await getThirdStatistic();

    this.setState({
      ...this.state,
      third: data,
    })
  }

  getFirstStatisticHTML() {
    if (!this.state.first) {
      this.getFirstStatisticData();
      return '';
    }

    const chart = makePieChart(this.state.first);
    return `
      <h2 class="statistic__title">도서 별 대여된 순위</h2>
      <svg style="width:500px;height:500px;">${chart.innerHTML}</svg>
    `;
  }

  getSecondStatisticHTML() {
    if (!this.state.second) {
      this.getSecondStatisticData();
      return '';
    }

    const chart = makePieChart(this.state.second);
    return `
      <h2 class="statistic__title">사용자 별 도서 대여 순위</h2>
      <svg style="width:500px;height:500px;">${chart.innerHTML}</svg>
    `;
  }

  getThirdStatisticHTML() {
    if (!this.state.third) {
      this.getThirdStatisticData();
      return '';
    }
    
    const html = this.state.third.reduce((acc, cur) => {
      return acc + `
      <li>
        <div>${cur["고객번호"]}</div>
        <div>${cur["고객명"]}</div>
        <div>${cur["평균 대여기간"]}</div>
      </li>`;
    }, '');

    return `
      <h2 class="statistic__title">사용자의 평균 대여기간 순위</h2>
      <div class="statistic__attr">
        <span>고객번호</span>
        <span>고객명</span>
        <span>평균 대여기간</span>
      </div>
      <ul>${html}</ul>
    `;
  }

  render() {
    return {
      html: `
        <div class="statistic">
          <div class="statistic__tab">
            <button class="first statistic__tab__button ${
              this.state.tab === 'first' ? 'statistic-choosed' : ''
            }">First</button>
            <button class="second statistic__tab__button ${
              this.state.tab === 'second' ? 'statistic-choosed' : ''
            }">Second</button>
            <button class="third statistic__tab__button ${
              this.state.tab === 'third' ? 'statistic-choosed' : ''
            }">Thrid</button>
          </div>
          <div>
            ${this.state.tab === 'first' 
            ? this.getFirstStatisticHTML() 
            : this.state.tab === 'second' 
              ? this.getSecondStatisticHTML() 
              : this.getThirdStatisticHTML()
            }
          </div>
        </div>
      `,
      eventFuncs: [
        {
          className: 'statistic__tab__button',
          func: this.changeTabHandler,
          type: 'click',
        }
      ]
    }
  }
}

createComponent('statistic-component', Statistic);
