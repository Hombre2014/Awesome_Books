const title = document.getElementById('title');
const author = document.getElementById('author');
const addButton = document.getElementById('add-btn');
const booksList = document.getElementById('books-list');

addButton.onclick = function () {
  const inpTitle = title.value;
  const inpAuthor = author.value;
  if (inpTitle && inpAuthor) {
    localStorage.setItem(inpTitle, inpAuthor);
    location.reload();
  }
};

function showBooks() {
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const removeBtn = document.createElement('button');
    const hr = document.createElement('hr');
    const br = document.createElement('br');
    const book = document.createElement('div');
    const bookTitle = document.createElement('h1');
    const bookAuthor = document.createElement('span');
    booksList.appendChild(book);
    book.appendChild(bookTitle);
    bookTitle.innerHTML = `${key}<br>`;
    book.appendChild(bookAuthor);
    bookAuthor.innerHTML = `${value}<br>`;
    book.appendChild(removeBtn);
    removeBtn.innerHTML = 'Remove Book';
    removeBtn.className = 'rmv-btn';
    removeBtn.setAttribute('id', i);
    book.appendChild(br);
    book.appendChild(hr);
  }
}



showBooks();