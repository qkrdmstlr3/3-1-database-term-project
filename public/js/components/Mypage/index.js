import { ShellHTML, createComponent, useGlobalState } from '../../lib/shell-html/index.js';
import { getRentedBooksAPI, getReservedBooksAPI } from '../../api/book.js';

class MypageComponent extends ShellHTML {
  constructor() {
    super({ tab: 'rent', rentedBooks: undefined, reservedBooks: undefined });
  }

  changeTabHandler(event) {
    const className = event.target.classList[0];
    this.setState({
      ...this.state,
      tab: className,
    });
  }

  async getRentedBooks() {
    const { cno } = useGlobalState('customer');
    const rentedBooks = await getRentedBooksAPI(cno);

    this.setState({
      ...this.state,
      rentedBooks,
    });
  }

  async getReservedBooks() {
    const { cno } = useGlobalState('customer');
    const reservedBooks = await getReservedBooksAPI(cno);

    this.setState({
      ...this.state,
      reservedBooks,
    });
  }

  getRentHTML() {
    if (!this.state.rentedBooks) {
      this.getRentedBooks();
      return '';
    }

    return this.state.rentedBooks.reduce(
      (acc, cur) =>
        (acc += `
      <li class="mypage__item">
        <div class="mypage__item__left">
          <div class="mypage__item__left-image"></div>
          <div class="mypage__item__left__info">
            <span>제목 : ${cur.title}</span>
            <span>저자 : ${cur.author}</span>
            <span>출판사 : ${cur.publisher}</span>
            <span>발행연도 : ${cur.year.slice(0, 4)}</span>
          </div>
        </div>
        <div class="mypage__item__center__info">
          <span>반납일 : ${cur.datedue.slice(0, 10)}</span>
          <span>연장횟수 : ${cur.exttimes}</span>
          <span>예약여부 : ${cur.isreserved}</span>
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
    if (!this.state.reservedBooks) {
      this.getReservedBooks();
      return '';
    }

    return this.state.reservedBooks.reduce(
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
    const isRentTab = this.state.tab === 'rent';

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
