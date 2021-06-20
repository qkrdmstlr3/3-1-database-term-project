import { ShellHTML, createComponent, useGlobalState } from '../../lib/shell-html/index.js';
import { getAllBookAPI, searchBooksAPI, rentBook, reserveBook } from '../../api/book.js';

class BooksComponent extends ShellHTML {
  constructor() {
    super([]);
  }

  connectedCallback() {
    this.getAllBooks();
  }

  async getAllBooks() {
    const books = await getAllBookAPI();
    
    this.setState(books);
  }

  async searchHandler(event) {
    event.preventDefault();

    const input = document.getElementById('books__input');
    const books = await searchBooksAPI(input.value);
    
    if (books.error) {
      return window.alert('잘못된 검색입니다.');
    }
    this.setState(books);
  }

  async rentBookHandler(event) {
    const isbn = event.target.id;
    const { cno } = useGlobalState('customer');
    if (!cno) {
      return window.alert("로그인이 필요합니다");
    }

    const check = window.confirm("정말 대여하시겠습니까?");
    if (!check) { return; }

    const result = await rentBook(cno, isbn);
    if (result.error) {
      return window.alert(result.error);
    }
    this.changeCurrentBooksState(isbn, cno);
  }

  changeCurrentBooksState(isbn, cno) {
    const newBooks = this.state.map((book) => {
      if(`${book.isbn}` !== isbn) {
        return book
      };
      book.cno = cno;
      return book;
    });
    this.setState(newBooks);
  }

  async reserveBookHandler(event) {
    const isbn = event.target.id;
    const { cno } = useGlobalState('customer');
    if (!cno) {
      return window.alert("로그인이 필요합니다");
    }

    const check = window.confirm("정말 예약하시겠습니까?");
    if (!check) { return; }

    const result = await reserveBook(cno, isbn);
    if (result.error) {
      return window.alert(result.error);
    }
    window.alert("예약이 완료되었습니다");
  }

  getBooksHTML() {
    const { cno } = useGlobalState('customer');

    return this.state.reduce(
      (acc, cur) =>
        (acc += `
      <li class="books__item ${cur.cno ? 'books-disable': ''}">
        <div class="books__item__left">
          <div class="books__item__left-image"></div>
          ${cur.cno 
            ? `<button id="${cur.isbn}" class="books__reserve__button">예약하기</button>`
            : `<button id="${cur.isbn}" class="books__rent__button">대여하기</button>`}
        </div>
        <div class="books__item__right">
          <span>제목 : ${cur.title}</span>
          <span>출판사 : ${cur.publisher}</span>
          <span>저자 : ${cur.author}</span>
          <span>발행연도 : ${cur.year.slice(0, 4)}</span>
        </div>
      </li>
    `),
      ''
    );
  }

  render() {
    return {
      html: `
        <div class="books">
          <form class="books__form">
            <input id="books__input" class="books__input" placeholder="도서명:책제목 | 저자명:작가이름 | 출판사:출판사 | 발행년도:시작:끝" />
          </form>
          <ul class="books__list">
            ${this.getBooksHTML()}
          </ul>
        </div>
      `,
      eventFuncs: [
        {
          className: 'books__form',
          func: this.searchHandler,
          type: 'submit',
        },
        {
          className: 'books__rent__button',
          func: this.rentBookHandler,
          type: 'click',
        },
        {
          className: 'books__reserve__button',
          func: this.reserveBookHandler,
          type: 'click',
        }
      ]
    };
  }
}

createComponent('books-component', BooksComponent);
