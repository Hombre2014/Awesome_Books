const title = document.getElementById("title");
const author = document.getElementById("author");
const addButton = document.getElementById("add-btn");
const booksList = document.getElementById("books-list");

addButton.onclick = function() {
  const inpTitle = title.value;
  const inpAuthor = author.value;

  if (inpTitle && inpAuthor) {
    localStorage.setItem(inpTitle, inpAuthor);
    // location.reload();
  }

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const removeBtn = document.createElement('button');
    const hr = document.createElement('hr');
    booksList.innerHTML += `${key}<br>${value}<br>`;
    document.booksList.appendChild(removeBtn);
    removeBtn.innerHTML = 'Remove Book';
    removeBtn.className = 'rmv-btn';
    removeBtn.setAtribute('data-id', (i + 1));
    document.booksList.appendChild(hr);
  }
  
};
