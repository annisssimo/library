const myLibrary = [];
const booksGridContainer = document.querySelector('.books-grid-container');

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  return myLibrary;
}

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
// const harryPotter = new Book('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 309, 'read');
// const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 281, 'read');
// const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'not read yet');
// const romeoAndJuliet = new Book('Romeo and Juliet', 'William Shakespeare', 187, 'read');

// addBookToLibrary(theHobbit);
// addBookToLibrary(harryPotter);
// addBookToLibrary(toKillAMockingbird);
// addBookToLibrary(theGreatGatsby);
// addBookToLibrary(romeoAndJuliet);


//loops through the array and displays each book on the page
function createBookCard(book) {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      
      const bookTitle = document.createElement('p');
      const bookAuthor = document.createElement('p');
      const numberOfPages = document.createElement('p');
      const isRead = document.createElement('p');

      bookTitle.innerHTML = `<span>Book title:</span> ${book.title}`;
      bookAuthor.innerHTML = `<span>Author:</span> ${book.author}`;
      numberOfPages.innerHTML = `<span>Pages:</span> ${book.numberOfPages}`;
      isRead.innerHTML = `<button class="not-read">${book.isRead}</button>`;


      booksGridContainer.appendChild(bookCard);
      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(numberOfPages);
      bookCard.appendChild(isRead);
}

const resetBooksGrid = () => {
  booksGridContainer.innerHTML = '';
}

function updateBooksGrid() {
  resetBooksGrid();
  myLibrary.forEach((book) => {
    createBookCard(book)
  });
}

const getBookFromInput = () => {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const numberOfPages = document.getElementById('pages').value;
  const isRead = document.getElementById('isread').value;
  return new Book(bookTitle, bookAuthor, numberOfPages, isRead);
}


//MODALS
const showButton = document.getElementById("show-dialog-btn");
const favDialog = document.getElementById("favDialog");
const confirmBtn = favDialog.querySelector("#confirmBtn");

function resetModalDialog() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('isread').value = '';
}

// showButton opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newBook = getBookFromInput();
  addBookToLibrary(newBook);
  favDialog.close();
  updateBooksGrid();
  resetModalDialog();
});