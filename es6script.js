// es6 with class method instead of prototype method
const submitBtn = document.querySelector (".submit");
const form = document.querySelector ("form");



//Book constructor
class Book  {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    } 
};
class UI {
// add book to the list
    addBookToList(book){
        const tableList = document.querySelector("#book-list");
        const row = document.createElement("tr");
        
        row.innerHTML = `
        <tr><td>${book.title}</td></tr>
        <tr><td>${book.author}</td></tr>
        <tr><td>${book.isbn}</td></tr>
        <tr><td><a href="#" class = "delete">X</a></td></tr>`
        
        tableList.appendChild(row);
    }
// clear fields
    clearFields(){
        document.querySelector("#book-title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
// delete book function
    deleteBook (target){
        if (target.className === "delete" ) {
            target.parentElement.parentElement.remove();
        }
    }
//function error message
    alertMessage(error, classt){
        const errorMsg = document.querySelector(".error-message");
        errorMsg.appendChild(document.createTextNode(error));
        errorMsg.classList.remove("hidden");
        errorMsg.classList.add (classt);
    }
}

// function to clear error 
function clearError() {
    const errorMsg = document.querySelector(".error-message");
    errorMsg.classList.add("hidden");
    errorMsg.innerHTML = "";
};

// event listner
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    
    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (!title || !author || !isbn) {
        ui.alertMessage("please fill up fields","error");
        setTimeout(clearError, 3000);
    }
    else {
        ui.addBookToList(book);
        ui.clearFields();
        ui.alertMessage("Book added","success");
        setTimeout(clearError, 3000);
    }
});

//event listner for delete button

document.querySelector("#book-list").addEventListener ("click", function(e) {
    e.preventDefault();
    const ui = new UI;
    ui.deleteBook(e.target);
    ui.alertMessage ("Book deleted","success");
    setTimeout(clearError, 3000);

    // remove book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

// Store to local storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
    }

    static addBooks() {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem("book", JSON.stringify(books))
    }

    static displayBook() {
        const books = Store.getBooks();
        
        books.forEach (function (book) {
            const ui = new UI;
            // add book til list
            ui.addBookToList(book);
        });
     }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach (function(book, index){
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem("books", JSON.stringify(books));
    }
}

// DOM load event

// document.addEventListener ("DOMContentLoaded", Store.displayBook);