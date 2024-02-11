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

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
const theHobbit2 = new Book('The Hobbit2', 'J.R.R. Tolkien2', 2952, 'read');

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    return myLibrary;
}