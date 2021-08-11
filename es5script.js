const submitBtn = document.querySelector (".submit");
const form = document.querySelector ("form");



//Book constructor
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function  UI() {
};

// add book to the list
UI.prototype.addBookToList = function (book) {
    const tableList = document.querySelector("#book-list");
    const row = document.createElement("tr");
    
    row.innerHTML = `
    <tr><td>${book.title}</td></tr>
    <tr><td>${book.author}</td></tr>
    <tr><td>${book.isbn}</td></tr>
    <tr><td><a href="#" class = "delete">X</a></td></tr>`
    
    tableList.appendChild(row);
}

// delete book function
UI.prototype.deleteBook = function (target) {
    if (target.className === "delete" ) {
        target.parentElement.parentElement.remove();
    }
}

// clear fields
UI.prototype.clearFields = function () {
    document.querySelector("#book-title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
}

//function error message
UI.prototype.alertMessage = function (error, classt) {
    const errorMsg = document.querySelector(".error-message");
    errorMsg.appendChild(document.createTextNode(error));
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add (classt);
}

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



// function to clear error 
function clearError() {
    const errorMsg = document.querySelector(".error-message");
    errorMsg.classList.add("hidden");
    errorMsg.innerHTML = "";
}

//event listner for delete button

document.querySelector("#book-list").addEventListener ("click", function(e) {
    e.preventDefault();
    const ui = new UI;
    ui.deleteBook(e.target);
    ui.alertMessage ("Book deleted","success");
    setTimeout(clearError, 3000);
})