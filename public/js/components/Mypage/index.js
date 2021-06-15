import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';

class MypageComponent extends ShellHTML {
  constructor() {
    super('rent');
  }

  changeTabHandler(event) {
    const className = event.target.classList[0];
    this.setState(className);
  }

  getRentHTML() {
    return rentedBooks.reduce(
      (acc, cur) =>
        (acc += `
      <li class="mypage__item">
        <div class="mypage__item__left">
          <div class="mypage__item__left-image"></div>
          <div class="mypage__item__left__info">
            <span>제목 : ${cur.title}</span>
            <span>저자 : ${cur.authors}</span>
            <span>출판사 : ${cur.publisher}</span>
            <span>발행연도 : ${cur.year}</span>
          </div>
        </div>
        <div class="mypage__item__center__info">
          <span>반납일 : ${cur.dateDue}</span>
          <span>연장횟수 : ${cur.extTimes}</span>
          <span>예약여부 : ${cur.isReserved}</span>
        </div>
        <div class="mypage__item__right">
          <button>연장하기</button>
          <button>반납하기</button>
        </div>
      </li>
    `),
      ''
    );
  }

  getReservation() {
    return reservedBooks.reduce(
      (acc, cur) =>
        (acc += `
      <li class="mypage__item">
        <div class="mypage__item__left">
          <div class="mypage__item__left-image"></div>
          <div class="mypage__item__left__info">
            <span>제목 : ${cur.title}</span>
            <span>저자 : ${cur.authors}</span>
            <span>출판사 : ${cur.publisher}</span>
            <span>발행연도 : ${cur.year}</span>
          </div>
        </div>
        <div class="mypage__item__right">
          <button>예약취소</button>
        </div>
      </li>
    `),
      ''
    );
  }

  render() {
    const isRentTab = this.state === 'rent';

    return {
      html: `
        <div class="mypage">
          <div class="mypage__tab">
            <button class="rent mypage__tab__button ${
              isRentTab ? 'mypage-choosed' : ''
            }">대여</button>
            <button class="reservation mypage__tab__button ${
              isRentTab ? '' : 'mypage-choosed'
            }">예약</button>
          </div>
          <ul >
            ${isRentTab ? this.getRentHTML() : this.getReservation()}
          </ul>
        </div>
      `,
      eventFuncs: [
        {
          className: 'mypage__tab__button',
          func: this.changeTabHandler,
          type: 'click',
        },
      ],
    };
  }
}

createComponent('mypage-component', MypageComponent);

const reservedBooks = [
  {
    title: '제목',
    authors: ['저자1', '저자2'],
    publisher: '출판사',
    year: '2020',
  },
  {
    title: '제목',
    authors: ['저자1', '저자2'],
    publisher: '출판사',
    year: '2020',
  },
  {
    title: '제목',
    authors: ['저자1', '저자2'],
    publisher: '출판사',
    year: '2020',
  },
];

const rentedBooks = [
  {
    title: '제목',
    authors: ['저자1', '저자2'],
    publisher: '출판사',
    year: '2020',
    dateDue: '2021-07-12',
    extTimes: 1,
    isReserved: true,
  },
  {
    title: '제목',
    authors: ['저자1', '저자2'],
    publisher: '출판사',
    year: '2020',
    dateDue: '2021-07-12',
    extTimes: 1,
    isReserved: true,
  },
  {
    title: '제목',
    authors: ['저자1', '저자2'],
    publisher: '출판사',
    year: '2020',
    dateDue: '2021-07-12',
    extTimes: 1,
    isReserved: true,
  },
  {
    title: '제목',
    authors: ['저자1', '저자2'],
    publisher: '출판사',
    year: '2020',
    dateDue: '2021-07-12',
    extTimes: 1,
    isReserved: true,
  },
  {
    title: '제목',
    authors: ['저자1', '저자2'],
    publisher: '출판사',
    year: '2020',
    dateDue: '2021-07-12',
    extTimes: 1,
    isReserved: true,
  },
];
