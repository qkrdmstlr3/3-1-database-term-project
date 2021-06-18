import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';
import { getAllBookAPI, searchBooksAPI } from '../../api/book.js';

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

  getBooksHTML() {
    return this.state.reduce(
      (acc, cur) =>
        (acc += `
      <li class="books__item ${cur.cno ? 'books-disable': ''}">
        <div class="books__item__left">
          <div class="books__item__left-image"></div>
          ${cur.cno 
            ? '<button>대여불가</button>'
            : '<button>대여하기</button>'}
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
          type: 'submit'
        }
      ]
    };
  }
}

createComponent('books-component', BooksComponent);
