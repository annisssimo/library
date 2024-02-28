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

class Library {
  constructor() {
    this.myLibrary = [];
  }

  addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    return myLibrary;
  }

  deleteBook(bookCard) {
    let indexToRemove = parseInt(bookCard.getAttribute("data-index"));
    myLibrary.splice(indexToRemove, 1);
    updateBooksGrid();
  }

  resetBooksGrid() {
    booksGridContainer.innerHTML = '';
  }
  
  updateBooksGrid() {
    resetBooksGrid();
    myLibrary.forEach((book, index) => {
      createBookCard(book, index);
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

  handleDeleteClick(bookCard) {
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

}

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
