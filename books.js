/* eslint-disable no-restricted-globals */
/*  eslint linebreak-style: ["error", "unix"]   */

const title = document.getElementById('title');
const author = document.getElementById('author');
const addButton = document.getElementById('add-btn');
const booksList = document.getElementById('books-list');
let order = 0;

class Book {
  constructor(bookTitle, bookAuthor, bookOrder) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookOrder = bookOrder;
  }

  static addBook(newBook) {
    const book = document.createElement('div');
    book.classList.add('single-book');
    newBook.bookOrder = order;
    book.innerHTML = `
      <p>"${newBook.bookTitle}" by ${newBook.bookAuthor}</p>
      <button class="rmv-btn delete" id="${order}">Remove</button>
    `;
    booksList.appendChild(book);
    order += 1;
  }

  static displayBooks() {
    const books = Book.getBooks();
    books.forEach((newBook) => Book.addBook(newBook));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static storeBook(newBook) {
    const books = Book.getBooks();
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(bookOrder) {
    const books = Book.getBooks();
    const number = parseInt(bookOrder, 10);
    let newArrayBooks = [];
    books.forEach((book, index) => {
      if (book.bookOrder === number) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
    newArrayBooks = this.getBooks();
    if (newArrayBooks.length === 1) {
      if (newArrayBooks[0].bookOrder === 1) {
        newArrayBooks[0].bookOrder = 0;
      }
    } else {
      for (let i = bookOrder; i < newArrayBooks.length; i += 1) {
        newArrayBooks[bookOrder].bookOrder = number;
      }
    }
    localStorage.setItem('books', JSON.stringify(newArrayBooks));
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }
}

const newBook = new Book(title, author, order);

// Event: Remove a Book
document.querySelector('#books-list').addEventListener('click', (e) => {
  // Remove book from UI
  Book.deleteBook(e.target);

  // Remove book from store
  Book.removeBook(e.target.id);
});

addButton.onclick = () => {
  newBook.bookTitle = title.value;
  newBook.bookAuthor = author.value;
  newBook.bookOrder = order;
  if (newBook.bookTitle && newBook.bookAuthor) {
    Book.storeBook(newBook);
    location.reload();
  }
};

document.addEventListener('DOMContentLoaded', Book.displayBooks);
