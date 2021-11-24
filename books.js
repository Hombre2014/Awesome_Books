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
    newBook.bookOrder = order;
    book.innerHTML = `
      <p>${newBook.bookTitle}</p>
      <p>${newBook.bookAuthor}</p>
      <button class="rmv-btn delete" id="${order}">Remove book</button><br>
      <hr>
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
        console.log("book.bookOrder: ", book.bookOrder);
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
    newArrayBooks = this.getBooks();
    if(newArrayBooks.length === 1) {
      if(newArrayBooks[0].bookOrder === 1) {
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
  console.log(e.target.id);
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

// function showBook() {
//   for (let i = 0; i < localStorage.length; i += 1) {
//     const removeBtn = document.createElement('button');
//     const hr = document.createElement('hr');
//     const br = document.createElement('br');

//     const bookTitle = document.createElement('p');
//     const bookAuthor = document.createElement('p');

//     booksList.appendChild(book);
//     book.appendChild(bookTitle);
//     book.appendChild(bookAuthor);
//     const key = localStorage.key(i);
//     const value = localStorage.getItem(key);
//     bookTitle.innerHTML = `${key}`;
//     bookTitle.appendChild(br);
//     bookAuthor.innerHTML = `${value}`;
//     book.appendChild(removeBtn);
//     removeBtn.innerHTML = 'Remove Book';
//     removeBtn.className = 'rmv-btn';
//     removeBtn.setAttribute('id', i);
//     book.appendChild(br);
//     book.appendChild(hr);
//   }
// }

// function removeBook() {
//   const removeButtons = document.querySelectorAll('.rmv-btn');
//   for (let j = 0; j < removeButtons.length; j += 1) {
//     removeButtons[j].addEventListener('click', function e() {
//       const buttonId = this.id;
//       const bookParent = document.getElementById(buttonId).parentElement;
//       const bookParentFirstChild = bookParent.firstChild.innerHTML;
//       bookParent.parentNode.removeChild(bookParent);
//       localStorage.removeItem(bookParentFirstChild);
//       location.reload();
//     });
//   }
// }

// function main() {
//   showBook();
//   removeBook();
// }

// main();
