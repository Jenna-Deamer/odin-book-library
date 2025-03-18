const bookContainer = document.querySelector("#book-container");
const dialog = document.querySelector("#add-book-modal");
const showButton = document.querySelector("dialog + button");
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

function addBookToLibrary(title, author, pages, isRead) {
  // create book
  let newBook = new Book(title, author, pages, isRead);
  // store in array
  myLibrary.push(newBook);
  console.log(myLibrary);
  return myLibrary;
}

function displayAllBooks() {
  // reset container to prevent duplicates
  bookContainer.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    // create a div & give it a class for every item in array
    const bookCard = document.createElement("div");
    bookCard.classList.add(".book-card");
    // define book-card content
    const content = `
            <div class="book-card" >
        <div class="book-card-body">
            <h3>${myLibrary[i].title}</h3>
            <p>By: ${myLibrary[i].author}</p>
            <p>Pages: ${myLibrary[i].pages}</p>
        </div>
        <div class="button-container"  id=${myLibrary[i].id}>
         <button class="read-btn"></button>
        <button class="delete-btn">X</button>
        </div>
    </div>   
      `;
      
    bookContainer.innerHTML += content;
    // Attach delete event listeners when bookContainer changes
    deleteBook();
    Book.prototype.toggleReadStatus();
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
    // Get checked radio every time submit event happens
    const isReadCheckedRadio = document.querySelector(
      'input[name = "is_read"]:checked'
    );

    title = titleField.value;
    author = authorField.value;
    pages = pagesField.value;
    isRead = isReadCheckedRadio.value;

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

function deleteBook() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.parentNode.id;
      console.log("Book ID: " + id);
      // Find ID's index in myLibrary then splice it out
      const index = myLibrary.findIndex((element) => element.id === id);
      myLibrary.splice(index, 1);
      // Update book container
      displayAllBooks(myLibrary);
    });
  });
}

Book.prototype.toggleReadStatus = function(){
    const readButtons = document.querySelectorAll(".read-btn");
    readButtons.forEach((button) =>{
        button.addEventListener("click",() =>{
            const id = button.parentNode.id;
            // get index of book to get read status
            const index = myLibrary.findIndex((element) => element.id === id);
            const book = myLibrary[index];
            console.log("Read? ", book.isRead);
            // Switch status
            if(book.isRead === "Unread"){
                book.isRead = "read"
                button.innerHTML = "Read"
                button.style.backgroundColor = "green";
            }
            else{
                 book.isRead = "Unread"
                 button.innerHTML = "Unread"
                 button.style.backgroundColor = "red";
            }
            // Push updated book into array & update display
            console.log("before push ", myLibrary)
            myLibrary.push[book];
            console.log("Now? ", book.isRead);
            console.log(myLibrary)
        });
    })
 
}