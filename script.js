const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

document.getElementById('submitForm').addEventListener('click', function (event) {
    event.preventDefault();

    // Get form input values
    const title = document.getElementById('inlineFormInputBookTitle').value;
    const author = document.getElementById('inlineFormInputBookAuthor').value;
    const pages = document.getElementById('inlineFormInputPages').value;
    const read = document.getElementById('inlineFormSelectPref').value;

    // Push form inputs into function
    addBookToLibrary(title, author, pages, read);

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
    console.log(myLibrary);

    document.getElementById('book-form').reset();

    const cards = document.querySelectorAll('.card');

    // Update data-item-counter attribute for each card
    cards.forEach((card, index) => {
        card.setAttribute('data-item-counter', index);
    });

 
    const removeButtons = document.querySelectorAll('.remove');

    // Add event listener to remove buttons
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {

            const card = button.closest('.card');

            const counter = parseInt(card.getAttribute('data-item-counter'));

            card.remove();

            myLibrary.splice(counter, 1);
            console.log(myLibrary);
        });
    });

    function toggleReadState(button, itemCounter) {
        // Toggle the read state of the book
        myLibrary[itemCounter].read = !myLibrary[itemCounter].read;

        button.textContent = myLibrary[itemCounter].read ? 'Read' : 'Not Read';
    
        if (myLibrary[itemCounter].read) {
            button.classList.remove("btn", "btn-outline-secondary");
            button.classList.add("btn", "btn-outline-success");
        } else {
            button.classList.remove("btn", "btn-outline-success");
            button.classList.add("btn", "btn-outline-secondary");
        }
    }

    // Get all bookToggle buttons
    const bookToggle = document.querySelectorAll('.bookToggle');
    
    // Loop through each bookToggle element
    bookToggle.forEach((button, itemCounter) => {
        if (read !== 'true') {
            button.classList.remove("bookToggle");
            button.classList.toggle("btn", true);
            button.classList.toggle("btn-outline-secondary", true);
        } else {
            button.classList.remove("bookToggle");
            button.classList.remove("btn", "btn-outline-secondary");
            button.classList.add("btn", "btn-outline-success");
        }

        (function(btn, idx) {
            btn.addEventListener('click', function () {
                toggleReadState(btn, idx);
            });
        })(button, itemCounter);
    });

});
