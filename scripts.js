const BOOKCONTAINER = document.querySelector('#book-container');
const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    // create book
    let newBook = new Book(title, author, pages, read)
    // store in array
    myLibrary.push(newBook)
    console.log(myLibrary)
}

function displayAllBooks(){
    for(let i = 0; i < myLibrary.length; i++){
     
    }
}

displayAllBooks()