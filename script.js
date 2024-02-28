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
    booksGridContainer.innerHTML = '';
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
    bookTitle.innerHTML = `<span>Book title:</span> ${book.bookTitle}`;
    trashcan.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    trashcan.id = 'delete-button';
    bookAuthor.innerHTML = `<span>Author:</span> ${book.bookAuthor}`;
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
    
    booksGridContainer.appendChild(bookCard);
    bookCard.appendChild(titleAndCanContainer);
    titleAndCanContainer.appendChild(bookTitle);
    titleAndCanContainer.appendChild(trashcan);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(numberOfPages);
    bookCard.appendChild(isRead);
  
    this.handleDeleteClick(bookCard);
  
    isRead.addEventListener('click', () => {
      book.toggleReadStatus();
      this.updateBooksGrid();
    });
  }

  handleDeleteClick(bookCard) {
    trashcan.addEventListener('click', () => {
      deleteDialog.showModal();
      yesBtn.onclick = () => {
        deleteDialog.close();
        this.deleteBook(bookCard);
      };
      
      noBtn.onclick = () => {
        deleteDialog.close();
      };
    });
  }

}

const library = new Library();

class UI {
  static getBookFromInput() {
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const numberOfPages = document.getElementById('pages').value;
    const isRead = document.getElementById('isread').checked;
    return {bookTitle, bookAuthor, numberOfPages, isRead};
  }
  
  static resetModalDialog() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('isread').checked = '';
  }
}

//showButton opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  const form = document.getElementById('addNewBookForm');

  if(form.checkValidity()){
    const newBook = UI.getBookFromInput();

    library.addBookToLibrary(newBook);

    favDialog.close();

    library.updateBooksGrid();

    UI.resetModalDialog();
  }
  booksGridContainer.classList.remove('template');
});

cancelBtn.addEventListener("click", (event) => {
    favDialog.close();
});


//template

template.addEventListener('click', () => {

  booksGridContainer.classList.remove('template');

  const theHobbit = new Book({
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    numberOfPages: 295,
    isRead: false
  });
  
  const harryPotter = new Book({
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    numberOfPages: 309,
    isRead: false
  });
  
  const toKillAMockingbird = new Book({
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    numberOfPages: 281,
    isRead: false
  });
  
  const theGreatGatsby = new Book({
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    numberOfPages: 180,
    isRead: false
  });
  
  const romeoAndJuliet = new Book({
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    numberOfPages: 187,
    isRead: false
  });
  
  library.addBookToLibrary(theHobbit);
  library.addBookToLibrary(harryPotter);
  library.addBookToLibrary(toKillAMockingbird);
  library.addBookToLibrary(theGreatGatsby);
  library.addBookToLibrary(romeoAndJuliet);

  library.updateBooksGrid();
});
