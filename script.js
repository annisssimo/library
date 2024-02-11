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

function addBookToLibrary(newBook) {
    let myLibraryUpdated = myLibrary.push(newBook);
    return myLibraryUpdated;
}