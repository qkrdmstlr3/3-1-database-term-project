import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';
import { getAllBookAPI } from '../../api/book.js';

class BooksComponent extends ShellHTML {
  constructor() {
    super([]);
  }

  connectedCallback() {
    this.getAllBooks();
  }

  async getAllBooks() {
    const books = await getAllBookAPI();
    console.log(books);
    
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
          <input class="books__input" placeholder="검색" />
          <ul class="books__list">
            ${this.getBooksHTML()}
          </ul>
        </div>
      `,
    };
  }
}

createComponent('books-component', BooksComponent);
