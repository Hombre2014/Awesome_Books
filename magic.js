const title = document.getElementById('title');
const author = document.getElementById('author');
const addButton = document.getElementById('add-btn');
const booksList = document.getElementById('books-list');

// const book = {
//   title: this.title,
//   author: this.author,
// };

addButton.onclick = () => {
  const newBook = {};
  newBook.title = title.value;
  newBook.author = author.value;
  if (newBook.title && newBook.author) {
    localStorage.setItem('book', JSON.stringify(newBook));
    // localStorage.setItem(newBook.title, newBook.author);
    console.log(newBook.title, newBook.author);
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
    // const displayBook = [title, author];

    booksList.appendChild(book);
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    // const newBook = localStorageArr = JSON.parse(localStorage.getItem('book'));
    bookTitle.innerHTML = `${key}<br>`;
    bookAuthor.innerHTML = `${value}<br>`;
    book.appendChild(removeBtn);
    removeBtn.innerHTML = 'Remove Book';
    removeBtn.className = 'rmv-btn';
    removeBtn.setAttribute('id', i);
    book.appendChild(br);
    book.appendChild(hr);
  }
}

showBook();