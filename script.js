const myLibrary = [];
const booksGridContainer = document.querySelector('.books-grid-container');
let bookCard;
let bookTitle;
let trashcan;
let titleAndCanContainer;
let bookAuthor;
let numberOfPages;
let isRead;

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;

  this.toggleReadStatus = function() {
    this.isRead = !this.isRead;
  };
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  return myLibrary;
}

//BOILERPLATE
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


const createBookCardElements = () => {
  bookCard = document.createElement('div');
  bookCard.className = 'book-card';
  
  bookTitle = document.createElement('p');

  trashcan = document.createElement('button');
  
  titleAndCanContainer = document.createElement('div');
  titleAndCanContainer.classList.add('trash-and-title-container');

  bookAuthor = document.createElement('p');

  numberOfPages = document.createElement('p');

  isRead = document.createElement('button');
}

const fillBookCardElementsWithContent = (book) => {
  bookTitle.innerHTML = `<span>Book title:</span> ${book.title}`;
  trashcan.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
  trashcan.id = 'delete-button';
  bookAuthor.innerHTML = `<span>Author:</span> ${book.author}`;
  numberOfPages.innerHTML = `<span>Pages:</span> ${book.numberOfPages}`;
  
  if (book.isRead) {
    isRead.innerText = 'read';
    isRead.className = 'read';
  } else {
    isRead.innerText = 'not read yet';
    isRead.className = 'not-read';
  }
}


//loops through the array and displays each book on the page
function createBookCard(book) {
  createBookCardElements();

  fillBookCardElementsWithContent(book);
  
  booksGridContainer.appendChild(bookCard);
  bookCard.appendChild(titleAndCanContainer);
  titleAndCanContainer.appendChild(bookTitle);
  titleAndCanContainer.appendChild(trashcan);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(numberOfPages);
  bookCard.appendChild(isRead);

  trashcan.addEventListener('click', () => deleteBook(bookCard));

  isRead.addEventListener('click', () => {
    book.toggleReadStatus();
    updateBooksGrid();
  });
}

const deleteBook = (bookCard) => {
  let indexToRemove = Array.from(booksGridContainer.children).indexOf(bookCard);
  myLibrary.splice(indexToRemove, 1);
  bookCard.remove();
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
  const isRead = document.getElementById('isread').checked;
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
  document.getElementById('isread').checked = '';
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