import { ShellHTML, createComponent, useGlobalState } from '../../lib/shell-html/index.js';
import { getRentedBooksAPI, getReservedBooksAPI, returnBook, cancelReservedBook, extendExtBook } from '../../api/book.js';

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

  async returnBookHandler(event) {
    const check = window.confirm("정말 반납하시겠습니까?");
    if (!check) { return; }

    const isbn = event.target.classList[1];
    
    const result = await returnBook(isbn);
    if (result === true) {
      this.updateRentedBooks(isbn)
    }
  }

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

  async cancelReservedBookHandler(event) {
    const check = window.confirm("정말 취소하시겠습니까?");
    if (!check) { return; }

    const isbn = event.target.classList[1];
    const { cno } = useGlobalState('customer');
    
    const result = await cancelReservedBook(cno, isbn);
    if (result === true) {
      this.updateReservedBooks(isbn)
    }
  }

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

  async extendExtBookHandler(event) {
    const check = window.confirm("정말 연장하시겠습니까?");
    if (!check) { return; }

    const isbn = event.target.classList[1];
    
    const result = await extendExtBook(isbn);
    if (result.error) {
      return window.alert(result.error);
    }
    this.updateRentedBooksExtTime(isbn);
  }

  updateRentedBooksExtTime(isbn) {
    const newBooks = this.state.rentedBooks.map((book) => {
      if(`${book.isbn}` !== isbn) {
        return book
      }
      book.exttimes = book.exttimes + 1;
      //TODO: 날짜도 추후 수정

      return book;
    });
    this.setState({
      ...this.state,
      rentedBooks: newBooks,
    })
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
          <button class="mypage__item__extbutton ${cur.isbn}">연장하기</button>
          <button class="mypage__item__returnbutton ${cur.isbn}">반납하기</button>
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
        }
      ],
    };
  }
}

createComponent('mypage-component', MypageComponent);
