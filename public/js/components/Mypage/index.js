/**
 * 파일설명
 *
 * 메인화면에서 마이페이지를 담당하는 UI 컴포넌트입니다.
 * useGlobalState는 lib/state.js의 전역상태 값을 가져옵니다.
 * this.state는 이 컴포넌트의 자체 상태를 의미하며 this.setState사용시 상태를 변경하고 변경된 상태를 이용해서 컴포넌트를 리렌더링합니다.
 */
import { ShellHTML, createComponent, useGlobalState } from '../../lib/shell-html/index.js';
import {
  getRentedBooksAPI,
  getReservedBooksAPI,
  returnBook,
  cancelReservedBook,
  extendExtBook,
} from '../../api/book.js';

class MypageComponent extends ShellHTML {
  constructor() {
    super({ tab: 'rent', rentedBooks: undefined, reservedBooks: undefined });
  }

  // 대여 / 예약 탭을 바꾸고자 할 때 발생하는 이벤트
  changeTabHandler(event) {
    const className = event.target.classList[0];
    this.setState({
      ...this.state,
      tab: className,
    });
  }

  // 책을 반납하고자 할 때 발생하는 이벤트
  async returnBookHandler(event) {
    const check = window.confirm('정말 반납하시겠습니까?');
    if (!check) {
      return;
    }

    const isbn = event.target.classList[1];

    const result = await returnBook(isbn);
    if (result === true) {
      this.updateRentedBooks(isbn);
    }
  }

  // this.state의 rentedbook정보를 업데이트한다. (반납된 도서 제거)
  updateRentedBooks(isbn) {
    const newBook = this.state.rentedBooks.filter((book) => {
      if (`${book.isbn}` === isbn) {
        return false;
      }
      return true;
    });
    this.setState({
      ...this.state,
      rentedBooks: newBook,
    });
  }

  // 예약된 책을 취고하고자 할 때 발생하는 이벤트
  async cancelReservedBookHandler(event) {
    const check = window.confirm('정말 취소하시겠습니까?');
    if (!check) {
      return;
    }

    const isbn = event.target.classList[1];
    const { cno } = useGlobalState('customer');

    const result = await cancelReservedBook(cno, isbn);
    if (result === true) {
      this.updateReservedBooks(isbn);
    }
  }

  // this.state의 reservedbook정보를 업데이트한다. (예약된 도서 제거)
  updateReservedBooks(isbn) {
    const newBook = this.state.reservedBooks.filter((book) => {
      if (`${book.isbn}` === isbn) {
        return false;
      }
      return true;
    });
    this.setState({
      ...this.state,
      reservedBooks: newBook,
    });
  }

  // 대여 기간을 연장할 때 발생하는 함수
  async extendExtBookHandler(event) {
    const check = window.confirm('정말 연장하시겠습니까?');
    if (!check) {
      return;
    }

    const isbn = event.target.classList[1];

    const result = await extendExtBook(isbn);
    if (result.error) {
      return window.alert(result.error);
    }
    this.updateRentedBooksExtTime(isbn);
  }

  // this.state의 rentedbook정보를 업데이트한다. (연장된 도서 변경)
  updateRentedBooksExtTime(isbn) {
    const newBooks = this.state.rentedBooks.map((book) => {
      if (`${book.isbn}` !== isbn) {
        return book;
      }
      book.exttimes = book.exttimes + 1;
      //TODO: 날짜도 추후 수정

      return book;
    });
    this.setState({
      ...this.state,
      rentedBooks: newBooks,
    });
  }

  // 빌린 도서를 가져오는 함수
  async getRentedBooks() {
    const { cno } = useGlobalState('customer');
    const rentedBooks = await getRentedBooksAPI(cno);

    this.setState({
      ...this.state,
      rentedBooks,
    });
  }

  // 예약한 도서를 가져오는 함수
  async getReservedBooks() {
    const { cno } = useGlobalState('customer');
    const reservedBooks = await getReservedBooksAPI(cno);

    this.setState({
      ...this.state,
      reservedBooks,
    });
  }

  // 대여 탭일 때 보여지는 html
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
        </div>
        <div class="mypage__item__right">
          <button class="mypage__item__extbutton ${cur.isbn}">연장하기</button>
          <button class="mypage__item__returnbutton ${cur.isbn}">반납하기</button>
        </div>
      </li>
    `),
      ''
    );
  }

  // 예약 탭일 때 보여지는 html
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
            <span>저자 : ${cur.author}</span>
            <span>출판사 : ${cur.publisher}</span>
            <span>발행연도 : ${cur.year.slice(0, 4)}</span>
          </div>
        </div>
        <div class="mypage__item__right">
          <button class="mypage__item__cancelbutton ${cur.isbn}">예약취소</button>
        </div>
      </li>
    `),
      ''
    );
  }

  // 렌더링할 html코드를 반환합니다. evetFuncs는 해당 클래스에 등록할 이벤트와 타입을 지정합니다.
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
        {
          className: 'mypage__item__returnbutton',
          func: this.returnBookHandler,
          type: 'click',
        },
        {
          className: 'mypage__item__cancelbutton',
          func: this.cancelReservedBookHandler,
          type: 'click',
        },
        {
          className: 'mypage__item__extbutton',
          func: this.extendExtBookHandler,
          type: 'click',
        },
      ],
    };
  }
}

createComponent('mypage-component', MypageComponent);
