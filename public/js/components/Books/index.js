import { ShellHTML, createComponent } from '../../lib/shell-html/index.js';

class BooksComponent extends ShellHTML {
  getBooksHTML() {
    return dummyBooks.reduce(
      (acc, cur) =>
        (acc += `
      <li class="books__item">
        <div class="books__item__left">
          <div class="books__item__left-image"></div>
          <button class="books__item__left-button">대여하기</button>
        </div>
        <div class="books__item__right">
          <span>제목 : ${cur.title}</span>
          <span>저자 : ${cur.authors}</span>
          <span>출판사 : ${cur.publisher}</span>
          <span>발행연도 : ${cur.year}</span>
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

const dummyBooks = [
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
