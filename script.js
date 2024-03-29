
const myLibrary = [];

function Book(title, author, pages, read) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Function to handle form submission
document.getElementById('submitForm').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form input values
    const title = document.getElementById('inlineFormInputBookTitle').value;
    const author = document.getElementById('inlineFormInputBookAuthor').value;
    const pages = document.getElementById('inlineFormInputPages').value;
    const read = document.getElementById('inlineFormSelectPref').value;

    // Push form inputs into function
    addBookToLibrary(title, author, pages, read);

    // Create card HTML for the submitted book
    const cardHtml = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-3 text-muted">${author}</h6>
                <p class="card-text">${pages} pages</p>
                <button type="button" class="btn btn-outline-secondary">${read === 'true' ? 'Read' : 'Not Read'}</button>
                <button type="button" style="color: #dc3545; float: right;" class="btn btn-link">Remove</button>
            </div>
        </div>
        `;

    // Append the card HTML to the container
    document.getElementById('submittedBooks').insertAdjacentHTML('beforeend', cardHtml);

    // Close the modal
    var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('newBookModal'));
    myModal.hide();

    console.log(myLibrary);

    // Reset form fields
    document.getElementById('book-form').reset();
});




