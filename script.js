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

// Function to handle form submission
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
    <div class="card" id="card-item" style="width: 18rem;" data-item-counter="${myLibrary.length - 1}">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-3 text-muted">${author}</h6>
            <p class="card-text">${pages} pages</p>
            <button type="button" class="bookToggle">${read === 'true' ? 'Read' : 'Not Read'}</button>
            <button type="button" style="color: #dc3545; float: right;" class="btn btn-link remove">Remove</button>
        </div>
    </div>
    `;

    // Append the card HTML to the container
    document.getElementById('submittedBooks').insertAdjacentHTML('beforeend', cardHtml);

    const bookToggle = document.querySelectorAll('.bookToggle');
    
    // Loop through each bookToggle element
    for (let i = 0; i < bookToggle.length; i++) {
        if (read !== 'true') {
            bookToggle[i].classList.remove("bookToggle");
            bookToggle[i].classList.toggle("btn", true);
            bookToggle[i].classList.toggle("btn-outline-secondary", true);
        } else {
            bookToggle[i].classList.remove("btn", "btn-outline-secondary");
            bookToggle[i].classList.add("btn", "btn-outline-success");
        }
    }
  


    // Create Item Counters for Each Card Creation
    const card = document.getElementById('card-item');
    let itemCounter = parseInt(card.getAttribute('data-item-counter'));
    itemCounter++;
    card.setAttribute('data-item-counter', itemCounter.toString());

    // Close the modal
    var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('newBookModal'));
    myModal.hide();
    console.log(myLibrary);

    // Reset form fields
    document.getElementById('book-form').reset();

    // Get all cards
    const cards = document.querySelectorAll('.card');

    // Update data-item-counter attribute for each card
    cards.forEach((card, index) => {
        card.setAttribute('data-item-counter', index);
    });

    // Get all remove buttons
    const removeButtons = document.querySelectorAll('.remove');

    // Add event listener to remove buttons
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Find the parent card of the clicked remove button
            const card = button.closest('.card');

            // Get the data-item-counter attribute value of the card
            const counter = parseInt(card.getAttribute('data-item-counter'));

            // Remove the card
            card.remove();

            // Remove the corresponding book from myLibrary
            myLibrary.splice(counter, 1);
            console.log(myLibrary);
        });
    });

     // Function to toggle the read state of a book
 function toggleReadState(button, bookIndex) {

    myLibrary[bookIndex].read = myLibrary[bookIndex].read === 'true' ? 'false' : 'true';

    button.textContent = myLibrary[bookIndex].read === 'true' ? 'Read' : 'Not Read';

    if (myLibrary[bookIndex].read === 'true') {
        button.classList.remove('btn-outline-secondary');
        button.classList.add('btn-outline-success');
    } else {
        button.classList.remove('btn-outline-success');
        button.classList.add('btn-outline-secondary');
    }
}

bookToggle.forEach((button, bookIndex) => {
    button.addEventListener('click', function () {
        const read = myLibrary[bookIndex].read;
        toggleReadState(button, bookIndex);
    });
});

});

