const bookContainer = document.querySelector("#book-container");
const dialog = document.querySelector("#add-book-modal");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const infoLabel = document.querySelector("#info-label");
const form = document.querySelector("form");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const isReadField = document.querySelector("#is_read");

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

// New Book Modal
showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // verify form data
  if (!titleField.value || !authorField.value) {
    infoLabel.style.color = "#c73126";
    infoLabel.innerHTML = "Please fill out all fields!";
  } else {
    title = titleField.value;
    author = pagesField.value;
    pages = pagesField.value;
    isRead = isReadField.value;

    addBookToLibrary(title, author, pages, isRead);
    // reset container
    bookContainer.innerHTML = "";
    // re-add books + new one
    displayAllBooks();

    // success message
    infoLabel.innerHTML = "Book Created!";
    infoLabel.style.color = "#47820e";
  }
});
