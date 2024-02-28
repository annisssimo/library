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