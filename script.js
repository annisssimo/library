const myLibrary = [];

function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.isRead}`;
  }
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  return myLibrary;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
const harryPotter = new Book('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 309, 'read');
const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 281, 'read');
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'not read yet');
const romeoAndJuliet = new Book('Romeo and Juliet', 'William Shakespeare', 187, 'read');

addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(toKillAMockingbird);
addBookToLibrary(theGreatGatsby);
addBookToLibrary(romeoAndJuliet);

console.log(myLibrary);


//loops through the array and displays each book on the page
function displayEachBook(lib) {
  const booksGridContainer = document.querySelector('.books-grid-container')
  
  lib.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const numberOfPages = document.createElement('p');
    const isRead = document.createElement('p');

    bookTitle.innerHTML = `<span>Book title:</span> ${book.title}`;
    bookAuthor.innerHTML = `<span>Author:</span> ${book.author}`;
    numberOfPages.innerHTML = `<span>Pages:</span> ${book.numberOfPages}`;
    isRead.innerHTML = book.isRead;


    booksGridContainer.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(numberOfPages);
    bookCard.appendChild(isRead);
  });
}

displayEachBook(myLibrary);