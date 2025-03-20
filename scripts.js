const bookContainer = document.querySelector("#book-container");
const dialog = document.querySelector("#add-book-modal");
const showButton = document.querySelector("#modal-button");
const closeButton = document.querySelector("dialog button");
const infoLabel = document.querySelector("#info-label");
const form = document.querySelector("form");
const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = read;
}

function addBookToLibrary(newBook) {
  // Passes new Book(props) in as newBook
  //   // create book
  //   let newBook = new Book(title, author, pages, isRead);
  // store in array
  // Only need to push newBook no need to repeat book props
  myLibrary.push(newBook);
}

function displayAllBooks() {
  // reset container to prevent duplicates
  bookContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    // create a div & give it a class for every item in array
    const bookCard = document.createElement("div");
    bookCard.classList.add(".book-card");
    const bookIndex = myLibrary[i];
    // define book-card content
    const content = `
            <div class="book-card" >
        <div class="book-card-body">
            <h3>${myLibrary[i].title}</h3>
            <p>By: ${myLibrary[i].author}</p>
            <p>Pages: ${myLibrary[i].pages}</p>
        </div>
        <div class="button-container"  id=${myLibrary[i].id}>

        <button class="delete-btn">X</button>
        </div>
    </div>   
      `;
    //  <button class="read-btn">Read</button>
    bookContainer.innerHTML += content;
  }
  // Attach event listeners & read buttons when book container changes
  deleteBook();
  addReadButtons();
}

function addReadButtons() {
  const buttonContainer = document.querySelectorAll(".button-container");
  for (i = 0; i < buttonContainer.length; i++) {
    let readButton = document.createElement("button");
    readButton.classList.add("read-btn");
    let bookIndex = myLibrary[i];
    console.log(readButton);
    if (bookIndex.isRead === "Unread") {
      readButton.textContent = "Unread";
      readButton.style.backgroundColor = "red";
    } else {
      readButton.textContent = "Read";
      readButton.style.backgroundColor = "green";
    }
    // Add read button to each button container
    buttonContainer[i].appendChild(readButton);
  }
  Book.prototype.toggleReadStatus();
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
    // Get checked radio every time submit event happens
    const isReadCheckedRadio = document.querySelector(
      'input[name = "is_read"]:checked'
    );

    title = titleField.value;
    author = authorField.value;
    pages = pagesField.value;
    isRead = isReadCheckedRadio.value;

    addBookToLibrary(new Book(title, author, pages, isRead));
    // Create the new book in the function params to avoid typing out all the book props
    // reset container
    bookContainer.innerHTML = "";
    // re-add books + new one
    displayAllBooks();

    // success message
    infoLabel.innerHTML = "Book Created!";
    infoLabel.style.color = "#47820e";
  }
});

function deleteBook() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = button.parentNode.id;
      console.log("Book ID: " + id);
      // This is how another student was able to target data-id
      //   const bookId = event.target.getAttribute('data-id');
      // They put data-id on both buttons though.
      // To avoid repeating I could of used data-attr instead of ID on the container and target its atr

      // Find ID's index in myLibrary then splice it out
      const index = myLibrary.findIndex((element) => element.id === id);
      myLibrary.splice(index, 1);
      // Update book container
      displayAllBooks(myLibrary);
    });
  });
}

Book.prototype.toggleReadStatus = function () {
  const readButtons = document.querySelectorAll(".read-btn");
  readButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.parentNode.id;
      // get index of book to get read status
      const index = myLibrary.findIndex((element) => element.id === id);
      const book = myLibrary[index];
      console.log("Read? ", book.isRead);
      // Switch status
      if (book.isRead === "Unread") {
        book.isRead = "read";
        button.innerHTML = "Read";
        button.style.backgroundColor = "green";
      } else {
        book.isRead = "Unread";
        button.innerHTML = "Unread";
        button.style.backgroundColor = "red";
      }
      // Push updated book into array & update display
      console.log("before push ", myLibrary);
      myLibrary.push[book];
      console.log("Now? ", book.isRead);
      console.log(myLibrary);
    });
  });
};
