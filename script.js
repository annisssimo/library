let bookTitle, trashcan, titleAndCanContainer, bookAuthor, numberOfPages, isRead;
const template = document.querySelector('.template p')

class Book {
  constructor(options) {
    this.title = options.title;
    this.author = options.author;
    this.numberOfPages = options.numberOfPages;
    this.isRead = options.isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }

}

class Library {
  constructor() {
    this.myLibrary = [];
  }

  addBookToLibrary(newBook) {
    this.myLibrary.push(newBook);
    return this.myLibrary;
  }

  deleteBook(bookCard) {
    let indexToRemove = parseInt(bookCard.getAttribute("data-index"));
    this.myLibrary.splice(indexToRemove, 1);
    this.updateBooksGrid();
  }

  resetBooksGrid() {
    ui.booksGridContainer.innerHTML = '';
  }
  
  updateBooksGrid() {
    this.resetBooksGrid();
    this.myLibrary.forEach((book, index) => {
      this.createBookCard(book, index);
    });
  }

  createBookCardElements() {
    bookTitle = document.createElement('p');
    trashcan = document.createElement('button');
    titleAndCanContainer = document.createElement('div');
    titleAndCanContainer.classList.add('trash-and-title-container');
    bookAuthor = document.createElement('p');
    numberOfPages = document.createElement('p');
    isRead = document.createElement('button');
  }
  
  fillBookCardElementsWithContent(book) {
    bookTitle.innerHTML = `<span>Book title:</span> ${book.title}`;
    trashcan.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    trashcan.id = 'delete-button';
    bookAuthor.innerHTML = `<span>Author:</span> ${book.author}`;
    numberOfPages.innerHTML = `<span>Pages:</span> ${book.numberOfPages}`;   
    isRead.innerText = book.isRead ? 'read' : 'not read yet';
    isRead.className = book.isRead ? 'read' : 'not-read';
  }
  
  createBookCard(book, index) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-index', index);

    this.createBookCardElements();
    this.fillBookCardElementsWithContent(book);
    
    ui.booksGridContainer.appendChild(bookCard);
    bookCard.appendChild(titleAndCanContainer);
    titleAndCanContainer.appendChild(bookTitle);
    titleAndCanContainer.appendChild(trashcan);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(numberOfPages);
    bookCard.appendChild(isRead);

    // Add event listener to the trashcan button
    trashcan.addEventListener('click', () => this.handleDeleteClick(bookCard));
    isRead.addEventListener('click', () => this.handleReadStatusToggle(book));
  }

  handleDeleteClick(bookCard) {
    UI.showDialog(ui.deleteDialog);
    ui.yesBtn.addEventListener('click', () => {
      this.deleteBook(bookCard);
      UI.hideDialog(ui.deleteDialog);
    });
    ui.noBtn.addEventListener('click', () => UI.hideDialog(ui.deleteDialog));
  }

  handleReadStatusToggle(book) {
    book.toggleReadStatus();
    this.updateBooksGrid();
  }
}


const library = new Library();

class UI {

  constructor() {
    this.booksGridContainer = document.querySelector('.books-grid-container');
    this.favDialog = document.getElementById("add-new-book-dialog");
    this.confirmBtn = this.favDialog.querySelector("#confirmBtn");
    this.cancelBtn = this.favDialog.querySelector("#cancelBtn");
    this.deleteDialog = document.getElementById("want-to-delete");
    this.yesBtn = document.getElementById('yesBtn');
    this.noBtn = document.getElementById('noBtn');
    this.showButton = document.getElementById("show-dialog-btn");
  }

  static getBookFromInput() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numberOfPages = document.getElementById('pages').value;
    const isRead = document.getElementById('isread').checked;

    return new Book({ title, author, numberOfPages, isRead });
  }

  static showDialog(dialog) {
    dialog.showModal();
  }
  
  static hideDialog(dialog) {
    dialog.close();
  }

  static clearForm() {
    document.getElementById('addNewBookForm').reset();
  }
}

const ui = new UI();

function handleConfirmBtnClick() {
  const form = document.getElementById('addNewBookForm');
  if (form.checkValidity()) {
    const newBook = UI.getBookFromInput();
    library.addBookToLibrary(newBook);
    UI.hideDialog(ui.favDialog);
    library.updateBooksGrid();
    UI.clearForm();
  }
  ui.booksGridContainer.classList.remove('template');
}

function loadTemplateBooks() {
  ui.booksGridContainer.classList.remove('template');

  const books = [
    new Book({ title: 'The Hobbit', author: 'J.R.R. Tolkien', numberOfPages: 295, isRead: false }),
    new Book({ title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', numberOfPages: 309, isRead: false }),
    new Book({ title: 'To Kill a Mockingbird', author: 'Harper Lee', numberOfPages: 281, isRead: false }),
    new Book({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', numberOfPages: 180, isRead: false }),
    new Book({ title: 'Romeo and Juliet', author: 'William Shakespeare', numberOfPages: 187, isRead: false }),
  ];

  books.forEach(book => library.addBookToLibrary(book));
  library.updateBooksGrid();
}

// Event listeners
ui.showButton.addEventListener('click', () => UI.showDialog(ui.favDialog));
ui.confirmBtn.addEventListener('click', () => handleConfirmBtnClick());
ui.cancelBtn.addEventListener('click', () => UI.hideDialog(ui.favDialog));
template.addEventListener('click', () => loadTemplateBooks());