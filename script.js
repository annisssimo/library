const myLibrary = [];

const booksGridContainer = document.querySelector('.books-grid-container');

const template = document.querySelector('.template p')

const favDialog = document.getElementById("add-new-book-dialog");

const confirmBtn = favDialog.querySelector("#confirmBtn");

const cancelBtn = favDialog.querySelector("#cancelBtn");

const deleteDialog = document.getElementById("want-to-delete");

const yesBtn = document.getElementById('yesBtn');

const noBtn = document.getElementById('noBtn');

const showButton = document.getElementById("show-dialog-btn");

let bookTitle, trashcan, titleAndCanContainer, bookAuthor, numberOfPages, isRead;

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

const createBookCardElements = () => {
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
  
  isRead.innerText = book.isRead ? 'read' : 'not read yet';
  isRead.className = book.isRead ? 'read' : 'not-read';
}


function createBookCard(book, index) {
  const bookCard = document.createElement('div');
  bookCard.className = 'book-card';
  bookCard.setAttribute('data-index', index);

  createBookCardElements();

  fillBookCardElementsWithContent(book);
  
  booksGridContainer.appendChild(bookCard);
  bookCard.appendChild(titleAndCanContainer);
  titleAndCanContainer.appendChild(bookTitle);
  titleAndCanContainer.appendChild(trashcan);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(numberOfPages);
  bookCard.appendChild(isRead);

  handleDeleteClick(bookCard);

  isRead.addEventListener('click', () => {
    book.toggleReadStatus();
    updateBooksGrid();
  });
}

function handleDeleteClick(bookCard) {
  trashcan.addEventListener('click', () => {
    deleteDialog.showModal();
    yesBtn.onclick = () => {
      deleteDialog.close();
      deleteBook(bookCard);
    };
    
    noBtn.onclick = () => {
      deleteDialog.close();
    };
  });
}

const deleteBook = (bookCard) => {
  let indexToRemove = parseInt(bookCard.getAttribute("data-index"));
  myLibrary.splice(indexToRemove, 1);
  updateBooksGrid();
}

const resetBooksGrid = () => {
  booksGridContainer.innerHTML = '';
}

function updateBooksGrid() {
  resetBooksGrid();
  myLibrary.forEach((book, index) => {
    createBookCard(book, index);
  });
}

const getBookFromInput = () => {
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const numberOfPages = document.getElementById('pages').value;
  const isRead = document.getElementById('isread').checked;
  return new Book(bookTitle, bookAuthor, numberOfPages, isRead);
}

function resetModalDialog() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('isread').checked = '';
}

//showButton opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  const form = document.getElementById('addNewBookForm');

  if(form.checkValidity()){
    const newBook = getBookFromInput();

    addBookToLibrary(newBook);

    favDialog.close();

    updateBooksGrid();

    resetModalDialog();
  }
});

cancelBtn.addEventListener("click", (event) => {
    favDialog.close();
});


//template

template.addEventListener('click', () => {

  booksGridContainer.classList.remove('template');

  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
  const harryPotter = new Book('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 309, false);
  const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 281, false);
  const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);
  const romeoAndJuliet = new Book('Romeo and Juliet', 'William Shakespeare', 187, false);
  
  addBookToLibrary(theHobbit);
  addBookToLibrary(harryPotter);
  addBookToLibrary(toKillAMockingbird);
  addBookToLibrary(theGreatGatsby);
  addBookToLibrary(romeoAndJuliet);

  updateBooksGrid();
});


