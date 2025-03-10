const bookContainer = document.querySelector("#book-container");
const dialog = document.querySelector("#add-book-modal")
const showButton = document.querySelector("dialog + button");
const  closeButton = document.querySelector("dialog button");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = read;
}

function addBookToLibrary(title, author, pages, isRead) {
  // create book
  let newBook = new Book(title, author, pages, isRead);
  // store in array
  myLibrary.push(newBook);
  console.log(myLibrary);
  return myLibrary;
}

function displayAllBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    // create a div & give it a class for every item in array
    const bookCard = document.createElement("div");
    bookCard.classList.add(".book-card");

    // define book-card content
    const content = `
            <div class="book-card">
        <div class="book-card-body">
            <h3>${myLibrary[i].title}</h3>
            <p>By: ${myLibrary[i].author}</p>
            <p>Pages: ${myLibrary[i].pages}</p>
            <p>Read: ${myLibrary[i].isRead}</p>
        </div>
    </div>   
      `;

    // add bookCard to container
    bookContainer.innerHTML += content;
  }
}

// Add Book Modal

showButton.addEventListener("click", () =>{
    dialog.showModal();
});

closeButton.addEventListener("click", () =>{
    dialog.close();
});