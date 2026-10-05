// QUERIES
const table_body = document.querySelector("tbody"); // Table body that holds the book rows
const addBtn = document.querySelector(".add-book");
const updateBtn = document.querySelector(".update"); // Button that re-renders the table
const modalBox = document.querySelector('dialog');
const modalSubmitBtn = modalBox.querySelector('button');
const form = modalBox.querySelector('form');

// GLOBALS
const myLibrary = []; // All Book objects

// Book constructor (must be called with `new`)
function Book(title, year, author, hasRead) {
	// Throw if called without `new`
	if (!new.target) {
		throw Error("New not called for construct f Book()");
	}

	// Set the book's properties and generate a unique id
	((this.title = title),
		(this.year = year),
		(this.author = author),
		(this.id = "B-" + crypto.randomUUID()),
		(this.hasRead = hasRead));
}

// Create a Book and add it to the library
function addBookToLib(title, year, author, hasRead) {
	let book = new Book(title, year, author, hasRead);
	myLibrary.push(book);
}

// Rebuild the table from myLibrary
function renderLibrary() {
	table_body.replaceChildren(); // Remove existing rows

	for (let book of myLibrary) {
		// New row, tagged with the book's id
		let t_row = table_body.insertRow(-1);
		t_row.classList.add(book.id);

		// One cell per book property
		for (let key in book) {
			let cell = t_row.insertCell(-1);
			cell.classList.add(key);

			if (key === "hasRead") {
				// Read status is shown as an image styled by CSS
				let img = document.createElement("img");
				if (book[key]) {
					img.classList.add("book-read");
				}

				cell.appendChild(img);
			} else {
				// Every other property is shown as text
				cell.textContent = book[key];
			}
		}

		// Add buttons
		let cell = t_row.insertCell(-1);
		cell.appendChild(addDelBtn(book));
		cell = t_row.insertCell(-1);
		cell.appendChild(addReadBtn(book));
	}
}

// Create a button that deletes the book from the array and the table
function addDelBtn(book) {
	const newBtn = document.createElement("button");
	newBtn.type = "button";
	newBtn.textContent = "Delete";
    newBtn.addEventListener("click", (e) => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        e.currentTarget.closest("tr").remove();
    });

	return newBtn;
}

// Create a button that toggles the book's read status
function addReadBtn(book) {
	const newBtn = document.createElement("button");
	newBtn.type = "button";
	newBtn.textContent = "Toggle Read";
	newBtn.addEventListener("click", () => {
		const img = table_body.querySelector(`.${book.id} .hasRead img`); // This book's status image
		book.hasRead = book.hasRead ? false : true; // Flip the stored value
		img.classList.toggle("book-read"); // Update the display
	});

	return newBtn;
}

// EVENTS
// Re-render the table when the update button is clicked
updateBtn.addEventListener("click", renderLibrary);

form.addEventListener("submit", (e) => {

	// Capture form data
	console.dir(form.elements);
	const data = Object.fromEntries(new FormData(form, modalSubmitBtn));
	console.log(data);

	// Create new book with form data
	addBookToLib(
		data.title,
		data.year,
		data.author,
		Object.hasOwn(data, 'readStatus') 
	);
	renderLibrary();

	console.log('Submit event');

});

modalBox.addEventListener('close', (e) => {
	console.log('Close event');
	form.reset();

});

addBtn.addEventListener('click', (e) => {
    modalBox.showModal();
});

// Sample data for testing
addBookToLib("Book1", 1990, "Jane Doe", false);
addBookToLib("Book2", 1650, "John frow", true);
addBookToLib("Book3", 1204, "Lane poe", false);
addBookToLib("Book4", 1990, "Doe jane", false);
addBookToLib("Book5", 1, "Wayne Mayne", true);

renderLibrary(); // Initial render
