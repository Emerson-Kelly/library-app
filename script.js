//const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }
}

class Library {

constructor() {
    this.books = [];
    }

    addBook(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        this.books.push(newBook);
    }
    
    removeBook() {
        this.books.splice(counter, 1);
        
    }

    toggleReadState(index) {
        this.books[index].read = !this.books[index].read;
    }

}

/*
function addBookToLibrary(title, author, pages, read) {
    const newBook
    myLibrary.push(newBook);
}
*/
const myLibrary = new Library ();

document.getElementById('submitForm').addEventListener('click', function (event) {
    event.preventDefault();

    // Get form input values
    const title = document.getElementById('inlineFormInputBookTitle').value;
    const author = document.getElementById('inlineFormInputBookAuthor').value;
    const pages = document.getElementById('inlineFormInputPages').value;
    const read = document.getElementById('inlineFormSelectPref').value;

    // Push form inputs into function

    myLibrary.addBook(title, author, pages, read);

    const cardHtml = `
        <div class="card" style="width: 18rem;" data-item-counter="${myLibrary.length - 1}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-3 text-muted">${author}</h6>
                <p class="card-text">${pages} pages</p>
                <div class="cta-row">
                    <button type="button" class="bookToggle">${read === 'true' ? 'Read' : 'Not Read'}</button>
                    <button type="button" style="color: #dc3545; float: right;" class="btn btn-link remove">Remove</button>
                </div>
            </div>
        </div>
    `;

    // Append the card HTML to the container
    document.getElementById('submittedBooks').insertAdjacentHTML('beforeend', cardHtml);

    // Close the modal
    var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('newBookModal'));
    myModal.hide();
    console.log(myLibrary.books);

    document.getElementById('book-form').reset();

    const cards = document.querySelectorAll('.card');

    // Update data-item-counter attribute for each card
    cards.forEach((card, index) => {
        
        card.setAttribute('data-item-counter', index);
    });

    

    function toggleReadState(button, itemCounter) {
        // Toggle the read state of the book
   
        button.textContent = myLibrary.books[itemCounter].read ? 'Read' : 'Not Read';
    
        if (myLibrary.books[itemCounter].read) {
            button.classList.remove("bookToggle");
            button.classList.remove("btn", "btn-outline-secondary");
            button.classList.add("btn", "btn-outline-success");
        } else {
            button.classList.remove("bookToggle");
            button.classList.remove("btn", "btn-outline-success");
            button.classList.add("btn", "btn-outline-secondary");
        }
    }

    const removeButtons = document.querySelectorAll('.remove');

    // Add event listener to remove buttons
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {

            const card = button.closest('.card');

            const counter = parseInt(card.getAttribute('data-item-counter'));
           // myLibrary.splice(counter, 1);
            
          card.remove();

            console.log(myLibrary.books);
        });
       
    });

    // Get all bookToggle buttons
    const bookToggle = document.querySelectorAll('.bookToggle');
    
    bookToggle.forEach((button, itemCounter) => {
        // Initialize button state
        if (read === 'true') {
            button.classList.remove("bookToggle");
            button.classList.remove("btn", "btn-outline-secondary");
            button.classList.add("btn", "btn-outline-success");
        } else {
            button.classList.remove("bookToggle");
            button.classList.toggle("btn", true);
            button.classList.toggle("btn-outline-secondary", true);
        }
    
        // Add event listener to toggle read state with one click
        button.addEventListener('click', function () {
            myLibrary.toggleReadState(itemCounter);
            toggleReadState(button, itemCounter);
        });
    });
    

   

});