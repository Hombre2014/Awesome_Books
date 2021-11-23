/* eslint-disable no-restricted-globals */
/*  eslint linebreak-style: ["error", "unix"]   */

const title = document.getElementById('title');
const author = document.getElementById('author');
const addButton = document.getElementById('add-btn');
const booksList = document.getElementById('books-list');

function Book(bookTitle, bookAuthor) {
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
}

const newBook = new Book();
addButton.onclick = () => {
  newBook.bookTitle = title.value;
  newBook.bookAuthor = author.value;
  if (newBook.bookTitle && newBook.bookAuthor) {
    localStorage.setItem(newBook.bookTitle, newBook.bookAuthor);
    location.reload();
  }
};

function showBook() {
  for (let i = 0; i < localStorage.length; i += 1) {
    const removeBtn = document.createElement('button');
    const hr = document.createElement('hr');
    const br = document.createElement('br');
    const book = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    booksList.appendChild(book);
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    bookTitle.innerHTML = `${key}`;
    bookTitle.appendChild(br);
    bookAuthor.innerHTML = `${value}`;
    book.appendChild(removeBtn);
    removeBtn.innerHTML = 'Remove Book';
    removeBtn.className = 'rmv-btn';
    removeBtn.setAttribute('id', i);
    book.appendChild(br);
    book.appendChild(hr);
  }
}

function removeBook() {
  const removeButtons = document.querySelectorAll('.rmv-btn');
  for (let j = 0; j < removeButtons.length; j += 1) {
    removeButtons[j].addEventListener('click', function e() {
      const buttonId = this.id;
      const bookParent = document.getElementById(buttonId).parentElement;
      const bookParentFirstChild = bookParent.firstChild.innerHTML;
      bookParent.parentNode.removeChild(bookParent);
      localStorage.removeItem(bookParentFirstChild);
      location.reload();
    });
  }
}

function main() {
  showBook();
  removeBook();
}

main();
