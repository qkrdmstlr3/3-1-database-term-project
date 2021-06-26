/**
 * 파일설명
 *
 * 통계를 담당하는 UI 컴포넌트입니다.
 *
 */
import { createComponent, ShellHTML } from '../../lib/shell-html/index.js';
import makePieChart from '../../lib/pie-chart.js';
import { getFirstStatistic, getSecondStatistic, getThirdStatistic } from '../../api/statistic.js';

class Statistic extends ShellHTML {
  constructor() {
    super({ tab: 'first', first: undefined, second: undefined, third: undefined });
  }

  // 탭을 바꿀 때 발생하는 이벤트
  changeTabHandler(event) {
    const className = event.target.classList[0];
    this.setState({
      ...this.state,
      tab: className,
    });
  }

  // 첫번째 통계 데이터 가져오기 및 가공
  async getFirstStatisticData() {
    const data = await getFirstStatistic();
    
    const totalBook = data.reduce((acc, cur, index) => {
      if(!index) return acc;
      return acc + cur["대출 수"]
    }, 0)

    // 차트에 넣을 수 있게 가공
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

  // 두번째 통계 데이터 가져오기 및 가공
  async getSecondStatisticData() {
    const data = await getSecondStatistic();

    const totalBook = data.reduce((acc, cur, index) => {
      if(!index) return acc;
      return acc + cur["대출 권 수"]
    }, 0)

    // 차트에 넣을 수 있게 가공
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

  // 세번째 통계 데이터 가져오기
  async getThirdStatisticData() {
    const data = await getThirdStatistic();

    this.setState({
      ...this.state,
      third: data,
    })
  }

  // 첫 번째 통계 html 가져오기
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

  // 두 번째 통계 html 가져오기
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

  // 세 번째 통계 html 가져오기
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

  // 렌더링할 html코드를 반환합니다. evetFuncs는 해당 클래스에 등록할 이벤트와 타입을 지정합니다.
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
