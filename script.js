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
    isRead.innerHTML = `<button class="not-read">${book.isRead}</button>`;


    booksGridContainer.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(numberOfPages);
    bookCard.appendChild(isRead);
  });
}

displayEachBook(myLibrary);

const showButton = document.getElementById("show-dialog-btn");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// showButton opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Favorite animal" input sets the value of the submit button
selectEl.addEventListener("change", (e) => {
  confirmBtn.value = selectEl.value;
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  outputBox.value =
    favDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  favDialog.close(selectEl.value); // Have to send the select box value here.
});
