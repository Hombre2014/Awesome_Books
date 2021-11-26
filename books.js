/* eslint-disable no-restricted-globals */
/*  eslint linebreak-style: ["error", "unix"]   */
/* eslint-disable no-undef */

const title = document.getElementById('title');
const author = document.getElementById('author');
const addButton = document.getElementById('add-btn');
const booksList = document.getElementById('books-list');
let order = 0;

function clearBorder() {
  if (booksList.firstChild === null) {
    document.getElementById('listing').style.border = 'none';
  } else {
    document.getElementById('listing').style.border = '2px solid black';
  }
}

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
    clearBorder();
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
    bookOrder = parseInt(bookOrder, 10);
    let newArrayBooks = [];
    books.forEach((book, index) => {
      if (book.bookOrder === bookOrder) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
    newArrayBooks = this.getBooks();
    if (newArrayBooks.length === 1) {
      if (newArrayBooks[0].bookOrder > 0) {
        newArrayBooks[0].bookOrder = 0;
      }
    } else {
      for (let i = bookOrder; i < newArrayBooks.length; i += 1) {
        newArrayBooks[bookOrder].bookOrder = i;
        bookOrder += 1;
      }
    }
    localStorage.setItem('books', JSON.stringify(newArrayBooks));
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
    clearBorder();
    location.reload();
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

const list = document.getElementById('list');
const add = document.getElementById('add');
const contact = document.getElementById('contact');
const allBooks = document.querySelector('.all-books');
const addingBook = document.querySelector('.adding-book');
const contactUs = document.querySelector('.contact-us');

function navigation() {
  list.addEventListener('click', () => {
    list.firstChild.classList.add('active');
    contact.firstChild.classList.remove('active');
    add.firstChild.classList.remove('active');
    addingBook.style.display = 'none';
    contactUs.style.display = 'none';
    allBooks.style.display = 'block';
  });
  add.addEventListener('click', () => {
    allBooks.style.display = 'none';
    contactUs.style.display = 'none';
    addingBook.style.display = 'block';
    add.firstChild.classList.add('active');
    list.firstChild.classList.remove('active');
    contact.firstChild.classList.remove('active');
  });
  contact.addEventListener('click', () => {
    allBooks.style.display = 'none';
    addingBook.style.display = 'none';
    contactUs.style.display = 'block';
    contact.firstChild.classList.add('active');
    list.firstChild.classList.remove('active');
    add.firstChild.classList.remove('active');
  });
}

function dT() {
  const now = luxon.DateTime.now();
  const currentTime = document.querySelector('.time-date');
  currentTime.innerHTML = now.toLocaleString(luxon.DateTime.DATETIME_FULL_WITH_SECONDS);
}

setInterval(dT, 1000);

navigation();

// luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_FULL_WITH_SECONDS);
